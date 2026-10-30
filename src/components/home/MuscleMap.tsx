import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import { backShapes, frontShapes } from '../../data/bodyShapes'
import type { BodyShape } from '../../data/bodyShapes'
import { findMuscle, muscles } from '../../data/muscles'
import type { MuscleId } from '../../data/muscles'
import Reveal from '../motion/Reveal'
import Button from '../ui/Button'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'

// Spiegelt eine Form an der Mitte (x = 100): x wird zu 200 - x
const MIRROR = 'matrix(-1 0 0 1 200 0)'

type FigureProps = {
  label: string
  shapes: BodyShape[]
  selected: MuscleId | null
  hovered: MuscleId | null
  onHover: (muscle: MuscleId | null) => void
  onSelect: (muscle: MuscleId) => void
}

// Ein Körper (vorne ODER hinten) als SVG
function Figure({ label, shapes, selected, hovered, onHover, onSelect }: FigureProps) {
  return (
    <figure className="flex flex-col items-center">
      {/* aria-hidden: Für Tastatur und Screenreader gibt es unten die Muskel-Buttons */}
      <svg viewBox="0 0 200 420" className="h-auto w-full max-w-[220px]" aria-hidden>
        {shapes.map((shape, index) => {
          // Farbe je nach Zustand bestimmen
          let className: string
          if (shape.decor) {
            className = 'pointer-events-none fill-none stroke-bg stroke-[1.5]'
          } else if (!shape.muscle) {
            className = 'fill-surface-2' // neutraler Körperteil
          } else {
            const isSelected = shape.muscle === selected
            const isHovered = shape.muscle === hovered
            className = `cursor-pointer stroke-bg stroke-[1.5] transition-[fill] duration-200 ${
              isSelected
                ? 'fill-accent drop-shadow-[0_0_6px_rgb(198_255_61/0.6)]'
                : isHovered
                  ? 'fill-accent/60'
                  : 'fill-muscle'
            }`
          }

          // Maus- und Klick-Ereignisse nur für Muskeln
          const muscle = shape.muscle
          const events =
            muscle && !shape.decor
              ? {
                  onPointerEnter: () => onHover(muscle),
                  onPointerLeave: () => onHover(null),
                  onClick: () => onSelect(muscle),
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
      <figcaption className="mt-3 text-sm text-muted">{label}</figcaption>
    </figure>
  )
}

export default function MuscleMap() {
  const [selected, setSelected] = useState<MuscleId | null>(null)
  const [hovered, setHovered] = useState<MuscleId | null>(null)

  // Im Infokasten zeigen wir den Muskel unter der Maus, sonst den ausgewählten
  const shown = findMuscle(hovered ?? selected)

  const figureProps = { selected, hovered, onHover: setHovered, onSelect: setSelected }

  return (
    <Section id="muskel-karte">
      <SectionHeading eyebrow="Muskel-Karte" title="Welchen Muskel willst du trainieren?">
        Fahr mit der Maus über einen Muskel oder tippe ihn an. Danach zeigen wir dir die passenden Übungen.
      </SectionHeading>

      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* Die zwei Körper: vorne und hinten */}
        <Reveal className="relative rounded-3xl border border-white/5 bg-surface p-6 md:p-10">
          <div className="grid grid-cols-2 gap-4 md:gap-10">
            <Figure label="Vorne" shapes={frontShapes} {...figureProps} />
            <Figure label="Hinten" shapes={backShapes} {...figureProps} />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {/* Infokasten zum gewählten Muskel. aria-live: Screenreader lesen Änderungen vor. */}
          <div className="min-h-[11rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={shown?.id ?? 'leer'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {shown ? (
                  <>
                    <h3 className="text-3xl md:text-4xl">{shown.name}</h3>
                    <p className="mt-3 text-lg text-muted">{shown.description}</p>
                  </>
                ) : (
                  <>
                    <h3 className="text-3xl text-muted md:text-4xl">Wähle einen Muskel</h3>
                    <p className="mt-3 text-lg text-muted">Auf der Karte oder unten in der Liste.</p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {selected && (
            <Button to={`/uebungen?muskel=${selected}`} className="mb-8">
              Übungen für {findMuscle(selected)?.name} ansehen
            </Button>
          )}

          {/* Alle Muskeln als Buttons: praktisch auf dem Handy und für die Tastatur */}
          <ul className="flex flex-wrap gap-2" aria-label="Muskelgruppen">
            {muscles.map((muscle) => {
              const isSelected = muscle.id === selected
              return (
                <li key={muscle.id}>
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelected(isSelected ? null : muscle.id)}
                    onPointerEnter={() => setHovered(muscle.id)}
                    onPointerLeave={() => setHovered(null)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      isSelected
                        ? 'border-accent bg-accent text-accent-ink'
                        : 'border-white/10 text-muted hover:border-accent/50 hover:text-text'
                    }`}
                  >
                    {muscle.name}
                  </button>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
