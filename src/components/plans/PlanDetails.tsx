import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import type { Plan } from '../../data/plans'
import { useI18n } from '../../i18n/i18n'
import Button from '../ui/Button'
import { PrinterIcon } from '../ui/Icons'
import Tabs from '../ui/Tabs'
import DayTable from './DayTable'
import WeekOverview from './WeekOverview'

// Alle Infos zu einem Plan: Beschreibung, Woche, Tabs pro Trainingstag.
// Tipp: Auf der Seite bekommt diese Komponente key={plan.id}. Dadurch startet sie
// bei einem Planwechsel neu, und der ausgewählte Tag springt automatisch auf den ersten.
export default function PlanDetails({ plan }: { plan: Plan }) {
  const { t } = useI18n()
  const [dayId, setDayId] = useState(plan.days[0].id)
  const day = plan.days.find((planDay) => planDay.id === dayId) ?? plan.days[0]
  const textKey = `plans.${plan.id}` // Texte dieses Plans in der Übersetzung

  return (
    <div className="mt-10 rounded-3xl border border-white/5 bg-surface/50 p-4 sm:p-6 md:p-10">
      {/* ---------- Kopf ---------- */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl">{t(`${textKey}.name`)}</h2>
          <ul className="mt-4 flex flex-wrap gap-2 text-sm">
            {['level', 'frequency', 'duration'].map((info) => (
              <li key={info} className="rounded-full border border-white/10 px-3 py-1 text-muted">
                {t(`${textKey}.${info}`)}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-muted">{t(`${textKey}.description`)}</p>
        </div>

        {/* window.print() öffnet den Druck-Dialog. Dort kann man "Als PDF sichern" wählen. */}
        <Button variant="secondary" className="shrink-0 self-start" onClick={() => window.print()}>
          <PrinterIcon className="size-5" />
          {t('plansPage.print')}
        </Button>
      </div>

      {/* ---------- Woche ---------- */}
      <h3 className="mt-10 mb-4 text-lg">{t('plansPage.week')}</h3>
      <WeekOverview plan={plan} activeDayId={day.id} onSelectDay={setDayId} />

      {/* ---------- Trainingstage ---------- */}
      <h3 className="mt-10 mb-4 text-lg">{t('plansPage.trainingDays')}</h3>
      <Tabs
        items={plan.days.map((planDay) => ({ id: planDay.id, label: t(`${textKey}.days.${planDay.id}.name`) }))}
        value={day.id}
        onChange={setDayId}
        label={t('plansPage.trainingDays')}
        idPrefix="plan-day"
      />

      <div className="mt-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={day.id}
            id="plan-day-panel"
            role="tabpanel"
            aria-labelledby={`plan-day-tab-${day.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <DayTable planId={plan.id} day={day} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
