// GlucoFit Elite 5-Day Plan - Vollständig anpassbar
// Basierend auf: T1D, Infraspinatus-Reha, Schwachstelle Brust

export const DEFAULT_WORKOUTS = [
    {
      id: 'push_heavy',
      name: 'Push A',
      subtitle: 'Heavy Chest & Trizeps',
      icon: '🏋️',
      color: 'emerald',
      day: 1,
      focus: 'Kraftaufbau & Mechanische Zerstörung der Brustfasern',
      warmup: ['Band Pull-Aparts 3x20', 'Rotatorenmanschette', 'Schulterkreisen'],
      exercises: [
        { id: 'ex1', name: 'Hammer Strength ISO Bench', sets: '4', reps: '6-8', tempo: '3-0-1-0', note: 'TOP SET schwer. Stopp vor Brust. Letzter Satz Dropset', enabled: true },
        { id: 'ex2', name: 'Hammer Strength MTS Incline', sets: '3', reps: '8-10', tempo: '3-0-1-1', note: 'Ellbogen 45° (Tuck). Explosiv hoch', enabled: true },
        { id: 'ex3', name: 'Life Fitness Pec Fly', sets: '3', reps: '12-15', tempo: '2-0-1-2', note: 'Iso-Hold: Vorne 2 Sek. halten. Dehnung begrenzen!', enabled: true },
        { id: 'ex4', name: 'Panatta Multi Flight', sets: '4', reps: '12-15', tempo: '2-0-1-0', note: 'Scaption: Daumen hoch. Ellbogen vor Körper', enabled: true },
        { id: 'ex5', name: 'Trizeps Pushdowns', sets: '3', reps: '10-12', tempo: '2-0-1-0', note: 'Ellbogen eng am Rippenbogen fixieren', enabled: true },
        { id: 'ex6', name: 'Overhead Cable Extension', sets: '3', reps: '12-15', tempo: '2-1-1-0', note: 'Sitzend (Bank 90°). Langsamer Stretch', enabled: true },
      ],
      rehab: ['Türrahmen-Stretch 2x60s', 'BWS-Rotation'],
      coachingNotes: [
        'Schulter-Schutz: Ellbogen stoppen 2-3 cm vor voller Dehnung',
        'Kein Lockout nach hinten bei Hammer Strength'
      ]
    },
    {
      id: 'pull_density',
      name: 'Pull A',
      subtitle: 'Rücken Dichte & Bizeps',
      icon: '🦬',
      color: 'blue',
      day: 2,
      focus: 'Rückendichte stabilisiert die Schulter',
      warmup: ['Dead Hang 30-45s', 'Scapula Pull-ups', 'Band Pull-Aparts'],
      exercises: [
        { id: 'ex1', name: 'Panatta Super Power Row', sets: '4', reps: '6-8', tempo: 'X-0-1-0', note: 'Sitzend: Brust fest ans Polster. Explosiv ziehen!', enabled: true },
        { id: 'ex2', name: 'Hammer Strength MTS Row', sets: '3', reps: '10-12', tempo: '3-0-1-1', note: 'Unilateral/Einarmig. Fokus auf Lat-Squeeze unten', enabled: true },
        { id: 'ex3', name: 'Panatta Super High Row', sets: '3', reps: '10-12', tempo: '3-1-1-1', note: 'Beidarmig. Oben kurz halten', enabled: true },
        { id: 'ex4', name: 'Reverse Butterfly (Maschine)', sets: '4', reps: '15-20', tempo: '2-0-1-1', note: 'REHA-Pflicht: Brennen lassen für Infraspinatus', enabled: true },
        { id: 'ex5', name: 'SZ-Curls (Stehend)', sets: '4', reps: '8-10', tempo: '3-0-1-0', note: 'Rücken an Wand/Säule lehnen. Kein Schwung', enabled: true },
      ],
      rehab: ['Face Pulls 3x20', 'Couch Stretch'],
      coachingNotes: [
        'Reverse Butterfly ist PFLICHT für Infraspinatus-Reha',
        'Ersatz für Langhantel-Rudern (Schulter-Schutz)'
      ]
    },
    {
      id: 'legs',
      name: 'Legs',
      subtitle: 'Hamstring Pre-Exhaust & Quads',
      icon: '🦵',
      color: 'purple',
      day: 3,
      focus: 'Hamstring-Vorermüdung & Quadrizeps-Masse',
      warmup: ['Couch Stretch 2 Min/Seite', 'Glute Bridges 2x20', '90/90 Hüft-Mobilität'],
      exercises: [
        { id: 'ex1', name: 'Life Fitness Leg Curl', sets: '4', reps: '12-15', tempo: '3-0-1-0', note: 'VORERMÜDUNG: Zuerst! Wärmt Knie auf', enabled: true },
        { id: 'ex2', name: 'Panatta Smith Squats', sets: '4', reps: '8-10', tempo: '3-1-X-0', note: 'Main Lift: Füße etwas weiter vor. Tiefe kontrollieren', enabled: true },
        { id: 'ex3', name: 'RDL (Kurzhanteln)', sets: '3', reps: '10-12', tempo: '3-0-1-0', note: 'Po weit nach hinten. Fokus: Dehnung Hamstrings', enabled: true },
        { id: 'ex4', name: 'Walking Lunges', sets: '3', reps: '20 Schritte', tempo: '2-0-1-0', note: 'Stabilisation: Kurzhanteln. Lange Schritte', enabled: true },
        { id: 'ex5', name: 'Life Fitness Leg Extension', sets: '3', reps: '15-20', tempo: '2-0-1-2', note: 'Finisher: Oben 2 Sek. halten (Squeeze)', enabled: true },
        { id: 'ex6', name: 'Wadenheben', sets: '4', reps: '10-12', tempo: '2-1-1-1', note: '1 Sekunde Pause in der Dehnung unten', enabled: true },
      ],
      rehab: ['Nerve Flossing Ischias', 'Waden Dehnen an Wand'],
      coachingNotes: [
        '⚠️ HYPO-GEFAHR: Höchste Insulinsensitivität!',
        'Leg Curl IMMER zuerst für Knie-Aufwärmung'
      ]
    },
    {
      id: 'upper_chest',
      name: 'Upper Chest',
      subtitle: 'Schwachstelle & Delts',
      icon: '💪',
      color: 'amber',
      day: 4,
      focus: 'Metabolische Vorermüdung für die Brust (Schulter schonen)',
      warmup: ['Band Dislocates', 'Arm Kreisen', 'Leichte Flys'],
      exercises: [
        { id: 'ex1', name: 'Cable Flys (Low-to-High)', sets: '3', reps: '15-20', tempo: '2-0-1-1', note: 'PRE-EXHAUST: Von unten vor das Gesicht. Pumpt Brust voll', enabled: true },
        { id: 'ex2', name: 'Hammer Strength MTS Incline', sets: '4', reps: '10-12', tempo: '3-0-1-0', note: 'Volumen: Weniger Gewicht durch Vorermüdung -> Gelenkschonend', enabled: true },
        { id: 'ex3', name: 'Panatta Multi Flight', sets: '5', reps: '15-20', tempo: '2-0-1-0', note: 'Volumen: 5 Sätze! Kurze Pause (60s). Für V-Taper', enabled: true },
        { id: 'ex4', name: 'Cable Front Raise (Seil)', sets: '3', reps: '12-15', tempo: '2-0-1-1', note: 'Seil durch die Beine ziehen. Isoliert vordere Schulter', enabled: true },
        { id: 'ex5', name: 'Floor Skullcrushers', sets: '4', reps: '12-15', tempo: '3-0-1-0', note: 'Dead Stop: Hanteln berühren sanft den Boden', enabled: true },
      ],
      rehab: ['Türrahmen-Stretch', 'Unterarm Dehnen'],
      coachingNotes: [
        'Pre-Exhaust = weniger Gewicht nötig = Schulter-Schutz',
        'Multi Flight: 5 Sätze für V-Taper!'
      ]
    },
    {
      id: 'arms_lats',
      name: 'Arms & Lats',
      subtitle: 'Pump Day & Lat Width',
      icon: '💥',
      color: 'cyan',
      day: 5,
      focus: '3D-Look, Vaskularität & Lat-Breite. Kein Maximalkraft-Tag!',
      warmup: ['Arm Kreisen', 'Leichte Curls', 'Trizeps Stretch'],
      exercises: [
        { id: 'ex1', name: 'Panatta High Row (1-armig)', sets: '4', reps: '12-15', tempo: '3-1-1-1', note: 'Lat-Stretch: Oberkörper eindrehen. Mach dich lang', enabled: true },
        { id: 'ex2', name: 'Lat Pulldown (Neutral)', sets: '3', reps: '10-12', tempo: '3-0-1-1', note: 'Sauberer Zug zur Brust. Ellbogen führen', enabled: true },
        { id: 'ex3', name: 'Spider Curls (Bank)', sets: '4', reps: '10-12', tempo: '3-0-1-2', note: 'Peak Squeeze: Brust auf Lehne. Oben 2 Sek. halten', enabled: true },
        { id: 'ex4', name: 'Triceps Pushdown (1-armig)', sets: '4', reps: '12-15', tempo: '2-0-1-0', note: 'Ohne Griff (Kabel). Nur Pump, kein schweres Drücken!', enabled: true },
        { id: 'ex5', name: 'Cross-Body Hammer Curls', sets: '3', reps: '10-12', tempo: '2-0-1-0', note: 'Quer vor den Körper ziehen (Brachialis)', enabled: true },
        { id: 'ex6', name: 'Cable Crunches', sets: '4', reps: '15-20', tempo: '2-1-1-0', note: 'Kniend. Schwer! Einrollen, nicht reißen', enabled: true },
      ],
      rehab: ['Bizeps Stretch', 'Trizeps Stretch', 'Lat Stretch'],
      coachingNotes: [
        '⚠️ HYPO-GEFAHR: Supersätze erhöhen Insulinsensitivität',
        'Pump Day = kein Ego-Lifting!'
      ]
    },
    {
      id: 'rest',
      name: 'Rest',
      subtitle: 'Aktive Regeneration',
      icon: '😴',
      color: 'slate',
      day: 0,
      focus: 'Regeneration & Insulinsensitivität',
      warmup: [],
      exercises: [
        { id: 'ex1', name: 'Spaziergang (Zone 2)', sets: '1', reps: '30-45 Min', tempo: '-', note: 'Puls 100-120. Fördert Regeneration', enabled: true },
        { id: 'ex2', name: 'Mobility Flow', sets: '1', reps: '15-20 Min', tempo: '-', note: 'Hüfte, Schulter, BWS', enabled: true },
        { id: 'ex3', name: 'Foam Rolling', sets: '1', reps: '10 Min', tempo: '-', note: 'Fokus: Verspannte Bereiche', enabled: true },
      ],
      rehab: ['Couch Stretch', 'Dead Hang', 'Waden Dehnen'],
      coachingNotes: [
        'Muscle Sponge: Nach 5 Tagen Training Basalrate evtl. -10% senken',
        'Schlaf priorisieren!'
      ]
    }
  ];
  
  // Workout Farben für UI
  export const WORKOUT_COLORS = {
    emerald: { bg: 'bg-emerald-500/20', border: 'border-emerald-500', text: 'text-emerald-400' },
    blue: { bg: 'bg-blue-500/20', border: 'border-blue-500', text: 'text-blue-400' },
    purple: { bg: 'bg-purple-500/20', border: 'border-purple-500', text: 'text-purple-400' },
    amber: { bg: 'bg-amber-500/20', border: 'border-amber-500', text: 'text-amber-400' },
    cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-500', text: 'text-cyan-400' },
    slate: { bg: 'bg-slate-500/20', border: 'border-slate-500', text: 'text-slate-400' },
  };
  
  // Timing Labels für Supplements
  export const TIMING_OPTIONS = [
    { id: 'wakeup', label: 'Direkt nach dem Aufstehen', icon: '🌅' },
    { id: 'morning_meal', label: 'Zum Frühstück', icon: '🍳' },
    { id: 'pre_workout_60', label: '60 Min vor Training', icon: '⏰' },
    { id: 'pre_workout_30', label: '30 Min vor Training', icon: '🔥' },
    { id: 'intra_workout', label: 'Während Training', icon: '💪' },
    { id: 'post_workout', label: 'Nach dem Training', icon: '✅' },
    { id: 'evening_meal', label: 'Zum Abendessen', icon: '🍽️' },
    { id: 'before_bed', label: 'Vor dem Schlafengehen', icon: '🌙' },
  ];
  
  // Frequenz-Optionen
  export const FREQUENCY_OPTIONS = [
    { id: 'daily', label: 'Täglich', short: 'Tägl.' },
    { id: 'training_days', label: 'Nur Trainingstage', short: 'Train.' },
    { id: 'every_2_days', label: 'Alle 2 Tage', short: '2d' },
    { id: 'every_3_days', label: 'Alle 3 Tage', short: '3d' },
    { id: 'weekly', label: '1x pro Woche', short: '1x/Wo' },
  ];
  
  // Tempo Erklärung
  export const TEMPO_GUIDE = {
    description: 'Tempo: Exzentrisch-Pause unten-Konzentrisch-Pause oben',
    example: '3-0-1-0 = 3 Sek. ablassen, keine Pause, 1 Sek. heben, keine Pause',
    explosive: 'X = Explosiv'
  };