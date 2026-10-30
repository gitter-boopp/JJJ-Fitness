import { motion } from 'motion/react'

type MacroBarProps = {
  protein: number // Gramm
  carbs: number
  fat: number
}

// Balken, der zeigt, wie sich die Kalorien auf Protein, Kohlenhydrate und Fett verteilen.
export default function MacroBar({ protein, carbs, fat }: MacroBarProps) {
  // Gramm in Kalorien umrechnen: Protein und KH 4 kcal/g, Fett 9 kcal/g
  const parts = [
    { label: 'Protein', grams: protein, kcal: protein * 4, color: 'bg-accent' },
    { label: 'Kohlenhydrate', grams: carbs, kcal: carbs * 4, color: 'bg-accent/50' },
    { label: 'Fett', grams: fat, kcal: fat * 9, color: 'bg-white/30' },
  ]
  const total = parts.reduce((sum, part) => sum + part.kcal, 0)

  return (
    <div>
      {/* aria-hidden: Die Zahlen stehen unten nochmals als Text */}
      <div aria-hidden className="flex h-3 overflow-hidden rounded-full bg-surface-2">
        {parts.map((part) => (
          <motion.div
            key={part.label}
            className={part.color}
            // Die Breite gleitet zum neuen Anteil, wenn sich die Werte ändern
            animate={{ width: `${(part.kcal / total) * 100}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </div>
      <ul className="mt-4 grid grid-cols-3 gap-2 text-sm">
        {parts.map((part) => (
          <li key={part.label}>
            <span className="flex items-center gap-2 text-muted">
              <span aria-hidden className={`size-2.5 rounded-full ${part.color}`} />
              {part.label}
            </span>
            <span className="mt-1 block font-display text-lg font-bold">{part.grams} g</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
