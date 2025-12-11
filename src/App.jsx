import SupplementTracker from './components/SupplementTracker';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-emerald-400">
            💪 GlucoFit
          </h1>
          <p className="text-slate-400 text-sm">
            T1D Hypertrophy Tracker
          </p>
        </div>

        {/* Supplement Tracker */}
        <SupplementTracker />
      </div>
    </div>
  );
}

export default App;