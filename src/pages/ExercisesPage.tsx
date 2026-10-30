import Section from '../components/ui/Section'
import PageHeader from '../components/ui/PageHeader'
import ComingSoon from '../components/ui/ComingSoon'

export default function ExercisesPage() {
  return (
    <Section>
      <title>Übungen – JJJ Fitness</title>
      <PageHeader eyebrow="Übungsbibliothek" title="Übungen">
        Finde die richtige Übung für jeden Muskel, mit Anleitung Schritt für Schritt.
      </PageHeader>
      <ComingSoon
        stage={3}
        items={[
          'Rund 30 Übungen mit Bild',
          'Filter nach Muskelgruppe, Equipment und Level',
          'Suchfeld',
          'Detailseite pro Übung: Ausführung, häufige Fehler, Sätze und Wiederholungen, Alternativen',
        ]}
      />
    </Section>
  )
}
