import { useState } from 'react'

import type { MuscleId } from '../data/muscles'
import { useI18n } from '../i18n/i18n'
import { normalize } from '../utils/filterExercises'
import Reveal from '../components/motion/Reveal'
import BodyFigure from '../components/ui/BodyFigure'
import Button from '../components/ui/Button'
import Chip from '../components/ui/Chip'
import { SearchIcon } from '../components/ui/Icons'
import PageHeader from '../components/ui/PageHeader'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'

type Term = { term: string; category: string; text: string }

const categories = ['training', 'anatomy', 'nutrition']

// Die zwei unterschätzten Schultermuskeln mit der Seite, auf der man sie zeigt
const spotlightMuscles: { id: MuscleId; side: 'front' | 'back' }[] = [
  { id: 'subscapularis', side: 'front' },
  { id: 'infraspinatus', side: 'back' },
]

export default function LexiconPage() {
  const { t, tList, lang } = useI18n()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string | null>(null)

  // Filtern und alphabetisch sortieren, passend zur gewählten Sprache
  const search = normalize(query.trim())
  const terms = tList<Term>('lexicon.terms')
    .filter((item) => !category || item.category === category)
    .filter((item) => normalize(`${item.term} ${item.text}`).includes(search))
    .sort((a, b) => a.term.localeCompare(b.term, lang))

  return (
    <>
      <title>{`${t('lexicon.title')} – JJJ Fitness`}</title>

      <Section>
        <PageHeader eyebrow={t('lexicon.eyebrow')} title={t('lexicon.heading')}>
          {t('lexicon.intro')}
        </PageHeader>
      </Section>

      {/* ---------- Unterschätzte Schultermuskeln ---------- */}
      <Section className="pt-0 md:pt-0">
        <SectionHeading eyebrow={t('lexicon.spotlight.eyebrow')} title={t('lexicon.spotlight.title')}>
          {t('lexicon.spotlight.text')}
        </SectionHeading>
        <div className="grid gap-4 md:grid-cols-2">
          {spotlightMuscles.map(({ id, side }, index) => (
            <Reveal
              key={id}
              delay={index * 0.08}
              className="flex h-full gap-5 rounded-2xl border border-white/5 bg-surface p-6 md:p-8"
            >
              <div className="w-24 shrink-0 sm:w-32">
                <BodyFigure side={side} primary={[id]} className="h-auto w-full" />
              </div>
              <div className="flex flex-col items-start">
                <h3 className="text-2xl">{t(`muscles.${id}.name`)}</h3>
                <p className="mt-3 flex-1 text-muted">{t(`lexicon.spotlight.${id}`)}</p>
                <Button to={`/uebungen?muskel=${id}`} size="sm" variant="secondary" className="mt-5">
                  {t('lexicon.spotlight.cta')}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 max-w-3xl rounded-2xl border border-dashed border-white/10 p-6 text-muted">
          {t('lexicon.spotlight.note')}
        </p>
      </Section>

      {/* ---------- Begriffe ---------- */}
      <Section className="pt-0 md:pt-0">
        <div className="relative max-w-xl">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" />
          <label htmlFor="lexicon-search" className="sr-only">
            {t('lexicon.searchLabel')}
          </label>
          <input
            id="lexicon-search"
            type="search"
            placeholder={t('lexicon.searchPlaceholder')}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-full border border-white/10 bg-surface py-3 pr-4 pl-12 text-text placeholder:text-muted/70 focus:border-accent/60 focus:outline-none"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Chip active={!category} onClick={() => setCategory(null)}>
            {t('common.all')}
          </Chip>
          {categories.map((id) => (
            <Chip key={id} active={category === id} onClick={() => setCategory(category === id ? null : id)}>
              {t(`lexicon.categories.${id}`)}
            </Chip>
          ))}
        </div>

        {terms.length > 0 ? (
          <dl className="mt-8 grid gap-4 md:grid-cols-2">
            {terms.map((item) => (
              <div key={item.term} className="rounded-2xl border border-white/5 bg-surface p-6">
                <dt className="font-display text-xl font-bold">{item.term}</dt>
                <dd className="mt-2 text-muted">{item.text}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="mt-8 rounded-2xl border border-dashed border-white/10 p-10 text-center text-muted">
            {t('lexicon.empty')}
          </p>
        )}
      </Section>
    </>
  )
}
