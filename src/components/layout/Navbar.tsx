import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useLenis } from 'lenis/react'

import { navItems } from '../../data/navigation'
import { useI18n } from '../../i18n/i18n'
import Container from '../ui/Container'
import Button from '../ui/Button'
import LanguageSwitch from './LanguageSwitch'
import Logo from './Logo'

// Ab wie vielen Pixeln Scrollen die Navigation kleiner wird
const SCROLL_THRESHOLD = 24

export default function Navbar() {
  const { t } = useI18n()
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
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 print:hidden ${
          scrolled
            ? 'border-white/10 bg-bg/70 py-3 backdrop-blur-xl' // gescrollt: kleiner, mit Blur
            : 'border-transparent bg-transparent py-5' // ganz oben: grösser, durchsichtig
        }`}
      >
        <Container className="flex items-center justify-between gap-6">
          <Logo onClick={closeMenu} />

          {/* Desktop-Menü (erst ab lg = 1024px sichtbar, auf Französisch sind die Wörter länger) */}
          <nav aria-label={t('nav.main')} className="hidden lg:block">
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
                        {t(`nav.${item.key}`)}
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

          <div className="flex items-center gap-3">
            <LanguageSwitch idPrefix="header" />
            {/* Eigener Wrapper: "hidden" direkt am Button würde mit dessen "inline-flex" kollidieren */}
            <div className="hidden lg:block">
              <Button to="/uebungen" size="sm">
                {t('nav.start')}
              </Button>
            </div>

            {/* Burger-Button fürs Handy und Tablet */}
            <button
              type="button"
              className="relative -mr-2 flex size-11 items-center justify-center lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
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
          </div>
        </Container>
      </header>

      {/* Handy-Menü: AnimatePresence erlaubt eine Animation auch beim Schliessen */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-bg/95 pt-24 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label={t('nav.mainMobile')}>
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
                        {t(`nav.${item.key}`)}
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
                    {t('nav.start')}
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
