import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { useReducedMotion } from 'motion/react'
import { useLocation } from 'react-router'

// Springt bei jedem Seitenwechsel nach oben.
// Ohne das würde die neue Seite an der gleichen Scroll-Position starten wie die alte.
function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, lenis])

  return null
}

// Weiches Scrollen mit Lenis für die ganze Seite.
// Wer "Bewegung reduzieren" eingestellt hat, bekommt normales Scrollen.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <>
        <ScrollToTopOnRouteChange />
        {children}
      </>
    )
  }

  return (
    // root = Lenis steuert das Scrollen des ganzen Fensters
    // lerp = wie "weich" gescrollt wird (kleiner = weicher, 0.1 ist ein guter Mittelwert)
    <ReactLenis root options={{ lerp: 0.1, autoRaf: true }}>
      <ScrollToTopOnRouteChange />
      {children}
    </ReactLenis>
  )
}
