// Die 5 Grundregeln für Muskelaufbau (Startseite)

export type Rule = {
  title: string
  text: string
}

export const rules: Rule[] = [
  {
    title: 'Progressive Steigerung',
    text: 'Steigere Gewicht, Wiederholungen oder Sätze nach und nach. Ein Muskel wächst nur, wenn er mehr gefordert wird als bisher.',
  },
  {
    title: 'Genug Protein',
    text: 'Etwa 1,6 bis 2,2 g pro kg Körpergewicht am Tag, verteilt auf mehrere Mahlzeiten. Protein ist der Baustoff für neue Muskeln.',
  },
  {
    title: 'Leichter Kalorienüberschuss',
    text: 'Iss etwa 250 bis 300 kcal mehr, als du verbrauchst. Noch mehr Kalorien bauen nicht mehr Muskeln auf, nur mehr Fett.',
  },
  {
    title: 'Genug Schlaf',
    text: '7 bis 9 Stunden pro Nacht. Muskeln wachsen in der Erholung, nicht während dem Training.',
  },
  {
    title: 'Konstanz',
    text: 'Lieber über Monate 3x pro Woche trainieren als zwei Wochen lang jeden Tag. Dranbleiben schlägt Perfektion.',
  },
]
