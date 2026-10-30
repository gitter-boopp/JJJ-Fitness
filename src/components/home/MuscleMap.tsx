import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import { muscleIds } from '../../data/muscles'
import type { MuscleId } from '../../data/muscles'
import { useI18n } from '../../i18n/i18n'
import Reveal from '../motion/Reveal'
import BodyFigure from '../ui/BodyFigure'
import Button from '../ui/Button'
import Chip from '../ui/Chip'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'

export default function MuscleMap() {
  const { t } = useI18n()
  const [selected, setSelected] = useState<MuscleId | null>(null)
  const [hovered, setHovered] = useState<MuscleId | null>(null)

  // Im Infokasten zeigen wir den Muskel unter der Maus, sonst den ausgewählten
  const shown = hovered ?? selected

  // Diese Eigenschaften bekommen beide Figuren (vorne und hinten)
  const figureProps = {
    primary: selected ? [selected] : [],
    hovered,
    onHover: setHovered,
    onSelect: setSelected,
    className: 'h-auto w-full max-w-[220px]',
  }

  return (
    <Section id="muskel-karte">
      <SectionHeading eyebrow={t('home.muscleMap.eyebrow')} title={t('home.muscleMap.title')}>
        {t('home.muscleMap.text')}
      </SectionHeading>

      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* Die zwei Körper: vorne und hinten */}
        <Reveal className="relative rounded-3xl border border-white/5 bg-surface p-6 md:p-10">
          <div className="grid grid-cols-2 gap-4 md:gap-10">
            <BodyFigure side="front" label={t('common.front')} {...figureProps} />
            <BodyFigure side="back" label={t('common.back')} {...figureProps} />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {/* Infokasten zum gewählten Muskel. aria-live: Screenreader lesen Änderungen vor. */}
          <div className="min-h-[11rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={shown ?? 'leer'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {shown ? (
                  <>
                    <h3 className="text-3xl md:text-4xl">{t(`muscles.${shown}.name`)}</h3>
                    <p className="mt-3 text-lg text-muted">{t(`muscles.${shown}.description`)}</p>
                  </>
                ) : (
                  <>
                    <h3 className="text-3xl text-muted md:text-4xl">{t('home.muscleMap.emptyTitle')}</h3>
                    <p className="mt-3 text-lg text-muted">{t('home.muscleMap.emptyText')}</p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {selected && (
            <Button to={`/uebungen?muskel=${selected}`} className="mb-8">
              {t('home.muscleMap.cta', { muscle: t(`muscles.${selected}.name`) })}
            </Button>
          )}

          {/* Alle Muskeln als Buttons: praktisch auf dem Handy und für die Tastatur */}
          <ul className="flex flex-wrap gap-2" aria-label={t('home.muscleMap.groups')}>
            {muscleIds.map((id) => {
              const isSelected = id === selected
              return (
                <li key={id}>
                  <Chip
                    active={isSelected}
                    onClick={() => setSelected(isSelected ? null : id)}
                    onPointerEnter={() => setHovered(id)}
                    onPointerLeave={() => setHovered(null)}
                  >
                    {t(`muscles.${id}.name`)}
                  </Chip>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
