// Alle Muskelgruppen der Seite. Die Muskel-Karte und der Übungsfilter benutzen diese Liste.
// Die "id" steht auch in der URL, z.B. /uebungen?muskel=brust
// Name und Beschreibung stehen in den Übersetzungsdateien unter "muscles.<id>".

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

export const muscleIds: MuscleId[] = [
  'brust',
  'schultern',
  'bizeps',
  'trizeps',
  'bauch',
  'ruecken',
  'nacken',
  'gesaess',
  'quadrizeps',
  'beinbeuger',
  'waden',
]

// Prüft, ob ein Text (z.B. aus der URL) eine gültige Muskel-id ist
export function isMuscleId(value: string | null | undefined): value is MuscleId {
  return muscleIds.includes(value as MuscleId)
}
