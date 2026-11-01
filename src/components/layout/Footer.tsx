import { Link } from 'react-router'
import { navItems } from '../../data/navigation'
import { useI18n } from '../../i18n/i18n'
import Container from '../ui/Container'
import Logo from './Logo'

// Aktuelles Jahr für den Copyright-Hinweis (einmal beim Laden berechnet)
const year = new Date().getFullYear()

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="mt-24 border-t border-white/5 py-12 print:hidden">
      <Container className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm text-muted">{t('footer.text')}</p>
        </div>

        <nav aria-label={t('footer.label')}>
          {/* inline-block py-2: grössere Tippfläche auf dem Handy (mind. ca. 32 px hoch) */}
          <ul className="grid grid-cols-2 gap-x-10 text-sm">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="inline-block py-2 text-muted transition-colors hover:text-text">
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/styleguide" className="inline-block py-2 text-muted transition-colors hover:text-text">
                {t('footer.styleguide')}
              </Link>
            </li>
          </ul>
        </nav>
      </Container>

      <Container className="mt-10 text-xs text-muted/70">
        <p>
          © {year} JJJ Fitness · {t('footer.disclaimer')}
        </p>
      </Container>
    </footer>
  )
}
