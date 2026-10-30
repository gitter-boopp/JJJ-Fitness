import { Link, useLocation } from 'react-router'

import { sideForMuscles } from '../../data/bodyShapes'
import type { Exercise } from '../../data/exercises'
import { useI18n } from '../../i18n/i18n'
import { formatReps } from '../../utils/formatReps'
import BodyFigure from '../ui/BodyFigure'

// Karte für eine Übung in der Liste. Zeigt ein Foto, falls vorhanden,
// sonst eine kleine Körper-Grafik mit den trainierten Muskeln.
export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const { t } = useI18n()
  const location = useLocation()
  const name = t(`exercises.${exercise.slug}.name`)
  const muscleNames = exercise.primary.map((id) => t(`muscles.${id}.name`)).join(', ')

  return (
    <Link
      to={`/uebungen/${exercise.slug}`}
      // Wir merken uns die aktuellen Filter, damit "Zurück" auf der Detailseite sie wiederherstellt
      state={{ from: location.search }}
      className="group flex h-full flex-col rounded-2xl border border-white/5 bg-surface p-3 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow motion-reduce:hover:translate-y-0"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-2">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgb(198_255_61/0.08),transparent_65%)] p-4 transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100">
          {exercise.image ? (
            <img
              src={exercise.image.src}
              alt={name}
              loading="lazy" // Bild erst laden, wenn es fast sichtbar ist
              className="size-full rounded-lg object-cover"
            />
          ) : (
            <BodyFigure
              side={sideForMuscles(exercise.primary)}
              primary={exercise.primary}
              secondary={exercise.secondary}
              className="h-full w-auto"
            />
          )}
        </div>

        {/* Level oben rechts */}
        <span className="absolute top-3 right-3 rounded-full bg-bg/80 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
          {t(`levels.${exercise.level}`)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold tracking-widest text-accent uppercase">{muscleNames}</p>
        <h3 className="mt-2 text-xl">{name}</h3>
        <p className="mt-2 flex-1 text-sm text-muted">{t(`exercises.${exercise.slug}.description`)}</p>
        <p className="mt-4 text-sm text-muted">
          {t(`equipment.${exercise.equipment}`)} · {exercise.sets} × {formatReps(exercise.reps, exercise.unit, t)}
        </p>
      </div>
    </Link>
  )
}
