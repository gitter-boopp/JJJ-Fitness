import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import { useI18n } from '../../i18n/i18n'
import { activityLevels, calculateNutrition, limits } from '../../utils/nutrition'
import type { Sex } from '../../utils/nutrition'
import AnimatedNumber from '../motion/AnimatedNumber'
import MacroBar from './MacroBar'
import NumberField from './NumberField'

// Prüft, ob ein eingegebener Text eine Zahl im erlaubten Bereich ist
function inRange(value: string, range: { min: number; max: number }): boolean {
  const number = Number(value)
  return value !== '' && !Number.isNaN(number) && number >= range.min && number <= range.max
}

// Gestaltetes Radio-Feld: echtes <input type="radio"> (unsichtbar) + sichtbares Kästchen.
// "peer" erlaubt dem Kästchen, auf den Zustand des Inputs zu reagieren (peer-checked).
const radioBox =
  'block cursor-pointer rounded-xl border border-white/10 bg-surface-2 transition-colors hover:border-accent/50 ' +
  'peer-checked:border-accent peer-checked:bg-accent/10 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent'

export default function Calculator() {
  const { t } = useI18n()
  // Eingaben als Text speichern: so kann ein Feld auch leer sein
  const [sex, setSex] = useState<Sex>('maennlich')
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [activityId, setActivityId] = useState('leicht')

  const activity = activityLevels.find((level) => level.id === activityId) ?? activityLevels[0]
  const isValid = inRange(age, limits.age) && inRange(height, limits.height) && inRange(weight, limits.weight)

  // Ergebnis nur berechnen, wenn alle Eingaben gültig sind
  const result = isValid
    ? calculateNutrition({
        sex,
        age: Number(age),
        heightCm: Number(height),
        weightKg: Number(weight),
        activityFactor: activity.factor,
      })
    : null

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
      {/* ---------- Eingaben ---------- */}
      <form
        className="space-y-8 rounded-3xl border border-white/5 bg-surface p-5 md:p-8"
        onSubmit={(event) => event.preventDefault()} // Enter soll die Seite nicht neu laden
      >
        <fieldset>
          <legend className="mb-3 text-sm font-medium text-muted">
            {t('calculator.sex')} <span className="text-muted/70">{t('calculator.sexHint')}</span>
          </legend>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                ['maennlich', 'calculator.male'],
                ['weiblich', 'calculator.female'],
              ] as const
            ).map(([id, labelKey]) => (
              <label key={id}>
                <input
                  type="radio"
                  name="sex"
                  value={id}
                  checked={sex === id}
                  onChange={() => setSex(id)}
                  className="peer sr-only"
                />
                <span className={`${radioBox} px-4 py-3 text-center font-semibold`}>{t(labelKey)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-3">
          <NumberField
            id="age"
            label={t('calculator.age')}
            unit={t('calculator.ageUnit')}
            value={age}
            onChange={setAge}
            {...limits.age}
          />
          <NumberField
            id="height"
            label={t('calculator.height')}
            unit="cm"
            value={height}
            onChange={setHeight}
            {...limits.height}
          />
          <NumberField
            id="weight"
            label={t('calculator.weight')}
            unit="kg"
            value={weight}
            onChange={setWeight}
            {...limits.weight}
          />
        </div>

        <fieldset>
          <legend className="mb-3 text-sm font-medium text-muted">{t('calculator.activityTitle')}</legend>
          <div className="grid gap-2">
            {activityLevels.map((level) => (
              <label key={level.id}>
                <input
                  type="radio"
                  name="activity"
                  value={level.id}
                  checked={activityId === level.id}
                  onChange={() => setActivityId(level.id)}
                  className="peer sr-only"
                />
                {/* Handy: Beschreibung unter dem Titel. Ab sm: nebeneinander. */}
                <span
                  className={`${radioBox} flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4`}
                >
                  <span className="font-semibold">{t(`calculator.activity.${level.id}.label`)}</span>
                  <span className="text-sm text-muted sm:text-right">
                    {t(`calculator.activity.${level.id}.description`)}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </form>

      {/* ---------- Ergebnis ---------- */}
      {/* lg:sticky: Auf grossen Bildschirmen bleibt das Ergebnis beim Scrollen sichtbar */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div
          className="rounded-3xl border border-accent/30 bg-accent/5 p-5 md:p-8"
          aria-live="polite" // Screenreader lesen neue Ergebnisse vor
        >
          <AnimatePresence mode="wait" initial={false}>
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-sm font-semibold tracking-widest text-accent uppercase">{t('calculator.goal')}</p>
                <p className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                  <AnimatedNumber value={result.gainMin} />–<AnimatedNumber value={result.gainMax} />
                  <span className="ml-2 text-xl text-muted">{t('calculator.perDay')}</span>
                </p>

                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                  <div>
                    <dt className="text-sm text-muted">{t('calculator.maintenance')}</dt>
                    <dd className="mt-1 font-display text-2xl font-bold">
                      <AnimatedNumber value={result.maintenance} /> kcal
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted">{t('calculator.bmr')}</dt>
                    <dd className="mt-1 font-display text-2xl font-bold">
                      <AnimatedNumber value={result.bmr} /> kcal
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-sm text-muted">{t('calculator.protein')}</dt>
                    <dd className="mt-1 font-display text-2xl font-bold">
                      <AnimatedNumber value={result.proteinMin} />–<AnimatedNumber value={result.proteinMax} /> g
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <p className="mb-4 text-sm text-muted">{t('calculator.dayExample')}</p>
                  <MacroBar {...result.macros} />
                </div>

                {Number(age) < 18 && (
                  <p className="mt-6 rounded-xl bg-white/5 p-4 text-sm text-muted">
                    {t('calculator.under18')}
                  </p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="font-display text-2xl font-bold">{t('calculator.emptyTitle')}</p>
                <p className="mt-3 text-muted">{t('calculator.emptyText')}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Ruhiger Hinweis, wie im Brief gewünscht */}
        <p className="mt-4 px-1 text-sm text-muted">{t('calculator.disclaimer')}</p>
      </div>
    </div>
  )
}
