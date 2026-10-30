import { AnimatePresence, motion } from 'motion/react'
import { useLocation, useOutlet } from 'react-router'
import { useLenis } from 'lenis/react'

// Seitenübergang: Die alte Seite blendet aus, dann springt es nach oben,
// dann blendet die neue Seite ein.
export default function PageTransition() {
  const location = useLocation()
  // useOutlet statt <Outlet />: So "friert" die alte Seite während dem Ausblenden ein
  // und zeigt nicht schon den Inhalt der neuen Seite.
  const outlet = useOutlet()
  const lenis = useLenis()

  const scrollToTop = () => {
    // force: auch scrollen, wenn Lenis gerade pausiert ist (z.B. Handy-Menü war offen)
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
  }

  return (
    // mode="wait": erst wenn die alte Seite weg ist, kommt die neue
    // initial={false}: beim allerersten Laden keine Übergangs-Animation
    <AnimatePresence mode="wait" initial={false} onExitComplete={scrollToTop}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  )
}
