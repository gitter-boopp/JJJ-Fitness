import type { ReactNode } from 'react'

type ChipProps = {
  children: ReactNode
  active: boolean // ausgewählt oder nicht
  onClick: () => void
  onPointerEnter?: () => void
  onPointerLeave?: () => void
}

// Kleiner runder Button zum An- und Abwählen, z.B. für Filter.
// aria-pressed sagt Screenreadern, ob der Button gerade "gedrückt" (aktiv) ist.
export default function Chip({ children, active, onClick, onPointerEnter, onPointerLeave }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
        active
          ? 'border-accent bg-accent text-accent-ink'
          : 'border-white/10 text-muted hover:border-accent/50 hover:text-text'
      }`}
    >
      {children}
    </button>
  )
}
