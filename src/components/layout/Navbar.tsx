import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useLenis } from 'lenis/react'

import { navItems } from '../../data/navigation'
import Container from '../ui/Container'
import Button from '../ui/Button'
import Logo from './Logo'

// Ab wie vielen Pixeln Scrollen die Navigation kleiner wird
const SCROLL_THRESHOLD = 24

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lenis = useLenis()

  // useScroll liefert die aktuelle Scroll-Position. Wir merken uns nur,
  // ob schon gescrollt wurde (true/false), damit React nicht bei jedem Pixel neu zeichnet.
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > SCROLL_THRESHOLD))

  const closeMenu = () => setMenuOpen(false)

  // Solange das Handy-Menü offen ist: Seite darf nicht scrollen, Escape schliesst das Menü.
  useEffect(() => {
    if (!menuOpen) return

    lenis?.stop()
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    // Aufräumen, sobald das Menü wieder zu ist
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen, lenis])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b print:hidden transition-all duration-300 ${
          scrolled
            ? 'border-white/10 bg-bg/70 py-3 backdrop-blur-xl' // gescrollt: kleiner, mit Blur
            : 'border-transparent bg-transparent py-5' // ganz oben: grösser, durchsichtig
        }`}
      >
        <Container className="flex items-center justify-between gap-6">
          <Logo onClick={closeMenu} />

          {/* Desktop-Menü (erst ab md = 768px sichtbar) */}
          <nav aria-label="Hauptnavigation" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `relative block px-4 py-2 text-sm font-medium transition-colors ${
                        isActive ? 'text-text' : 'text-muted hover:text-text'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {/* Kleiner Strich unter dem aktiven Menüpunkt. Dank layoutId
                            gleitet er beim Seitenwechsel zum neuen Menüpunkt. */}
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent"
                            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:block">
            <Button to="/uebungen" size="sm">
              Jetzt starten
            </Button>
          </div>

          {/* Burger-Button fürs Handy */}
          <button
            type="button"
            className="relative -mr-2 flex size-11 items-center justify-center md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Menü schliessen' : 'Menü öffnen'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {/* Zwei Striche, die sich beim Öffnen zu einem X drehen */}
            <span
              className={`absolute h-0.5 w-6 rounded-full bg-text transition-transform duration-300 ${
                menuOpen ? 'rotate-45' : '-translate-y-1'
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 rounded-full bg-text transition-transform duration-300 ${
                menuOpen ? '-rotate-45' : 'translate-y-1'
              }`}
            />
          </button>
        </Container>
      </header>

      {/* Handy-Menü: AnimatePresence erlaubt eine Animation auch beim Schliessen */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-bg/95 pt-24 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label="Hauptnavigation mobil">
              <Container>
                <ul className="flex flex-col gap-2">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.path}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      // Jeder Menüpunkt startet etwas später -> "gestaffelt"
                      transition={{ delay: 0.05 + index * 0.05, duration: 0.3 }}
                    >
                      <NavLink
                        to={item.path}
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `block py-3 font-display text-4xl font-bold ${isActive ? 'text-accent' : 'text-text'}`
                        }
                      >
                        {item.label}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
                <motion.div
                  className="mt-10"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <Button to="/uebungen" size="lg" className="w-full" onClick={closeMenu}>
                    Jetzt starten
                  </Button>
                </motion.div>
              </Container>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
