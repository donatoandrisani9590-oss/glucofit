// src/App.jsx
import { useState } from 'react';
import { FirebaseProvider, useFirebase } from './context/FirebaseContext';
import Login from './components/Login';
import WorkoutSelector from './components/WorkoutSelector';
import SupplementTracker from './components/SupplementTracker';
import StatsView from './components/StatsView';
import { logOut } from './firebase/auth';

function AppContent() {
  const { user, userId, loading } = useFirebase();
  const [activeTab, setActiveTab] = useState('workout');

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">💪</div>
          <p className="text-slate-400">Laden...</p>
        </div>
      </div>
    );
  }

  if (!userId) {
    return <Login onSuccess={() => {}} />;
  }

  const handleLogout = async () => {
    await logOut();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-800 z-10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold">💪 GlucoFit</h1>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-white text-sm bg-slate-800 px-3 py-1 rounded-lg"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-4">
        {activeTab === 'workout' && <WorkoutSelector />}
        {activeTab === 'supplements' && <SupplementTracker />}
        {activeTab === 'stats' && <StatsView />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700">
        <div className="max-w-md mx-auto flex">
          <button
            onClick={() => setActiveTab('workout')}
            className={`flex-1 py-4 text-center ${
              activeTab === 'workout' 
                ? 'text-emerald-400 bg-slate-700/50' 
                : 'text-slate-400'
            }`}
          >
            <span className="text-xl">🏋️</span>
            <span className="block text-xs mt-1">Workout</span>
          </button>
          <button
            onClick={() => setActiveTab('supplements')}
            className={`flex-1 py-4 text-center ${
              activeTab === 'supplements' 
                ? 'text-emerald-400 bg-slate-700/50' 
                : 'text-slate-400'
            }`}
          >
            <span className="text-xl">💊</span>
            <span className="block text-xs mt-1">Supplements</span>
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-4 text-center ${
              activeTab === 'stats' 
                ? 'text-emerald-400 bg-slate-700/50' 
                : 'text-slate-400'
            }`}
          >
            <span className="text-xl">📊</span>
            <span className="block text-xs mt-1">Stats</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <FirebaseProvider>
      <AppContent />
    </FirebaseProvider>
  );
}