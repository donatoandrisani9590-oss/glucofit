import { useState } from 'react';
import { DEFAULT_SUPPLEMENTS, TIMING_LABELS, FREQUENCY_LABELS, RISK_COLORS } from '../data/supplements';

export default function SupplementTracker() {
  const [supplements, setSupplements] = useState(DEFAULT_SUPPLEMENTS);
  const [taken, setTaken] = useState({});
  const [showSettings, setShowSettings] = useState(null);

  const toggleTaken = (id) => {
    setTaken(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleEnabled = (id) => {
    setSupplements(prev => prev.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
  };

  const updateFrequency = (id, frequency) => {
    setSupplements(prev => prev.map(s => 
      s.id === id ? { ...s, frequency } : s
    ));
    setShowSettings(null);
  };

  const updateTiming = (id, timing) => {
    setSupplements(prev => prev.map(s => 
      s.id === id ? { ...s, timing } : s
    ));
  };

  // Nur aktivierte Supplements
  const enabledSupplements = supplements.filter(s => s.enabled);
  const disabledSupplements = supplements.filter(s => !s.enabled);
  
  // Zähler
  const takenCount = enabledSupplements.filter(s => taken[s.id]).length;
  const totalCount = enabledSupplements.length;
  const progress = totalCount > 0 ? (takenCount / totalCount) * 100 : 0;

  // Gruppierung nach Timing
  const groupedByTiming = enabledSupplements.reduce((acc, supp) => {
    const timing = supp.timing;
    if (!acc[timing]) acc[timing] = [];
    acc[timing].push(supp);
    return acc;
  }, {});

  // Sortierte Timing-Keys
  const sortedTimings = Object.keys(groupedByTiming).sort((a, b) => {
    return (TIMING_LABELS[a]?.order || 99) - (TIMING_LABELS[b]?.order || 99);
  });

  return (
    <div className="space-y-4">
      {/* Progress Header */}
      <div className="bg-slate-800 rounded-2xl p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold">💊 Supplements</h2>
          <span className="text-emerald-400 font-mono">{takenCount}/{totalCount}</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">
          {totalCount - takenCount} noch offen heute
        </p>
      </div>

      {/* Supplements by Timing */}
      {sortedTimings.map(timing => (
        <div key={timing} className="bg-slate-800 rounded-2xl p-4">
          <h3 className="text-sm text-slate-400 mb-3 flex items-center gap-2">
            <span>{TIMING_LABELS[timing]?.icon}</span>
            {TIMING_LABELS[timing]?.label || timing}
          </h3>
          
          <div className="space-y-2">
            {groupedByTiming[timing].map(supp => {
              const isTaken = taken[supp.id];
              const risk = RISK_COLORS[supp.t1dRisk];
              const freq = FREQUENCY_LABELS[supp.frequency];
              
              return (
                <div 
                  key={supp.id}
                  className={`p-3 rounded-xl transition-all duration-200 ${
                    isTaken ? 'bg-emerald-500/20 border border-emerald-500/50' : 'bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTaken(supp.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                        isTaken 
                          ? 'bg-emerald-500 border-emerald-500 text-white' 
                          : 'border-slate-500 hover:border-emerald-400'
                      }`}
                    >
                      {isTaken && <span className="text-sm">✓</span>}
                    </button>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-medium ${isTaken ? 'line-through text-slate-400' : ''}`}>
                          {supp.name}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${risk.bg} ${risk.text}`}>
                          {risk.label}
                        </span>
                        {supp.frequency !== 'daily' && (
                          <span className={`text-xs px-2 py-0.5 rounded-full bg-${freq.color}-500/20 text-${freq.color}-400`}>
                            {freq.short}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-400">{supp.dose}</p>
                      {supp.notes && (
                        <p className="text-xs text-slate-500 mt-1">{supp.notes}</p>
                      )}
                    </div>

                    {/* Settings Button */}
                    <button
                      onClick={() => setShowSettings(showSettings === supp.id ? null : supp.id)}
                      className="text-slate-500 hover:text-white p-1"
                    >
                      ⚙️
                    </button>
                  </div>

                  {/* Settings Panel */}
                  {showSettings === supp.id && (
                    <div className="mt-3 pt-3 border-t border-slate-600 space-y-3">
                      {/* Frequency */}
                      <div>
                        <p className="text-xs text-slate-400 mb-2">Frequenz:</p>
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(FREQUENCY_LABELS).map(([key, val]) => (
                            <button
                              key={key}
                              onClick={() => updateFrequency(supp.id, key)}
                              className={`text-xs px-2 py-1 rounded-full transition-all ${
                                supp.frequency === key
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                              }`}
                            >
                              {val.short}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Disable */}
                      <button
                        onClick={() => toggleEnabled(supp.id)}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        ❌ Supplement deaktivieren
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Disabled Supplements */}
      {disabledSupplements.length > 0 && (
        <div className="bg-slate-800/50 rounded-2xl p-4">
          <h3 className="text-sm text-slate-500 mb-3">😴 Deaktiviert ({disabledSupplements.length})</h3>
          <div className="space-y-2">
            {disabledSupplements.map(supp => (
              <div key={supp.id} className="flex justify-between items-center p-2 bg-slate-700/30 rounded-lg">
                <span className="text-slate-500 text-sm">{supp.name}</span>
                <button
                  onClick={() => toggleEnabled(supp.id)}
                  className="text-xs text-emerald-400 hover:text-emerald-300"
                >
                  ✓ Aktivieren
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}