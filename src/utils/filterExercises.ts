import { equipmentLabel, equipmentOptions, levelOptions } from '../data/exercises'
import type { Equipment, Exercise, Level } from '../data/exercises'
import { findMuscle } from '../data/muscles'
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
  const equipment = params.get('equipment')
  const level = params.get('level')
  return {
    muscle: findMuscle(params.get('muskel'))?.id,
    equipment: equipmentOptions.find((option) => option.id === equipment)?.id,
    level: levelOptions.find((option) => option.id === level)?.id,
    query: params.get('q') ?? '',
  }
}

// Macht Text vergleichbar: alles klein, Umlaute ohne Punkte (ü -> u).
// So findet "rucken" auch "Rücken" und "BANK" auch "Bankdrücken".
export function normalize(text: string): string {
  return text
    .toLocaleLowerCase('de-CH')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

// Filtert die Übungsliste. Alle Filter müssen gleichzeitig passen (UND-Verknüpfung).
export function filterExercises(list: Exercise[], filters: ExerciseFilters): Exercise[] {
  const query = normalize(filters.query.trim())

  const result = list.filter((exercise) => {
    const allMuscles = [...exercise.primary, ...exercise.secondary]
    if (filters.muscle && !allMuscles.includes(filters.muscle)) return false
    if (filters.equipment && exercise.equipment !== filters.equipment) return false
    if (filters.level && exercise.level !== filters.level) return false

    if (query) {
      // Durchsucht Name, Muskeln und Equipment
      const searchText = normalize(
        [exercise.name, equipmentLabel(exercise.equipment), ...allMuscles.map((id) => findMuscle(id)?.name)].join(
          ' ',
        ),
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
