import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { createTranslator, I18nContext, languages } from './i18n'
import type { Lang } from './i18n'

// Hier merkt sich der Browser die gewählte Sprache für den nächsten Besuch
const STORAGE_KEY = 'jjj-fitness-lang'

// Startsprache: zuerst die gespeicherte Wahl, sonst die Sprache des Browsers, sonst Deutsch
function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (languages.includes(saved as Lang)) return saved as Lang
  } catch {
    // localStorage kann gesperrt sein (z.B. privater Modus). Dann einfach weiter.
  }
  return navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'de'
}

// Stellt die Sprache und die Übersetzungs-Funktion t() für die ganze App bereit
export default function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  // <html lang="..."> anpassen: wichtig für Screenreader (richtige Aussprache) und Suchmaschinen
  useEffect(() => {
    document.documentElement.lang = lang === 'fr' ? 'fr-CH' : 'de-CH'
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Nicht schlimm, dann wird die Wahl einfach nicht gespeichert
    }
  }, [])

  // useMemo: nur neu erstellen, wenn sich die Sprache ändert
  const value = useMemo(() => ({ ...createTranslator(lang), setLang }), [lang, setLang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
