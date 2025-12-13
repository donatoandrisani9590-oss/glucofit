// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyByE4NhPWcw3L_7qG_mej81tU-bXtqvImo",
  authDomain: "glucofit-app.firebaseapp.com",
  projectId: "glucofit-app",
  storageBucket: "glucofit-app.firebasestorage.app",
  messagingSenderId: "501438996536",
  appId: "1:501438996536:web:492391e6e49a0a948c86cd"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;