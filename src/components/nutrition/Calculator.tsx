import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

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
            Geschlecht <span className="text-muted/70">(die Formel rechnet unterschiedlich)</span>
          </legend>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                ['maennlich', 'Männlich'],
                ['weiblich', 'Weiblich'],
              ] as const
            ).map(([id, label]) => (
              <label key={id}>
                <input
                  type="radio"
                  name="sex"
                  value={id}
                  checked={sex === id}
                  onChange={() => setSex(id)}
                  className="peer sr-only"
                />
                <span className={`${radioBox} px-4 py-3 text-center font-semibold`}>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-3">
          <NumberField id="age" label="Alter" unit="Jahre" value={age} onChange={setAge} {...limits.age} />
          <NumberField id="height" label="Grösse" unit="cm" value={height} onChange={setHeight} {...limits.height} />
          <NumberField id="weight" label="Gewicht" unit="kg" value={weight} onChange={setWeight} {...limits.weight} />
        </div>

        <fieldset>
          <legend className="mb-3 text-sm font-medium text-muted">Wie aktiv bist du?</legend>
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
                  <span className="font-semibold">{level.label}</span>
                  <span className="text-sm text-muted sm:text-right">{level.description}</span>
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
                <p className="text-sm font-semibold tracking-widest text-accent uppercase">Ziel Muskelaufbau</p>
                <p className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                  <AnimatedNumber value={result.gainMin} />–<AnimatedNumber value={result.gainMax} />
                  <span className="ml-2 text-xl text-muted">kcal/Tag</span>
                </p>

                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                  <div>
                    <dt className="text-sm text-muted">Gewicht halten</dt>
                    <dd className="mt-1 font-display text-2xl font-bold">
                      <AnimatedNumber value={result.maintenance} /> kcal
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted">Grundumsatz</dt>
                    <dd className="mt-1 font-display text-2xl font-bold">
                      <AnimatedNumber value={result.bmr} /> kcal
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-sm text-muted">Protein pro Tag (1,6–2,2 g pro kg)</dt>
                    <dd className="mt-1 font-display text-2xl font-bold">
                      <AnimatedNumber value={result.proteinMin} />–<AnimatedNumber value={result.proteinMax} /> g
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <p className="mb-4 text-sm text-muted">So könnte dein Tag aussehen:</p>
                  <MacroBar {...result.macros} />
                </div>

                {Number(age) < 18 && (
                  <p className="mt-6 rounded-xl bg-white/5 p-4 text-sm text-muted">
                    Du bist unter 18 und wächst noch. Die Formel wurde für Erwachsene entwickelt, nimm die Werte deshalb
                    als grobe Orientierung. Iss regelmässig und genug. Wenig zu essen bremst Wachstum und Training.
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
                <p className="font-display text-2xl font-bold">Dein Ergebnis</p>
                <p className="mt-3 text-muted">
                  Gib Alter, Grösse und Gewicht ein. Wir rechnen mit der Mifflin-St-Jeor-Formel, einer der genauesten
                  Formeln für den Grundumsatz, und zählen für den Muskelaufbau 250 bis 300 kcal dazu.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Ruhiger Hinweis, wie im Brief gewünscht */}
        <p className="mt-4 px-1 text-sm text-muted">
          Alle Werte sind Richtwerte und ersetzen keine Beratung. Bei gesundheitlichen Fragen wende dich an eine
          Fachperson, z.B. deine Hausärztin, deinen Hausarzt oder eine Ernährungsberatung.
        </p>
      </div>
    </div>
  )
}
