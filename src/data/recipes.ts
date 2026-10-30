// Günstige, einfache Rezepte mit viel Protein.
// Hier stehen nur die Zahlen. Name, Beschreibung, Zutaten und Zubereitung stehen
// in den Übersetzungsdateien unter "recipes.<id>".
//
// Die Makros (kcal, Protein, Kohlenhydrate, Fett) gelten pro Portion und sind
// mit Durchschnittswerten aus Nährwerttabellen gerechnet, also ungefähre Angaben.
// Die Preise sind grobe Schätzungen mit günstigen Zutaten aus dem Schweizer Supermarkt.

export type Recipe = {
  id: string
  minutes: number // Zubereitungszeit
  pricePerPortion: number // in CHF, ungefähr
  portions: number
  kcal: number
  protein: number
  carbs: number
  fat: number
}

export const recipes: Recipe[] = [
  { id: 'overnight-oats', minutes: 5, pricePerPortion: 2, portions: 1, kcal: 525, protein: 32, carbs: 75, fat: 9 },
  { id: 'ruehrei-wrap', minutes: 10, pricePerPortion: 2.5, portions: 1, kcal: 550, protein: 34, carbs: 34, fat: 30 },
  { id: 'poulet-reis-bowl', minutes: 25, pricePerPortion: 4.5, portions: 1, kcal: 545, protein: 45, carbs: 68, fat: 8 },
  { id: 'linsen-bolognese', minutes: 30, pricePerPortion: 2, portions: 2, kcal: 735, protein: 39, carbs: 105, fat: 13 },
  {
    id: 'thon-kichererbsen-salat',
    minutes: 10,
    pricePerPortion: 3,
    portions: 1,
    kcal: 410,
    protein: 41,
    carbs: 25,
    fat: 14,
  },
  { id: 'quark-beeren-bowl', minutes: 3, pricePerPortion: 1.8, portions: 1, kcal: 305, protein: 34, carbs: 36, fat: 2 },
]
