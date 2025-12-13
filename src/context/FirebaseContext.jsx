// src/context/FirebaseContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  useWorkoutLogs, 
  useSupplementLogs, 
  useBloodSugarLogs,
  useUserSettings 
} from '../firebase/hooks';

const FirebaseContext = createContext(null);

export function FirebaseProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const userId = user?.uid;

  const workouts = useWorkoutLogs(userId);
  const supplements = useSupplementLogs(userId);
  const bloodSugar = useBloodSugarLogs(userId);
  const settings = useUserSettings(userId);

  const value = {
    user,
    userId,
    isAuthenticated: !!user,
    loading,
    
    // Workouts
    workoutLogs: workouts.logs,
    logWorkout: workouts.logWorkout,
    
    // Supplements
    supplementLogs: supplements.logs,
    todaySupplements: supplements.todayLogs,
    logSupplement: supplements.logSupplement,
    isTakenToday: supplements.isTakenToday,
    
    // Blood Sugar
    bloodSugarLogs: bloodSugar.logs,
    logBloodSugar: bloodSugar.logBloodSugar,
    getTimeInRange: bloodSugar.getTimeInRange,
    countHypos: bloodSugar.countHypos,
    
    // Settings
    savedWorkouts: settings.workouts,
    savedSupplements: settings.supplements,
    saveWorkouts: settings.saveWorkouts,
    saveSupplements: settings.saveSupplements
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}

export default FirebaseContext;