import { stages } from '../../data/project'
import { useI18n } from '../../i18n/i18n'
import Reveal from '../motion/Reveal'

// Projektverlauf: alle Etappen als senkrechte Zeitleiste.
// Erledigte Etappen sind in der Akzentfarbe, die nächste ist hervorgehoben.
export default function Timeline() {
  const { t } = useI18n()
  // Die erste Etappe, die noch nicht erledigt ist = "als Nächstes"
  const nextNumber = stages.find((stage) => !stage.done)?.number

  return (
    <ol className="relative space-y-3 border-l border-white/10 pl-8">
      {stages.map((stage, index) => {
        const isNext = stage.number === nextNumber
        return (
          <li key={stage.number} className="relative">
            {/* Punkt auf der Linie */}
            <span
              aria-hidden
              className={`absolute top-1/2 -left-[2.4rem] size-4 -translate-y-1/2 rounded-full border-2 ${
                stage.done
                  ? 'border-accent bg-accent'
                  : isNext
                    ? 'border-accent bg-bg'
                    : 'border-white/20 bg-bg'
              }`}
            />
            <Reveal
              delay={index * 0.05}
              className={`flex items-center justify-between gap-4 rounded-xl border px-5 py-4 ${
                isNext ? 'border-accent/40 bg-accent/5' : 'border-white/5 bg-surface'
              }`}
            >
              <span>
                <span className="mr-3 font-display font-bold text-accent">{stage.number}</span>
                <span className={stage.done || isNext ? 'text-text' : 'text-muted'}>
                  {t(`about.stages.${stage.number}`)}
                </span>
              </span>
              <span className="shrink-0 text-sm text-muted">
                {stage.done ? t('about.stageDone') : isNext ? t('about.stageNext') : t('about.stageOpen')}
              </span>
            </Reveal>
          </li>
        )
      })}
    </ol>
  )
}
