import { Outlet } from 'react-router'
import SmoothScroll from './SmoothScroll'
import Navbar from './Navbar'
import Footer from './Footer'

// Das Grundgerüst jeder Seite: Navigation, Inhalt, Footer.
// <Outlet /> ist der Platz, an dem React Router die aktuelle Seite einsetzt.
export default function Layout() {
  return (
    <SmoothScroll>
      {/* Für Tastatur- und Screenreader-Nutzer: direkt zum Inhalt springen.
          Unsichtbar, bis man mit Tab draufkommt. */}
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-accent px-4 py-2 font-semibold text-accent-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Zum Inhalt springen
      </a>

      <Navbar />

      {/* Abstand oben, damit der Inhalt nicht unter der fixen Navigation verschwindet */}
      <main id="main" className="pt-20 md:pt-24">
        <Outlet />
      </main>

      <Footer />
    </SmoothScroll>
  )
}
