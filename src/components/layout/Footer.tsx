import { Link } from 'react-router'
import { navItems } from '../../data/navigation'
import Container from '../ui/Container'
import Logo from './Logo'

// Aktuelles Jahr für den Copyright-Hinweis (einmal beim Laden berechnet)
const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 py-12 print:hidden">
      <Container className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm text-muted">
            Übungen, Trainingspläne und Ernährungswissen für deinen Muskelaufbau. Ein Schulprojekt von KV-Lernenden
            aus Basel.
          </p>
        </div>

        <nav aria-label="Footer-Navigation">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="text-muted transition-colors hover:text-text">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/styleguide" className="text-muted transition-colors hover:text-text">
                Design-System
              </Link>
            </li>
          </ul>
        </nav>
      </Container>

      <Container className="mt-10 text-xs text-muted/70">
        <p>© {year} JJJ Fitness · Alle Angaben sind Richtwerte. Bei gesundheitlichen Fragen eine Fachperson fragen.</p>
      </Container>
    </footer>
  )
}
