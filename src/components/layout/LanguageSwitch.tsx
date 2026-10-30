import { motion } from 'motion/react'

import { languages, useI18n } from '../../i18n/i18n'

// Sprachumschalter DE / FR. Der Hintergrund der aktiven Sprache gleitet beim Wechseln mit.
export default function LanguageSwitch({ idPrefix }: { idPrefix: string }) {
  const { lang, setLang, t } = useI18n()

  return (
    <div
      role="group"
      aria-label={t('language.label')}
      className="flex rounded-full border border-white/10 bg-surface/60 p-0.5 text-xs font-bold"
    >
      {languages.map((option) => {
        const active = option === lang
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            // lang-Attribut: Screenreader lesen "Français" auf Französisch vor
            lang={option}
            aria-label={t(`language.${option}`)}
            onClick={() => setLang(option)}
            className={`relative rounded-full px-2.5 py-1.5 uppercase transition-colors ${
              active ? 'text-accent-ink' : 'text-muted hover:text-text'
            }`}
          >
            {active && (
              <motion.span
                // idPrefix: Desktop und Handy-Menü brauchen je ein eigenes layoutId
                layoutId={`${idPrefix}-lang-pill`}
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              />
            )}
            <span className="relative">{option}</span>
          </button>
        )
      })}
    </div>
  )
}
