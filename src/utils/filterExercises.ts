import { equipmentIds, levelIds } from '../data/exercises'
import type { Equipment, Exercise, Level } from '../data/exercises'
import { isMuscleId } from '../data/muscles'
import type { MuscleId } from '../data/muscles'

// Die aktuell gewählten Filter. undefined = "Alle"
export type ExerciseFilters = {
  muscle?: MuscleId
  equipment?: Equipment
  level?: Level
  query: string // Suchtext
}

// Liest die Filter aus der Adresse, z.B. /uebungen?muskel=brust&equipment=kurzhantel
// Ungültige Werte (z.B. ?muskel=quatsch) werden einfach ignoriert.
export function filtersFromParams(params: URLSearchParams): ExerciseFilters {
  const muscle = params.get('muskel')
  const equipment = params.get('equipment') as Equipment
  const level = params.get('level') as Level
  return {
    muscle: isMuscleId(muscle) ? muscle : undefined,
    equipment: equipmentIds.includes(equipment) ? equipment : undefined,
    level: levelIds.includes(level) ? level : undefined,
    query: params.get('q') ?? '',
  }
}

// Macht Text vergleichbar: alles klein, Akzente und Umlaute ohne Punkte (ü -> u, é -> e).
// So findet "rucken" auch "Rücken" und "developpe" auch "Développé".
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // entfernt die Akzent-Zeichen
}

// Filtert die Übungsliste. Alle Filter müssen gleichzeitig passen (UND-Verknüpfung).
// t: Übersetzungs-Funktion, damit die Suche in der gewählten Sprache sucht.
export function filterExercises(
  list: Exercise[],
  filters: ExerciseFilters,
  t: (key: string) => string,
): Exercise[] {
  const query = normalize(filters.query.trim())

  const result = list.filter((exercise) => {
    const allMuscles = [...exercise.primary, ...exercise.secondary]
    if (filters.muscle && !allMuscles.includes(filters.muscle)) return false
    if (filters.equipment && exercise.equipment !== filters.equipment) return false
    if (filters.level && exercise.level !== filters.level) return false

    if (query) {
      // Durchsucht Name, Muskeln und Equipment
      const searchText = normalize(
        [
          t(`exercises.${exercise.slug}.name`),
          t(`equipment.${exercise.equipment}`),
          ...allMuscles.map((id) => t(`muscles.${id}.name`)),
        ].join(' '),
      )
      if (!searchText.includes(query)) return false
    }
    return true
  })

  // Bei einem Muskel-Filter: Übungen, bei denen der Muskel Hauptmuskel ist, zuerst
  if (filters.muscle) {
    const muscle = filters.muscle
    result.sort((a, b) => Number(b.primary.includes(muscle)) - Number(a.primary.includes(muscle)))
  }

  return result
}
