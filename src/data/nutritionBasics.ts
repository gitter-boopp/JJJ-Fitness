// Die Grundlagen der Ernährung, einfach erklärt (Ernährungsseite)

export type NutritionBasic = {
  title: string
  badge: string // kurze Zahl, z.B. "4 kcal pro g"
  text: string
  sources: string[] // gute Lebensmittel
}

export const nutritionBasics: NutritionBasic[] = [
  {
    title: 'Kalorien',
    badge: 'Energie',
    text: 'Kalorien (kcal) sind die Energie aus dem Essen. Für Muskelaufbau brauchst du einen leichten Überschuss, also etwa 250 bis 300 kcal mehr, als du verbrauchst. Viel mehr bringt nicht mehr Muskeln, nur mehr Fett.',
    sources: ['Regelmässig essen', '3 Mahlzeiten + 1–2 Snacks'],
  },
  {
    title: 'Protein',
    badge: '4 kcal pro g',
    text: 'Protein (Eiweiss) ist der Baustoff für deine Muskeln. Ideal sind 1,6 bis 2,2 g pro kg Körpergewicht am Tag, verteilt auf mehrere Mahlzeiten.',
    sources: ['Magerquark', 'Eier', 'Poulet', 'Linsen', 'Tofu', 'Milch', 'Thon'],
  },
  {
    title: 'Kohlenhydrate',
    badge: '4 kcal pro g',
    text: 'Kohlenhydrate sind der wichtigste Treibstoff fürs Training. Sie füllen die Energiespeicher in den Muskeln. Am besten aus Vollkorn, Kartoffeln und Früchten.',
    sources: ['Haferflocken', 'Reis', 'Kartoffeln', 'Vollkornbrot', 'Teigwaren', 'Bananen'],
  },
  {
    title: 'Fett',
    badge: '9 kcal pro g',
    text: 'Fett ist wichtig für Hormone und damit der Körper bestimmte Vitamine aufnehmen kann. Es hat mehr als doppelt so viele Kalorien pro Gramm. Etwa 1 g pro kg Körpergewicht ist ein guter Richtwert.',
    sources: ['Nüsse', 'Olivenöl', 'Rapsöl', 'Avocado', 'Lachs', 'Käse'],
  },
]
