import { useState } from 'react';

export default function StatsView({ workoutHistory = [], supplementHistory = [] }) {
  const [activeTab, setActiveTab] = useState('week');

  // Mock-Daten für Demo (später durch echte Daten ersetzen)
  const weekData = {
    workouts: 4,
    workoutGoal: 5,
    supplements: 89,
    supplementGoal: 100,
    streak: 12,
    bestStreak: 18,
  };

  const muscleRecovery = [
    { name: 'Brust', lastTrained: 1, status: 'recovering', color: 'amber' },
    { name: 'Rücken', lastTrained: 2, status: 'ready', color: 'emerald' },
    { name: 'Beine', lastTrained: 3, status: 'ready', color: 'emerald' },
    { name: 'Schultern', lastTrained: 1, status: 'recovering', color: 'amber' },
    { name: 'Arme', lastTrained: 4, status: 'ready', color: 'emerald' },
  ];

  const recentWorkouts = [
    { day: 'Mo', type: 'Push A', completed: true },
    { day: 'Di', type: 'Pull A', completed: true },
    { day: 'Mi', type: 'Legs', completed: true },
    { day: 'Do', type: 'Upper Chest', completed: true },
    { day: 'Fr', type: 'Arms & Lats', completed: false },
    { day: 'Sa', type: 'Rest', completed: false },
    { day: 'So', type: '-', completed: false },
  ];

  return (
    <div className="space-y-4">
      {/* Weekly Overview */}
      <div className="bg-slate-800 rounded-2xl p-4">
        <h2 className="font-semibold mb-4">📊 Diese Woche</h2>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Workouts */}
          <div className="bg-slate-700/50 rounded-xl p-3">
            <p className="text-xs text-slate-400">Workouts</p>
            <p className="text-2xl font-bold text-emerald-400">
              {weekData.workouts}<span className="text-slate-500 text-lg">/{weekData.workoutGoal}</span>
            </p>
            <div className="h-1.5 bg-slate-600 rounded-full mt-2">
              <div 
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${(weekData.workouts / weekData.workoutGoal) * 100}%` }}
              />
            </div>
          </div>

          {/* Supplements */}
          <div className="bg-slate-700/50 rounded-xl p-3">
            <p className="text-xs text-slate-400">Supplements</p>
            <p className="text-2xl font-bold text-blue-400">
              {weekData.supplements}<span className="text-slate-500 text-lg">%</span>
            </p>
            <div className="h-1.5 bg-slate-600 rounded-full mt-2">
              <div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${weekData.supplements}%` }}
              />
            </div>
          </div>

          {/* Streak */}
          <div className="bg-slate-700/50 rounded-xl p-3">
            <p className="text-xs text-slate-400">🔥 Streak</p>
            <p className="text-2xl font-bold text-amber-400">{weekData.streak} Tage</p>
            <p className="text-xs text-slate-500">Best: {weekData.bestStreak}</p>
          </div>

          {/* Next Workout */}
          <div className="bg-slate-700/50 rounded-xl p-3">
            <p className="text-xs text-slate-400">Nächstes</p>
            <p className="text-lg font-bold text-purple-400">Arms & Lats</p>
            <p className="text-xs text-slate-500">Tag 5 von 5</p>
          </div>
        </div>
      </div>

      {/* Week Calendar */}
      <div className="bg-slate-800 rounded-2xl p-4">
        <h3 className="font-semibold mb-3">📅 Wochenübersicht</h3>
        <div className="flex justify-between">
          {recentWorkouts.map((day, i) => (
            <div key={i} className="text-center">
              <p className="text-xs text-slate-500 mb-1">{day.day}</p>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                day.completed 
                  ? 'bg-emerald-500/20 border-2 border-emerald-500' 
                  : 'bg-slate-700 border-2 border-slate-600'
              }`}>
                {day.completed ? '✓' : day.type === 'Rest' ? '😴' : '·'}
              </div>
              <p className="text-xs text-slate-400 mt-1 truncate w-10">{day.type.split(' ')[0]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Muscle Recovery */}
      <div className="bg-slate-800 rounded-2xl p-4">
        <h3 className="font-semibold mb-3">💪 Muskel-Recovery</h3>
        <div className="space-y-2">
          {muscleRecovery.map((muscle, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-sm">{muscle.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">vor {muscle.lastTrained}d</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  muscle.status === 'ready' 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {muscle.status === 'ready' ? '✓ Ready' : '⏳ 48h'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* T1D Quick Stats */}
      <div className="bg-slate-800 rounded-2xl p-4 border-l-4 border-red-500">
        <h3 className="font-semibold mb-3 text-red-400">🩸 T1D Tracking</h3>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-xs text-slate-400">Hypos diese Woche</p>
            <p className="text-xl font-bold text-emerald-400">1</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Ø BZ Training</p>
            <p className="text-xl font-bold text-blue-400">142</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Time in Range</p>
            <p className="text-xl font-bold text-purple-400">78%</p>
          </div>
        </div>
      </div>
    </div>
  );
}