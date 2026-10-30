import { useSearchParams } from 'react-router'

import { findPlan, plans } from '../data/plans'
import { useI18n } from '../i18n/i18n'
import PlanDetails from '../components/plans/PlanDetails'
import PlanPrintView from '../components/plans/PlanPrintView'
import Reveal from '../components/motion/Reveal'
import PageHeader from '../components/ui/PageHeader'
import Section from '../components/ui/Section'

type Tip = { title: string; text: string }

export default function PlansPage() {
  const { t, tList } = useI18n()
  // Der gewählte Plan steht in der Adresse: /trainingsplaene?plan=push-pull-legs
  // Ohne Angabe zeigen wir den ersten Plan (Ganzkörper).
  const [searchParams, setSearchParams] = useSearchParams()
  const plan = findPlan(searchParams.get('plan')) ?? plans[0]

  const selectPlan = (id: string) => setSearchParams({ plan: id }, { replace: true })

  return (
    <>
      <title>{`${t('plansPage.title')} – JJJ Fitness`}</title>

      {/* print:hidden: Beim Drucken wird alles hier ausgeblendet, stattdessen kommt die Druckansicht */}
      <Section className="print:hidden">
        <PageHeader eyebrow={t('plansPage.eyebrow')} title={t('plansPage.heading')}>
          {t('plansPage.intro')}
        </PageHeader>

        {/* ---------- Plan-Auswahl ---------- */}
        <div className="mt-12 grid gap-3 md:grid-cols-3 md:gap-4" role="group" aria-label={t('plansPage.choose')}>
          {plans.map((option, index) => {
            const active = option.id === plan.id
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => selectPlan(option.id)}
                className={`group rounded-2xl border p-5 text-left transition duration-300 md:p-6 ${
                  active
                    ? 'border-accent bg-accent/10 shadow-glow'
                    : 'border-white/10 bg-surface hover:-translate-y-1 hover:border-accent/40 motion-reduce:hover:translate-y-0'
                }`}
              >
                <span className="font-display text-sm font-bold text-accent">
                  {t('plansPage.planNumber', { number: index + 1 })}
                </span>
                <span className="mt-2 block font-display text-2xl font-bold">{t(`plans.${option.id}.short`)}</span>
                <span className="mt-2 block text-sm text-muted">
                  {t(`plans.${option.id}.frequency`)} · {t(`plans.${option.id}.level`)}
                </span>
              </button>
            )
          })}
        </div>

        {/* key={plan.id}: Bei einem Planwechsel startet PlanDetails neu (Tag A ist wieder ausgewählt) */}
        <PlanDetails key={plan.id} plan={plan} />

        {/* ---------- Tipps ---------- */}
        <h2 className="mt-20 mb-8 text-3xl md:text-4xl">{t('plansPage.tipsTitle')}</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tList<Tip>('plansPage.tips').map((tip, index) => (
            <li key={tip.title}>
              <Reveal delay={index * 0.08} className="h-full rounded-2xl border border-white/5 bg-surface p-6">
                <h3 className="text-xl">{tip.title}</h3>
                <p className="mt-2 text-sm text-muted">{tip.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <PlanPrintView plan={plan} />
    </>
  )
}
