import { findExercise } from '../../data/exercises'
import type { Plan } from '../../data/plans'
import { useI18n } from '../../i18n/i18n'
import { formatReps } from '../../utils/formatReps'

// Anzahl Spalten zum Eintragen der Gewichte (Woche 1 bis 4)
const LOG_WEEKS = [1, 2, 3, 4]

type Tip = { title: string; text: string }

// Druckansicht eines Plans: schwarz auf weiss, alle Trainingstage untereinander,
// mit leeren Spalten zum Eintragen der Gewichte (Trainingsprotokoll).
// Sie ist auf dem Bildschirm unsichtbar (hidden) und erscheint nur beim Drucken (print:block).
export default function PlanPrintView({ plan }: { plan: Plan }) {
  const { t, tList, has } = useI18n()
  const textKey = `plans.${plan.id}`
  const weekdays = tList('weekdays')
  const weekText = plan.week
    .map((dayId, index) => `${weekdays[index]}: ${dayId ? t(`${textKey}.days.${dayId}.short`) : t('plansPage.rest')}`)
    .join(' · ')

  return (
    <div className="hidden text-black print:block">
      <p className="text-sm">{t('plansPage.printView.header')}</p>
      <h1 className="mt-1 text-3xl">{t(`${textKey}.name`)}</h1>
      <p className="mt-2 text-sm">
        {t(`${textKey}.level`)} · {t(`${textKey}.frequency`)} · {t(`${textKey}.duration`)}
      </p>
      <p className="mt-3 text-sm">{t(`${textKey}.description`)}</p>
      <p className="mt-3 text-sm">
        <strong>{t('plansPage.printView.week')}:</strong> {weekText}
        {has(`${textKey}.weekNote`) && <> ({t(`${textKey}.weekNote`)})</>}
      </p>

      {plan.days.map((day) => (
        // break-inside-avoid: ein Trainingstag wird nicht auf zwei Seiten verteilt
        <section key={day.id} className="mt-6 break-inside-avoid">
          <h2 className="text-xl">
            {t(`${textKey}.days.${day.id}.name`)}{' '}
            <span className="text-sm font-normal">– {t(`${textKey}.days.${day.id}.focus`)}</span>
          </h2>
          {/* table-fixed + feste Breiten: alle Tabellen haben gleich breite Spalten */}
          <table className="mt-2 w-full table-fixed border-collapse text-sm">
            <thead>
              <tr>
                <th className="border border-black px-2 py-1 text-left">{t('plansPage.table.exercise')}</th>
                <th className="w-14 border border-black px-2 py-1">{t('plansPage.table.sets')}</th>
                <th className="w-28 border border-black px-2 py-1">{t('plansPage.table.reps')}</th>
                {LOG_WEEKS.map((week) => (
                  <th key={week} className="w-14 border border-black px-2 py-1">
                    {t('plansPage.printView.weekShort')}
                    {week}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {day.exercises.map((planExercise) => (
                <tr key={planExercise.slug}>
                  <td className="border border-black px-2 py-1.5">
                    {findExercise(planExercise.slug) && t(`exercises.${planExercise.slug}.name`)}
                  </td>
                  <td className="border border-black px-2 py-1.5 text-center">{planExercise.sets}</td>
                  <td className="border border-black px-2 py-1.5 text-center">
                    {formatReps(planExercise.reps, planExercise.unit, t)}
                  </td>
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
        <h2 className="text-xl">{t('plansPage.printView.tips')}</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {tList<Tip>('plansPage.tips').map((tip) => (
            <li key={tip.title}>
              <strong>{tip.title}:</strong> {tip.text}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs">{t('plansPage.printView.note')}</p>
      </section>
    </div>
  )
}
