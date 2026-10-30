// Alle Muskelgruppen der Seite. Die Muskel-Karte und (ab Etappe 3) der Übungsfilter
// benutzen diese Liste. Die "id" steht auch in der URL, z.B. /uebungen?muskel=brust

export type MuscleId =
  | 'brust'
  | 'schultern'
  | 'bizeps'
  | 'trizeps'
  | 'bauch'
  | 'ruecken'
  | 'nacken'
  | 'gesaess'
  | 'quadrizeps'
  | 'beinbeuger'
  | 'waden'

export type Muscle = {
  id: MuscleId
  name: string
  description: string
}

export const muscles: Muscle[] = [
  {
    id: 'brust',
    name: 'Brust',
    description: 'Der grosse Brustmuskel drückt die Arme nach vorne, z.B. beim Liegestütz oder Bankdrücken.',
  },
  {
    id: 'schultern',
    name: 'Schultern',
    description: 'Der Deltamuskel hebt die Arme nach vorne, zur Seite und nach hinten.',
  },
  {
    id: 'bizeps',
    name: 'Bizeps',
    description: 'Die Vorderseite des Oberarms beugt den Ellbogen, z.B. beim Curl oder Klimmzug.',
  },
  {
    id: 'trizeps',
    name: 'Trizeps',
    description: 'Die Rückseite des Oberarms streckt den Ellbogen, z.B. beim Dip oder Liegestütz.',
  },
  {
    id: 'bauch',
    name: 'Bauch',
    description: 'Gerade und schräge Bauchmuskeln stabilisieren den Rumpf, und zwar bei fast jeder Übung.',
  },
  {
    id: 'ruecken',
    name: 'Rücken',
    description: 'Der breite Rückenmuskel zieht die Arme zum Körper, z.B. beim Rudern oder Klimmzug.',
  },
  {
    id: 'nacken',
    name: 'Nacken',
    description: 'Der Trapezmuskel hebt und stabilisiert die Schulterblätter.',
  },
  {
    id: 'gesaess',
    name: 'Gesäss',
    description: 'Der grösste Muskel des Körpers streckt die Hüfte, z.B. bei Kniebeuge und Hip Thrust.',
  },
  {
    id: 'quadrizeps',
    name: 'Oberschenkel vorne',
    description: 'Der Quadrizeps streckt das Knie, z.B. bei Kniebeuge und Ausfallschritt.',
  },
  {
    id: 'beinbeuger',
    name: 'Oberschenkel hinten',
    description: 'Die Beinbeuger beugen das Knie und strecken die Hüfte, z.B. beim Rumänischen Kreuzheben.',
  },
  {
    id: 'waden',
    name: 'Waden',
    description: 'Die Wadenmuskeln heben die Ferse, z.B. beim Wadenheben oder Springen.',
  },
]

// Hilfsfunktion: Muskel anhand der id finden (gibt undefined zurück, wenn es ihn nicht gibt)
export function findMuscle(id: string | null | undefined): Muscle | undefined {
  return muscles.find((muscle) => muscle.id === id)
}
