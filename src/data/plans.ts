import type { RepsUnit } from './exercises'

// Die Trainingspläne. Jede Übung im Plan verweist mit ihrer "slug" auf eine Übung
// aus exercises.ts. So gibt es Name, Anleitung und Link automatisch dazu.
//
// Alle Texte (Name, Beschreibung, Fokus der Tage ...) stehen in den Übersetzungsdateien
// unter "plans.<id>". Die Tage unter "plans.<id>.days.<Tag-id>".

export type PlanExercise = {
  slug: string // muss in exercises.ts existieren
  sets: string
  reps: string
  unit?: RepsUnit
}

export type PlanDay = {
  id: string // kurze Kennung, z.B. "A"
  exercises: PlanExercise[]
}

export type Plan = {
  id: string // steht in der Adresse: /trainingsplaene?plan=ganzkoerper
  // Die Woche von Montag bis Sonntag: id des Trainingstags oder null = Ruhetag
  week: (string | null)[]
  days: PlanDay[]
}

export const plans: Plan[] = [
  {
    id: 'ganzkoerper',
    week: ['A', null, 'B', null, 'A', null, null],
    days: [
      {
        id: 'A',
        exercises: [
          { slug: 'goblet-squat', sets: '3', reps: '10–12' },
          { slug: 'bankdruecken', sets: '3', reps: '8–10' },
          { slug: 'latzug', sets: '3', reps: '10–12' },
          { slug: 'rumaenisches-kreuzheben', sets: '3', reps: '10–12' },
          { slug: 'seitheben', sets: '2', reps: '12–15' },
          { slug: 'plank', sets: '2', reps: '30–45', unit: 'seconds' },
        ],
      },
      {
        id: 'B',
        exercises: [
          { slug: 'beinpresse', sets: '3', reps: '10–12' },
          { slug: 'kurzhantel-schulterdruecken', sets: '3', reps: '8–12' },
          { slug: 'kurzhantelrudern', sets: '3', reps: '10–12', unit: 'perSide' },
          { slug: 'liegestuetz', sets: '3', reps: '8–15' },
          { slug: 'hip-thrust', sets: '3', reps: '10–12' },
          { slug: 'crunch', sets: '2', reps: '15' },
        ],
      },
    ],
  },
  {
    id: 'oberkoerper-unterkoerper',
    week: ['OK1', 'UK1', null, 'OK2', 'UK2', null, null],
    days: [
      {
        id: 'OK1',
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
        exercises: [
          { slug: 'kniebeuge', sets: '4', reps: '6–8' },
          { slug: 'rumaenisches-kreuzheben', sets: '3', reps: '8–10' },
          { slug: 'ausfallschritte', sets: '3', reps: '10', unit: 'perLeg' },
          { slug: 'beinbeuger-maschine', sets: '3', reps: '10–12' },
          { slug: 'wadenheben', sets: '3', reps: '12–15' },
          { slug: 'plank', sets: '3', reps: '45', unit: 'seconds' },
        ],
      },
      {
        id: 'OK2',
        exercises: [
          { slug: 'kurzhantel-schraegbankdruecken', sets: '4', reps: '8–10' },
          { slug: 'klimmzug', sets: '4', reps: '5–8' },
          { slug: 'seitheben', sets: '3', reps: '12–15' },
          { slug: 'kurzhantelrudern', sets: '3', reps: '10–12', unit: 'perSide' },
          { slug: 'dips', sets: '3', reps: '8–10' },
          { slug: 'hammercurl', sets: '3', reps: '10–12' },
        ],
      },
      {
        id: 'UK2',
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
    week: ['PUSH', null, 'PULL', null, 'LEGS', null, null],
    days: [
      {
        id: 'PUSH',
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

// Hilfsfunktion: Plan anhand der id finden
export function findPlan(id: string | null | undefined): Plan | undefined {
  return plans.find((plan) => plan.id === id)
}
