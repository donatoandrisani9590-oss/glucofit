import { useState } from 'react';
import { DEFAULT_SUPPLEMENTS, TIMING_LABELS, RISK_COLORS } from '../data/supplements';

export default function SupplementTracker() {
  const [supplements] = useState(DEFAULT_SUPPLEMENTS);
  const [taken, setTaken] = useState({});

  const toggleTaken = (id) => {
    setTaken(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const takenCount = Object.values(taken).filter(Boolean).length;
  const totalCount = supplements.length;
  const progress = Math.round((takenCount / totalCount) * 100);

  // Gruppiere nach Timing
  const groupedByTiming = supplements.reduce((acc, supp) => {
    const timing = supp.timing;
    if (!acc[timing]) acc[timing] = [];
    acc[timing].push(supp);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {/* Progress Header */}
      <div className="bg-slate-800 rounded-2xl p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold">💊 Supplements</h2>
          <span className="text-emerald-400 font-bold">{takenCount}/{totalCount}</span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Grouped Supplements */}
      {Object.entries(groupedByTiming).map(([timing, supps]) => (
        <div key={timing} className="bg-slate-800 rounded-2xl p-4">
          <h3 className="text-sm text-slate-400 mb-3">
            {TIMING_LABELS[timing] || timing}
          </h3>
          
          <div className="space-y-2">
            {supps.map(supp => {
              const risk = RISK_COLORS[supp.t1dRisk];
              const isTaken = taken[supp.id];
              
              return (
                <div 
                  key={supp.id}
                  onClick={() => toggleTaken(supp.id)}
                  className={`
                    flex items-center justify-between p-3 rounded-xl cursor-pointer
                    transition-all duration-200
                    ${isTaken 
                      ? 'bg-emerald-500/20 border border-emerald-500/50' 
                      : 'bg-slate-700 hover:bg-slate-600'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    {/* Checkbox */}
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center
                      transition-all duration-200
                      ${isTaken 
                        ? 'bg-emerald-500 border-emerald-500' 
                        : 'border-slate-500'
                      }
                    `}>
                      {isTaken && <span className="text-white text-sm">✓</span>}
                    </div>
                    
                    {/* Info */}
                    <div>
                      <p className={`font-medium ${isTaken ? 'line-through text-slate-400' : ''}`}>
                        {supp.name}
                      </p>
                      <p className="text-sm text-slate-400">{supp.dose}</p>
                    </div>
                  </div>
                  
                  {/* Risk Badge */}
                  <span className={`text-xs px-2 py-1 rounded-full ${risk.bg} ${risk.text}`}>
                    {risk.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}