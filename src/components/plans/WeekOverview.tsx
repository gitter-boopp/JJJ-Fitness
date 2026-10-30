import type { Plan } from '../../data/plans'
import { weekdays } from '../../data/plans'

type WeekOverviewProps = {
  plan: Plan
  activeDayId: string // Trainingstag, der gerade in den Tabs ausgewählt ist
  onSelectDay: (id: string) => void
}

// Zeigt die Woche von Montag bis Sonntag: Trainingstage und Ruhetage.
// Ein Klick auf einen Trainingstag öffnet ihn in den Tabs darunter.
export default function WeekOverview({ plan, activeDayId, onSelectDay }: WeekOverviewProps) {
  return (
    <div>
      <ol className="grid grid-cols-7 gap-1.5 sm:gap-3">
        {plan.week.map((dayId, index) => {
          const day = plan.days.find((planDay) => planDay.id === dayId)
          const active = dayId === activeDayId

          return (
            <li key={weekdays[index]}>
              {day ? (
                <button
                  type="button"
                  onClick={() => onSelectDay(day.id)}
                  aria-label={`${weekdays[index]}: ${day.name}`}
                  className={`flex w-full flex-col items-center gap-1 rounded-xl border px-1 py-3 transition-colors sm:py-4 ${
                    active
                      ? 'border-accent bg-accent/10'
                      : 'border-white/10 bg-surface hover:border-accent/50'
                  }`}
                >
                  <span className="text-xs text-muted">{weekdays[index]}</span>
                  <span className="text-xs font-bold text-accent sm:text-sm">{day.id}</span>
                </button>
              ) : (
                <div className="flex flex-col items-center gap-1 rounded-xl border border-dashed border-white/5 px-1 py-3 sm:py-4">
                  <span className="text-xs text-muted">{weekdays[index]}</span>
                  <span className="text-xs text-muted/60 sm:text-sm">Pause</span>
                </div>
              )}
            </li>
          )
        })}
      </ol>
      {plan.weekNote && <p className="mt-3 text-sm text-muted">{plan.weekNote}</p>}
    </div>
  )
}
