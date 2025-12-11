// GlucoFit Supplement Database
// Dein persönlicher T1D-Hypertrophie Stack

export const DEFAULT_SUPPLEMENTS = [
    {
      id: 1,
      name: "Vitamin D3 + K2",
      dose: "5000 IE + 200μg",
      timing: "morning_meal",
      frequency: "daily",
      t1dRisk: "low",
      purpose: "Insulinsensitivität, Knochengesundheit",
      notes: "Mit fetthaltiger Mahlzeit"
    },
    {
      id: 2,
      name: "Omega-3 (EPA/DHA)",
      dose: "3g",
      timing: "morning_meal",
      frequency: "daily",
      t1dRisk: "low",
      purpose: "Entzündungshemmung, Herzgesundheit",
      notes: "Hochdosiert für Anti-Inflammation"
    },
    {
      id: 3,
      name: "Magnesium Bisglycinat",
      dose: "400mg",
      timing: "before_bed",
      frequency: "daily",
      t1dRisk: "low",
      purpose: "Schlaf, Muskelregeneration, Insulinsensitivität",
      notes: "Abends für besseren Schlaf"
    },
    {
      id: 4,
      name: "Zink Picolinat",
      dose: "25mg",
      timing: "before_bed",
      frequency: "daily",
      t1dRisk: "low",
      purpose: "Testosteron, Immunsystem, Wundheilung",
      notes: "Nicht mit Kaffee kombinieren"
    },
    {
      id: 5,
      name: "Kreatin Monohydrat",
      dose: "5g",
      timing: "post_workout",
      frequency: "daily",
      t1dRisk: "low",
      purpose: "Kraft, Zellvolumen, GLUT4-Translokation",
      notes: "An Ruhetagen: morgens"
    },
    {
      id: 6,
      name: "Alpha-Liponsäure (ALA)",
      dose: "600mg",
      timing: "pre_workout",
      frequency: "daily",
      t1dRisk: "medium",
      purpose: "Insulinsensitivität, Neuropathie-Prävention",
      notes: "⚠️ Kann BZ senken - Monitor!"
    },
    {
      id: 7,
      name: "Kollagen + Vitamin C",
      dose: "15g + 50mg",
      timing: "pre_workout_60min",
      frequency: "daily",
      t1dRisk: "low",
      purpose: "Sehnenregeneration, Gelenke",
      notes: "60 Min vor Training für Sehnen-Synthese"
    },
    {
      id: 8,
      name: "Ashwagandha KSM-66",
      dose: "300mg",
      timing: "post_workout",
      frequency: "daily",
      t1dRisk: "medium",
      purpose: "Cortisol-Reduktion, Testosteron",
      notes: "⚠️ Kann BZ senken - 2-3h monitoren!"
    },
    {
      id: 9,
      name: "Berberin",
      dose: "500mg",
      timing: "evening_meal",
      frequency: "daily",
      t1dRisk: "high",
      purpose: "AMPK-Aktivierung, Glukose-Partitionierung",
      notes: "⚠️ NICHT post-workout (hemmt mTOR)!"
    },
    {
      id: 10,
      name: "Glycin",
      dose: "3g",
      timing: "before_bed",
      frequency: "daily",
      t1dRisk: "low",
      purpose: "Schlafqualität, Kollagen-Baustein",
      notes: "Verbessert Tiefschlaf"
    },
    {
      id: 11,
      name: "Vitamin B-Komplex",
      dose: "1 Kapsel",
      timing: "morning_meal",
      frequency: "daily",
      t1dRisk: "low",
      purpose: "Energiestoffwechsel, Nervenfunktion",
      notes: "Morgens wegen Energie-Boost"
    },
    {
      id: 12,
      name: "Coenzym Q10",
      dose: "100mg",
      timing: "morning_meal",
      frequency: "daily",
      t1dRisk: "low",
      purpose: "Mitochondrien, Herzgesundheit",
      notes: "Mit Fett für bessere Absorption"
    },
    {
      id: 13,
      name: "Chromium (Prozis)",
      dose: "200μg",
      timing: "with_carbs",
      frequency: "every_3_days",
      t1dRisk: "medium",
      purpose: "Insulinrezeptor-Sensitivität",
      notes: "⚠️ Alle 3 Tage, zu KH-reicher Mahlzeit"
    }
  ];
  
  // Timing Labels für die UI
  export const TIMING_LABELS = {
    wakeup: "Direkt nach dem Aufstehen",
    morning_meal: "Zum Frühstück",
    pre_workout_60min: "60 Min vor Training",
    pre_workout: "30 Min vor Training",
    intra_workout: "Während Training",
    post_workout: "Nach dem Training",
    with_carbs: "Zu KH-reicher Mahlzeit",
    evening_meal: "Zum Abendessen",
    before_bed: "Vor dem Schlafengehen"
  };
  
  // Frequenz Labels
  export const FREQUENCY_LABELS = {
    daily: "Täglich",
    every_2_days: "Alle 2 Tage",
    every_3_days: "Alle 3 Tage",
    training_days: "Nur Trainingstage",
    weekly: "1x pro Woche"
  };
  
  // Risiko-Farben für T1D
  export const RISK_COLORS = {
    low: { bg: "bg-emerald-500/20", text: "text-emerald-400", label: "Sicher" },
    medium: { bg: "bg-amber-500/20", text: "text-amber-400", label: "BZ Monitor" },
    high: { bg: "bg-red-500/20", text: "text-red-400", label: "Vorsicht!" }
  };