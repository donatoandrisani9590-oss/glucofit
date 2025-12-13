// src/components/StatsView.jsx
import React, { useMemo } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import { DEFAULT_WORKOUTS } from '../data/workouts';
import { TOTAL_SUPPLEMENTS } from '../data/supplements';

export default function StatsView() {
  const { 
    workoutLogs, 
    todaySupplements
  } = useFirebase();

  // Diese Woche berechnen
  const thisWeekStats = useMemo(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1);
    startOfWeek.setHours(0, 0, 0, 0);

    const workoutsThisWeek = workoutLogs?.filter(log => {
      const logDate = log.date?.toDate?.() || new Date(log.date);
      return logDate >= startOfWeek;
    }) || [];

    const uniqueWorkouts = [...new Set(workoutsThisWeek.map(w => w.workoutId))];

    return {
      count: workoutsThisWeek.length,
      unique: uniqueWorkouts.length,
      workouts: workoutsThisWeek
    };
  }, [workoutLogs]);

  // Streak berechnen
  const streak = useMemo(() => {
    if (!workoutLogs || workoutLogs.length === 0) return 0;
    
    const dateSet = new Set();
    workoutLogs.forEach(log => {
      const d = log.date?.toDate?.() || new Date(log.date);
      dateSet.add(d.toDateString());
    });

    let count = 0;
    let currentDate = new Date();
    
    if (!dateSet.has(currentDate.toDateString())) {
      currentDate.setDate(currentDate.getDate() - 1);
      if (!dateSet.has(currentDate.toDateString())) {
        return 0;
      }
    }

    while (dateSet.has(currentDate.toDateString())) {
      count++;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    return count;
  }, [workoutLogs]);

  // Supplements heute
  const supplementsTakenToday = Object.keys(todaySupplements || {}).length;
  const supplementPercent = Math.round((supplementsTakenToday / TOTAL_SUPPLEMENTS) * 100);

  // Trainingsvolumen (letzte 7 Tage)
  const weeklyVolume = useMemo(() => {
    if (!workoutLogs || workoutLogs.length === 0) return { sets: 0, reps: 0 };

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    let totalSets = 0;
    let totalReps = 0;

    workoutLogs
      .filter(log => {
        const d = log.date?.toDate?.() || new Date(log.date);
        return d >= sevenDaysAgo;
      })
      .forEach(log => {
        if (log.exercises) {
          Object.values(log.exercises).forEach(exercise => {
            Object.values(exercise).forEach(set => {
              totalSets++;
              totalReps += parseInt(set.reps) || 0;
            });
          });
        }
      });

    return { sets: totalSets, reps: totalReps };
  }, [workoutLogs]);

  // Muskelgruppen-Verteilung (letzte 14 Tage)
  const muscleDistribution = useMemo(() => {
    if (!workoutLogs || workoutLogs.length === 0) return [];

    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    const counts = {};
    
    workoutLogs
      .filter(log => {
        const d = log.date?.toDate?.() || new Date(log.date);
        return d >= fourteenDaysAgo;
      })
      .forEach(log => {
        const workout = DEFAULT_WORKOUTS.find(w => w.id === log.workoutId);
        if (workout) {
          counts[workout.name] = (counts[workout.name] || 0) + 1;
        }
      });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [workoutLogs]);

  // Formatiere Datum
  const formatDate = (date) => {
    const d = date?.toDate?.() || new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (d.toDateString() === today.toDateString()) return 'Heute';
    if (d.toDateString() === yesterday.toDateString()) return 'Gestern';
    
    return d.toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">📊 Deine Stats</h2>
        <p className="text-slate-400 text-sm">Echte Daten aus deinem Training</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl p-4 border border-amber-500/30">
          <div className="text-4xl font-bold text-amber-400">{streak}</div>
          <div className="text-sm text-slate-300">🔥 Tage Streak</div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl p-4 border border-emerald-500/30">
          <div className="text-4xl font-bold text-emerald-400">{thisWeekStats.count}</div>
          <div className="text-sm text-slate-300">🏋️ Diese Woche</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-4 border border-blue-500/30">
          <div className="text-3xl font-bold text-blue-400">{weeklyVolume.sets}</div>
          <div className="text-sm text-slate-300">💪 Sets (7 Tage)</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-4 border border-purple-500/30">
          <div className="text-3xl font-bold text-purple-400">{supplementPercent}%</div>
          <div className="text-sm text-slate-300">💊 Supps heute</div>
        </div>
      </div>

      {/* Supplements Progress */}
      <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">💊 Supplements Heute</h3>
          <span className="text-sm text-slate-400">{supplementsTakenToday}/{TOTAL_SUPPLEMENTS}</span>
        </div>
        <div className="bg-slate-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${supplementPercent}%` }}
          />
        </div>
        {supplementsTakenToday === 0 && (
          <p className="text-xs text-slate-500 mt-2">
            → Geh zum Supplements Tab um deine Supps zu tracken
          </p>
        )}
      </div>

      {/* Trainingsverteilung */}
      {muscleDistribution.length > 0 && (
        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
          <h3 className="font-semibold mb-4">📊 Trainingsverteilung (14 Tage)</h3>
          <div className="space-y-2">
            {muscleDistribution.map((item, idx) => {
              const workout = DEFAULT_WORKOUTS.find(w => w.name === item.name);
              const maxCount = Math.max(...muscleDistribution.map(m => m.count));
              const percent = (item.count / maxCount) * 100;
              
              return (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-xl w-8">{workout?.icon || '🏋️'}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.name}</span>
                      <span className="text-slate-400">{item.count}×</span>
                    </div>
                    <div className="bg-slate-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          idx === 0 ? 'bg-emerald-500' : 
                          idx === 1 ? 'bg-blue-500' : 
                          'bg-slate-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Letzte Workouts */}
      <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
        <h3 className="font-semibold mb-4">🕐 Letzte Workouts</h3>
        
        {workoutLogs && workoutLogs.length > 0 ? (
          <div className="space-y-2">
            {workoutLogs.slice(0, 7).map((log, index) => {
              const workout = DEFAULT_WORKOUTS.find(w => w.id === log.workoutId);
              const setCount = log.exercises 
                ? Object.values(log.exercises).reduce((sum, ex) => sum + Object.keys(ex).length, 0)
                : 0;
              
              return (
                <div 
                  key={log.id || index} 
                  className="flex items-center justify-between bg-slate-700/50 rounded-xl p-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{workout?.icon || '🏋️'}</span>
                    <div>
                      <div className="font-medium">{log.workoutName || workout?.name || 'Workout'}</div>
                      <div className="text-xs text-slate-400">
                        {formatDate(log.date)}
                        {setCount > 0 && <span className="ml-2">· {setCount} Sets</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-emerald-400 text-xl">✓</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-slate-700/50 rounded-lg p-6 text-center text-slate-400">
            <div className="text-4xl mb-3">🏋️</div>
            <p className="font-medium">Noch keine Workouts</p>
            <p className="text-sm mt-1">Starte dein erstes Training!</p>
          </div>
        )}
      </div>

      {/* Motivations-Cards */}
      {streak === 0 && (!workoutLogs || workoutLogs.length === 0) && (
        <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl p-4 border border-emerald-500/30">
          <div className="text-center">
            <div className="text-3xl mb-2">🚀</div>
            <p className="font-semibold text-emerald-400">Bereit loszulegen?</p>
            <p className="text-sm text-slate-300 mt-1">Dein erstes Workout wartet!</p>
          </div>
        </div>
      )}

      {streak >= 3 && (
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl p-4 border border-amber-500/30">
          <div className="text-center">
            <div className="text-3xl mb-2">🔥</div>
            <p className="font-semibold text-amber-400">{streak} Tage am Stück!</p>
            <p className="text-sm text-slate-300 mt-1">Konsistenz ist der Schlüssel.</p>
          </div>
        </div>
      )}
    </div>
  );
}