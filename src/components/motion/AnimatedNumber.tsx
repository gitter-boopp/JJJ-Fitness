import { useEffect, useRef } from 'react'
import { animate, useReducedMotion } from 'motion/react'

import { formatNumber } from '../../utils/nutrition'

// Zahl, die weich zum neuen Wert gleitet, wenn sie sich ändert (z.B. im Rechner).
// Wie beim Counter schreiben wir die Zahl direkt ins HTML, das ist schneller.
export default function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const previous = useRef(value) // der alte Wert, von dem aus wir starten
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const from = previous.current
    previous.current = value
    const element = ref.current
    if (!element) return

    if (reduceMotion || from === value) {
      element.textContent = formatNumber(value)
      return
    }

    const controls = animate(from, value, {
      duration: 0.6,
      ease: 'easeOut',
      onUpdate: (current) => {
        element.textContent = formatNumber(current)
      },
    })
    return () => controls.stop()
  }, [value, reduceMotion])

  return (
    <span ref={ref} className="tabular-nums">
      {formatNumber(value)}
    </span>
  )
}
