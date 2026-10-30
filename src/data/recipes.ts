// Günstige, einfache Rezepte mit viel Protein.
// Die Makros (kcal, Protein, Kohlenhydrate, Fett) gelten pro Portion und sind
// mit Durchschnittswerten aus Nährwerttabellen gerechnet, also ungefähre Angaben.
// Die Preise sind grobe Schätzungen mit günstigen Zutaten aus dem Schweizer Supermarkt.

export type Recipe = {
  id: string
  name: string
  description: string
  minutes: number // Zubereitungszeit
  pricePerPortion: string // z.B. "ca. CHF 2.00"
  portions: number
  kcal: number
  protein: number
  carbs: number
  fat: number
  ingredients: string[] // Mengen für alle Portionen
  steps: string[]
}

export const recipes: Recipe[] = [
  {
    id: 'overnight-oats',
    name: 'Overnight Oats mit Quark',
    description: 'Am Abend vorbereiten, am Morgen nur noch essen. Perfekt vor der Schule.',
    minutes: 5,
    pricePerPortion: 'ca. CHF 2.00',
    portions: 1,
    kcal: 525,
    protein: 32,
    carbs: 75,
    fat: 9,
    ingredients: ['60 g Haferflocken', '150 g Magerquark', '150 ml Milch', '1 Banane', '1 Prise Zimt'],
    steps: [
      'Haferflocken, Quark, Milch und Zimt in einem Glas gut verrühren.',
      'Über Nacht (mindestens 4 Stunden) in den Kühlschrank stellen.',
      'Am Morgen die Banane in Scheiben schneiden und darauflegen.',
    ],
  },
  {
    id: 'ruehrei-wrap',
    name: 'Rührei-Wrap',
    description: 'Schnelles Frühstück oder Mittagessen, das lange satt macht.',
    minutes: 10,
    pricePerPortion: 'ca. CHF 2.50',
    portions: 1,
    kcal: 550,
    protein: 34,
    carbs: 34,
    fat: 30,
    ingredients: ['3 Eier', '1 Vollkorn-Tortilla', '30 g Reibkäse', '1 Handvoll Spinat', '1 Tomate', 'Salz, Pfeffer'],
    steps: [
      'Eier mit Salz und Pfeffer verquirlen und in einer Pfanne bei mittlerer Hitze stocken lassen.',
      'Spinat kurz mitbraten, dann den Käse darüberstreuen.',
      'Tortilla kurz in der Pfanne erwärmen, mit Rührei und Tomatenwürfeln füllen und einrollen.',
    ],
  },
  {
    id: 'poulet-reis-bowl',
    name: 'Poulet-Reis-Bowl',
    description: 'Der Klassiker zum Vorkochen. Hält 3 Tage im Kühlschrank.',
    minutes: 25,
    pricePerPortion: 'ca. CHF 4.50',
    portions: 1,
    kcal: 545,
    protein: 45,
    carbs: 68,
    fat: 8,
    ingredients: ['150 g Pouletbrust', '80 g Reis (roh)', '150 g Brokkoli', '1 TL Rapsöl', '1 EL Sojasauce', 'Paprikapulver'],
    steps: [
      'Reis nach Packungsanleitung kochen.',
      'Poulet in Stücke schneiden, mit Paprika würzen und im Öl rundum anbraten, bis es innen nicht mehr rosa ist.',
      'Brokkoli in den letzten 5 Minuten zum Reis geben oder separat dämpfen.',
      'Alles in eine Schüssel geben und mit Sojasauce abschmecken.',
    ],
  },
  {
    id: 'linsen-bolognese',
    name: 'Linsen-Bolognese',
    description: 'Vegetarisch, sehr günstig und voller Protein. Ergibt 2 Portionen.',
    minutes: 30,
    pricePerPortion: 'ca. CHF 2.00',
    portions: 2,
    kcal: 735,
    protein: 39,
    carbs: 105,
    fat: 13,
    ingredients: [
      '160 g rote Linsen',
      '160 g Vollkorn-Spaghetti',
      '1 Dose gehackte Tomaten (400 g)',
      '1 Zwiebel',
      '1 Rüebli',
      '1 EL Olivenöl',
      '30 g Parmesan',
      'Salz, Pfeffer, Oregano',
    ],
    steps: [
      'Zwiebel und Rüebli fein hacken und im Öl 3 Minuten andünsten.',
      'Linsen, Tomaten und 300 ml Wasser dazugeben und 15 Minuten köcheln lassen. Würzen.',
      'Spaghetti in Salzwasser nach Packungsanleitung kochen.',
      'Spaghetti mit der Sauce mischen und mit Parmesan servieren.',
    ],
  },
  {
    id: 'thon-kichererbsen-salat',
    name: 'Thon-Kichererbsen-Salat',
    description: 'Ohne Kochen, ideal als Lunch zum Mitnehmen.',
    minutes: 10,
    pricePerPortion: 'ca. CHF 3.00',
    portions: 1,
    kcal: 410,
    protein: 41,
    carbs: 25,
    fat: 14,
    ingredients: [
      '1 Dose Thon im eigenen Saft',
      '½ Dose Kichererbsen',
      '½ Gurke',
      '1 Tomate',
      '½ Peperoni',
      '1 EL Olivenöl',
      'Saft von ½ Zitrone',
      'Salz, Pfeffer',
    ],
    steps: [
      'Thon und Kichererbsen abtropfen lassen und abspülen.',
      'Gurke, Tomate und Peperoni in kleine Würfel schneiden.',
      'Alles mischen und mit Öl, Zitronensaft, Salz und Pfeffer anmachen.',
    ],
  },
  {
    id: 'quark-beeren-bowl',
    name: 'Quark-Beeren-Bowl',
    description: 'Schneller Snack nach dem Training oder am Abend.',
    minutes: 3,
    pricePerPortion: 'ca. CHF 1.80',
    portions: 1,
    kcal: 305,
    protein: 34,
    carbs: 36,
    fat: 2,
    ingredients: ['250 g Magerquark', '100 g Beeren (auch tiefgekühlt)', '20 g Haferflocken', '1 TL Honig'],
    steps: [
      'Quark in eine Schüssel geben und glatt rühren (eventuell mit einem Schluck Milch).',
      'Beeren und Haferflocken darübergeben und mit Honig süssen.',
    ],
  },
]
