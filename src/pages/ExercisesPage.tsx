import { useSearchParams } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'

import { equipmentIds, exercises, levelIds } from '../data/exercises'
import { muscleIds } from '../data/muscles'
import { useI18n } from '../i18n/i18n'
import { filterExercises, filtersFromParams } from '../utils/filterExercises'
import ExerciseCard from '../components/exercises/ExerciseCard'
import FilterGroup from '../components/exercises/FilterGroup'
import Button from '../components/ui/Button'
import Chip from '../components/ui/Chip'
import { CloseIcon, SearchIcon } from '../components/ui/Icons'
import PageHeader from '../components/ui/PageHeader'
import Section from '../components/ui/Section'

export default function ExercisesPage() {
  const { t } = useI18n()
  // Alle Filter stehen in der Adresse (URL), z.B. /uebungen?muskel=brust&level=anfaenger
  // Vorteil: Man kann einen gefilterten Link teilen, und "Zurück" im Browser funktioniert.
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = filtersFromParams(searchParams)
  const results = filterExercises(exercises, filters, t)
  const hasFilters = Boolean(filters.muscle || filters.equipment || filters.level || filters.query)

  // Setzt einen Filter. value = undefined entfernt ihn ("Alle").
  // replace: true = kein neuer Eintrag im Browser-Verlauf bei jedem Klick
  const setFilter = (key: string, value: string | undefined) => {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous)
        if (value) next.set(key, value)
        else next.delete(key)
        return next
      },
      { replace: true },
    )
  }

  const resetFilters = () => setSearchParams({}, { replace: true })

  return (
    <Section>
      <title>{`${t('exercisesPage.title')} – JJJ Fitness`}</title>
      <PageHeader eyebrow={t('exercisesPage.eyebrow')} title={t('exercisesPage.heading')}>
        {t('exercisesPage.intro', { count: exercises.length })}
      </PageHeader>

      {/* ---------- Suche und Filter ---------- */}
      <div className="mt-12 space-y-8">
        <div className="relative max-w-xl">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" />
          <label htmlFor="exercise-search" className="sr-only">
            {t('exercisesPage.searchLabel')}
          </label>
          <input
            id="exercise-search"
            type="search"
            placeholder={t('exercisesPage.searchPlaceholder')}
            value={filters.query}
            onChange={(event) => setFilter('q', event.target.value || undefined)}
            className="w-full rounded-full border border-white/10 bg-surface py-3 pr-4 pl-12 text-text placeholder:text-muted/70 focus:border-accent/60 focus:outline-none"
          />
        </div>

        <FilterGroup legend={t('exercisesPage.muscleGroup')} scrollable>
          <Chip active={!filters.muscle} onClick={() => setFilter('muskel', undefined)}>
            {t('common.all')}
          </Chip>
          {muscleIds.map((id) => (
            <Chip
              key={id}
              active={filters.muscle === id}
              // Nochmals klicken = Filter wieder entfernen
              onClick={() => setFilter('muskel', filters.muscle === id ? undefined : id)}
            >
              {t(`muscles.${id}.name`)}
            </Chip>
          ))}
        </FilterGroup>

        <div className="grid gap-8 md:grid-cols-2">
          <FilterGroup legend={t('exercisesPage.equipment')} scrollable>
            <Chip active={!filters.equipment} onClick={() => setFilter('equipment', undefined)}>
              {t('common.all')}
            </Chip>
            {equipmentIds.map((id) => (
              <Chip
                key={id}
                active={filters.equipment === id}
                onClick={() => setFilter('equipment', filters.equipment === id ? undefined : id)}
              >
                {t(`equipment.${id}`)}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup legend={t('exercisesPage.level')}>
            <Chip active={!filters.level} onClick={() => setFilter('level', undefined)}>
              {t('common.all')}
            </Chip>
            {levelIds.map((id) => (
              <Chip
                key={id}
                active={filters.level === id}
                onClick={() => setFilter('level', filters.level === id ? undefined : id)}
              >
                {t(`levels.${id}`)}
              </Chip>
            ))}
          </FilterGroup>
        </div>
      </div>

      {/* ---------- Anzahl Treffer ---------- */}
      <div className="mt-12 flex min-h-10 items-center justify-between gap-4 border-t border-white/5 pt-6">
        {/* aria-live: Screenreader sagen die neue Anzahl an, wenn sich der Filter ändert */}
        <p aria-live="polite" className="text-muted">
          <strong className="text-text">{results.length}</strong>{' '}
          {results.length === 1 ? t('exercisesPage.countOne') : t('exercisesPage.countOther')}
        </p>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <CloseIcon className="size-4" />
            {t('exercisesPage.reset')}
          </Button>
        )}
      </div>

      {/* ---------- Ergebnisse ---------- */}
      {results.length > 0 ? (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* popLayout + layout: Karten gleiten an ihren neuen Platz, wenn andere verschwinden */}
          <AnimatePresence mode="popLayout" initial={false}>
            {results.map((exercise) => (
              <motion.li
                key={exercise.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <ExerciseCard exercise={exercise} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-white/10 p-10 text-center">
          <p className="font-display text-2xl font-bold">{t('exercisesPage.emptyTitle')}</p>
          <p className="mt-2 text-muted">{t('exercisesPage.emptyText')}</p>
          <Button variant="secondary" className="mt-6" onClick={resetFilters}>
            {t('exercisesPage.reset')}
          </Button>
        </div>
      )}
    </Section>
  )
}
