import { Link } from 'react-router'

import { findExercise } from '../../data/exercises'
import { findMuscle } from '../../data/muscles'
import type { PlanDay } from '../../data/plans'

// Tabelle mit den Übungen eines Trainingstags.
// Jeder Übungsname ist ein Link zur Detailseite mit der Anleitung.
// Auf dem Handy ist wenig Platz: Dort wird die Spalte "Sätze" ausgeblendet und
// stattdessen "4 × 6–8" in der letzten Spalte angezeigt.
export default function DayTable({ day }: { day: PlanDay }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-surface">
      <table className="w-full text-left">
        <caption className="px-5 pt-5 text-left text-muted md:px-6">{day.focus}</caption>
        <thead>
          <tr className="border-b border-white/5 text-xs tracking-widest text-muted uppercase">
            <th scope="col" className="px-5 py-4 font-medium md:px-6">
              Übung
            </th>
            <th scope="col" className="hidden px-2 py-4 text-center font-medium sm:table-cell">
              Sätze
            </th>
            <th scope="col" className="py-4 pr-5 pl-2 text-right font-medium md:pr-6">
              <span className="sm:hidden">Sätze × </span>Wdh.
            </th>
          </tr>
        </thead>
        <tbody>
          {day.exercises.map((planExercise, index) => {
            const exercise = findExercise(planExercise.slug)
            if (!exercise) return null
            const muscles = exercise.primary.map((id) => findMuscle(id)?.name).join(', ')
            // "10–12 pro Seite" -> range = "10–12", rest = ["pro", "Seite"]
            const [range, ...rest] = planExercise.reps.split(' ')

            return (
              <tr key={planExercise.slug} className="border-b border-white/5 last:border-0">
                <td className="py-4 pr-2 pl-5 md:px-6">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 font-display text-sm font-bold text-accent/70">{index + 1}</span>
                    <div>
                      <Link
                        to={`/uebungen/${exercise.slug}`}
                        className="font-semibold underline-offset-4 hover:text-accent hover:underline"
                      >
                        {exercise.name}
                      </Link>
                      <p className="mt-0.5 text-sm text-muted">{muscles}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-2 py-4 text-center font-display text-lg font-bold sm:table-cell">
                  {planExercise.sets}
                </td>
                <td className="py-4 pr-5 pl-2 text-right font-display font-bold sm:text-lg sm:whitespace-nowrap md:pr-6">
                  {/* Die Zahl ("10–12") nie umbrechen, nur den Zusatz ("pro Seite") */}
                  <span className="whitespace-nowrap">
                    <span className="sm:hidden">{planExercise.sets} × </span>
                    {range}
                  </span>
                  {rest.length > 0 && ` ${rest.join(' ')}`}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
