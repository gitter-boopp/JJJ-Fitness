import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import type { Recipe } from '../../data/recipes'

// Rezeptkarte: Oben die wichtigsten Infos und Makros, darunter aufklappbar
// die Zutaten und die Zubereitung.
export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [open, setOpen] = useState(false)
  const detailsId = `recipe-${recipe.id}`

  const macros = [
    { label: 'kcal', value: recipe.kcal },
    { label: 'Protein', value: `${recipe.protein} g`, highlight: true },
    { label: 'KH', value: `${recipe.carbs} g` },
    { label: 'Fett', value: `${recipe.fat} g` },
  ]

  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/5 bg-surface p-6 transition-colors hover:border-accent/30">
      <p className="text-sm text-muted">
        {recipe.minutes} Min. · {recipe.pricePerPortion}
        {recipe.portions > 1 && ` · ${recipe.portions} Portionen`}
      </p>
      <h3 className="mt-2 text-2xl">{recipe.name}</h3>
      <p className="mt-2 text-muted">{recipe.description}</p>

      {/* Makros pro Portion */}
      <dl className="mt-6 grid grid-cols-4 gap-2 rounded-xl bg-surface-2 p-3 text-center">
        {macros.map((macro) => (
          <div key={macro.label}>
            <dt className="text-xs text-muted">{macro.label}</dt>
            <dd className={`mt-1 font-display font-bold ${macro.highlight ? 'text-accent' : ''}`}>{macro.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-2 text-xs text-muted/70">pro Portion, ungefähre Werte</p>

      <div className="mt-auto pt-6">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={detailsId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between rounded-full border border-white/10 px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
        >
          {open ? 'Rezept ausblenden' : 'Zutaten & Zubereitung'}
          {/* Pfeil dreht sich beim Öffnen */}
          <span aria-hidden className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
            ↓
          </span>
        </button>

        {/* height: 'auto' -> Motion animiert die Höhe vom Zu- zum Aufklappen */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={detailsId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="pt-6">
                <h4 className="font-display font-bold">Zutaten</h4>
                <ul className="mt-3 space-y-1.5 text-muted">
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent/60" />
                      {ingredient}
                    </li>
                  ))}
                </ul>

                <h4 className="mt-6 font-display font-bold">Zubereitung</h4>
                <ol className="mt-3 space-y-3">
                  {recipe.steps.map((step, index) => (
                    <li key={step} className="flex gap-3 text-muted">
                      <span className="font-display font-bold text-accent">{index + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  )
}
