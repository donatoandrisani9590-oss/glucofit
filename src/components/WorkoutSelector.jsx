import { useState } from 'react';
import { DEFAULT_WORKOUTS, WORKOUT_COLORS } from '../data/workouts';

export default function WorkoutSelector({ onSelect }) {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const handleSelect = (workout) => {
    setSelectedWorkout(workout);
    setShowDetail(true);
    if (onSelect) onSelect(workout);
  };

  const colors = selectedWorkout ? WORKOUT_COLORS[selectedWorkout.color] : null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-slate-800 rounded-2xl p-4">
        <h2 className="font-semibold mb-3">🏋️ Heutiges Workout</h2>
        
        {/* Workout Grid */}
        <div className="grid grid-cols-3 gap-2">
          {DEFAULT_WORKOUTS.map(workout => {
            const wColors = WORKOUT_COLORS[workout.color];
            const isSelected = selectedWorkout?.id === workout.id;
            
            return (
              <button
                key={workout.id}
                onClick={() => handleSelect(workout)}
                className={`
                  p-3 rounded-xl text-center transition-all duration-200
                  ${isSelected 
                    ? `${wColors.bg} border-2 ${wColors.border}` 
                    : 'bg-slate-700 hover:bg-slate-600 border-2 border-transparent'
                  }
                `}
              >
                <span className="text-2xl">{workout.icon}</span>
                <p className={`text-sm font-medium mt-1 ${isSelected ? wColors.text : ''}`}>
                  {workout.name}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Workout Detail */}
      {showDetail && selectedWorkout && (
        <div className={`bg-slate-800 rounded-2xl p-4 border-l-4 ${colors.border}`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className={`text-xl font-bold ${colors.text}`}>
                {selectedWorkout.icon} {selectedWorkout.name}
              </h3>
              <p className="text-slate-400 text-sm">{selectedWorkout.subtitle}</p>
            </div>
            <button 
              onClick={() => setShowDetail(false)}
              className="text-slate-500 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Focus */}
          {selectedWorkout.focus && (
            <p className="text-sm text-slate-300 mb-4 italic">"{selectedWorkout.focus}"</p>
          )}

          {/* Coaching Notes */}
          {selectedWorkout.coachingNotes?.length > 0 && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <h4 className="text-sm text-red-400 font-medium mb-1">⚠️ Coaching Notes</h4>
              {selectedWorkout.coachingNotes.map((note, i) => (
                <p key={i} className="text-xs text-red-300">{note}</p>
              ))}
            </div>
          )}

          {/* Warm-up */}
          {selectedWorkout.warmup?.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm text-amber-400 font-medium mb-2">🔥 Warm-up</h4>
              <div className="flex flex-wrap gap-2">
                {selectedWorkout.warmup.map((w, i) => (
                  <span key={i} className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Exercises */}
          {selectedWorkout.exercises?.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm text-slate-400 font-medium mb-2">📋 Übungen ({selectedWorkout.exercises.length})</h4>
              <div className="space-y-2">
                {selectedWorkout.exercises.filter(ex => ex.enabled).map((ex, i) => (
                  <div key={ex.id} className="flex justify-between items-center bg-slate-700/50 p-3 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{i + 1}. {ex.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{ex.note}</p>
                    </div>
                    <div className="text-right ml-3">
                      <span className={`text-sm font-mono ${colors.text}`}>
                        {ex.sets} x {ex.reps}
                      </span>
                      {ex.tempo && ex.tempo !== '-' && (
                        <p className="text-xs text-slate-500">Tempo: {ex.tempo}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rehab */}
          {selectedWorkout.rehab?.length > 0 && (
            <div>
              <h4 className="text-sm text-emerald-400 font-medium mb-2">🧘 Cooldown & Reha</h4>
              <div className="flex flex-wrap gap-2">
                {selectedWorkout.rehab.map((r, i) => (
                  <span key={i} className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}