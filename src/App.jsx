import { useState } from 'react';
import SupplementTracker from './components/SupplementTracker';
import WorkoutSelector from './components/WorkoutSelector';
import StatsView from './components/StatsView';

export default function App() {
  const [activeTab, setActiveTab] = useState('workout');
  const [todayWorkout, setTodayWorkout] = useState(null);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 p-4 sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-center">
          <span className="text-emerald-400">💪 GlucoFit</span>
        </h1>
        <p className="text-slate-400 text-sm text-center">T1D Hypertrophy Tracker</p>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto p-4 pb-24">
        {activeTab === 'workout' && (
          <WorkoutSelector onSelect={setTodayWorkout} />
        )}
        
        {activeTab === 'supplements' && (
          <SupplementTracker />
        )}
        
        {activeTab === 'stats' && (
          <StatsView />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700">
        <div className="max-w-md mx-auto flex">
          <button
            onClick={() => setActiveTab('workout')}
            className={`flex-1 py-4 text-center transition-colors ${
              activeTab === 'workout' 
                ? 'text-emerald-400 bg-slate-700/50' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="text-xl">🏋️</span>
            <p className="text-xs mt-1">Workout</p>
          </button>
          
          <button
            onClick={() => setActiveTab('supplements')}
            className={`flex-1 py-4 text-center transition-colors ${
              activeTab === 'supplements' 
                ? 'text-emerald-400 bg-slate-700/50' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="text-xl">💊</span>
            <p className="text-xs mt-1">Supplements</p>
          </button>
          
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-4 text-center transition-colors ${
              activeTab === 'stats' 
                ? 'text-emerald-400 bg-slate-700/50' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="text-xl">📊</span>
            <p className="text-xs mt-1">Stats</p>
          </button>
        </div>
      </nav>
    </div>
  );
}