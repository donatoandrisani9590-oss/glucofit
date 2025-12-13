// src/firebase/hooks.js
import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc,
  query, 
  orderBy,
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';
import { db, auth } from './config';
import { onAuthStateChanged } from 'firebase/auth';

// Auth Hook
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, loading };
}

// Workout Logs
export function useWorkoutLogs(userId) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) { setLoading(false); return; }

    const q = query(
      collection(db, 'users', userId, 'workoutLogs'),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLogs(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [userId]);

  const logWorkout = async (workoutData) => {
    if (!userId) return;
    const logRef = doc(collection(db, 'users', userId, 'workoutLogs'));
    await setDoc(logRef, {
      ...workoutData,
      date: serverTimestamp(),
      createdAt: serverTimestamp()
    });
    return logRef.id;
  };

  return { logs, loading, logWorkout };
}

// Supplement Logs
export function useSupplementLogs(userId) {
  const [logs, setLogs] = useState([]);
  const [todayLogs, setTodayLogs] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) { setLoading(false); return; }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const q = query(
      collection(db, 'users', userId, 'supplementLogs'),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLogs(data);

      const todayData = {};
      data.forEach(log => {
        const logDate = log.date?.toDate?.() || new Date(log.date);
        if (logDate >= today) {
          todayData[log.supplementId] = true;
        }
      });
      setTodayLogs(todayData);
      setLoading(false);
    });

    return unsubscribe;
  }, [userId]);

  const logSupplement = async (supplementId, supplementName) => {
    if (!userId) return;
    const logRef = doc(collection(db, 'users', userId, 'supplementLogs'));
    await setDoc(logRef, {
      supplementId,
      supplementName,
      date: serverTimestamp(),
      takenAt: new Date().toISOString()
    });
  };

  const isTakenToday = (supplementId) => !!todayLogs[supplementId];

  return { logs, todayLogs, loading, logSupplement, isTakenToday };
}

// Blood Sugar Logs
export function useBloodSugarLogs(userId) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) { setLoading(false); return; }

    const q = query(
      collection(db, 'users', userId, 'bloodSugarLogs'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLogs(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [userId]);

  const logBloodSugar = async (value, context = 'general', notes = '') => {
    if (!userId) return;
    const logRef = doc(collection(db, 'users', userId, 'bloodSugarLogs'));
    await setDoc(logRef, {
      value: Number(value),
      context,
      notes,
      timestamp: serverTimestamp()
    });
  };

  const getTimeInRange = (low = 70, high = 180, days = 7) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const filtered = logs.filter(log => {
      const logDate = log.timestamp?.toDate?.() || new Date(log.timestamp);
      return logDate >= startDate;
    });
    
    if (filtered.length === 0) return null;
    const inRange = filtered.filter(log => log.value >= low && log.value <= high);
    return Math.round((inRange.length / filtered.length) * 100);
  };

  const countHypos = (threshold = 70, days = 7) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    return logs.filter(log => {
      const logDate = log.timestamp?.toDate?.() || new Date(log.timestamp);
      return log.value < threshold && logDate >= startDate;
    }).length;
  };

  return { logs, loading, logBloodSugar, getTimeInRange, countHypos };
}

// User Settings
export function useUserSettings(userId) {
  const [workouts, setWorkouts] = useState(null);
  const [supplements, setSupplements] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) { setLoading(false); return; }

    const settingsRef = doc(db, 'users', userId, 'settings', 'config');
    
    const unsubscribe = onSnapshot(settingsRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setWorkouts(data.workouts || null);
        setSupplements(data.supplements || null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [userId]);

  const saveWorkouts = async (workoutData) => {
    if (!userId) return;
    const settingsRef = doc(db, 'users', userId, 'settings', 'config');
    await setDoc(settingsRef, { workouts: workoutData, updatedAt: serverTimestamp() }, { merge: true });
  };

  const saveSupplements = async (supplementData) => {
    if (!userId) return;
    const settingsRef = doc(db, 'users', userId, 'settings', 'config');
    await setDoc(settingsRef, { supplements: supplementData, updatedAt: serverTimestamp() }, { merge: true });
  };

  return { workouts, supplements, loading, saveWorkouts, saveSupplements };
}