import { useI18n } from '../../i18n/i18n'
import Reveal from '../motion/Reveal'
import Button from '../ui/Button'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'

type Rule = { title: string; text: string }

export default function Rules() {
  const { t, tList } = useI18n()
  // Die Regeln stehen als Liste in der Übersetzung unter "home.rules.items"
  const rules = tList<Rule>('home.rules.items')

  return (
    <Section>
      <SectionHeading eyebrow={t('home.rules.eyebrow')} title={t('home.rules.title')}>
        {t('home.rules.text')}
      </SectionHeading>

      <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rules.map((rule, index) => (
          <li key={rule.title}>
            {/* Gestaffelt: jede Karte startet 0.08 Sekunden nach der vorherigen */}
            <Reveal delay={index * 0.08} className="h-full rounded-2xl border border-white/5 bg-surface p-6 md:p-8">
              {/* Nummer mit führender Null: 01, 02, ... */}
              <span aria-hidden className="font-display text-5xl font-bold text-accent/80">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 text-2xl">{rule.title}</h3>
              <p className="mt-3 text-muted">{rule.text}</p>
            </Reveal>
          </li>
        ))}

        {/* 6. Kachel füllt die Lücke im Raster und führt weiter zu den Plänen */}
        <li>
          <Reveal
            delay={rules.length * 0.08}
            className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-accent/30 bg-accent/5 p-6 md:p-8"
          >
            <div>
              <h3 className="text-2xl">{t('home.rules.readyTitle')}</h3>
              <p className="mt-3 text-muted">{t('home.rules.readyText')}</p>
            </div>
            <Button to="/trainingsplaene" className="self-start">
              {t('home.rules.readyCta')}
            </Button>
          </Reveal>
        </li>
      </ol>
    </Section>
  )
}
