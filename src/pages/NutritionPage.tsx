import { useLenis } from 'lenis/react'

import { recipes } from '../data/recipes'
import { useI18n } from '../i18n/i18n'
import Calculator from '../components/nutrition/Calculator'
import RecipeCard from '../components/nutrition/RecipeCard'
import Reveal from '../components/motion/Reveal'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'

type Basic = { title: string; badge: string; text: string; sources: string[] }

export default function NutritionPage() {
  const { t, tList } = useI18n()
  const lenis = useLenis()

  // Weich zu einem Abschnitt weiter unten scrollen (offset: Platz für die Navigation)
  const scrollToSection = (id: string) => {
    if (lenis) lenis.scrollTo(`#${id}`, { offset: -80 })
    else document.getElementById(id)?.scrollIntoView()
  }

  return (
    <>
      <title>{`${t('nutritionPage.title')} – JJJ Fitness`}</title>

      <Section>
        <PageHeader eyebrow={t('nutritionPage.eyebrow')} title={t('nutritionPage.heading')}>
          {t('nutritionPage.intro')}
        </PageHeader>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          {/* Sprungmarken zu den Abschnitten weiter unten */}
          <Button size="lg" onClick={() => scrollToSection('rechner')}>
            {t('nutritionPage.toCalculator')}
          </Button>
          <Button size="lg" variant="secondary" onClick={() => scrollToSection('rezepte')}>
            {t('nutritionPage.toRecipes')}
          </Button>
        </div>
      </Section>

      {/* ---------- Grundlagen ---------- */}
      <Section className="pt-0 md:pt-0">
        <SectionHeading eyebrow={t('nutritionPage.basics.eyebrow')} title={t('nutritionPage.basics.title')}>
          {t('nutritionPage.basics.text')}
        </SectionHeading>

        <ul className="grid gap-4 md:grid-cols-2">
          {tList<Basic>('nutritionPage.basics.items').map((basic, index) => (
            <li key={basic.title}>
              <Reveal delay={index * 0.08} className="h-full rounded-2xl border border-white/5 bg-surface p-6 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl md:text-3xl">{basic.title}</h3>
                  <span className="shrink-0 rounded-full border border-accent/40 px-3 py-1 text-sm text-accent">
                    {basic.badge}
                  </span>
                </div>
                <p className="mt-4 text-muted">{basic.text}</p>
                <ul
                  className="mt-5 flex flex-wrap gap-2"
                  aria-label={t('nutritionPage.basics.sourcesLabel', { topic: basic.title })}
                >
                  {basic.sources.map((source) => (
                    <li key={source} className="rounded-full bg-surface-2 px-3 py-1 text-sm">
                      {source}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-4 rounded-2xl border border-dashed border-white/10 p-6 md:p-8">
          <h3 className="text-xl">{t('nutritionPage.supplements.title')}</h3>
          <p className="mt-2 max-w-3xl text-muted">{t('nutritionPage.supplements.text')}</p>
        </Reveal>
      </Section>

      {/* ---------- Rechner ---------- */}
      {/* scroll-mt: Beim Sprung (ohne Lenis) verschwindet die Überschrift nicht unter der Navigation */}
      <Section id="rechner" className="scroll-mt-16 pt-0 md:pt-0">
        <SectionHeading eyebrow={t('nutritionPage.calculator.eyebrow')} title={t('nutritionPage.calculator.title')}>
          {t('nutritionPage.calculator.text')}
        </SectionHeading>
        <Calculator />
      </Section>

      {/* ---------- Rezepte ---------- */}
      <Section id="rezepte" className="scroll-mt-16 pt-0 md:pt-0">
        <SectionHeading eyebrow={t('nutritionPage.recipes.eyebrow')} title={t('nutritionPage.recipes.title')}>
          {t('nutritionPage.recipes.text')}
        </SectionHeading>
        <ul className="grid items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe, index) => (
            <li key={recipe.id}>
              {/* items-start: Klappt man ein Rezept auf, werden die anderen in der Reihe nicht mitgestreckt */}
              <Reveal delay={(index % 3) * 0.08}>
                <RecipeCard recipe={recipe} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
