import { exercises } from '../../data/exercises'
import { muscleIds } from '../../data/muscles'
import { plans } from '../../data/plans'
import { languages, useI18n } from '../../i18n/i18n'
import Counter from '../motion/Counter'
import Reveal from '../motion/Reveal'
import Container from '../ui/Container'

// Die Zahlen, die beim Scrollen hochzählen. Alle werden automatisch gezählt.
const stats = [
  { value: exercises.length, key: 'exercises' },
  { value: plans.length, key: 'plans' },
  { value: muscleIds.length, key: 'muscles' },
  { value: languages.length, key: 'languages' },
]

export default function Stats() {
  const { t } = useI18n()

  return (
    <Container>
      <dl className="grid grid-cols-2 gap-y-10 border-y border-white/5 py-12 md:grid-cols-4 md:py-16">
        {stats.map((stat, index) => (
          <Reveal key={stat.key} delay={index * 0.08} className="flex flex-col text-center">
            <dt className="order-2 mt-2 text-sm text-muted md:text-base">{t(`home.stats.${stat.key}`)}</dt>
            <dd className="font-display text-5xl font-bold tracking-tight md:text-6xl">
              <Counter to={stat.value} />
            </dd>
          </Reveal>
        ))}
      </dl>
    </Container>
  )
}
