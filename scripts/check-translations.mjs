// Prüft, ob fr.json zu de.json passt.
// Aufruf: npm run i18n:check
//
// Gemeldet wird:
// - FEHLT:  Text gibt es auf Deutsch, aber nicht auf Französisch (dann wird Deutsch angezeigt)
// - LEER:   Text auf Französisch ist leer
// - ZUVIEL: Text gibt es nur auf Französisch (vermutlich Tippfehler im Schlüssel)
// - LISTE:  Eine Liste (z.B. Schritte einer Übung) hat eine andere Länge
// - GLEICH: Text ist auf beiden Sprachen identisch (vielleicht noch nicht übersetzt)

import { readFileSync } from 'node:fs'

const de = JSON.parse(readFileSync(new URL('../src/i18n/de.json', import.meta.url), 'utf8'))
const fr = JSON.parse(readFileSync(new URL('../src/i18n/fr.json', import.meta.url), 'utf8'))

const problems = []
const sameText = []

// Wörter, die in beiden Sprachen gleich sein dürfen (Namen, Fachbegriffe)
const allowedSame = /^(JJJ Fitness|Biceps|Triceps|Dips|Crunch|Push|Pull|Legs|Push\/Pull\/Legs|Feedback|kcal|Tofu|Machine|Bananes|Face pulls|Goblet squat|Hip thrust|Fitness|Design system|Inter.*|Space Grotesk.*|React.*|Tailwind CSS|React Router|KV Basel|Thon|Poulet|Push \/ Pull \/ Legs)$/

function compare(a, b, path) {
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) return problems.push(`FEHLT   ${path} (Liste erwartet)`)
    if (a.length !== b.length) problems.push(`LISTE   ${path}: Deutsch ${a.length}, Französisch ${b.length} Einträge`)
    a.forEach((item, i) => b[i] !== undefined && compare(item, b[i], `${path}[${i}]`))
    return
  }
  if (a && typeof a === 'object') {
    if (!b || typeof b !== 'object') return problems.push(`FEHLT   ${path}`)
    for (const key of Object.keys(a)) {
      const next = path ? `${path}.${key}` : key
      if (!(key in b)) problems.push(`FEHLT   ${next}`)
      else compare(a[key], b[key], next)
    }
    for (const key of Object.keys(b)) {
      if (!(key in a)) problems.push(`ZUVIEL  ${path ? `${path}.${key}` : key}`)
    }
    return
  }
  if (typeof b !== 'string') return problems.push(`FEHLT   ${path}`)
  if (path.endsWith('.category')) return // Kategorien sind technische Werte, keine Texte
  if (b.trim() === '') problems.push(`LEER    ${path}`)
  else if (a === b && !allowedSame.test(a) && /[a-zäöü]{3}/i.test(a)) sameText.push(`GLEICH  ${path}: "${a}"`)
  // Platzhalter wie {count} müssen in beiden Sprachen vorkommen
  const placeholders = (text) => (text.match(/\{\w+\}/g) ?? []).sort().join(',')
  if (placeholders(a) !== placeholders(b)) problems.push(`PLATZHALTER ${path}: Deutsch ${placeholders(a)}, Französisch ${placeholders(b)}`)
}

compare(de, fr, '')

if (sameText.length) {
  console.log(`\nHinweis: ${sameText.length} Texte sind gleich wie auf Deutsch (vielleicht noch übersetzen):`)
  sameText.forEach((line) => console.log('  ' + line))
}
if (problems.length) {
  console.log(`\n${problems.length} Problem(e) gefunden:`)
  problems.forEach((line) => console.log('  ' + line))
  process.exit(1)
}
console.log('\n✓ fr.json passt zu de.json. Alle Texte sind vorhanden.')
