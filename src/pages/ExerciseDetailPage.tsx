import { Link, useLocation, useParams } from 'react-router'

import { findExercise } from '../data/exercises'
import type { Exercise } from '../data/exercises'
import type { MuscleId } from '../data/muscles'
import { useI18n } from '../i18n/i18n'
import { formatReps } from '../utils/formatReps'
import ExerciseCard from '../components/exercises/ExerciseCard'
import Reveal from '../components/motion/Reveal'
import BodyFigure from '../components/ui/BodyFigure'
import { ArrowLeftIcon, CloseIcon } from '../components/ui/Icons'
import Section from '../components/ui/Section'
import NotFoundPage from './NotFoundPage'

// Kleiner Link-Chip zu einem Muskel. Führt zur gefilterten Übungsliste.
function MuscleLink({ id, strong }: { id: MuscleId; strong: boolean }) {
  const { t } = useI18n()
  return (
    <Link
      to={`/uebungen?muskel=${id}`}
      className={`rounded-full border px-3 py-1.5 text-sm transition-colors hover:border-accent ${
        strong ? 'border-accent/50 text-text' : 'border-white/10 text-muted'
      }`}
    >
      {t(`muscles.${id}.name`)}
    </Link>
  )
}

// Grafik oder Foto der Übung
function ExerciseVisual({ exercise }: { exercise: Exercise }) {
  const { t } = useI18n()

  if (exercise.image) {
    return (
      <figure>
        <img
          src={exercise.image.src}
          alt={t(`exercises.${exercise.slug}.name`)}
          className="w-full rounded-xl object-cover"
        />
        <figcaption className="mt-2 text-xs text-muted">
          {t('exerciseDetail.imageCredit', { credit: exercise.image.credit })}
        </figcaption>
      </figure>
    )
  }

  const figureProps = {
    primary: exercise.primary,
    secondary: exercise.secondary,
    className: 'h-auto w-full max-w-[180px]',
  }
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <BodyFigure side="front" label={t('common.front')} {...figureProps} />
        <BodyFigure side="back" label={t('common.back')} {...figureProps} />
      </div>
      {/* Legende: was bedeuten die Farben? */}
      <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
        <span className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-accent" /> {t('exerciseDetail.primary')}
        </span>
        <span className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-accent/35" /> {t('exerciseDetail.secondary')}
        </span>
      </div>
    </>
  )
}

export default function ExerciseDetailPage() {
  const { t, tList } = useI18n()
  const { slug } = useParams() // slug aus der Adresse, z.B. "liegestuetz"
  const location = useLocation()
  const exercise = findExercise(slug)

  if (!exercise) return <NotFoundPage />

  // Alle Texte dieser Übung stehen in der Übersetzung unter "exercises.<slug>"
  const textKey = `exercises.${exercise.slug}`
  const name = t(`${textKey}.name`)

  // Filter von der Liste, damit "Alle Übungen" sie wiederherstellt (siehe ExerciseCard)
  const backSearch = (location.state as { from?: string } | null)?.from ?? ''
  const alternatives = exercise.alternatives
    .map((alternativeSlug) => findExercise(alternativeSlug))
    .filter((alternative) => alternative !== undefined)

  return (
    <>
      <title>{`${name} – JJJ Fitness`}</title>

      <Section>
        <Link
          to={`/uebungen${backSearch}`}
          className="-my-2 inline-flex items-center gap-2 py-2 text-sm text-muted transition-colors hover:text-text"
        >
          <ArrowLeftIcon className="size-4" />
          {t('exerciseDetail.back')}
        </Link>

        {/* ---------- Kopf ---------- */}
        <header className="mt-8 max-w-3xl">
          <p className="mb-4 text-sm font-semibold tracking-widest text-accent uppercase">
            {t(`equipment.${exercise.equipment}`)} · {t(`levels.${exercise.level}`)}
          </p>
          <h1 className="text-4xl leading-[1.05] sm:text-5xl md:text-6xl">{name}</h1>
          <p className="mt-6 text-lg text-muted md:text-xl">{t(`${textKey}.description`)}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {exercise.primary.map((id) => (
              <MuscleLink key={id} id={id} strong />
            ))}
            {exercise.secondary.map((id) => (
              <MuscleLink key={id} id={id} strong={false} />
            ))}
          </div>
        </header>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-10">
          {/* ---------- Links: Grafik und Empfehlung ---------- */}
          <div className="space-y-6">
            <Reveal className="rounded-2xl border border-white/5 bg-surface p-6">
              <ExerciseVisual exercise={exercise} />
            </Reveal>

            <Reveal delay={0.05} className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/5 bg-surface p-6">
                <p className="text-sm text-muted">{t('exerciseDetail.sets')}</p>
                <p className="mt-1 font-display text-4xl font-bold">{exercise.sets}</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-surface p-6">
                <p className="text-sm text-muted">{t('exerciseDetail.reps')}</p>
                <p className="mt-1 font-display text-2xl font-bold sm:text-3xl">
                  {formatReps(exercise.reps, exercise.unit, t)}
                </p>
              </div>
            </Reveal>
          </div>

          {/* ---------- Rechts: Ausführung und Fehler ---------- */}
          <div className="space-y-6">
            <Reveal className="rounded-2xl border border-white/5 bg-surface p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl">{t('exerciseDetail.howTo')}</h2>
              <ol className="mt-6 space-y-5">
                {tList(`${textKey}.steps`).map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent font-display font-bold text-accent-ink">
                      {index + 1}
                    </span>
                    <p className="pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.05} className="rounded-2xl border border-white/5 bg-surface p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl">{t('exerciseDetail.mistakes')}</h2>
              <ul className="mt-6 space-y-4">
                {tList(`${textKey}.mistakes`).map((mistake) => (
                  <li key={mistake} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-muted">
                      <CloseIcon className="size-4" />
                    </span>
                    <p className="pt-1 text-muted">{mistake}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------- Alternativen ---------- */}
      {alternatives.length > 0 && (
        <Section className="pt-0 md:pt-0">
          <h2 className="mb-8 text-3xl md:text-4xl">{t('exerciseDetail.alternatives')}</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {alternatives.map((alternative) => (
              <li key={alternative.slug}>
                <ExerciseCard exercise={alternative} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  )
}
