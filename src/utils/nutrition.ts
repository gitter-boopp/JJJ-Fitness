// Rechen-Logik für den Kalorien- und Proteinrechner.
// Alles reine Funktionen: Zahlen rein, Zahlen raus. So kann man sie leicht nachrechnen.

export type Sex = 'maennlich' | 'weiblich'

export type ActivityLevel = {
  id: string // Text dazu in der Übersetzung unter "calculator.activity.<id>"
  factor: number // Multiplikator für den Grundumsatz (PAL-Wert)
}

// Wie aktiv bist du? Der Faktor sagt, wie viel Energie du zusätzlich zum Grundumsatz brauchst.
export const activityLevels: ActivityLevel[] = [
  { id: 'kaum', factor: 1.2 },
  { id: 'leicht', factor: 1.375 },
  { id: 'maessig', factor: 1.55 },
  { id: 'sehr', factor: 1.725 },
  { id: 'extrem', factor: 1.9 },
]

// Erlaubte Bereiche für die Eingaben (alles andere ist vermutlich ein Tippfehler)
export const limits = {
  age: { min: 15, max: 80 },
  height: { min: 120, max: 230 },
  weight: { min: 35, max: 250 },
}

// Leichter Überschuss für Muskelaufbau (laut Brief: ca. 250–300 kcal)
export const SURPLUS_MIN = 250
export const SURPLUS_MAX = 300

// Protein pro kg Körpergewicht
export const PROTEIN_MIN = 1.6
export const PROTEIN_MAX = 2.2

export type NutritionInput = {
  sex: Sex
  age: number
  heightCm: number
  weightKg: number
  activityFactor: number
}

export type NutritionResult = {
  bmr: number // Grundumsatz: Energie in völliger Ruhe
  maintenance: number // Gesamtumsatz: so viel brauchst du, um dein Gewicht zu halten
  gainMin: number // Ziel Muskelaufbau, unteres Ende
  gainMax: number // Ziel Muskelaufbau, oberes Ende
  proteinMin: number // Gramm pro Tag
  proteinMax: number
  // Beispiel-Verteilung in Gramm für die Mitte des Ziels
  macros: { protein: number; fat: number; carbs: number }
}

// Grundumsatz nach der Mifflin-St-Jeor-Formel (1990):
//   10 × Gewicht (kg) + 6,25 × Grösse (cm) − 5 × Alter (Jahre)  + 5   (männlich)
//                                                              − 161 (weiblich)
export function mifflinStJeor({ sex, age, heightCm, weightKg }: NutritionInput): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age
  return sex === 'maennlich' ? base + 5 : base - 161
}

// Rundet auf die nächsten 10 kcal. Genauer ist so eine Schätzung sowieso nicht.
function roundTo10(value: number): number {
  return Math.round(value / 10) * 10
}

export function calculateNutrition(input: NutritionInput): NutritionResult {
  const bmr = mifflinStJeor(input)
  const maintenance = bmr * input.activityFactor
  const target = maintenance + (SURPLUS_MIN + SURPLUS_MAX) / 2

  // Beispiel-Verteilung der Makronährstoffe:
  // Protein: 1,8 g/kg (Mitte der Empfehlung)
  // Fett: 1 g/kg, aber mindestens 25% der Kalorien (Fett ist wichtig für Hormone)
  // Kohlenhydrate: der Rest der Kalorien
  const protein = 1.8 * input.weightKg
  const fat = Math.max(1 * input.weightKg, (target * 0.25) / 9)
  const carbs = Math.max(0, (target - protein * 4 - fat * 9) / 4)

  return {
    bmr: roundTo10(bmr),
    maintenance: roundTo10(maintenance),
    gainMin: roundTo10(maintenance + SURPLUS_MIN),
    gainMax: roundTo10(maintenance + SURPLUS_MAX),
    proteinMin: Math.round(input.weightKg * PROTEIN_MIN),
    proteinMax: Math.round(input.weightKg * PROTEIN_MAX),
    macros: { protein: Math.round(protein), fat: Math.round(fat), carbs: Math.round(carbs) },
  }
}

// Zahl im Schweizer Format der jeweiligen Sprache:
// Deutsch 2750 -> "2’750", Französisch 2750 -> "2 750"
const formatters = {
  de: new Intl.NumberFormat('de-CH', { maximumFractionDigits: 0 }),
  fr: new Intl.NumberFormat('fr-CH', { maximumFractionDigits: 0 }),
}
export function formatNumber(value: number, lang: 'de' | 'fr' = 'de'): string {
  return formatters[lang].format(Math.round(value))
}
