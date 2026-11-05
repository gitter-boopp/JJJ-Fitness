import type { MuscleId } from './muscles'

// Die Formen für den SVG-Körper der Muskel-Karte.
//
// So funktioniert es:
// - Die Zeichenfläche ist 200 breit und 420 hoch (viewBox="0 0 200 420").
// - Jede Form ist ein SVG-Pfad ("d"). M = Stift hinsetzen, L = gerade Linie,
//   C = Kurve, Z = Form schliessen.
// - Wir zeichnen nur die LINKE Körperhälfte. Mit mirror: true wird die Form
//   automatisch an der Mitte (x = 100) gespiegelt. So sparen wir die Hälfte der Arbeit.
// - muscle: zu welcher Muskelgruppe die Form gehört. Ohne muscle ist es ein
//   neutraler Körperteil (Kopf, Hände, Knie ...), der nicht anklickbar ist.
// - decor: true = nur Linien zur Verzierung (z.B. Sixpack-Linien), nicht anklickbar.

export type BodyShape = {
  d: string
  muscle?: MuscleId
  mirror?: boolean
  decor?: boolean
}

// Teile, die vorne und hinten gleich aussehen
const head = 'M100 9 C110 9 117 18 117 30 C117 43 110 52 100 52 C90 52 83 43 83 30 C83 18 90 9 100 9 Z'
const neck = 'M92 48 L108 48 L110 64 L90 64 Z'
const forearm = 'M48 154 C54 156 62 154 66 146 C68 162 64 186 58 206 C54 210 46 210 42 206 C40 188 42 170 48 154 Z'
const hand = 'M42 211 C46 215 54 215 58 211 C60 221 56 232 50 234 C44 232 40 222 42 211 Z'
const knee = 'M74 312 C80 318 90 318 94 312 L94 326 C88 330 80 330 74 326 Z'
const foot = 'M78 401 C82 405 88 405 91 401 L93 412 C87 416 78 416 74 412 Z'
const upperArm = 'M53 116 C57 106 63 98 70 94 C72 108 70 126 66 140 C62 150 54 152 48 148 C46 136 48 124 53 116 Z'

export const frontShapes: BodyShape[] = [
  // Neutrale Teile zuerst (liegen "unten")
  { d: head },
  { d: neck },
  { d: forearm, mirror: true },
  { d: hand, mirror: true },
  { d: 'M70 180 C74 196 84 206 100 208 C116 206 126 196 130 180 L132 214 L68 214 Z' }, // Hüfte
  { d: knee, mirror: true },
  { d: foot, mirror: true },

  // Muskeln
  {
    muscle: 'schultern',
    mirror: true,
    d: 'M86 66 C70 64 56 70 51 84 C48 94 49 104 52 112 C56 104 62 96 70 90 C74 80 79 72 86 66 Z',
  },
  {
    muscle: 'brust',
    mirror: true,
    d: 'M98 70 L98 112 C90 116 80 116 72 110 C68 104 68 96 71 90 C76 79 86 71 98 70 Z',
  },
  { muscle: 'bizeps', mirror: true, d: upperArm },
  {
    muscle: 'bauch',
    d: 'M80 118 C88 121 112 121 120 118 C122 140 122 170 118 196 C110 204 90 204 82 196 C78 170 78 140 80 118 Z',
  },
  {
    muscle: 'bauch', // schräge Bauchmuskeln (seitlich)
    mirror: true,
    d: 'M71 114 C73 116 75 117 77 118 C75 142 75 170 79 196 C75 194 71 188 69 180 C67 158 67 134 71 114 Z',
  },
  {
    muscle: 'quadrizeps',
    mirror: true,
    d: 'M68 216 L98 216 C99 240 98 270 94 300 C90 311 80 313 74 307 C68 284 64 250 68 216 Z',
  },
  {
    muscle: 'waden',
    mirror: true,
    d: 'M74 330 C80 334 90 334 94 330 C96 350 94 376 90 396 C86 402 80 402 78 396 C72 376 70 350 74 330 Z',
  },

  {
    muscle: 'subscapularis', // liegt eigentlich versteckt hinter den Rippen, darum nur angedeutet
    mirror: true,
    d: 'M71 92 C67 97 67 105 71 110 C75 105 75 97 71 92 Z',
  },

  // Sixpack-Linien
  { decor: true, d: 'M100 121 L100 200 M81 140 L119 140 M80 162 L120 162 M81 182 L119 182' },
]

export const backShapes: BodyShape[] = [
  { d: head },
  { d: neck },
  { d: forearm, mirror: true },
  { d: hand, mirror: true },
  { d: knee, mirror: true },
  { d: foot, mirror: true },

  {
    muscle: 'ruecken', // breiter Rückenmuskel (Latissimus)
    mirror: true,
    d: 'M72 88 C82 96 92 112 99 130 L99 178 C92 182 84 182 78 176 C74 160 70 140 66 120 C64 108 66 96 72 88 Z',
  },
  {
    muscle: 'ruecken', // unterer Rücken
    d: 'M79 180 C86 186 114 186 121 180 L124 200 C112 206 88 206 76 200 Z',
  },
  {
    muscle: 'nacken', // Trapezmuskel
    d: 'M91 50 C94 58 106 58 109 50 C117 61 129 67 140 72 C128 80 114 100 100 126 C86 100 72 80 60 72 C71 67 83 61 91 50 Z',
  },
  {
    muscle: 'schultern',
    mirror: true,
    d: 'M60 73 C54 77 50 85 50 96 C50 104 51 110 53 114 C58 104 64 96 71 88 C69 82 65 77 60 73 Z',
  },
  { muscle: 'trizeps', mirror: true, d: upperArm },
  {
    muscle: 'gesaess',
    mirror: true,
    d: 'M99 204 L99 246 C90 252 76 250 70 240 C66 228 68 214 75 205 C84 208 92 208 99 204 Z',
  },
  {
    muscle: 'beinbeuger',
    mirror: true,
    d: 'M70 248 C78 255 92 255 98 251 C98 272 96 292 94 308 C88 314 80 314 74 308 C70 290 68 268 70 248 Z',
  },
  {
    muscle: 'waden',
    mirror: true,
    d: 'M74 330 C82 325 92 327 95 335 C97 351 94 369 90 381 C86 398 80 400 78 394 C72 376 68 346 74 330 Z',
  },

  {
    muscle: 'infraspinatus', // auf der Rückseite des Schulterblatts
    mirror: true,
    d: 'M68 88 C75 91 83 99 88 110 C82 120 72 122 66 116 C64 106 65 96 68 88 Z',
  },

  // Wirbelsäulen-Linie
  { decor: true, d: 'M100 126 L100 200' },
]

// Muskeln, die man nur von hinten sieht. Hilft zu entscheiden, welche Seite wir zeigen.
const BACK_MUSCLES: MuscleId[] = ['ruecken', 'nacken', 'trizeps', 'gesaess', 'beinbeuger', 'infraspinatus']

// Gibt 'back' zurück, wenn der erste Hauptmuskel hinten liegt, sonst 'front'
export function sideForMuscles(muscles: MuscleId[]): 'front' | 'back' {
  return muscles.length > 0 && BACK_MUSCLES.includes(muscles[0]) ? 'back' : 'front'
}
