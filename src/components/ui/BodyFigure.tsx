import { backShapes, frontShapes } from '../../data/bodyShapes'
import type { MuscleId } from '../../data/muscles'

// Spiegelt eine Form an der Mitte (x = 100): x wird zu 200 - x
const MIRROR = 'matrix(-1 0 0 1 200 0)'

type BodyFigureProps = {
  side: 'front' | 'back'
  primary?: MuscleId[] // leuchten in voller Akzentfarbe
  secondary?: MuscleId[] // leuchten schwächer
  hovered?: MuscleId | null // Muskel unter der Maus
  onHover?: (muscle: MuscleId | null) => void
  onSelect?: (muscle: MuscleId) => void // Wenn gesetzt, sind die Muskeln anklickbar
  label?: string // Text unter der Figur
  className?: string
}

// Ein Körper (vorne ODER hinten) als SVG.
// Wird auf der Startseite (Muskel-Karte), in den Übungskarten und auf der Detailseite verwendet.
export default function BodyFigure({
  side,
  primary = [],
  secondary = [],
  hovered = null,
  onHover,
  onSelect,
  label,
  className = '',
}: BodyFigureProps) {
  const shapes = side === 'front' ? frontShapes : backShapes
  const interactive = Boolean(onSelect)

  // Farbe eines Muskels je nach Zustand
  const fillFor = (muscle: MuscleId) => {
    if (primary.includes(muscle)) {
      // Der Glow (drop-shadow) nur bei der grossen, interaktiven Karte, das spart Leistung
      return interactive ? 'fill-accent drop-shadow-[0_0_6px_rgb(198_255_61/0.6)]' : 'fill-accent'
    }
    if (hovered === muscle) return 'fill-accent/60'
    if (secondary.includes(muscle)) return 'fill-accent/35'
    return 'fill-muscle'
  }

  return (
    <figure className="flex h-full flex-col items-center justify-center">
      {/* aria-hidden: Die Grafik ist Deko. Die Infos stehen immer auch als Text daneben. */}
      <svg viewBox="0 0 200 420" className={className} aria-hidden>
        {shapes.map((shape, index) => {
          let className: string
          if (shape.decor) {
            className = 'pointer-events-none fill-none stroke-bg stroke-[1.5]'
          } else if (!shape.muscle) {
            className = 'fill-surface-2' // neutraler Körperteil
          } else {
            className = `stroke-bg stroke-[1.5] transition-[fill] duration-200 ${fillFor(shape.muscle)} ${
              interactive ? 'cursor-pointer' : ''
            }`
          }

          // Maus- und Klick-Ereignisse nur für Muskeln und nur, wenn die Figur interaktiv ist
          const muscle = shape.muscle
          const events =
            muscle && !shape.decor && interactive
              ? {
                  onPointerEnter: () => onHover?.(muscle),
                  onPointerLeave: () => onHover?.(null),
                  onClick: () => onSelect?.(muscle),
                }
              : {}

          return (
            <g key={index}>
              <path d={shape.d} className={className} {...events} />
              {shape.mirror && <path d={shape.d} transform={MIRROR} className={className} {...events} />}
            </g>
          )
        })}
      </svg>
      {label && <figcaption className="mt-3 text-sm text-muted">{label}</figcaption>}
    </figure>
  )
}
