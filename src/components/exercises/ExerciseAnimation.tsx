import { motion, useReducedMotion } from 'motion/react'

import { exerciseAnimations, frameAt } from '../../data/exerciseAnimations'
import type { ExerciseAnimation as Animation, Frame } from '../../data/exerciseAnimations'
import { useI18n } from '../../i18n/i18n'

// Wie viele Zwischenschritte wir pro Bewegung vorausberechnen
const STEPS = 16

// Weicher Start und weiches Ende der Bewegung
const smooth = (t: number) => t * t * (3 - 2 * t)

// Alle Zwischenschritte einer Bewegung ausrechnen
function buildFrames(animation: Animation): Frame[] {
  return Array.from({ length: STEPS + 1 }, (_, index) => frameAt(animation, smooth(index / STEPS)))
}

// Eine Bewegung läuft hin und zurück, mit einer kurzen Pause an jedem Ende
const LOOP = { duration: 1.2, repeat: Infinity, repeatType: 'mirror', repeatDelay: 0.2, ease: 'linear' } as const

type Joint = keyof Frame

// Eine Linie zwischen zwei Gelenken, z.B. der Oberarm von Schulter bis Ellbogen
function Limb({ frames, from, to, animate }: { frames: Frame[]; from: Joint; to: Joint; animate: boolean }) {
  const end = frames[frames.length - 1]
  const [x1, y1] = end[from] as [number, number]
  const [x2, y2] = end[to] as [number, number]

  // Ohne Animation (Bewegung reduzieren): nur die Endposition zeichnen
  if (!animate) return <line x1={x1} y1={y1} x2={x2} y2={y2} />

  return (
    <motion.line
      initial={{ x1: frames[0][from]![0], y1: frames[0][from]![1], x2: frames[0][to]![0], y2: frames[0][to]![1] }}
      animate={{
        x1: frames.map((frame) => frame[from]![0]),
        y1: frames.map((frame) => frame[from]![1]),
        x2: frames.map((frame) => frame[to]![0]),
        y2: frames.map((frame) => frame[to]![1]),
      }}
      transition={LOOP}
    />
  )
}

// Ein Kreis, der einem Gelenk folgt: der Kopf oder die Hantel
function Dot({
  frames,
  joint,
  radius,
  className,
  animate,
}: {
  frames: Frame[]
  joint: Joint
  radius: number
  className: string
  animate: boolean
}) {
  const end = frames[frames.length - 1][joint] as [number, number]
  if (!animate) return <circle cx={end[0]} cy={end[1]} r={radius} className={className} />

  return (
    <motion.circle
      initial={{ cx: frames[0][joint]![0], cy: frames[0][joint]![1] }}
      r={radius}
      className={className}
      animate={{ cx: frames.map((frame) => frame[joint]![0]), cy: frames.map((frame) => frame[joint]![1]) }}
      transition={LOOP}
    />
  )
}

// Animierte Strichfigur, die den Bewegungsablauf einer Übung zeigt.
// Gibt es für eine Übung keine Animation, wird nichts angezeigt.
export default function ExerciseAnimation({ slug }: { slug: string }) {
  const { t } = useI18n()
  const reduceMotion = useReducedMotion()
  const animation = exerciseAnimations[slug]
  if (!animation) return null

  const frames = buildFrames(animation)
  const animate = !reduceMotion
  const limbs: [Joint, Joint][] = [
    ['ankle', 'toe'],
    ['ankle', 'knee'],
    ['knee', 'hip'],
    ['hip', 'shoulder'],
    ['shoulder', 'elbow'],
    ['elbow', 'wrist'],
  ]

  return (
    <figure className="flex flex-col items-center">
      {/* aria-hidden: Die Grafik ist Deko, die Ausführung steht daneben als Text */}
      <svg viewBox="-8 -42 216 246" className="h-auto w-full max-w-[260px]" aria-hidden>
        {/* Boden oder Klimmzugstange */}
        {animation.scene === 'pullup' ? (
          <line x1="55" y1="12" x2="145" y2="12" className="stroke-muted" strokeWidth="5" strokeLinecap="round" />
        ) : (
          <line x1="0" y1="172" x2="200" y2="172" className="stroke-white/20" strokeWidth="3" strokeLinecap="round" />
        )}
        {animation.scene === 'bench' && <rect x="90" y="148" width="85" height="8" rx="2" className="fill-muscle" />}

        <g className="stroke-text" strokeWidth="7" strokeLinecap="round">
          {limbs.map(([from, to]) => (
            <Limb key={`${from}-${to}`} frames={frames} from={from} to={to} animate={animate} />
          ))}
        </g>
        <Dot frames={frames} joint="head" radius={11} className="fill-text" animate={animate} />
        {animation.weight && (
          <Dot
            frames={frames}
            joint="weight"
            radius={animation.weight === 'plate' ? 13 : 7}
            className="fill-accent"
            animate={animate}
          />
        )}
      </svg>
      <figcaption className="mt-2 text-sm text-muted">{t('exerciseDetail.animation')}</figcaption>
    </figure>
  )
}
