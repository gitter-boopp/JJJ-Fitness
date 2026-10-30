import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import Button from '../ui/Button'
import { StarIcon } from '../ui/Icons'

// Das Formular schickt die Antworten an Formspree (formspree.io). Formspree leitet sie
// per E-Mail an uns weiter. So brauchen wir keinen eigenen Server und keine Datenbank.
// Die Formular-ID steht in .env.local (siehe README, Abschnitt "Feedback-Formular").
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID
const ENDPOINT = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : null

// Text zur gewählten Anzahl Sterne
const ratingLabels = ['', 'Gefällt mir nicht', 'Geht so', 'Ganz okay', 'Gut', 'Super!']

type Status = 'idle' | 'sending' | 'success' | 'error'

const textareaClass =
  'w-full rounded-xl border border-white/10 bg-surface-2 px-4 py-3 text-text placeholder:text-muted/60 focus:border-accent/60 focus:outline-none'

export default function FeedbackForm() {
  const [rating, setRating] = useState<number | null>(null)
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const [liked, setLiked] = useState('')
  const [missing, setMissing] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [showRatingError, setShowRatingError] = useState(false)
  // Unsichtbares Feld gegen Spam-Bots: Menschen sehen es nicht, Bots füllen es oft aus
  const honeypotRef = useRef<HTMLInputElement>(null)

  const shownRating = hoverRating ?? rating ?? 0

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault() // Seite nicht neu laden
    if (!rating) {
      setShowRatingError(true)
      return
    }
    if (!ENDPOINT) return

    setStatus('sending')
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          bewertung: rating,
          gefaellt: liked,
          fehlt: missing,
          _gotcha: honeypotRef.current?.value ?? '',
        }),
      })
      setStatus(response.ok ? 'success' : 'error')
    } catch {
      // z.B. keine Internetverbindung
      setStatus('error')
    }
  }

  const reset = () => {
    setRating(null)
    setLiked('')
    setMissing('')
    setStatus('idle')
  }

  return (
    <div className="rounded-3xl border border-white/5 bg-surface p-5 md:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          // ---------- Danke-Ansicht ----------
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-10 text-center"
            role="status"
          >
            <svg viewBox="0 0 52 52" className="mx-auto size-20" aria-hidden>
              <circle cx="26" cy="26" r="24" className="fill-accent/10 stroke-accent" strokeWidth="2" />
              {/* pathLength 0 -> 1: Der Haken "zeichnet" sich selbst */}
              <motion.path
                d="M15 27l7 7 15-15"
                fill="none"
                className="stroke-accent"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
              />
            </svg>
            <h3 className="mt-6 text-3xl">Danke für dein Feedback!</h3>
            <p className="mt-3 text-muted">Wir lesen alle Antworten und verbessern die Seite damit.</p>
            <Button variant="secondary" className="mt-8" onClick={reset}>
              Nochmals Feedback geben
            </Button>
          </motion.div>
        ) : (
          // ---------- Formular ----------
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            className="space-y-8"
            noValidate // Wir prüfen selbst und zeigen eigene Meldungen
          >
            {!ENDPOINT && (
              <p className="rounded-xl border border-dashed border-white/20 p-4 text-sm text-muted">
                Hinweis fürs Team: Das Formular ist noch nicht mit Formspree verbunden. Wie das geht, steht im README
                unter «Feedback-Formular».
              </p>
            )}

            {/* Sterne-Bewertung: echte Radio-Buttons (unsichtbar) mit Sternen als Darstellung */}
            <fieldset aria-describedby={showRatingError ? 'rating-error' : undefined}>
              <legend className="mb-3 font-display text-xl font-bold">
                Wie gefällt dir die Seite? <span className="text-accent">*</span>
              </legend>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="flex gap-1" onPointerLeave={() => setHoverRating(null)}>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label key={value} className="cursor-pointer" onPointerEnter={() => setHoverRating(value)}>
                      <input
                        type="radio"
                        name="rating"
                        value={value}
                        checked={rating === value}
                        onChange={() => {
                          setRating(value)
                          setShowRatingError(false)
                        }}
                        className="peer sr-only"
                      />
                      <span className="block rounded-lg p-1 transition-transform hover:scale-110 peer-focus-visible:outline-2 peer-focus-visible:outline-accent motion-reduce:hover:scale-100">
                        <StarIcon
                          className={`size-9 transition-colors md:size-10 ${
                            value <= shownRating ? 'fill-accent text-accent' : 'fill-none text-white/25'
                          }`}
                        />
                      </span>
                      <span className="sr-only">
                        {value} von 5 Sternen: {ratingLabels[value]}
                      </span>
                    </label>
                  ))}
                </div>
                <span className="text-muted" aria-hidden>
                  {ratingLabels[shownRating]}
                </span>
              </div>
              {showRatingError && (
                <p id="rating-error" className="mt-2 text-sm text-red-300">
                  Bitte wähle 1 bis 5 Sterne.
                </p>
              )}
            </fieldset>

            <div>
              <label htmlFor="feedback-liked" className="mb-2 block font-display text-xl font-bold">
                Was gefällt dir?
              </label>
              <textarea
                id="feedback-liked"
                rows={3}
                maxLength={1000}
                value={liked}
                onChange={(event) => setLiked(event.target.value)}
                placeholder="z.B. die Muskel-Karte, die Rezepte ..."
                className={textareaClass}
              />
            </div>

            <div>
              <label htmlFor="feedback-missing" className="mb-2 block font-display text-xl font-bold">
                Was fehlt dir?
              </label>
              <textarea
                id="feedback-missing"
                rows={3}
                maxLength={1000}
                value={missing}
                onChange={(event) => setMissing(event.target.value)}
                placeholder="z.B. mehr Übungen für zu Hause ..."
                className={textareaClass}
              />
            </div>

            {/* Honeypot gegen Spam: für Menschen unsichtbar und mit der Tastatur nicht erreichbar */}
            <input
              ref={honeypotRef}
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="hidden"
            />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-sm text-muted">
                Das Feedback ist anonym, bitte schreib keine persönlichen Daten hinein. Die Antworten werden über den
                Dienst Formspree an uns geschickt.
              </p>
              <Button type="submit" size="lg" disabled={!ENDPOINT || status === 'sending'} className="shrink-0">
                {status === 'sending' ? 'Wird gesendet …' : 'Feedback senden'}
              </Button>
            </div>

            {status === 'error' && (
              <p role="alert" className="rounded-xl border border-red-400/40 bg-red-400/5 p-4 text-sm text-red-200">
                Das hat leider nicht geklappt. Prüfe deine Internetverbindung und versuche es nochmals.
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
