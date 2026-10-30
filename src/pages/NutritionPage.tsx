import { useLenis } from 'lenis/react'

import { nutritionBasics } from '../data/nutritionBasics'
import { recipes } from '../data/recipes'
import Calculator from '../components/nutrition/Calculator'
import RecipeCard from '../components/nutrition/RecipeCard'
import Reveal from '../components/motion/Reveal'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'

export default function NutritionPage() {
  const lenis = useLenis()

  // Weich zu einem Abschnitt weiter unten scrollen (offset: Platz für die Navigation)
  const scrollToSection = (id: string) => {
    if (lenis) lenis.scrollTo(`#${id}`, { offset: -80 })
    else document.getElementById(id)?.scrollIntoView()
  }

  return (
    <>
      <title>Ernährung – JJJ Fitness</title>

      <Section>
        <PageHeader eyebrow="Ernährung" title="Richtig essen für Muskelaufbau">
          Kalorien, Protein, Kohlenhydrate und Fett, einfach erklärt. Dazu ein Rechner für deinen Bedarf und günstige
          Rezepte.
        </PageHeader>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          {/* Sprungmarken zu den Abschnitten weiter unten */}
          <Button size="lg" onClick={() => scrollToSection('rechner')}>
            Zum Rechner
          </Button>
          <Button size="lg" variant="secondary" onClick={() => scrollToSection('rezepte')}>
            Zu den Rezepten
          </Button>
        </div>
      </Section>

      {/* ---------- Grundlagen ---------- */}
      <Section className="pt-0 md:pt-0">
        <SectionHeading eyebrow="Grundlagen" title="Was dein Körper braucht">
          Drei Nährstoffe liefern Energie: Protein, Kohlenhydrate und Fett. Alle drei sind wichtig, keiner ist «böse».
        </SectionHeading>

        <ul className="grid gap-4 md:grid-cols-2">
          {nutritionBasics.map((basic, index) => (
            <li key={basic.title}>
              <Reveal delay={index * 0.08} className="h-full rounded-2xl border border-white/5 bg-surface p-6 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl md:text-3xl">{basic.title}</h3>
                  <span className="shrink-0 rounded-full border border-accent/40 px-3 py-1 text-sm text-accent">
                    {basic.badge}
                  </span>
                </div>
                <p className="mt-4 text-muted">{basic.text}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Gute Quellen für ${basic.title}`}>
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
          <h3 className="text-xl">Und Supplements?</h3>
          <p className="mt-2 max-w-3xl text-muted">
            Brauchst du nicht. Mit normalem Essen wie Quark, Eiern, Milch, Hülsenfrüchten oder Poulet erreichst du dein
            Protein problemlos. Wichtiger als jedes Pulver sind genug Schlaf und regelmässiges Training.
          </p>
        </Reveal>
      </Section>

      {/* ---------- Rechner ---------- */}
      {/* scroll-mt: Beim Sprung (ohne Lenis) verschwindet die Überschrift nicht unter der Navigation */}
      <Section id="rechner" className="scroll-mt-16 pt-0 md:pt-0">
        <SectionHeading eyebrow="Rechner" title="Wie viel solltest du essen?">
          Berechne deinen Kalorien- und Proteinbedarf für den Muskelaufbau.
        </SectionHeading>
        <Calculator />
      </Section>

      {/* ---------- Rezepte ---------- */}
      <Section id="rezepte" className="scroll-mt-16 pt-0 md:pt-0">
        <SectionHeading eyebrow="Rezepte" title="Günstig, einfach, viel Protein">
          Alle Rezepte kosten wenig, gehen schnell und kommen ohne spezielle Produkte aus.
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
