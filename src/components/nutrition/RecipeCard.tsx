import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import type { Recipe } from '../../data/recipes'
import { useI18n } from '../../i18n/i18n'

// Rezeptkarte: Oben die wichtigsten Infos und Makros, darunter aufklappbar
// die Zutaten und die Zubereitung.
export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { t, tList } = useI18n()
  const [open, setOpen] = useState(false)
  const detailsId = `recipe-${recipe.id}`
  const textKey = `recipes.${recipe.id}` // Texte dieses Rezepts in der Übersetzung

  const macros = [
    { label: t('recipeCard.kcal'), value: recipe.kcal },
    { label: t('recipeCard.protein'), value: `${recipe.protein} g`, highlight: true },
    { label: t('recipeCard.carbs'), value: `${recipe.carbs} g` },
    { label: t('recipeCard.fat'), value: `${recipe.fat} g` },
  ]

  // Preis immer mit zwei Nachkommastellen, wie in der Schweiz üblich: 2 -> "2.00"
  const price = recipe.pricePerPortion.toFixed(2)

  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/5 bg-surface p-6 transition-colors hover:border-accent/30">
      <p className="text-sm text-muted">
        {t('recipeCard.minutes', { minutes: recipe.minutes })} · {t('recipeCard.price', { price })}
        {recipe.portions > 1 && ` · ${t('recipeCard.portions', { portions: recipe.portions })}`}
      </p>
      <h3 className="mt-2 text-2xl">{t(`${textKey}.name`)}</h3>
      <p className="mt-2 text-muted">{t(`${textKey}.description`)}</p>

      {/* Makros pro Portion */}
      <dl className="mt-6 grid grid-cols-4 gap-2 rounded-xl bg-surface-2 p-3 text-center">
        {macros.map((macro) => (
          <div key={macro.label}>
            <dt className="text-xs text-muted">{macro.label}</dt>
            <dd className={`mt-1 font-display font-bold ${macro.highlight ? 'text-accent' : ''}`}>{macro.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-2 text-xs text-muted/70">{t('recipeCard.perPortion')}</p>

      <div className="mt-auto pt-6">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={detailsId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between rounded-full border border-white/10 px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
        >
          {open ? t('recipeCard.hide') : t('recipeCard.show')}
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
                <h4 className="font-display font-bold">{t('recipeCard.ingredients')}</h4>
                <ul className="mt-3 space-y-1.5 text-muted">
                  {tList(`${textKey}.ingredients`).map((ingredient) => (
                    <li key={ingredient} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent/60" />
                      {ingredient}
                    </li>
                  ))}
                </ul>

                <h4 className="mt-6 font-display font-bold">{t('recipeCard.steps')}</h4>
                <ol className="mt-3 space-y-3">
                  {tList(`${textKey}.steps`).map((step, index) => (
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
