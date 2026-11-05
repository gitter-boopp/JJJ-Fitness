import { team } from '../data/project'
import { useI18n } from '../i18n/i18n'
import FeedbackForm from '../components/about/FeedbackForm'
import Timeline from '../components/about/Timeline'
import Reveal from '../components/motion/Reveal'
import PageHeader from '../components/ui/PageHeader'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'

type Fact = { label: string; value: string }
type CreditGroup = { title: string; items: string[] }

// Initialen aus einem Namen, z.B. "Lea" -> "L", "Anna Maria" -> "AM"
function initials(name: string): string {
  return name
    .replace(/[[\]]/g, '') // eckige Klammern der Platzhalter entfernen
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function AboutPage() {
  const { t, tList } = useI18n()

  return (
    <>
      <title>{`${t('about.title')} – JJJ Fitness`}</title>

      <Section>
        <PageHeader eyebrow={t('about.eyebrow')} title={t('about.heading')}>
          {t('about.intro')}
        </PageHeader>
      </Section>

      {/* ---------- Team ---------- */}
      <Section className="pt-0 md:pt-0">
        <SectionHeading eyebrow={t('about.teamEyebrow')} title={t('about.teamTitle')}>
          {t('about.teamText')}
        </SectionHeading>
        <ul className="grid gap-4 md:grid-cols-3">
          {team.map((member, index) => (
            <li key={member.name}>
              <Reveal delay={index * 0.08} className="h-full rounded-2xl border border-white/5 bg-surface p-6 md:p-8">
                {/* Initialen statt Foto: schützt unsere Privatsphäre */}
                <span
                  aria-hidden
                  className="flex size-14 items-center justify-center rounded-full bg-accent font-display text-xl font-bold text-accent-ink"
                >
                  {initials(member.name)}
                </span>
                <h3 className="mt-6 text-2xl">{member.name}</h3>
                <p className="mt-1 text-sm font-semibold text-accent">{t('about.teamAge', { age: member.age })}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------- Projekt ---------- */}
      <Section className="pt-0 md:pt-0">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow={t('about.projectEyebrow')} title={t('about.projectTitle')}>
              {t('about.projectText')}
            </SectionHeading>
            <dl className="grid gap-3 sm:grid-cols-2">
              {tList<Fact>('about.facts').map((fact) => (
                <div key={fact.label} className="rounded-2xl border border-white/5 bg-surface p-5">
                  <dt className="text-sm text-muted">{fact.label}</dt>
                  <dd className="mt-1 font-semibold">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="mb-6 text-2xl md:text-3xl">{t('about.timelineTitle')}</h3>
            <Timeline />
          </div>
        </div>
      </Section>

      {/* ---------- Feedback ---------- */}
      <Section id="feedback" className="pt-0 md:pt-0">
        <SectionHeading eyebrow={t('about.feedbackEyebrow')} title={t('about.feedbackTitle')}>
          {t('about.feedbackText')}
        </SectionHeading>
        <FeedbackForm />
      </Section>

      {/* ---------- Quellen ---------- */}
      <Section className="pt-0 md:pt-0">
        <SectionHeading eyebrow={t('about.creditsEyebrow')} title={t('about.creditsTitle')} />
        <div className="grid gap-4 sm:grid-cols-2">
          {tList<CreditGroup>('about.credits').map((group) => (
            <div key={group.title} className="rounded-2xl border border-white/5 bg-surface p-6">
              <h3 className="text-lg">{group.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
