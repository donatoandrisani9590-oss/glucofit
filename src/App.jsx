function App() {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-6">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-emerald-400">
              💪 GlucoFit
            </h1>
            <p className="text-slate-400 mt-2">
              T1D Hypertrophy Tracker
            </p>
          </div>
  
          {/* Status Card */}
          <div className="bg-slate-800 rounded-2xl p-6 mb-4">
            <h2 className="text-lg font-semibold mb-4">Heute</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-emerald-400">Push A</p>
                <p className="text-slate-400 text-sm">Workout</p>
              </div>
              <div className="bg-slate-700 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-amber-400">8/13</p>
                <p className="text-slate-400 text-sm">Supplements</p>
              </div>
            </div>
          </div>
  
          {/* Footer */}
          <p className="text-center text-slate-500 text-sm">
            Setup erfolgreich! 🎉
          </p>
        </div>
      </div>
    )
  }
  
  export default App