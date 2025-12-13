// src/data/supplements.js
// Executive Protocol v2.0 - High-Performance Supplementation

export const SUPPLEMENT_PHASES = [
  {
    id: 'phase1',
    name: 'Hormon-Fundament',
    icon: '🌅',
    time: 'Aufstehen / Frühstück',
    timeHint: '~07:00',
    color: 'from-orange-500/20 to-amber-500/20',
    borderColor: 'border-orange-500/50',
    supplements: [
      { id: 'nac', name: 'NAC', dose: '600-1200 mg', effect: 'System-Entgiftung & Nierenschutz', note: 'Direkt nach Aufstehen' },
      { id: 'boron', name: 'Bor (Boron)', dose: '9-10 mg', effect: 'SHBG-Killer → Freies Testosteron ↑', tag: 'TESTO' },
      { id: 'b12', name: 'Vitamin B12', dose: '500-1000 µg', effect: 'Nervenschutz für den Arbeitstag' },
      { id: 'omega3', name: 'Omega 3', dose: '3-4 g', effect: 'Entzündungsschutz', note: 'Mit Fett/Essen nehmen' },
      { id: 'vitd3k2', name: 'Vitamin D3/K2', dose: '5k I.E. / 100µg', effect: 'Steroid-Basis für Hormonsynthese', tag: 'TESTO' },
    ]
  },
  {
    id: 'phase2',
    name: 'Schutzschild',
    icon: '☀️',
    time: 'Mittagessen',
    timeHint: '~12:30',
    color: 'from-yellow-500/20 to-orange-500/20',
    borderColor: 'border-yellow-500/50',
    supplements: [
      { id: 'zinc', name: 'Zink-Bisglycinat', dose: '25-50 mg', effect: 'Aromatase-Hemmer → Testo bleibt Testo', tag: 'TESTO' },
      { id: 'multi', name: 'Multivitamin', dose: '1 Portion', effect: 'Allgemeine Absicherung', note: 'Optional bei Stress' },
    ]
  },
  {
    id: 'phase3',
    name: 'The Switch',
    icon: '⚡',
    time: 'Pre-Workout',
    timeHint: '~18:30',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/50',
    trainingOnly: true,
    supplements: [
      { id: 'tyrosin', name: 'L-Tyrosin', dose: '2g (2000mg)', effect: 'Neuraler Drive ohne Koffein-Crash', tag: 'FOCUS' },
      { id: 'citrullin', name: 'Citrullin-Malat', dose: '8g', effect: 'Maximaler Pump & Nährstofftransport', tag: 'PUMP' },
      { id: 'arginin', name: 'L-Arginin', dose: '4g', effect: 'Verlängert Citrullin-Wirkung', tag: 'PUMP' },
      { id: 'salz', name: 'Salz', dose: '0,5 TL', effect: 'Sofortige Hydration & Kraft', note: 'Direkt in den Mund' },
    ]
  },
  {
    id: 'phase4',
    name: 'Repair & Refuel',
    icon: '🏆',
    time: 'Post-Workout & Dinner',
    timeHint: 'Nach Training',
    color: 'from-emerald-500/20 to-green-500/20',
    borderColor: 'border-emerald-500/50',
    subPhases: [
      {
        id: 'phase4a',
        name: 'Shake (sofort nach Gym)',
        supplements: [
          { id: 'whey', name: 'Whey Isolat', dose: '50g', effect: 'Schnelle Versorgung (angepasst an 99kg)' },
          { id: 'kreatin', name: 'Kreatin', dose: '5g', effect: 'ATP-Speicher auffüllen', note: 'Jeden Tag, Timing egal' },
        ]
      },
      {
        id: 'phase4b',
        name: 'Vor Abendessen (High Carb)',
        supplements: [
          { id: 'flohsamen', name: 'Flohsamenschalen', dose: '5-10g', effect: 'BZ-Airbag → Verhindert Insulin-Crash', note: 'Mit 500ml Wasser!', tag: 'T1D' },
          { id: 'berberin', name: 'Berberin HCL', dose: '500mg', effect: 'Drückt Carbs in Muskel, nicht Fett', tag: 'T1D' },
        ]
      }
    ]
  },
  {
    id: 'phase5',
    name: 'Cortisol Flush',
    icon: '🌙',
    time: 'Nacht',
    timeHint: '30 Min vor Schlaf',
    color: 'from-purple-500/20 to-indigo-500/20',
    borderColor: 'border-purple-500/50',
    supplements: [
      { id: 'magnesium', name: 'Magnesium', dose: '400-500 mg', effect: 'Entspannt ZNS & Muskeln', note: 'Bisglycinat-Form!' },
      { id: 'ashwagandha', name: 'Ashwagandha', dose: '300-600 mg', effect: 'Senkt Cortisol → Testosteron steigt', tag: 'TESTO', note: 'KSM-66 Extrakt' },
      { id: 'glycin', name: 'Glycin', dose: '3-5g', effect: 'Tieferer Schlaf & GH-Release', tag: 'SLEEP' },
    ]
  }
];

// Alle Supplements als flache Liste (für Stats)
export const ALL_SUPPLEMENTS = SUPPLEMENT_PHASES.flatMap(phase => {
  if (phase.subPhases) {
    return phase.subPhases.flatMap(sub => sub.supplements);
  }
  return phase.supplements;
});

export const TOTAL_SUPPLEMENTS = ALL_SUPPLEMENTS.length;

// Tags für Filter/Kategorien
export const SUPPLEMENT_TAGS = {
  'TESTO': { label: 'Testosteron', color: 'bg-amber-500/30 text-amber-300' },
  'PUMP': { label: 'Pump', color: 'bg-blue-500/30 text-blue-300' },
  'FOCUS': { label: 'Focus', color: 'bg-cyan-500/30 text-cyan-300' },
  'T1D': { label: 'Diabetes', color: 'bg-red-500/30 text-red-300' },
  'SLEEP': { label: 'Sleep', color: 'bg-purple-500/30 text-purple-300' },
};