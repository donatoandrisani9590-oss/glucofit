// src/firebase/auth.js
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateProfile
  } from 'firebase/auth';
  import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
  import { auth, db } from './config';
  
  export async function signUp(email, password, displayName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await updateProfile(user, { displayName });
  
      await setDoc(doc(db, 'users', user.uid), {
        email,
        displayName,
        createdAt: serverTimestamp(),
        diabetesType: 'type1',
        targetRangeLow: 70,
        targetRangeHigh: 180,
        currentSplit: 'elite_5day',
        streak: 0,
        bestStreak: 0,
        totalWorkouts: 0
      });
  
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  export async function signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      let message = 'Anmeldung fehlgeschlagen';
      if (error.code === 'auth/wrong-password') message = 'Falsches Passwort';
      if (error.code === 'auth/user-not-found') message = 'Benutzer nicht gefunden';
      if (error.code === 'auth/invalid-credential') message = 'Ungültige Anmeldedaten';
      return { success: false, error: message };
    }
  }
  
  export async function logOut() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  export async function resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }