// Bewegungsabläufe für die animierten Figuren auf der Detailseite.
//
// Jede Animation besteht aus zwei Posen: Start und Ende. Dazwischen rechnen wir die
// Winkel weich um. So bleiben Arme und Beine immer gleich lang.
//
// Winkel in Grad: 0 = nach rechts, -90 = nach oben, 90 = nach unten, 180 = nach links.
// Die Figur schaut nach rechts und wird vom Fussgelenk aus aufgebaut:
// Fussgelenk -> Knie -> Hüfte -> Schulter -> Ellbogen -> Hand

type Point = [number, number]

type Pose = {
  ankle: Point // Position des Fussgelenks
  foot?: number // Winkel des Fusses (Standard: flach am Boden)
  shin: number // Fussgelenk -> Knie
  thigh: number // Knie -> Hüfte
  torso: number // Hüfte -> Schulter
  // Arm entweder über zwei Winkel oder über die Position der Hand
  upper?: number
  fore?: number
  hand?: Point
  bend?: 1 | -1 // In welche Richtung der Ellbogen knickt (nur mit hand)
}

export type ExerciseAnimation = {
  from: Pose
  to: Pose
  weight?: 'dumbbell' | 'plate' // Kurzhantel oder Hantelscheibe (Langhantel von der Seite)
  weightAt?: 'hand' | 'shoulder'
  scene?: 'bench' | 'pullup' // Was neben dem Boden noch gezeichnet wird
}

export type Frame = {
  head: Point
  shoulder: Point
  elbow: Point
  wrist: Point
  hip: Point
  knee: Point
  ankle: Point
  toe: Point
  weight?: Point
}

// Länge der Körperteile in der Zeichnung
const SHIN = 40
const THIGH = 40
const TORSO = 55
const UPPER_ARM = 30
const FOREARM = 28
const FOOT = 18
const FLAT_FOOT = 20

// Aufrecht stehen, die Füsse immer an derselben Stelle
const STAND = { ankle: [90, 165] as Point, shin: -88, thigh: -92, torso: -88 }

const curl = (weight: 'dumbbell' | 'plate'): ExerciseAnimation => ({
  from: { ...STAND, upper: 88, fore: 80 },
  to: { ...STAND, upper: 95, fore: -75 },
  weight,
})

export const exerciseAnimations: Record<string, ExerciseAnimation> = {
  kniebeuge: {
    from: { ...STAND, upper: 120, fore: -60 },
    to: { ankle: [90, 165], shin: -60, thigh: -170, torso: -55, upper: 150, fore: -30 },
    weight: 'plate',
    weightAt: 'shoulder',
  },
  'goblet-squat': {
    from: { ...STAND, upper: 65, fore: -75 },
    to: { ankle: [90, 165], shin: -60, thigh: -170, torso: -60, upper: 40, fore: -95 },
    weight: 'dumbbell',
  },
  kreuzheben: {
    from: { ankle: [90, 165], shin: -70, thigh: -165, torso: -25, upper: 90, fore: 90 },
    to: { ...STAND, upper: 90, fore: 90 },
    weight: 'plate',
  },
  liegestuetz: {
    from: { ankle: [30, 165], foot: 75, shin: -25, thigh: -25, torso: -25, hand: [150, 168], bend: -1 },
    to: { ankle: [30, 165], foot: 75, shin: -10, thigh: -10, torso: -10, hand: [150, 168], bend: -1 },
  },
  bankdruecken: {
    from: { ankle: [45, 165], shin: -70, thigh: 20, torso: 0, hand: [150, 84], bend: 1 },
    to: { ankle: [45, 165], shin: -70, thigh: 20, torso: 0, hand: [150, 122], bend: 1 },
    weight: 'plate',
    scene: 'bench',
  },
  'kurzhantel-curl': curl('dumbbell'),
  hammercurl: curl('dumbbell'),
  'langhantel-curl': curl('plate'),
  'kurzhantel-schulterdruecken': {
    from: { ...STAND, upper: 55, fore: -100 },
    to: { ...STAND, upper: -82, fore: -90 },
    weight: 'dumbbell',
  },
  klimmzug: {
    from: { ankle: [65, 183], foot: 45, shin: -30, thigh: -90, torso: -90, hand: [100, 12], bend: 1 },
    to: { ankle: [65, 146], foot: 45, shin: -30, thigh: -90, torso: -90, hand: [100, 12], bend: 1 },
    scene: 'pullup',
  },
  crunch: {
    from: { ankle: [125, 165], shin: -110, thigh: 135, torso: 180, upper: 20, fore: 0 },
    to: { ankle: [125, 165], shin: -110, thigh: 135, torso: -150, upper: 30, fore: 5 },
  },
  wadenheben: {
    from: { ...STAND, upper: 90, fore: 90 },
    to: { ...STAND, ankle: [90, 152], foot: 60, upper: 90, fore: 90 },
  },
}

// Punkt in eine Richtung weiterrechnen
function step(from: Point, angle: number, length: number): Point {
  const radians = (angle * Math.PI) / 180
  return [from[0] + Math.cos(radians) * length, from[1] + Math.sin(radians) * length]
}

// Ellbogen berechnen, wenn Schulter und Hand bekannt sind (Dreieck aus Ober- und Unterarm)
function findElbow(shoulder: Point, hand: Point, bend: number): { elbow: Point; wrist: Point } {
  const dx = hand[0] - shoulder[0]
  const dy = hand[1] - shoulder[1]
  const distance = Math.min(Math.hypot(dx, dy), UPPER_ARM + FOREARM - 0.01)
  const toHand = (Math.atan2(dy, dx) * 180) / Math.PI
  const cosine = (UPPER_ARM ** 2 + distance ** 2 - FOREARM ** 2) / (2 * UPPER_ARM * distance)
  const inner = (Math.acos(Math.max(-1, Math.min(1, cosine))) * 180) / Math.PI
  const elbow = step(shoulder, toHand + bend * inner, UPPER_ARM)
  return { elbow, wrist: step(shoulder, toHand, distance) }
}

const mix = (a: number, b: number, t: number) => a + (b - a) * t

// Berechnet die Position aller Gelenke an einer Stelle t zwischen 0 (Start) und 1 (Ende)
export function frameAt(animation: ExerciseAnimation, t: number): Frame {
  const { from, to } = animation
  const ankle: Point = [mix(from.ankle[0], to.ankle[0], t), mix(from.ankle[1], to.ankle[1], t)]
  const knee = step(ankle, mix(from.shin, to.shin, t), SHIN)
  const hip = step(knee, mix(from.thigh, to.thigh, t), THIGH)
  const torso = mix(from.torso, to.torso, t)
  const shoulder = step(hip, torso, TORSO)
  const head = step(shoulder, torso, 17)
  const toe =
    from.foot === undefined && to.foot === undefined
      ? ([ankle[0] + FLAT_FOOT, ankle[1] + 7] as Point)
      : step(ankle, mix(from.foot ?? 20, to.foot ?? 20, t), FOOT)

  let arm: { elbow: Point; wrist: Point }
  if (from.hand && to.hand) {
    const hand: Point = [mix(from.hand[0], to.hand[0], t), mix(from.hand[1], to.hand[1], t)]
    arm = findElbow(shoulder, hand, from.bend ?? 1)
  } else {
    const elbow = step(shoulder, mix(from.upper ?? 90, to.upper ?? 90, t), UPPER_ARM)
    arm = { elbow, wrist: step(elbow, mix(from.fore ?? 90, to.fore ?? 90, t), FOREARM) }
  }

  const weight = animation.weight ? (animation.weightAt === 'shoulder' ? shoulder : arm.wrist) : undefined
  return { head, shoulder, hip, knee, ankle, toe, ...arm, weight }
}
