import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

import { useI18n } from '../../i18n/i18n'
import AnimatedHeadline from '../motion/AnimatedHeadline'
import Button from '../ui/Button'
import Container from '../ui/Container'

// Hintergrund: zwei unscharfe Farbflecken, die langsam schweben, plus ein feines Gitter.
// Die Bewegung läuft als CSS-Animation (animate-blob). Das braucht kaum Rechenleistung.
function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-48 -left-40 size-[34rem] animate-blob rounded-full bg-accent/20 blur-[110px] motion-reduce:animate-none md:size-[44rem]" />
      <div className="absolute top-1/3 -right-48 size-[28rem] animate-blob rounded-full bg-accent/10 blur-[110px] [animation-delay:-8s] motion-reduce:animate-none md:size-[36rem]" />
      {/* Gitter, das zum Rand hin ausblendet */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      {/* Weicher Übergang in den Seitenhintergrund unten */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-bg" />
    </div>
  )
}

// Kleine Hilfe: Element blendet nach "delay" Sekunden von unten ein
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
})

export default function Hero() {
  const { t } = useI18n()
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  // Parallax: Während man aus dem Hero herausscrollt (0 -> 1), bewegt sich der Text
  // langsamer nach oben als die Seite und blendet dabei aus. Das erzeugt Tiefe.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    // -mt-20: Der Hero beginnt ganz oben, hinter der durchsichtigen Navigation
    <section
      ref={ref}
      className="relative isolate -mt-20 flex min-h-svh items-center overflow-hidden pt-28 pb-24 md:-mt-24"
    >
      <HeroBackground />

      <Container>
        <motion.div style={reduceMotion ? undefined : { y, opacity }}>
          <motion.p {...fadeUp(0)} className="mb-6 text-sm font-semibold tracking-widest text-accent uppercase">
            {t('home.hero.eyebrow')}
          </motion.p>

          {/* Beim Sprachwechsel ändern sich die Wörter, und die Animation startet neu */}
          <AnimatedHeadline
            className="max-w-5xl text-5xl leading-[0.95] sm:text-7xl md:text-8xl lg:text-9xl"
            lines={[{ text: t('home.hero.line1') }, { text: t('home.hero.line2'), className: 'text-muted' }]}
          />

          <motion.p {...fadeUp(0.7)} className="mt-8 max-w-xl text-lg text-muted md:text-xl">
            {t('home.hero.text')}
          </motion.p>

          <motion.div {...fadeUp(0.85)} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button to="/uebungen" size="lg">
              {t('nav.start')}
            </Button>
            <Button to="/trainingsplaene" size="lg" variant="secondary">
              {t('home.hero.ctaSecondary')}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
