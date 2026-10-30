import { useEffect, useRef } from 'react'
import { animate, useReducedMotion } from 'motion/react'

import { useI18n } from '../../i18n/i18n'
import { formatNumber } from '../../utils/nutrition'

// Zahl, die weich zum neuen Wert gleitet, wenn sie sich ändert (z.B. im Rechner).
// Wie beim Counter schreiben wir die Zahl direkt ins HTML, das ist schneller.
// Das Zahlenformat passt sich der Sprache an: Deutsch "2’750", Französisch "2 750".
export default function AnimatedNumber({ value }: { value: number }) {
  const { lang } = useI18n()
  const ref = useRef<HTMLSpanElement>(null)
  const previous = useRef(value) // der alte Wert, von dem aus wir starten
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const from = previous.current
    previous.current = value
    const element = ref.current
    if (!element) return

    if (reduceMotion || from === value) {
      element.textContent = formatNumber(value, lang)
      return
    }

    const controls = animate(from, value, {
      duration: 0.6,
      ease: 'easeOut',
      onUpdate: (current) => {
        element.textContent = formatNumber(current, lang)
      },
    })
    return () => controls.stop()
  }, [value, reduceMotion, lang])

  return (
    <span ref={ref} className="tabular-nums">
      {formatNumber(value, lang)}
    </span>
  )
}
