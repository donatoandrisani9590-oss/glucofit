// src/components/SupplementTracker.jsx
import React, { useState, useMemo } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import { SUPPLEMENT_PHASES, ALL_SUPPLEMENTS, SUPPLEMENT_TAGS, TOTAL_SUPPLEMENTS } from '../data/supplements';

export default function SupplementTracker() {
  const { todaySupplements, logSupplement } = useFirebase();
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [showInfo, setShowInfo] = useState(null);

  // Aktuell empfohlene Phase basierend auf Uhrzeit
  const currentPhase = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 10) return 'phase1';
    if (hour < 15) return 'phase2';
    if (hour < 20) return 'phase3';
    if (hour < 22) return 'phase4';
    return 'phase5';
  }, []);

  // Zähle erledigte Supplements pro Phase
  const getPhaseProgress = (phase) => {
    let total = 0;
    let done = 0;

    if (phase.subPhases) {
      phase.subPhases.forEach(sub => {
        sub.supplements.forEach(s => {
          total++;
          if (todaySupplements?.[s.id]) done++;
        });
      });
    } else {
      phase.supplements.forEach(s => {
        total++;
        if (todaySupplements?.[s.id]) done++;
      });
    }

    return { total, done, percent: Math.round((done / total) * 100) };
  };

  // Gesamtfortschritt
  const totalProgress = useMemo(() => {
    const done = Object.keys(todaySupplements || {}).length;
    return { done, total: TOTAL_SUPPLEMENTS, percent: Math.round((done / TOTAL_SUPPLEMENTS) * 100) };
  }, [todaySupplements]);

  const toggleSupplement = (supplementId) => {
    const current = todaySupplements?.[supplementId];
    logSupplement(supplementId, !current);
  };

  const renderSupplementItem = (supplement, phaseColor) => {
    const taken = todaySupplements?.[supplement.id];
    const tagInfo = supplement.tag ? SUPPLEMENT_TAGS[supplement.tag] : null;

    return (
      <div
        key={supplement.id}
        className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
          taken ? 'bg-emerald-500/20' : 'bg-slate-800/50'
        }`}
      >
        {/* Checkbox */}
        <button
          onClick={() => toggleSupplement(supplement.id)}
          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold transition-all ${
            taken 
              ? 'bg-emerald-500 text-white' 
              : 'bg-slate-700 border-2 border-slate-600'
          }`}
        >
          {taken && '✓'}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`font-semibold ${taken ? 'text-emerald-400' : ''}`}>
              {supplement.name}
            </span>
            {tagInfo && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${tagInfo.color}`}>
                {tagInfo.label}
              </span>
            )}
          </div>
          <div className="text-sm text-slate-400">{supplement.dose}</div>
        </div>

        {/* Info Button */}
        <button
          onClick={() => setShowInfo(showInfo === supplement.id ? null : supplement.id)}
          className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-400 hover:bg-slate-600"
        >
          ?
        </button>
      </div>
    );
  };

  const renderInfoPanel = (supplement) => {
    if (showInfo !== supplement.id) return null;
    return (
      <div className="bg-slate-700/50 rounded-lg p-3 ml-10 mb-2 text-sm">
        <div className="text-emerald-400 font-medium mb-1">💡 Wirkung:</div>
        <div className="text-slate-300 mb-2">{supplement.effect}</div>
        {supplement.note && (
          <div className="text-amber-400 text-xs">⚠️ {supplement.note}</div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">💊 Executive Protocol</h2>
        <p className="text-slate-400 text-sm">v2.0 · High-Performance Supplementation</p>
      </div>

      {/* Gesamt-Progress */}
      <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl p-4 border border-emerald-500/30">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-3xl font-bold text-emerald-400">{totalProgress.percent}%</div>
            <div className="text-sm text-slate-400">{totalProgress.done} von {totalProgress.total} Supplements</div>
          </div>
          <div className="text-5xl">
            {totalProgress.percent === 100 ? '🏆' : totalProgress.percent >= 50 ? '💪' : '🌅'}
          </div>
        </div>
        <div className="bg-slate-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${totalProgress.percent}%` }}
          />
        </div>
      </div>

      {/* Phasen */}
      <div className="space-y-3">
        {SUPPLEMENT_PHASES.map((phase) => {
          const progress = getPhaseProgress(phase);
          const isExpanded = expandedPhase === phase.id;
          const isCurrent = currentPhase === phase.id;
          const isComplete = progress.percent === 100;

          return (
            <div key={phase.id} className="space-y-2">
              {/* Phase Header */}
              <button
                onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                className={`w-full rounded-2xl p-4 border-2 transition-all ${
                  isComplete 
                    ? 'bg-emerald-500/10 border-emerald-500/50' 
                    : isCurrent 
                      ? `bg-gradient-to-r ${phase.color} ${phase.borderColor}` 
                      : 'bg-slate-800/50 border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{isComplete ? '✅' : phase.icon}</span>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{phase.name}</span>
                      {isCurrent && !isComplete && (
                        <span className="text-xs bg-amber-500 text-black px-2 py-0.5 rounded-full font-semibold animate-pulse">
                          JETZT
                        </span>
                      )}
                      {phase.trainingOnly && (
                        <span className="text-xs bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded-full">
                          Training Day
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-slate-400">{phase.time} · {phase.timeHint}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${isComplete ? 'text-emerald-400' : 'text-slate-300'}`}>
                      {progress.done}/{progress.total}
                    </div>
                    <div className="text-xs text-slate-500">{progress.percent}%</div>
                  </div>
                  <span className={`text-2xl transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>

                {/* Mini Progress Bar */}
                <div className="bg-slate-700 rounded-full h-1.5 mt-3">
                  <div 
                    className={`h-1.5 rounded-full transition-all ${isComplete ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'}`}
                    style={{ width: `${progress.percent}%` }}
                  />
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="space-y-2 ml-2 mr-2">
                  {phase.subPhases ? (
                    // Phase mit Sub-Phasen (z.B. Phase 4)
                    phase.subPhases.map((subPhase) => (
                      <div key={subPhase.id} className="space-y-2">
                        <div className="text-sm font-semibold text-slate-400 px-2 pt-2">
                          {subPhase.name}
                        </div>
                        {subPhase.supplements.map((supplement) => (
                          <React.Fragment key={supplement.id}>
                            {renderSupplementItem(supplement, phase.color)}
                            {renderInfoPanel(supplement)}
                          </React.Fragment>
                        ))}
                      </div>
                    ))
                  ) : (
                    // Normale Phase
                    phase.supplements.map((supplement) => (
                      <React.Fragment key={supplement.id}>
                        {renderSupplementItem(supplement, phase.color)}
                        {renderInfoPanel(supplement)}
                      </React.Fragment>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      {totalProgress.percent < 100 && (
        <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
          <div className="text-sm text-slate-400 mb-3">⚡ Schnell-Aktionen</div>
          <div className="flex gap-2 flex-wrap">
            {SUPPLEMENT_PHASES.map((phase) => {
              const progress = getPhaseProgress(phase);
              if (progress.percent === 100) return null;
              
              return (
                <button
                  key={phase.id}
                  onClick={() => setExpandedPhase(phase.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r ${phase.color} ${phase.borderColor} border`}
                >
                  {phase.icon} {phase.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Achievement */}
      {totalProgress.percent === 100 && (
        <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-2xl p-4 border border-amber-500/50 text-center">
          <div className="text-4xl mb-2">🏆</div>
          <div className="font-bold text-amber-400 text-lg">Protocol Complete!</div>
          <div className="text-sm text-slate-300">Alle {totalProgress.total} Supplements genommen</div>
        </div>
      )}
    </div>
  );
}