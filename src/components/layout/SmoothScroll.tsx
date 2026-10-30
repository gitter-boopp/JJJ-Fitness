import type { ReactNode } from 'react'
import { ReactLenis } from 'lenis/react'
import { useReducedMotion } from 'motion/react'

// Weiches Scrollen mit Lenis für die ganze Seite.
// Wer "Bewegung reduzieren" eingestellt hat, bekommt normales Scrollen.
// (Das Hochspringen beim Seitenwechsel macht jetzt PageTransition.)
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return <>{children}</>

  return (
    // root = Lenis steuert das Scrollen des ganzen Fensters
    // lerp = wie "weich" gescrollt wird (kleiner = weicher, 0.1 ist ein guter Mittelwert)
    <ReactLenis root options={{ lerp: 0.1, autoRaf: true }}>
      {children}
    </ReactLenis>
  )
}
