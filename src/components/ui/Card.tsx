import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
  // interactive = Karte reagiert auf Hover (anheben + Glow). Für klickbare Karten.
  interactive?: boolean
}

// Dunkle Box für Inhalte (Übungen, Rezepte, Infos ...).
export default function Card({ children, className = '', interactive = false }: CardProps) {
  const hover = interactive
    ? 'hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow motion-reduce:hover:translate-y-0'
    : ''

  return (
    <div className={`rounded-2xl border border-white/5 bg-surface p-6 transition duration-300 ${hover} ${className}`}>
      {children}
    </div>
  )
}
