import Section from '../components/ui/Section'
import PageHeader from '../components/ui/PageHeader'
import ComingSoon from '../components/ui/ComingSoon'

export default function NutritionPage() {
  return (
    <Section>
      <title>Ernährung – JJJ Fitness</title>
      <PageHeader eyebrow="Ernährung" title="Richtig essen für Muskelaufbau">
        Kalorien, Protein, Kohlenhydrate und Fett, einfach erklärt.
      </PageHeader>
      <ComingSoon
        stage={5}
        items={[
          'Grundlagen: Kalorien, Protein, Kohlenhydrate, Fett',
          'Kalorienrechner (Mifflin-St-Jeor) mit leichtem Überschuss',
          'Proteinrechner (1,6–2,2 g pro kg Körpergewicht)',
          'Günstige, einfache Rezepte mit viel Protein',
        ]}
      />
    </Section>
  )
}
