// GlucoFit Elite Supplement Protocol - Vollständig anpassbar
// Basierend auf: T1D, Recomp, Testosteron-Optimierung

export const DEFAULT_SUPPLEMENTS = [
  // === MORGENS ===
  {
    id: 'vitd3k2',
    name: 'Vitamin D3 + K2',
    dose: '5000 IE + 200μg',
    timing: 'morning_meal',
    frequency: 'daily',
    enabled: true,
    t1dRisk: 'low',
    purpose: 'Knochen, Immunsystem, Testosteron',
    notes: 'Mit fetthaltiger Mahlzeit für bessere Absorption',
    customizable: { dose: true, timing: true, frequency: true }
  },
  {
    id: 'omega3',
    name: 'Omega-3 (EPA/DHA)',
    dose: '3g',
    timing: 'morning_meal',
    frequency: 'daily',
    enabled: true,
    t1dRisk: 'low',
    purpose: 'Entzündungshemmung, Herzgesundheit',
    notes: 'Morgens mit Fett-Frühstück für Testosteron-Basis',
    customizable: { dose: true, timing: true, frequency: true }
  },
  {
    id: 'bcomplex',
    name: 'Vitamin B-Komplex',
    dose: '1 Kapsel',
    timing: 'morning_meal',
    frequency: 'daily',
    enabled: true,
    t1dRisk: 'low',
    purpose: 'Energie, Nervensystem',
    notes: 'Nicht abends (kann Schlaf stören)',
    customizable: { dose: false, timing: true, frequency: true }
  },
  {
    id: 'coq10',
    name: 'Coenzym Q10',
    dose: '100mg',
    timing: 'morning_meal',
    frequency: 'daily',
    enabled: true,
    t1dRisk: 'low',
    purpose: 'Zellenergie, Herzfunktion',
    notes: 'Mit Fett einnehmen',
    customizable: { dose: true, timing: true, frequency: true }
  },

  // === PRE-WORKOUT ===
  {
    id: 'tyrosin',
    name: 'L-Tyrosin',
    dose: '1.5-2g',
    timing: 'pre_workout_60',
    frequency: 'training_days',
    enabled: true,
    t1dRisk: 'low',
    purpose: 'Fokus, Dopamin, Motivation',
    notes: 'Ca. 18:30 Uhr (60 Min vor Training)',
    customizable: { dose: true, timing: true, frequency: true }
  },
  {
    id: 'citrullin',
    name: 'Citrullin Malat',
    dose: '6-8g',
    timing: 'pre_workout_30',
    frequency: 'training_days',
    enabled: true,
    t1dRisk: 'low',
    purpose: 'Pump, NO-Booster, Ausdauer',
    notes: '30 Min vor Training',
    customizable: { dose: true, timing: true, frequency: true }
  },
  {
    id: 'kollagen',
    name: 'Kollagen + Vitamin C',
    dose: '15g + 50mg',
    timing: 'pre_workout_60',
    frequency: 'daily',
    enabled: true,
    t1dRisk: 'low',
    purpose: 'Sehnen, Gelenke, Haut (Infraspinatus-Reha!)',
    notes: '45-60 Min vor Training für maximale Sehnen-Synthese',
    customizable: { dose: true, timing: true, frequency: true }
  },
  {
    id: 'ala',
    name: 'Alpha-Liponsäure (ALA)',
    dose: '600mg',
    timing: 'pre_workout_30',
    frequency: 'daily',
    enabled: true,
    t1dRisk: 'medium',
    purpose: 'Insulinsensitivität, Antioxidans',
    notes: '⚠️ BZ-Monitor! Kann Insulinwirkung verstärken',
    customizable: { dose: true, timing: true, frequency: true }
  },

  // === INTRA-WORKOUT ===
  {
    id: 'intra',
    name: 'Intra-Workout Drink',
    dose: '1L Wasser + Salz',
    timing: 'intra_workout',
    frequency: 'training_days',
    enabled: true,
    t1dRisk: 'low',
    purpose: 'Hydration, Pump, Krämpfe verhindern',
    notes: 'Optional: + Glycerin für extremen Pump',
    customizable: { dose: true, timing: false, frequency: true }
  },

  // === POST-WORKOUT ===
  {
    id: 'kreatin',
    name: 'Kreatin Monohydrat',
    dose: '5g',
    timing: 'post_workout',
    frequency: 'daily',
    enabled: true,
    t1dRisk: 'low',
    purpose: 'Kraft, Zellvolumen, Regeneration',
    notes: 'Timing egal, Konsistenz wichtiger',
    customizable: { dose: true, timing: true, frequency: true }
  },
  {
    id: 'ashwagandha',
    name: 'Ashwagandha KSM-66',
    dose: '300mg',
    timing: 'post_workout',
    frequency: 'daily',
    enabled: true,
    t1dRisk: 'medium',
    purpose: 'Cortisol-Senkung, Testosteron, Regeneration',
    notes: '⚠️ BZ-Monitor 2-3h! Kann Hypo verstärken',
    customizable: { dose: true, timing: true, frequency: true }
  },

  // === ABENDS ===
  {
    id: 'berberin',
    name: 'Berberin',
    dose: '500mg',
    timing: 'evening_meal',
    frequency: 'daily',
    enabled: true,
    t1dRisk: 'high',
    purpose: 'Blutzucker, Insulinsensitivität',
    notes: '🚨 NICHT Post-Workout! Hemmt mTOR. Nur zum Abendessen',
    customizable: { dose: true, timing: false, frequency: true }
  },

  // === VOR DEM SCHLAFENGEHEN ===
  {
    id: 'magnesium',
    name: 'Magnesium Bisglycinat',
    dose: '400mg',
    timing: 'before_bed',
    frequency: 'daily',
    enabled: true,
    t1dRisk: 'low',
    purpose: 'Schlaf, Muskelentspannung, Regeneration',
    notes: 'Beste Form für Schlaf und Bioverfügbarkeit',
    customizable: { dose: true, timing: true, frequency: true }
  },
  {
    id: 'zink',
    name: 'Zink Picolinat',
    dose: '25mg',
    timing: 'before_bed',
    frequency: 'daily',
    enabled: true,
    t1dRisk: 'low',
    purpose: 'Testosteron, Immunsystem, Wundheilung',
    notes: 'Nicht mit Kaffee/Milchprodukten kombinieren',
    customizable: { dose: true, timing: true, frequency: true }
  },
  {
    id: 'glycin',
    name: 'Glycin',
    dose: '3-5g',
    timing: 'before_bed',
    frequency: 'daily',
    enabled: true,
    t1dRisk: 'low',
    purpose: 'Schlaf, Sehnen/Kollagen, Cortisol-Senkung',
    notes: 'Post-Workout (21:00) oder vor dem Schlafen',
    customizable: { dose: true, timing: true, frequency: true }
  },
  {
    id: 'chromium',
    name: 'Chromium (Prozis)',
    dose: '200μg',
    timing: 'evening_meal',
    frequency: 'every_3_days',
    enabled: true,
    t1dRisk: 'medium',
    purpose: 'Insulinsensitivität, Blutzucker-Stabilisierung',
    notes: '⚠️ Alle 3 Tage! Mit kohlenhydratreicher Mahlzeit',
    customizable: { dose: true, timing: true, frequency: true }
  },
];

// Timing Labels
export const TIMING_LABELS = {
  wakeup: { label: 'Direkt nach dem Aufstehen', icon: '🌅', order: 1 },
  morning_meal: { label: 'Zum Frühstück', icon: '🍳', order: 2 },
  pre_workout_60: { label: '60 Min vor Training', icon: '⏰', order: 3 },
  pre_workout_30: { label: '30 Min vor Training', icon: '🔥', order: 4 },
  intra_workout: { label: 'Während Training', icon: '💪', order: 5 },
  post_workout: { label: 'Nach dem Training', icon: '✅', order: 6 },
  evening_meal: { label: 'Zum Abendessen', icon: '🍽️', order: 7 },
  before_bed: { label: 'Vor dem Schlafengehen', icon: '🌙', order: 8 },
};

// Frequenz Labels
export const FREQUENCY_LABELS = {
  daily: { label: 'Täglich', short: 'Tägl.', color: 'emerald' },
  training_days: { label: 'Nur Trainingstage', short: 'Train.', color: 'blue' },
  every_2_days: { label: 'Alle 2 Tage', short: '2d', color: 'amber' },
  every_3_days: { label: 'Alle 3 Tage', short: '3d', color: 'purple' },
  weekly: { label: '1x pro Woche', short: '1x/Wo', color: 'slate' },
};

// Risiko-Farben für T1D
export const RISK_COLORS = {
  low: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Sicher' },
  medium: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'BZ Monitor' },
  high: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Vorsicht!' },
};

// Kategorien für Filterung
export const SUPPLEMENT_CATEGORIES = [
  { id: 'all', label: 'Alle', icon: '📋' },
  { id: 'vitamine', label: 'Vitamine', icon: '💊' },
  { id: 'minerale', label: 'Minerale', icon: '�ite' },
  { id: 'performance', label: 'Performance', icon: '🏋️' },
  { id: 'schlaf', label: 'Schlaf & Regeneration', icon: '😴' },
  { id: 't1d', label: 'T1D-Spezifisch', icon: '🩸' },
];