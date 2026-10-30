// Unser kleines Übersetzungs-System (ohne zusätzliche Bibliothek).
//
// So funktioniert es:
// - Alle Texte stehen in de.json und fr.json, mit der gleichen Struktur.
// - Im Code holt man einen Text mit t('nav.exercises'). Der Punkt geht eine Ebene tiefer.
// - Platzhalter in geschweiften Klammern werden ersetzt:
//   t('exercisesPage.intro', { count: 30 })  ->  "30 Übungen mit Anleitung ..."
// - Fehlt ein Text auf Französisch, wird automatisch der deutsche angezeigt.
//   So funktioniert die Seite auch, wenn die Übersetzung noch nicht fertig ist.

import { createContext, useContext } from 'react'
import de from './de.json'
import fr from './fr.json'

export type Lang = 'de' | 'fr'
export const languages: Lang[] = ['de', 'fr']

const dictionaries: Record<Lang, unknown> = { de, fr }

type Vars = Record<string, string | number>

// Sucht einen Wert anhand eines Pfads wie "home.hero.line1"
function lookup(dictionary: unknown, key: string): unknown {
  return key.split('.').reduce<unknown>((node, part) => {
    if (node && typeof node === 'object') return (node as Record<string, unknown>)[part]
    return undefined
  }, dictionary)
}

// Ersetzt {name} im Text durch den passenden Wert
function fillIn(text: string, vars?: Vars): string {
  if (!vars) return text
  return text.replace(/\{(\w+)\}/g, (match, name: string) => (name in vars ? String(vars[name]) : match))
}

export function createTranslator(lang: Lang) {
  // Erst in der gewählten Sprache suchen, sonst auf Deutsch
  const get = (key: string): unknown => {
    const value = lookup(dictionaries[lang], key)
    if (value !== undefined && value !== '') return value
    return lookup(dictionaries.de, key)
  }

  // Einen Text holen
  const t = (key: string, vars?: Vars): string => {
    const value = get(key)
    if (typeof value === 'string') return fillIn(value, vars)
    // Hilft beim Entwickeln: zeigt in der Konsole, welcher Text fehlt
    if (import.meta.env.DEV) console.warn(`Übersetzung fehlt: ${key}`)
    return key
  }

  // Eine Liste holen, z.B. die Schritte einer Übung (Liste von Texten oder Objekten)
  const tList = <T = string>(key: string): T[] => {
    const value = get(key)
    return Array.isArray(value) ? (value as T[]) : []
  }

  // Gibt es diesen Text? (z.B. für optionale Hinweise, die nicht jeder Plan hat)
  const has = (key: string): boolean => typeof get(key) === 'string'

  return { lang, t, tList, has }
}

export type I18n = ReturnType<typeof createTranslator> & {
  setLang: (lang: Lang) => void
}

export const I18nContext = createContext<I18n | null>(null)

// In jeder Komponente: const { t } = useI18n()
export function useI18n(): I18n {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n muss innerhalb von <I18nProvider> verwendet werden')
  return context
}
