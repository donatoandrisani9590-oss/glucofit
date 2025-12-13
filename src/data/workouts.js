// src/data/workouts.js
// GlucoFit Elite 2.0 - Medical Performance Split

export const PREHAB_PROTOCOLS = {
  shoulder_lock: {
    name: "Shoulder-Lock Protokoll",
    goal: "Humeruskopf zentrieren, Impingement vermeiden",
    exercises: [
      {
        name: "Side-Lying External Rotation",
        muscle: "Infraspinatus & Teres Minor",
        execution: "Seitenlage. Handtuch zwischen Ellbogen und Rippen. Unterarm rotiert nach oben.",
        sets: 2,
        reps: "12-15",
        note: "Kein Versagen, nur Aktivierung"
      },
      {
        name: "Scapular Wall Slides",
        muscle: "Serratus Anterior & Unterer Trapezius",
        execution: "Rücken an Wand. Arme im W. Unterarme pressen gegen Wand und hoch schieben.",
        sets: 2,
        reps: "10 langsam"
      },
      {
        name: "Band Pull-Aparts (Supiniert)",
        muscle: "Rhomboiden & Pars Ascendens",
        execution: "Handflächen nach OBEN (erzwingt Außenrotation). Band zur Brust ziehen.",
        sets: 1,
        reps: "20"
      }
    ]
  },
  pelvic_reset: {
    name: "Pelvic-Reset Protokoll",
    goal: "Hüftbeuger deaktivieren, Glutes/Core aktivieren",
    exercises: [
      {
        name: "Dead Bug (Anti-Extension)",
        muscle: "Transversus Abdominis & Obliques",
        execution: "LWS presst in Boden. Arm/Bein absenken ohne Hohlkreuz.",
        sets: 3,
        reps: "5 pro Seite",
        note: "Extrem langsam!"
      },
      {
        name: "Cook Hip Lift",
        muscle: "Gluteus Maximus (isoliert)",
        execution: "Rückenlage. Ein Knie zur Brust (blockiert LWS). Anderes Bein drückt Hüfte hoch.",
        sets: 2,
        reps: "10 pro Seite"
      }
    ]
  },
  couch_stretch: {
    name: "Couch Stretch (Post-Workout)",
    goal: "Hüftbeuger öffnen",
    exercises: [
      {
        name: "Couch Stretch",
        muscle: "Iliopsoas & Rectus Femoris",
        execution: "Knie an Wand. Po anspannen! Becken nach vorne schieben.",
        sets: 1,
        reps: "2 Min pro Seite",
        note: "PFLICHT nach Beintraining!"
      }
    ]
  }
};

export const DEFAULT_WORKOUTS = [
  {
    id: 'push_a',
    name: 'PUSH A',
    subtitle: 'Chest & Shoulder Lock',
    icon: '🔒',
    color: 'emerald',
    day: 1,
    focus: 'Brust-Kraft bei zentrierter Schulter',
    prehab: 'shoulder_lock',
    posthab: null,
    coachingNotes: [
      '⚠️ Shoulder-Lock Protokoll ist PFLICHT vor dem Training!',
      '🎯 Schulterblätter aktiv nach unten ziehen bevor du drückst',
      '🩸 T1D: Bei BZ < 100 vor Training 15g Carbs'
    ],
    exercises: [
      {
        id: 'hammer_iso_bench',
        name: 'Hammer Strength ISO Bench',
        muscle: 'Pectoralis Major (Sternal)',
        execution: 'Schulterblätter nach unten ziehen ("Hosentasche"), bevor du drückst. Stopp vor der Brust.',
        sets: 4,
        reps: '6-8',
        enabled: true
      },
      {
        id: 'hammer_mts_incline',
        name: 'Hammer Strength MTS Incline',
        muscle: 'Pectoralis Major (Clavicular)',
        execution: 'Ellbogen 45° Tuck. Schützt die Kapsel.',
        sets: 3,
        reps: '8-10',
        enabled: true
      },
      {
        id: 'life_fitness_pec_fly',
        name: 'Life Fitness Pec Fly',
        muscle: 'Pectoralis (Innen)',
        execution: 'Fokus auf Adduktion (Zusammenführen). Nicht reißen!',
        sets: 3,
        reps: '12-15',
        enabled: true
      },
      {
        id: 'panatta_multi_flight',
        name: 'Panatta Multi Flight',
        muscle: 'Lateral Deltoid (Scaption)',
        execution: 'Daumen hoch. Supraspinatus gleitet frei.',
        sets: 4,
        reps: '12-15',
        enabled: true
      },
      {
        id: 'triceps_pushdowns',
        name: 'Trizeps Pushdowns',
        muscle: 'Triceps (Lateral/Medial)',
        execution: 'Ellbogen fixiert.',
        sets: 3,
        reps: '10-12',
        enabled: true
      },
      {
        id: 'overhead_cable_ext',
        name: 'Overhead Cable Extension',
        muscle: 'Triceps (Long Head)',
        execution: 'Dehnung. Sitzend (stabilisiert Rumpf).',
        sets: 3,
        reps: '12-15',
        enabled: true
      }
    ]
  },
  {
    id: 'pull_a',
    name: 'PULL A',
    subtitle: 'Back & Pelvic Activation',
    icon: '🔙',
    color: 'blue',
    day: 2,
    focus: 'Latissimus & Core-Stabilität (Kein Hohlkreuz beim Rudern)',
    prehab: 'pelvic_reset',
    posthab: null,
    coachingNotes: [
      '⚠️ 3 Sätze Dead Bugs vor Beginn (Pelvic Reset)!',
      '🎯 Core fest wie beim Dead Bug während Rudern',
      '🩸 T1D: Rudern kann BZ senken - Monitor!'
    ],
    exercises: [
      {
        id: 'panatta_super_power_row',
        name: 'Panatta Super Power Row',
        muscle: 'Latissimus Dorsi (Gesamt)',
        execution: 'Core fest (wie beim Dead Bug). Brust ans Polster. Zieh aus dem Ellbogen.',
        sets: 4,
        reps: '6-8',
        enabled: true
      },
      {
        id: 'hammer_mts_row',
        name: 'Hammer Strength MTS Row',
        muscle: 'Latissimus (Unterer Anteil)',
        execution: 'Einarmig. Seitneigung erlaubt für maximalen Stretch.',
        sets: 3,
        reps: '10-12',
        enabled: true
      },
      {
        id: 'panatta_super_high_row',
        name: 'Panatta Super High Row',
        muscle: 'Teres Major & Lat (Oben)',
        execution: 'Beidarmig. Schulterblätter unten lassen.',
        sets: 3,
        reps: '10-12',
        enabled: true
      },
      {
        id: 'reverse_butterfly',
        name: 'Reverse Butterfly',
        muscle: 'Infraspinatus & Posterior Delt',
        execution: 'Fokus: Rotation nach außen, nicht nur nach hinten ziehen.',
        sets: 4,
        reps: '15-20',
        note: '🏥 REHA-Pflicht!',
        enabled: true
      },
      {
        id: 'sz_curls',
        name: 'SZ-Curls (Stehend)',
        muscle: 'Biceps Brachii',
        execution: 'Rücken an Wand. Glutes anspannen (verhindert Hohlkreuz).',
        sets: 4,
        reps: '8-10',
        enabled: true
      }
    ]
  },
  {
    id: 'legs',
    name: 'LEGS',
    subtitle: 'Quads & Pelvic Release',
    icon: '🦵',
    color: 'purple',
    day: 3,
    focus: 'Quadrizeps ohne LWS-Belastung',
    prehab: 'pelvic_reset',
    posthab: 'couch_stretch',
    coachingNotes: [
      '⚠️ Cook Hip Lift vor Squats (Glute Aktivierung)!',
      '⚠️ Couch Stretch nach Training ist PFLICHT!',
      '🩸 T1D: Beintraining = höchster Glykogenverbrauch. Post-Workout Carbs!'
    ],
    exercises: [
      {
        id: 'leg_curl',
        name: 'Life Fitness Leg Curl',
        muscle: 'Hamstrings (Beinbeuger)',
        execution: 'Vorermüdung sichert das Kniegelenk.',
        sets: 4,
        reps: '12',
        note: '⚡ VORERMÜDUNG',
        enabled: true
      },
      {
        id: 'smith_squats',
        name: 'Panatta Smith Squats',
        muscle: 'Quadrizeps',
        execution: 'Füße vor. Becken neutral halten (nicht ins Hohlkreuz fallen!).',
        sets: 4,
        reps: '8-10',
        enabled: true
      },
      {
        id: 'rdl_db',
        name: 'RDL (Kurzhanteln)',
        muscle: 'Gluteus & Hamstrings',
        execution: 'Hip Hinge Bewegung. Rücken bleibt "Brett".',
        sets: 3,
        reps: '10-12',
        enabled: true
      },
      {
        id: 'leg_press',
        name: 'Leg Press / Hackenschmidt',
        muscle: 'Quads (Vastus Medialis)',
        execution: 'Tiefe Position kontrollieren.',
        sets: 3,
        reps: '15-20',
        enabled: true
      },
      {
        id: 'calf_raise',
        name: 'Wadenheben',
        muscle: 'Gastrocnemius',
        execution: 'Volle Dehnung unten.',
        sets: 4,
        reps: '10-12',
        enabled: true
      }
    ]
  },
  {
    id: 'upper_chest',
    name: 'WEAK POINT',
    subtitle: 'Upper Chest & Rehab',
    icon: '🎯',
    color: 'amber',
    day: 4,
    focus: 'Vorermüdung für die obere Brust',
    prehab: 'shoulder_lock',
    posthab: null,
    coachingNotes: [
      '⚠️ Shoulder-Lock Protokoll durchführen!',
      '🎯 Gewicht reduziert wegen Vorermüdung',
      '🩸 T1D: Leichteres Training = weniger BZ-Schwankung'
    ],
    exercises: [
      {
        id: 'cable_fly_low_high',
        name: 'Cable Flys (Low-to-High)',
        muscle: 'Pec Major (Clavicular)',
        execution: 'Vorermüdung. Ellbogen leicht gebeugt.',
        sets: 3,
        reps: '15-20',
        note: '⚡ PRE-EXHAUST',
        enabled: true
      },
      {
        id: 'hammer_mts_incline_2',
        name: 'Hammer Strength MTS Incline',
        muscle: 'Obere Brust',
        execution: 'Gewicht reduziert (wegen Vorermüdung). Perfekte Kontrolle.',
        sets: 4,
        reps: '10-12',
        enabled: true
      },
      {
        id: 'panatta_multi_flight_2',
        name: 'Panatta Multi Flight',
        muscle: 'Lateral Delt',
        execution: 'Scaption Ebene. Hohes Volumen für V-Taper.',
        sets: 5,
        reps: '15-20',
        note: '5 Sätze!',
        enabled: true
      },
      {
        id: 'cable_front_raise',
        name: 'Cable Front Raise (Seil)',
        muscle: 'Anterior Delt',
        execution: 'Durch die Beine ziehen. Neutraler Griff schont Schulter.',
        sets: 3,
        reps: '12-15',
        enabled: true
      },
      {
        id: 'floor_skullcrushers',
        name: 'Floor Skullcrushers',
        muscle: 'Triceps',
        execution: 'Bodenkontakt = Stopp. Schont Infraspinatus-Sehne.',
        sets: 4,
        reps: '12-15',
        enabled: true
      }
    ]
  },
  {
    id: 'pump',
    name: 'PUMP',
    subtitle: 'Arms & Lat Width',
    icon: '💪',
    color: 'cyan',
    day: 5,
    focus: 'Arm-Volumen & Lat-Breite',
    prehab: null,
    posthab: null,
    coachingNotes: [
      '🎯 Pump-Tag: Höhere Wiederholungen, kürzere Pausen',
      '💪 Mind-Muscle Connection > Gewicht',
      '🩸 T1D: Pump-Training = stabiler BZ'
    ],
    exercises: [
      {
        id: 'panatta_high_row_single',
        name: 'Panatta High Row (1-armig)',
        muscle: 'Latissimus (Breite)',
        execution: 'Fokus auf Stretch und Kontraktion.',
        sets: 3,
        reps: '12-15',
        enabled: true
      },
      {
        id: 'lat_pulldown_neutral',
        name: 'Lat Pulldown (Neutral)',
        muscle: 'Latissimus',
        execution: 'Enger neutraler Griff. Schultern unten.',
        sets: 3,
        reps: '12-15',
        enabled: true
      },
      {
        id: 'spider_curls',
        name: 'Spider Curls',
        muscle: 'Biceps (Peak)',
        execution: 'Brust auf Schrägbank. Maximale Kontraktion oben.',
        sets: 4,
        reps: '12-15',
        enabled: true
      },
      {
        id: 'triceps_pushdown_single',
        name: 'Triceps Pushdown (1-armig)',
        muscle: 'Triceps',
        execution: 'Rotation am Ende für lateralen Kopf.',
        sets: 3,
        reps: '12-15',
        enabled: true
      },
      {
        id: 'cross_body_hammer',
        name: 'Cross-Body Hammer Curls',
        muscle: 'Brachialis',
        execution: 'Über den Körper curlen.',
        sets: 3,
        reps: '12-15',
        enabled: true
      },
      {
        id: 'cable_crunches',
        name: 'Cable Crunches',
        muscle: 'Rectus Abdominis',
        execution: 'Nicht aus der Hüfte ziehen!',
        sets: 3,
        reps: '15-20',
        enabled: true
      }
    ]
  },
  {
    id: 'rest',
    name: 'REST',
    subtitle: 'Aktive Regeneration',
    icon: '😴',
    color: 'slate',
    day: 0,
    focus: 'Regeneration & Mobility',
    prehab: null,
    posthab: 'couch_stretch',
    coachingNotes: [
      '🚶 Spaziergang (20-30 Min) für aktive Erholung',
      '🧘 Mobility Flow optional',
      '🩸 T1D: Ruhetag = Basalrate überprüfen'
    ],
    exercises: [
      {
        id: 'walk',
        name: 'Spaziergang Zone 2',
        muscle: 'Aktive Regeneration',
        execution: 'Lockeres Gehen, Puls 100-120.',
        sets: 1,
        reps: '20-30 Min',
        enabled: true
      },
      {
        id: 'mobility_flow',
        name: 'Mobility Flow',
        muscle: 'Ganzkörper',
        execution: 'Hüftkreise, Schulterkreise, Cat-Cow.',
        sets: 1,
        reps: '10 Min',
        enabled: true
      },
      {
        id: 'foam_rolling',
        name: 'Foam Rolling',
        muscle: 'Faszien',
        execution: 'Quads, IT-Band, Thoracic Spine.',
        sets: 1,
        reps: '10 Min',
        enabled: true
      }
    ]
  }
];

export const WORKOUT_COLORS = {
  emerald: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400',
  blue: 'bg-blue-500/20 border-blue-500/50 text-blue-400',
  purple: 'bg-purple-500/20 border-purple-500/50 text-purple-400',
  amber: 'bg-amber-500/20 border-amber-500/50 text-amber-400',
  cyan: 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400',
  slate: 'bg-slate-500/20 border-slate-500/50 text-slate-400'
};

export default DEFAULT_WORKOUTS;