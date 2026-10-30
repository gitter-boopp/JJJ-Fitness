import { Link } from 'react-router'

type LogoProps = {
  onClick?: () => void
}

// Text-Logo: "JJJ" fett, der Punkt in der Akzentfarbe.
// Ein eigenes Text-Logo statt Bild: lädt sofort und ist immer scharf.
export default function Logo({ onClick }: LogoProps) {
  return (
    <Link to="/" onClick={onClick} className="font-display text-xl font-bold tracking-tight" aria-label="JJJ Fitness, zur Startseite">
      JJJ<span className="text-accent">.</span>
      <span className="ml-1.5 font-medium text-muted">Fitness</span>
    </Link>
  )
}
