import { useSearchParams } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'

import { equipmentOptions, exercises, levelOptions } from '../data/exercises'
import { muscles } from '../data/muscles'
import { filterExercises, filtersFromParams } from '../utils/filterExercises'
import ExerciseCard from '../components/exercises/ExerciseCard'
import FilterGroup from '../components/exercises/FilterGroup'
import Button from '../components/ui/Button'
import Chip from '../components/ui/Chip'
import { CloseIcon, SearchIcon } from '../components/ui/Icons'
import PageHeader from '../components/ui/PageHeader'
import Section from '../components/ui/Section'

export default function ExercisesPage() {
  // Alle Filter stehen in der Adresse (URL), z.B. /uebungen?muskel=brust&level=anfaenger
  // Vorteil: Man kann einen gefilterten Link teilen, und "Zurück" im Browser funktioniert.
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = filtersFromParams(searchParams)
  const results = filterExercises(exercises, filters)
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
      <title>Übungen – JJJ Fitness</title>
      <PageHeader eyebrow="Übungsbibliothek" title="Übungen">
        {exercises.length} Übungen mit Anleitung Schritt für Schritt. Filtere nach Muskel, Equipment und Level.
      </PageHeader>

      {/* ---------- Suche und Filter ---------- */}
      <div className="mt-12 space-y-8">
        <div className="relative max-w-xl">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" />
          <label htmlFor="exercise-search" className="sr-only">
            Übung suchen
          </label>
          <input
            id="exercise-search"
            type="search"
            placeholder="Übung suchen, z.B. Kniebeuge"
            value={filters.query}
            onChange={(event) => setFilter('q', event.target.value || undefined)}
            className="w-full rounded-full border border-white/10 bg-surface py-3 pr-4 pl-12 text-text placeholder:text-muted/70 focus:border-accent/60 focus:outline-none"
          />
        </div>

        <FilterGroup legend="Muskelgruppe" scrollable>
          <Chip active={!filters.muscle} onClick={() => setFilter('muskel', undefined)}>
            Alle
          </Chip>
          {muscles.map((muscle) => (
            <Chip
              key={muscle.id}
              active={filters.muscle === muscle.id}
              // Nochmals klicken = Filter wieder entfernen
              onClick={() => setFilter('muskel', filters.muscle === muscle.id ? undefined : muscle.id)}
            >
              {muscle.name}
            </Chip>
          ))}
        </FilterGroup>

        <div className="grid gap-8 md:grid-cols-2">
          <FilterGroup legend="Equipment" scrollable>
            <Chip active={!filters.equipment} onClick={() => setFilter('equipment', undefined)}>
              Alle
            </Chip>
            {equipmentOptions.map((option) => (
              <Chip
                key={option.id}
                active={filters.equipment === option.id}
                onClick={() => setFilter('equipment', filters.equipment === option.id ? undefined : option.id)}
              >
                {option.label}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup legend="Level">
            <Chip active={!filters.level} onClick={() => setFilter('level', undefined)}>
              Alle
            </Chip>
            {levelOptions.map((option) => (
              <Chip
                key={option.id}
                active={filters.level === option.id}
                onClick={() => setFilter('level', filters.level === option.id ? undefined : option.id)}
              >
                {option.label}
              </Chip>
            ))}
          </FilterGroup>
        </div>
      </div>

      {/* ---------- Anzahl Treffer ---------- */}
      <div className="mt-12 flex min-h-10 items-center justify-between gap-4 border-t border-white/5 pt-6">
        {/* aria-live: Screenreader sagen die neue Anzahl an, wenn sich der Filter ändert */}
        <p aria-live="polite" className="text-muted">
          <strong className="text-text">{results.length}</strong> {results.length === 1 ? 'Übung' : 'Übungen'}
        </p>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <CloseIcon className="size-4" />
            Filter zurücksetzen
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
          <p className="font-display text-2xl font-bold">Keine Übung gefunden</p>
          <p className="mt-2 text-muted">Probier einen anderen Suchbegriff oder weniger Filter.</p>
          <Button variant="secondary" className="mt-6" onClick={resetFilters}>
            Filter zurücksetzen
          </Button>
        </div>
      )}
    </Section>
  )
}
