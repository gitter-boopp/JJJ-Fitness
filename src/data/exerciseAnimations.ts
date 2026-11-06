// Bewegungsabläufe für die animierten Figuren auf der Detailseite.
//
// Jede Animation besteht aus zwei Posen: Start und Ende. Dazwischen rechnen wir die
// Winkel weich um. So bleiben Arme und Beine immer gleich lang.
//
// Winkel in Grad: 0 = nach rechts, -90 = nach oben, 90 = nach unten, 180 = nach links.
// Die Figur wird von der Seite gezeigt. Sie wird entweder vom Fussgelenk (ankle) aus
// aufgebaut oder, wenn die Hüfte stillhalten soll (z.B. auf einer Maschine), von der Hüfte (hip).

type Point = [number, number]

type Pose = {
  ankle?: Point // Position des Fussgelenks ...
  hip?: Point // ... oder der Hüfte
  foot?: number // Winkel des Fusses (ohne Angabe: flach am Boden)
  shin: number // Fussgelenk -> Knie
  thigh: number // Knie -> Hüfte
  torso: number // Hüfte -> Schulter
  lift?: number // Schultern hochziehen (z.B. bei Shrugs), in Punkten
  // Arm entweder über zwei Winkel oder über die Position der Hand
  upper?: number
  fore?: number
  foreScale?: number // Unterarm kürzer zeichnen, wenn er sich von uns wegdreht (Rotationen)
  hand?: Point
}

type Prop = [number, number, number, number] // Linie von (x1, y1) nach (x2, y2)

export type ExerciseAnimation = {
  from: Pose
  to: Pose
  bend?: 1 | -1 // In welche Richtung der Ellbogen knickt (nur mit hand)
  weight?: 'dumbbell' | 'plate' // Kurzhantel oder Hantelscheibe (Langhantel von der Seite)
  weightAt?: 'hand' | 'shoulder' | 'hip'
  cable?: Point // Kabel oder Stange von diesem festen Punkt bis zur Hand
  rear?: Point // Hinterer Fuss (zweites Bein, z.B. Ausfallschritt)
  props?: Prop[] // Bank, Stange, Sitz ...
  ground?: boolean // Boden zeichnen (Standard: ja)
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
  anchor?: Point
  rearKnee?: Point
  rearAnkle?: Point
}

// Länge der Körperteile in der Zeichnung
const SHIN = 40
const THIGH = 40
const TORSO = 55
const UPPER_ARM = 30
const FOREARM = 28
const FOOT = 18

// Häufige Grundhaltungen
const STAND = { ankle: [90, 165] as Point, shin: -88, thigh: -92, torso: -88 }
const SEATED = { hip: [90, 125] as Point, foot: 15, thigh: 180, shin: -90, torso: -90 }
const BENT_OVER = { ankle: [90, 165] as Point, shin: -80, thigh: -125, torso: -35 }
const INCLINE_PRONE = { hip: [80, 85] as Point, foot: 15, thigh: -100, shin: -80, torso: -35 }
const LYING = { ankle: [45, 165] as Point, shin: -70, thigh: 20, torso: 0 }

// Wiederkehrende Geräte
const SEAT: Prop[] = [[70, 133, 110, 133]]
const FLAT_BENCH: Prop[] = [[90, 152, 175, 152]]
const PULLUP_BAR: Prop[] = [[55, 12, 145, 12]]
const CHEST_PAD: Prop[] = [[88, 100, 135, 67]]

const curl = (weight: 'dumbbell' | 'plate'): ExerciseAnimation => ({
  from: { ...STAND, upper: 88, fore: 80 },
  to: { ...STAND, upper: 95, fore: -75 },
  weight,
})

const rotation = (start: number, end: number): ExerciseAnimation => ({
  from: { ...STAND, upper: 90, fore: 0, foreScale: start },
  to: { ...STAND, upper: 90, fore: 0, foreScale: end },
})

export const exerciseAnimations: Record<string, ExerciseAnimation> = {
  // ---------- Brust ----------
  liegestuetz: {
    from: { ankle: [30, 165], foot: 75, shin: -25, thigh: -25, torso: -25, hand: [150, 168] },
    to: { ankle: [30, 165], foot: 75, shin: -10, thigh: -10, torso: -10, hand: [150, 168] },
    bend: -1,
  },
  bankdruecken: {
    from: { ...LYING, hand: [150, 84] },
    to: { ...LYING, hand: [150, 122] },
    bend: 1,
    weight: 'plate',
    props: FLAT_BENCH,
  },
  'kurzhantel-schraegbankdruecken': {
    from: { hip: [80, 125], foot: 15, thigh: 180, shin: -90, torso: -45, hand: [119, 30] },
    to: { hip: [80, 125], foot: 15, thigh: 180, shin: -90, torso: -45, hand: [130, 68] },
    bend: 1,
    weight: 'dumbbell',
    props: [[70, 136, 115, 95]],
  },
  dips: {
    from: { ankle: [60, 145], foot: 45, shin: -30, thigh: -90, torso: -85, hand: [100, 88] },
    to: { ankle: [60, 177], foot: 45, shin: -30, thigh: -90, torso: -85, hand: [100, 88] },
    bend: -1,
    props: [[70, 92, 130, 92]],
    ground: false,
  },
  butterfly: {
    from: { ...SEATED, upper: 120, fore: 10 },
    to: { ...SEATED, upper: 10, fore: 5 },
    props: [...SEAT, [72, 133, 72, 62]],
  },

  // ---------- Rücken ----------
  klimmzug: {
    from: { ankle: [65, 183], foot: 45, shin: -30, thigh: -90, torso: -90, hand: [100, 12] },
    to: { ankle: [65, 146], foot: 45, shin: -30, thigh: -90, torso: -90, hand: [100, 12] },
    bend: 1,
    props: PULLUP_BAR,
    ground: false,
  },
  'scapula-pullups': {
    from: { ankle: [65, 183], foot: 45, shin: -30, thigh: -90, torso: -90, hand: [100, 12] },
    to: { ankle: [65, 174], foot: 45, shin: -30, thigh: -90, torso: -90, hand: [100, 12] },
    bend: 1,
    props: PULLUP_BAR,
    ground: false,
  },
  latzug: {
    from: { ...SEATED, hand: [100, 15] },
    to: { ...SEATED, hand: [108, 72] },
    bend: -1,
    cable: [100, -35],
    props: SEAT,
  },
  langhantelrudern: {
    from: { ...BENT_OVER, upper: 90, fore: 90 },
    to: { ...BENT_OVER, upper: 150, fore: 60 },
    weight: 'plate',
  },
  'pendlay-rudern': {
    from: { ankle: [90, 165], shin: -70, thigh: -160, torso: -8, upper: 90, fore: 90 },
    to: { ankle: [90, 165], shin: -70, thigh: -160, torso: -8, upper: 165, fore: 40 },
    weight: 'plate',
  },
  kurzhantelrudern: {
    from: { ankle: [90, 165], shin: -85, thigh: -110, torso: -15, upper: 90, fore: 90 },
    to: { ankle: [90, 165], shin: -85, thigh: -110, torso: -15, upper: 155, fore: 55 },
    weight: 'dumbbell',
  },
  'brustgestuetztes-rudern': {
    from: { ...INCLINE_PRONE, upper: 90, fore: 90 },
    to: { ...INCLINE_PRONE, upper: 155, fore: 60 },
    weight: 'dumbbell',
    props: CHEST_PAD,
  },
  kreuzheben: {
    from: { ankle: [90, 165], shin: -70, thigh: -165, torso: -25, upper: 90, fore: 90 },
    to: { ...STAND, upper: 90, fore: 90 },
    weight: 'plate',
  },

  // ---------- Schultern und Nacken ----------
  'kurzhantel-schulterdruecken': {
    from: { ...STAND, upper: 55, fore: -100 },
    to: { ...STAND, upper: -82, fore: -90 },
    weight: 'dumbbell',
  },
  seitheben: {
    from: { ...STAND, upper: 88, fore: 85 },
    to: { ...STAND, upper: 5, fore: 5 },
    weight: 'dumbbell',
  },
  'face-pulls': {
    from: { ...STAND, hand: [148, 30] },
    to: { ...STAND, hand: [115, 20] },
    bend: -1,
    cable: [195, 28],
  },
  shrugs: {
    from: { ...STAND, upper: 90, fore: 90 },
    to: { ...STAND, lift: -10, upper: 90, fore: 90 },
    weight: 'dumbbell',
  },
  'y-raises': {
    from: { ...INCLINE_PRONE, upper: 90, fore: 90 },
    to: { ...INCLINE_PRONE, upper: -35, fore: -35 },
    weight: 'dumbbell',
    props: CHEST_PAD,
  },
  'landmine-press': {
    from: { ...STAND, hand: [112, 38] },
    to: { ...STAND, hand: [145, -8] },
    bend: 1,
    weight: 'plate',
    cable: [15, 168],
  },
  'aussenrotation-kabel': rotation(0.35, 1),
  'innenrotation-kabel': rotation(1, 0.35),
  'aussenrotation-seitlage': {
    from: { hip: [85, 160], foot: 160, thigh: 0, shin: 0, torso: 0, upper: 180, fore: -90, foreScale: 0.25 },
    to: { hip: [85, 160], foot: 160, thigh: 0, shin: 0, torso: 0, upper: 180, fore: -90, foreScale: 1 },
    weight: 'dumbbell',
  },

  // ---------- Arme ----------
  'kurzhantel-curl': curl('dumbbell'),
  hammercurl: curl('dumbbell'),
  'langhantel-curl': curl('plate'),
  'bayesian-curl': {
    from: { ...STAND, upper: 110, fore: 110 },
    to: { ...STAND, upper: 110, fore: -50 },
    cable: [10, 160],
  },
  'trizepsdruecken-kabel': {
    from: { ...STAND, upper: 85, fore: -40 },
    to: { ...STAND, upper: 85, fore: 85 },
    cable: [125, -30],
  },
  'french-press': {
    from: { ...LYING, upper: -80, fore: -90 },
    to: { ...LYING, upper: -80, fore: -15 },
    weight: 'plate',
    props: FLAT_BENCH,
  },
  'ueberkopf-trizeps': {
    from: { ...STAND, upper: -95, fore: 120 },
    to: { ...STAND, upper: -95, fore: -90 },
    weight: 'dumbbell',
  },

  // ---------- Beine und Gesäss ----------
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
  ausfallschritte: {
    from: { ankle: [125, 165], shin: -85, thigh: -105, torso: -88, upper: 90, fore: 90 },
    to: { ankle: [125, 165], shin: -65, thigh: -170, torso: -88, upper: 90, fore: 90 },
    rear: [50, 165],
    weight: 'dumbbell',
  },
  beinpresse: {
    from: { hip: [70, 135], foot: -60, thigh: 120, shin: 170, torso: -150, upper: 40, fore: 20 },
    to: { hip: [70, 135], foot: -60, thigh: 145, shin: 145, torso: -150, upper: 40, fore: 20 },
    props: [[25, 143, 85, 143]],
  },
  'rumaenisches-kreuzheben': {
    from: { ...STAND, upper: 90, fore: 90 },
    to: { ankle: [90, 165], shin: -82, thigh: -110, torso: -10, upper: 90, fore: 90 },
    weight: 'dumbbell',
  },
  'hip-thrust': {
    from: { ankle: [140, 165], shin: -100, thigh: 150, torso: -160, upper: 20, fore: -60 },
    to: { ankle: [140, 165], shin: -100, thigh: 175, torso: 180, upper: 20, fore: -60 },
    weight: 'plate',
    weightAt: 'hip',
    props: [[20, 140, 60, 140]],
  },
  'beinbeuger-maschine': {
    from: { hip: [95, 130], foot: 90, thigh: 0, shin: 0, torso: 0, upper: 60, fore: 30 },
    to: { hip: [95, 130], foot: 30, thigh: 0, shin: 60, torso: 0, upper: 60, fore: 30 },
    props: [[50, 138, 175, 138]],
  },
  'nordic-curl': {
    from: { ankle: [40, 165], foot: 180, shin: 0, thigh: -90, torso: -90, upper: 60, fore: 40 },
    to: { ankle: [40, 165], foot: 180, shin: 0, thigh: -20, torso: -20, upper: 60, fore: 40 },
    props: [[28, 155, 52, 155]],
  },
  'sissy-squat': {
    from: { ankle: [90, 165], foot: 40, shin: -88, thigh: -92, torso: -88, upper: 20, fore: 10 },
    to: { ankle: [90, 165], foot: 40, shin: -35, thigh: -125, torso: -125, upper: 20, fore: 10 },
    props: [[135, 172, 135, 60]],
  },
  wadenheben: {
    from: { ...STAND, upper: 90, fore: 90 },
    to: { ...STAND, ankle: [90, 152], foot: 60, upper: 90, fore: 90 },
  },
  'sitzendes-wadenheben': {
    from: { ankle: [130, 165], shin: -90, thigh: 180, torso: -90, upper: 50, fore: 20 },
    to: { ankle: [130, 155], foot: 50, shin: -90, thigh: 180, torso: -90, upper: 50, fore: 20 },
  },

  // ---------- Bauch ----------
  plank: {
    from: { ankle: [30, 165], foot: 75, shin: -17, thigh: -17, torso: -17, upper: 95, fore: 0 },
    to: { ankle: [30, 165], foot: 75, shin: -18.5, thigh: -18.5, torso: -18.5, upper: 95, fore: 0 },
  },
  crunch: {
    from: { ankle: [125, 165], shin: -110, thigh: 135, torso: 180, upper: 20, fore: 0 },
    to: { ankle: [125, 165], shin: -110, thigh: 135, torso: -150, upper: 30, fore: 5 },
  },
  'haengendes-beinheben': {
    from: { hip: [100, 125], foot: 45, thigh: -95, shin: -50, torso: -90, hand: [100, 15] },
    to: { hip: [100, 125], foot: 45, thigh: 180, shin: -60, torso: -90, hand: [100, 15] },
    bend: 1,
    props: PULLUP_BAR,
    ground: false,
  },
  'dead-bug': {
    from: { hip: [80, 160], foot: 0, thigh: 90, shin: 180, torso: 180, upper: -90, fore: -90 },
    to: { hip: [80, 160], foot: 0, thigh: 150, shin: 170, torso: 180, upper: -150, fore: -160 },
  },
  'pallof-press': {
    from: { ...STAND, hand: [110, 55] },
    to: { ...STAND, hand: [150, 50] },
    bend: 1,
    cable: [195, 50],
  },
  'copenhagen-plank': {
    from: { ankle: [25, 110], foot: 30, shin: 13, thigh: 13, torso: 13, upper: 90, fore: 0 },
    to: { ankle: [25, 110], foot: 30, shin: 16, thigh: 16, torso: 16, upper: 90, fore: 0 },
    props: [[5, 118, 50, 118]],
  },
}

// Punkt in eine Richtung weiterrechnen
function step(from: Point, angle: number, length: number): Point {
  const radians = (angle * Math.PI) / 180
  return [from[0] + Math.cos(radians) * length, from[1] + Math.sin(radians) * length]
}

// Mittleres Gelenk berechnen (Ellbogen oder Knie), wenn beide Enden bekannt sind.
// Das ergibt ein Dreieck mit zwei festen Seitenlängen.
function findJoint(start: Point, end: Point, first: number, second: number, bend: number) {
  const dx = end[0] - start[0]
  const dy = end[1] - start[1]
  const distance = Math.min(Math.hypot(dx, dy), first + second - 0.01)
  const toEnd = (Math.atan2(dy, dx) * 180) / Math.PI
  const cosine = (first ** 2 + distance ** 2 - second ** 2) / (2 * first * distance)
  const inner = (Math.acos(Math.max(-1, Math.min(1, cosine))) * 180) / Math.PI
  return { joint: step(start, toEnd + bend * inner, first), end: step(start, toEnd, distance) }
}

const mix = (a: number, b: number, t: number) => a + (b - a) * t
const mixPoint = (a: Point, b: Point, t: number): Point => [mix(a[0], b[0], t), mix(a[1], b[1], t)]

// Berechnet die Position aller Gelenke an einer Stelle t zwischen 0 (Start) und 1 (Ende)
export function frameAt(animation: ExerciseAnimation, t: number): Frame {
  const { from, to } = animation
  const shin = mix(from.shin, to.shin, t)
  const thigh = mix(from.thigh, to.thigh, t)
  const torso = mix(from.torso, to.torso, t)

  // Bein: vom Fussgelenk nach oben oder von der Hüfte nach unten
  let ankle: Point, knee: Point, hip: Point
  if (from.hip && to.hip) {
    hip = mixPoint(from.hip, to.hip, t)
    knee = step(hip, thigh + 180, THIGH)
    ankle = step(knee, shin + 180, SHIN)
  } else {
    ankle = mixPoint(from.ankle ?? [90, 165], to.ankle ?? [90, 165], t)
    knee = step(ankle, shin, SHIN)
    hip = step(knee, thigh, THIGH)
  }

  const flatFoot = from.foot === undefined && to.foot === undefined
  const toe: Point = flatFoot
    ? [ankle[0] + 20, ankle[1] + 7]
    : step(ankle, mix(from.foot ?? 20, to.foot ?? 20, t), FOOT)

  const neck = step(hip, torso, TORSO)
  const head = step(neck, torso, 17)
  const shoulder: Point = [neck[0], neck[1] + mix(from.lift ?? 0, to.lift ?? 0, t)]

  // Arm: über die Position der Hand oder über zwei Winkel
  let elbow: Point, wrist: Point
  if (from.hand && to.hand) {
    const arm = findJoint(shoulder, mixPoint(from.hand, to.hand, t), UPPER_ARM, FOREARM, animation.bend ?? 1)
    elbow = arm.joint
    wrist = arm.end
  } else {
    elbow = step(shoulder, mix(from.upper ?? 90, to.upper ?? 90, t), UPPER_ARM)
    const scale = mix(from.foreScale ?? 1, to.foreScale ?? 1, t)
    wrist = step(elbow, mix(from.fore ?? 90, to.fore ?? 90, t), FOREARM * scale)
  }

  const frame: Frame = { head, shoulder, elbow, wrist, hip, knee, ankle, toe }
  if (animation.weight) {
    const places = { hand: wrist, shoulder, hip }
    frame.weight = places[animation.weightAt ?? 'hand']
  }
  if (animation.cable) frame.anchor = animation.cable
  if (animation.rear) {
    const leg = findJoint(hip, animation.rear, THIGH, SHIN, -1)
    frame.rearKnee = leg.joint
    frame.rearAnkle = leg.end
  }
  return frame
}
