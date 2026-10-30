import { exercises } from '../../data/exercises'
import { muscles } from '../../data/muscles'
import Counter from '../motion/Counter'
import Reveal from '../motion/Reveal'
import Container from '../ui/Container'

// Die Zahlen, die beim Scrollen hochzählen.
// Übungen und Muskelgruppen werden automatisch gezählt.
const stats = [
  { value: exercises.length, suffix: '', label: 'Übungen' },
  { value: 3, suffix: '', label: 'Trainingspläne' },
  { value: muscles.length, suffix: '', label: 'Muskelgruppen' },
  { value: 2, suffix: '', label: 'Sprachen' },
]

export default function Stats() {
  return (
    <Container>
      <dl className="grid grid-cols-2 gap-y-10 border-y border-white/5 py-12 md:grid-cols-4 md:py-16">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.08} className="flex flex-col text-center">
            <dt className="order-2 mt-2 text-sm text-muted md:text-base">{stat.label}</dt>
            <dd className="font-display text-5xl font-bold tracking-tight md:text-6xl">
              <Counter to={stat.value} suffix={stat.suffix} />
            </dd>
          </Reveal>
        ))}
      </dl>
    </Container>
  )
}
