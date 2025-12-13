// src/components/WorkoutSelector.jsx
import React, { useState, useMemo } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import { DEFAULT_WORKOUTS, PREHAB_PROTOCOLS, WORKOUT_COLORS } from '../data/workouts';

export default function WorkoutSelector() {
  const { workoutLogs, logWorkout } = useFirebase();
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [activeExercise, setActiveExercise] = useState(null);
  const [setData, setSetData] = useState({});
  const [showPrehab, setShowPrehab] = useState(false);
  const [completedExercises, setCompletedExercises] = useState({});
  const [customSetCounts, setCustomSetCounts] = useState({});

  // Letzte 7 Tage Workouts
  const recentWorkouts = useMemo(() => {
    if (!workoutLogs || workoutLogs.length === 0) return [];
    
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return workoutLogs
      .filter(log => {
        const logDate = log.date?.toDate?.() || new Date(log.date);
        return logDate >= sevenDaysAgo;
      })
      .sort((a, b) => {
        const dateA = a.date?.toDate?.() || new Date(a.date);
        const dateB = b.date?.toDate?.() || new Date(b.date);
        return dateB - dateA;
      })
      .slice(0, 7);
  }, [workoutLogs]);

  const lastWorkout = recentWorkouts[0];
  const lastWorkoutId = lastWorkout?.workoutId;

  // Lade letzte Workout-Daten
  const getLastWorkoutData = (workoutId, exerciseId) => {
    if (!workoutLogs || workoutLogs.length === 0) return null;
    
    const lastLog = workoutLogs
      .filter(log => log.workoutId === workoutId && log.exercises)
      .sort((a, b) => {
        const dateA = a.date?.toDate?.() || new Date(a.date);
        const dateB = b.date?.toDate?.() || new Date(b.date);
        return dateB - dateA;
      })[0];
    
    return lastLog?.exercises?.[exerciseId] || null;
  };

  const formatDate = (date) => {
    const d = date?.toDate?.() || new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (d.toDateString() === today.toDateString()) return 'Heute';
    if (d.toDateString() === yesterday.toDateString()) return 'Gestern';
    return d.toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  const startWorkout = (workout) => {
    setSelectedWorkout(workout);
    setActiveExercise(null);
    setSetData({});
    setCompletedExercises({});
    setCustomSetCounts({});
    if (workout.prehab) setShowPrehab(true);
  };

  const updateSet = (exerciseId, setIndex, field, value) => {
    setSetData(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        [setIndex]: {
          ...prev[exerciseId]?.[setIndex],
          [field]: value
        }
      }
    }));
  };

  const addSet = (exerciseId, currentCount) => {
    setCustomSetCounts(prev => ({
      ...prev,
      [exerciseId]: currentCount + 1
    }));
  };

  const removeSet = (exerciseId, currentCount) => {
    if (currentCount <= 1) return;
    const newCount = currentCount - 1;
    setCustomSetCounts(prev => ({
      ...prev,
      [exerciseId]: newCount
    }));
    // Entferne Daten des letzten Satzes
    setSetData(prev => {
      const exerciseSets = { ...prev[exerciseId] };
      delete exerciseSets[newCount];
      return { ...prev, [exerciseId]: exerciseSets };
    });
  };

  const completeExercise = (exerciseId) => {
    setCompletedExercises(prev => ({ ...prev, [exerciseId]: true }));
    setActiveExercise(null);
  };

  const finishWorkout = async () => {
    if (!selectedWorkout) return;
    await logWorkout({
      workoutId: selectedWorkout.id,
      workoutName: selectedWorkout.name,
      exercises: setData,
      completedAt: new Date().toISOString()
    });
    setSelectedWorkout(null);
    setActiveExercise(null);
    setSetData({});
    setCompletedExercises({});
    setCustomSetCounts({});
    setShowPrehab(false);
  };

  // ==================== WORKOUT AUSWAHL ====================
  if (!selectedWorkout) {
    return (
      <div className="space-y-4">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">🏋️ Workout wählen</h2>
          <p className="text-slate-400 text-sm">GlucoFit Elite 2.0</p>
        </div>

        {recentWorkouts.length > 0 && (
          <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
            <h3 className="text-sm font-semibold text-slate-400 mb-3">📅 Letzte Trainings:</h3>
            <div className="flex flex-wrap gap-2">
              {recentWorkouts.slice(0, 5).map((log, idx) => {
                const workout = DEFAULT_WORKOUTS.find(w => w.id === log.workoutId);
                return (
                  <div key={idx} className="bg-slate-700/50 rounded-lg px-3 py-2 text-sm">
                    <span className="mr-1">{workout?.icon || '🏋️'}</span>
                    <span className="font-medium">{log.workoutName || log.workoutId}</span>
                    <span className="text-slate-500 ml-2 text-xs">{formatDate(log.date)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="space-y-3">
          {DEFAULT_WORKOUTS.filter(w => w.id !== 'rest').map((workout) => {
            const colorClass = WORKOUT_COLORS[workout.color] || WORKOUT_COLORS.slate;
            const isLastWorkout = workout.id === lastWorkoutId;
            
            return (
              <button
                key={workout.id}
                onClick={() => startWorkout(workout)}
                className={`w-full p-4 rounded-2xl border-2 ${colorClass} text-left transition-all active:scale-[0.98] relative`}
              >
                {isLastWorkout && (
                  <div className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                    ZULETZT
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{workout.icon}</span>
                  <div className="flex-1">
                    <div className="font-bold text-lg">{workout.name}</div>
                    <div className="text-sm opacity-80">{workout.subtitle}</div>
                    <div className="text-xs opacity-60 mt-1">{workout.exercises.length} Übungen · {workout.focus}</div>
                  </div>
                  <span className="text-2xl opacity-50">→</span>
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => startWorkout(DEFAULT_WORKOUTS.find(w => w.id === 'rest'))}
          className="w-full p-4 rounded-2xl border-2 border-slate-600 bg-slate-800/50 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">😴</span>
            <div>
              <div className="font-bold">REST DAY</div>
              <div className="text-sm text-slate-400">Aktive Regeneration & Mobility</div>
            </div>
          </div>
        </button>

        {recentWorkouts.length > 0 && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3">
            <div className="text-sm text-emerald-400">
              💡 <strong>Empfehlung:</strong> {
                (() => {
                  const recentIds = recentWorkouts.slice(0, 2).map(l => l.workoutId);
                  const suggestion = DEFAULT_WORKOUTS.find(w => w.id !== 'rest' && !recentIds.includes(w.id));
                  return suggestion ? `${suggestion.icon} ${suggestion.name}` : 'Rest Day! 😴';
                })()
              }
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==================== PREHAB ====================
  if (showPrehab && selectedWorkout.prehab) {
    const protocol = PREHAB_PROTOCOLS[selectedWorkout.prehab];
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button onClick={() => { setSelectedWorkout(null); setShowPrehab(false); }} className="text-slate-400">← Abbrechen</button>
          <button onClick={() => setShowPrehab(false)} className="text-emerald-400 font-semibold">Überspringen →</button>
        </div>
        <div className="bg-amber-500/20 border border-amber-500/50 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">⚠️</span>
            <h3 className="font-bold text-amber-400">PFLICHT: {protocol.name}</h3>
          </div>
          <p className="text-sm text-slate-300 mb-4">🎯 {protocol.goal}</p>
          <div className="space-y-3">
            {protocol.exercises.map((ex, idx) => (
              <div key={idx} className="bg-slate-800/50 rounded-xl p-3">
                <div className="font-semibold">{idx + 1}. {ex.name}</div>
                <div className="text-xs text-emerald-400 mb-1">🎯 {ex.muscle}</div>
                <div className="text-sm text-slate-400 mb-2">{ex.execution}</div>
                <div className="text-xs text-slate-500">{ex.sets} × {ex.reps}{ex.note && <span className="text-amber-400 ml-2">· {ex.note}</span>}</div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => setShowPrehab(false)} className="w-full bg-emerald-500 text-white font-bold py-4 rounded-2xl">
          ✓ Prehab erledigt — Workout starten
        </button>
      </div>
    );
  }

  // ==================== AKTIVE ÜBUNG ====================
  if (activeExercise) {
    const exercise = selectedWorkout.exercises.find(e => e.id === activeExercise);
    const lastData = getLastWorkoutData(selectedWorkout.id, activeExercise);
    const currentSets = setData[activeExercise] || {};
    const displaySetCount = customSetCounts[activeExercise] ?? exercise.sets;

    return (
      <div className="space-y-4">
        <button onClick={() => setActiveExercise(null)} className="text-slate-400">← Zurück</button>

        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
          <h3 className="font-bold text-xl mb-1">{exercise.name}</h3>
          <div className="text-emerald-400 text-sm mb-2">🎯 {exercise.muscle}</div>
          <div className="text-slate-400 text-sm mb-4">{exercise.execution}</div>
          
          {exercise.note && (
            <div className="bg-amber-500/20 text-amber-400 text-sm px-3 py-2 rounded-lg mb-4">{exercise.note}</div>
          )}

          {lastData && (
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-3 mb-4">
              <div className="text-xs text-blue-400 font-semibold mb-2">📊 LETZTES MAL:</div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(lastData).map(([setIdx, data]) => (
                  <span key={setIdx} className="bg-blue-500/30 px-3 py-1 rounded-lg text-sm font-mono">
                    {data.weight}kg × {data.reps}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-2 text-xs text-slate-500 px-2 font-semibold">
              <div>SET</div>
              <div>KG</div>
              <div>REPS</div>
              <div></div>
            </div>

            {[...Array(displaySetCount)].map((_, setIdx) => {
              const setValue = currentSets[setIdx] || {};
              const lastSetData = lastData?.[setIdx];
              const isComplete = setValue.weight && setValue.reps;
              
              return (
                <div key={setIdx} className={`grid grid-cols-4 gap-2 items-center p-2 rounded-xl ${isComplete ? 'bg-emerald-500/10' : ''}`}>
                  <div className="bg-slate-700 rounded-lg py-3 text-center font-bold">{setIdx + 1}</div>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder={lastSetData?.weight || "—"}
                    value={setValue.weight || ''}
                    onChange={(e) => updateSet(activeExercise, setIdx, 'weight', e.target.value)}
                    className="bg-slate-700 rounded-lg py-3 px-2 text-center focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder={lastSetData?.reps || exercise.reps?.split('-')[0] || "—"}
                    value={setValue.reps || ''}
                    onChange={(e) => updateSet(activeExercise, setIdx, 'reps', e.target.value)}
                    className="bg-slate-700 rounded-lg py-3 px-2 text-center focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <div className="text-center">
                    {isComplete ? <span className="text-emerald-400 text-2xl">✓</span> : <span className="text-slate-600 text-2xl">○</span>}
                  </div>
                </div>
              );
            })}

            {/* + / - Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => removeSet(activeExercise, displaySetCount)}
                disabled={displaySetCount <= 1}
                className={`flex-1 py-3 rounded-xl font-semibold ${
                  displaySetCount <= 1 ? 'bg-slate-800 text-slate-600' : 'bg-red-500/20 text-red-400 border border-red-500/30 active:scale-95'
                }`}
              >
                − Satz
              </button>
              <button
                onClick={() => addSet(activeExercise, displaySetCount)}
                className="flex-1 py-3 rounded-xl font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 active:scale-95"
              >
                + Satz
              </button>
            </div>

            {displaySetCount !== exercise.sets && (
              <div className="text-xs text-center text-slate-500">
                Standard: {exercise.sets} · Aktuell: {displaySetCount}
              </div>
            )}
          </div>
        </div>

        <button onClick={() => completeExercise(activeExercise)} className="w-full bg-emerald-500 text-white font-bold py-4 rounded-2xl">
          ✓ Übung fertig
        </button>
      </div>
    );
  }

  // ==================== WORKOUT ÜBERSICHT ====================
  const completedCount = Object.keys(completedExercises).length;
  const totalExercises = selectedWorkout.exercises.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={() => setSelectedWorkout(null)} className="text-slate-400">← Wechseln</button>
        <div className="text-sm text-slate-400">{completedCount}/{totalExercises} ✓</div>
      </div>

      <div className={`rounded-2xl p-4 border-2 ${WORKOUT_COLORS[selectedWorkout.color]}`}>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{selectedWorkout.icon}</span>
          <div>
            <h2 className="font-bold text-xl">{selectedWorkout.name}</h2>
            <p className="text-sm opacity-80">{selectedWorkout.subtitle}</p>
          </div>
        </div>
        <p className="text-sm mt-3 opacity-80">🎯 {selectedWorkout.focus}</p>
      </div>

      {selectedWorkout.coachingNotes && (
        <div className="bg-slate-800/50 rounded-xl p-3 space-y-1">
          {selectedWorkout.coachingNotes.map((note, idx) => (
            <div key={idx} className="text-sm text-slate-300">{note}</div>
          ))}
        </div>
      )}

      <div className="bg-slate-700 rounded-full h-3">
        <div className="bg-emerald-500 h-3 rounded-full transition-all" style={{ width: `${(completedCount / totalExercises) * 100}%` }} />
      </div>

      <div className="space-y-2">
        {selectedWorkout.exercises.map((exercise, idx) => {
          const isCompleted = completedExercises[exercise.id];
          const hasData = setData[exercise.id] && Object.keys(setData[exercise.id]).length > 0;
          const lastData = getLastWorkoutData(selectedWorkout.id, exercise.id);
          
          return (
            <button
              key={exercise.id}
              onClick={() => setActiveExercise(exercise.id)}
              className={`w-full p-4 rounded-xl border text-left ${
                isCompleted ? 'bg-emerald-500/20 border-emerald-500/50' : 
                hasData ? 'bg-amber-500/10 border-amber-500/30' : 
                'bg-slate-800 border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-700'}`}>
                  {isCompleted ? '✓' : idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{exercise.name}</div>
                  <div className="text-xs text-slate-400">{exercise.sets}×{exercise.reps} · {exercise.muscle}</div>
                  {lastData && !isCompleted && (
                    <div className="text-xs text-blue-400 mt-1">📊 {Object.values(lastData).map(d => `${d.weight}kg`).join(', ')}</div>
                  )}
                </div>
                {exercise.note && <span className="text-amber-400 text-xs bg-amber-500/20 px-2 py-1 rounded">{exercise.note}</span>}
              </div>
            </button>
          );
        })}
      </div>

      {selectedWorkout.posthab && (
        <div className="bg-purple-500/20 border border-purple-500/50 rounded-xl p-3">
          <span className="font-semibold text-purple-400">📌 POST-WORKOUT:</span>
          <span className="text-slate-300 ml-2">{PREHAB_PROTOCOLS[selectedWorkout.posthab]?.name}</span>
        </div>
      )}

      {completedCount > 0 && (
        <button
          onClick={finishWorkout}
          className={`w-full font-bold py-4 rounded-2xl ${completedCount === totalExercises ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'}`}
        >
          {completedCount === totalExercises ? '🎉 Workout abschließen!' : `💾 Speichern (${completedCount}/${totalExercises})`}
        </button>
      )}
    </div>
  );
}