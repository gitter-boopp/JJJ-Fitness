import type { RepsUnit } from '../data/exercises'

// Setzt Wiederholungen und Einheit zusammen, z.B. "8–12" + perSide -> "8–12 pro Seite".
// Die Einheit kommt aus der Übersetzung ("units"), damit sie auch auf Französisch stimmt.
export function formatReps(reps: string, unit: RepsUnit | undefined, t: (key: string) => string): string {
  return unit ? `${reps} ${t(`units.${unit}`)}` : reps
}
