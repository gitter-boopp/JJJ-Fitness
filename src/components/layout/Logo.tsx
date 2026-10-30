import { Link } from 'react-router'
import { useI18n } from '../../i18n/i18n'

type LogoProps = {
  onClick?: () => void
}

// Text-Logo: "JJJ" fett, der Punkt in der Akzentfarbe.
// Ein eigenes Text-Logo statt Bild: lädt sofort und ist immer scharf.
export default function Logo({ onClick }: LogoProps) {
  const { t } = useI18n()

  return (
    <Link to="/" onClick={onClick} className="font-display text-xl font-bold tracking-tight" aria-label={t('nav.home')}>
      JJJ<span className="text-accent">.</span>
      <span className="ml-1.5 font-medium text-muted">Fitness</span>
    </Link>
  )
}
