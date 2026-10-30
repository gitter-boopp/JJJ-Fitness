// Die Trainingspläne. Jede Übung im Plan verweist mit ihrer "slug" auf eine Übung
// aus exercises.ts. So gibt es Name, Anleitung und Link automatisch dazu.

export type PlanExercise = {
  slug: string // muss in exercises.ts existieren
  sets: string
  reps: string
}

export type PlanDay = {
  id: string // kurze Kennung, z.B. "A"
  name: string // z.B. "Tag A"
  focus: string // worum es an diesem Tag geht
  exercises: PlanExercise[]
}

export type Plan = {
  id: string // steht in der Adresse: /trainingsplaene?plan=ganzkoerper
  name: string
  short: string // kurzer Name für die Auswahl-Karten
  level: string
  frequency: string // wie oft pro Woche
  duration: string // ungefähre Dauer pro Training
  description: string
  // Die Woche von Montag bis Sonntag: id des Trainingstags oder null = Ruhetag
  week: (string | null)[]
  weekNote?: string // Hinweis zur Woche
  days: PlanDay[]
}

export const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

export const plans: Plan[] = [
  {
    id: 'ganzkoerper',
    name: 'Ganzkörper 3x pro Woche',
    short: 'Ganzkörper',
    level: 'Anfänger',
    frequency: '3x pro Woche',
    duration: 'ca. 50 Min.',
    description:
      'Der ideale Start. Du trainierst jedes Mal den ganzen Körper und wechselst zwischen Tag A und Tag B ab. So wird jeder Muskel mehrmals pro Woche trainiert, und zwischen den Trainings hast du immer einen Ruhetag.',
    week: ['A', null, 'B', null, 'A', null, null],
    weekNote: 'In der nächsten Woche umgekehrt: B – A – B.',
    days: [
      {
        id: 'A',
        name: 'Tag A',
        focus: 'Ganzkörper mit Fokus auf Kniebeuge und Bankdrücken',
        exercises: [
          { slug: 'goblet-squat', sets: '3', reps: '10–12' },
          { slug: 'bankdruecken', sets: '3', reps: '8–10' },
          { slug: 'latzug', sets: '3', reps: '10–12' },
          { slug: 'rumaenisches-kreuzheben', sets: '3', reps: '10–12' },
          { slug: 'seitheben', sets: '2', reps: '12–15' },
          { slug: 'plank', sets: '2', reps: '30–45 Sek.' },
        ],
      },
      {
        id: 'B',
        name: 'Tag B',
        focus: 'Ganzkörper mit Fokus auf Beinpresse und Schulterdrücken',
        exercises: [
          { slug: 'beinpresse', sets: '3', reps: '10–12' },
          { slug: 'kurzhantel-schulterdruecken', sets: '3', reps: '8–12' },
          { slug: 'kurzhantelrudern', sets: '3', reps: '10–12 pro Seite' },
          { slug: 'liegestuetz', sets: '3', reps: '8–15' },
          { slug: 'hip-thrust', sets: '3', reps: '10–12' },
          { slug: 'crunch', sets: '2', reps: '15' },
        ],
      },
    ],
  },
  {
    id: 'oberkoerper-unterkoerper',
    name: 'Oberkörper / Unterkörper 4x pro Woche',
    short: 'Ober-/Unterkörper',
    level: 'Ab ca. 3 Monaten Training',
    frequency: '4x pro Woche',
    duration: 'ca. 60 Min.',
    description:
      'Der nächste Schritt nach dem Ganzkörper-Plan. Du trainierst abwechselnd Oberkörper und Unterkörper. Dadurch hast du pro Training mehr Zeit für jede Muskelgruppe, und jeder Muskel wird trotzdem zweimal pro Woche trainiert.',
    week: ['OK1', 'UK1', null, 'OK2', 'UK2', null, null],
    days: [
      {
        id: 'OK1',
        name: 'Oberkörper 1',
        focus: 'Drücken und Ziehen, schwere Grundübungen',
        exercises: [
          { slug: 'bankdruecken', sets: '4', reps: '6–8' },
          { slug: 'langhantelrudern', sets: '4', reps: '6–8' },
          { slug: 'kurzhantel-schulterdruecken', sets: '3', reps: '8–10' },
          { slug: 'latzug', sets: '3', reps: '8–12' },
          { slug: 'kurzhantel-curl', sets: '2', reps: '10–12' },
          { slug: 'trizepsdruecken-kabel', sets: '2', reps: '10–12' },
        ],
      },
      {
        id: 'UK1',
        name: 'Unterkörper 1',
        focus: 'Kniebeuge im Mittelpunkt',
        exercises: [
          { slug: 'kniebeuge', sets: '4', reps: '6–8' },
          { slug: 'rumaenisches-kreuzheben', sets: '3', reps: '8–10' },
          { slug: 'ausfallschritte', sets: '3', reps: '10 pro Bein' },
          { slug: 'beinbeuger-maschine', sets: '3', reps: '10–12' },
          { slug: 'wadenheben', sets: '3', reps: '12–15' },
          { slug: 'plank', sets: '3', reps: '45 Sek.' },
        ],
      },
      {
        id: 'OK2',
        name: 'Oberkörper 2',
        focus: 'Obere Brust, Rückenbreite und Arme',
        exercises: [
          { slug: 'kurzhantel-schraegbankdruecken', sets: '4', reps: '8–10' },
          { slug: 'klimmzug', sets: '4', reps: '5–8' },
          { slug: 'seitheben', sets: '3', reps: '12–15' },
          { slug: 'kurzhantelrudern', sets: '3', reps: '10–12 pro Seite' },
          { slug: 'dips', sets: '3', reps: '8–10' },
          { slug: 'hammercurl', sets: '3', reps: '10–12' },
        ],
      },
      {
        id: 'UK2',
        name: 'Unterkörper 2',
        focus: 'Kreuzheben und Gesäss',
        exercises: [
          { slug: 'kreuzheben', sets: '3', reps: '4–6' },
          { slug: 'beinpresse', sets: '3', reps: '10–12' },
          { slug: 'hip-thrust', sets: '3', reps: '8–12' },
          { slug: 'beinbeuger-maschine', sets: '3', reps: '12–15' },
          { slug: 'wadenheben', sets: '3', reps: '15–20' },
          { slug: 'haengendes-beinheben', sets: '3', reps: '8–12' },
        ],
      },
    ],
  },
  {
    id: 'push-pull-legs',
    name: 'Push / Pull / Legs',
    short: 'Push/Pull/Legs',
    level: 'Fortgeschritten',
    frequency: '3x pro Woche',
    duration: 'ca. 60 Min.',
    description:
      'Jeder Tag hat ein klares Thema: Drücken (Brust, Schultern, Trizeps), Ziehen (Rücken, Bizeps) und Beine. Dadurch kannst du jede Muskelgruppe an ihrem Tag sehr gründlich trainieren.',
    week: ['PUSH', null, 'PULL', null, 'LEGS', null, null],
    weekNote:
      'Wer schon länger trainiert, kann den Plan 2x pro Woche durchlaufen (6 Trainings). Für den Anfang reichen 3 Trainings völlig.',
    days: [
      {
        id: 'PUSH',
        name: 'Push',
        focus: 'Brust, Schultern, Trizeps',
        exercises: [
          { slug: 'bankdruecken', sets: '4', reps: '6–8' },
          { slug: 'kurzhantel-schulterdruecken', sets: '3', reps: '8–10' },
          { slug: 'kurzhantel-schraegbankdruecken', sets: '3', reps: '8–12' },
          { slug: 'seitheben', sets: '3', reps: '12–15' },
          { slug: 'trizepsdruecken-kabel', sets: '3', reps: '10–12' },
          { slug: 'butterfly', sets: '2', reps: '12–15' },
        ],
      },
      {
        id: 'PULL',
        name: 'Pull',
        focus: 'Rücken, hintere Schulter, Bizeps',
        exercises: [
          { slug: 'klimmzug', sets: '4', reps: '5–8' },
          { slug: 'langhantelrudern', sets: '3', reps: '6–10' },
          { slug: 'latzug', sets: '3', reps: '10–12' },
          { slug: 'face-pulls', sets: '3', reps: '12–15' },
          { slug: 'langhantel-curl', sets: '3', reps: '8–10' },
          { slug: 'hammercurl', sets: '2', reps: '10–12' },
        ],
      },
      {
        id: 'LEGS',
        name: 'Legs',
        focus: 'Beine, Gesäss, Bauch',
        exercises: [
          { slug: 'kniebeuge', sets: '4', reps: '6–8' },
          { slug: 'rumaenisches-kreuzheben', sets: '3', reps: '8–10' },
          { slug: 'beinpresse', sets: '3', reps: '10–12' },
          { slug: 'beinbeuger-maschine', sets: '3', reps: '10–12' },
          { slug: 'wadenheben', sets: '4', reps: '12–15' },
          { slug: 'haengendes-beinheben', sets: '3', reps: '10' },
        ],
      },
    ],
  },
]

// Tipps, die für alle Pläne gelten
export const planTips: { title: string; text: string }[] = [
  {
    title: 'Aufwärmen',
    text: '5 bis 10 Minuten locker bewegen (z.B. Velo oder Seilspringen). Dann bei der ersten Übung 1 bis 2 leichte Sätze machen.',
  },
  {
    title: 'Steigern',
    text: 'Schaffst du in allen Sätzen die obere Zahl der Wiederholungen sauber? Dann beim nächsten Mal das Gewicht leicht erhöhen.',
  },
  {
    title: 'Pausen',
    text: '2 bis 3 Minuten bei schweren Grundübungen wie Kniebeuge oder Bankdrücken, 1 bis 2 Minuten bei den anderen Übungen.',
  },
  {
    title: 'Technik vor Gewicht',
    text: 'Lieber etwas leichter und sauber als schwer und unsauber. Die letzte Wiederholung sollte anstrengend, aber noch sauber sein.',
  },
]

// Hilfsfunktion: Plan anhand der id finden
export function findPlan(id: string | null | undefined): Plan | undefined {
  return plans.find((plan) => plan.id === id)
}
