import { findExercise } from '../../data/exercises'
import type { Plan } from '../../data/plans'
import { planTips, weekdays } from '../../data/plans'

// Spaltenköpfe zum Eintragen der Gewichte, z.B. "W1" = Woche 1
const LOG_WEEKS = ['W1', 'W2', 'W3', 'W4']

// Druckansicht eines Plans: schwarz auf weiss, alle Trainingstage untereinander,
// mit leeren Spalten zum Eintragen der Gewichte (Trainingsprotokoll).
// Sie ist auf dem Bildschirm unsichtbar (hidden) und erscheint nur beim Drucken (print:block).
export default function PlanPrintView({ plan }: { plan: Plan }) {
  const weekText = plan.week.map((dayId, index) => `${weekdays[index]}: ${dayId ?? 'Pause'}`).join(' · ')

  return (
    <div className="hidden text-black print:block">
      <p className="text-sm">JJJ Fitness · Trainingsplan</p>
      <h1 className="mt-1 text-3xl">{plan.name}</h1>
      <p className="mt-2 text-sm">
        {plan.level} · {plan.frequency} · {plan.duration}
      </p>
      <p className="mt-3 text-sm">{plan.description}</p>
      <p className="mt-3 text-sm">
        <strong>Woche:</strong> {weekText}
        {plan.weekNote && <> ({plan.weekNote})</>}
      </p>

      {plan.days.map((day) => (
        // break-inside-avoid: ein Trainingstag wird nicht auf zwei Seiten verteilt
        <section key={day.id} className="mt-6 break-inside-avoid">
          <h2 className="text-xl">
            {day.name} <span className="text-sm font-normal">– {day.focus}</span>
          </h2>
          {/* table-fixed + feste Breiten: alle Tabellen haben gleich breite Spalten */}
          <table className="mt-2 w-full table-fixed border-collapse text-sm">
            <thead>
              <tr>
                <th className="border border-black px-2 py-1 text-left">Übung</th>
                <th className="w-14 border border-black px-2 py-1">Sätze</th>
                <th className="w-28 border border-black px-2 py-1">Wdh.</th>
                {LOG_WEEKS.map((week) => (
                  <th key={week} className="w-14 border border-black px-2 py-1">
                    {week}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {day.exercises.map((planExercise) => (
                <tr key={planExercise.slug}>
                  <td className="border border-black px-2 py-1.5">{findExercise(planExercise.slug)?.name}</td>
                  <td className="border border-black px-2 py-1.5 text-center">{planExercise.sets}</td>
                  <td className="border border-black px-2 py-1.5 text-center">{planExercise.reps}</td>
                  {LOG_WEEKS.map((week) => (
                    <td key={week} className="border border-black px-2 py-1.5" />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}

      <section className="mt-6 break-inside-avoid text-sm">
        <h2 className="text-xl">Tipps</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {planTips.map((tip) => (
            <li key={tip.title}>
              <strong>{tip.title}:</strong> {tip.text}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs">
          In die Spalten W1 bis W4 kannst du das Gewicht pro Woche eintragen. Alle Angaben sind Richtwerte. Bei
          Schmerzen oder gesundheitlichen Fragen eine Fachperson fragen.
        </p>
      </section>
    </div>
  )
}
