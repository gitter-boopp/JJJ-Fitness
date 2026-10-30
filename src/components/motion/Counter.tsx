import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

type CounterProps = {
  to: number // Zielzahl
  suffix?: string // z.B. "+" für "30+"
  duration?: number // Dauer in Sekunden
}

// Zahl, die von 0 hochzählt, sobald sie sichtbar wird.
export default function Counter({ to, suffix = '', duration = 1.6 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!inView || reduceMotion) return

    // animate() zählt von 0 bis "to". Bei jedem Schritt schreiben wir die Zahl direkt
    // ins HTML. Das ist schneller, als React bei jedem Schritt neu zeichnen zu lassen.
    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (value) => {
        if (ref.current) ref.current.textContent = `${Math.round(value)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, reduceMotion, to, suffix, duration])

  return (
    <>
      {/* Für Screenreader: gleich die Endzahl, ohne Hochzählen */}
      <span className="sr-only">
        {to}
        {suffix}
      </span>
      {/* Sichtbare Zahl. Ohne Animation (reduced motion) direkt die Endzahl. */}
      <span ref={ref} aria-hidden className="tabular-nums">
        {reduceMotion ? to : 0}
        {suffix}
      </span>
    </>
  )
}
