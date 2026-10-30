import { useSearchParams } from 'react-router'

import { findMuscle } from '../data/muscles'
import Section from '../components/ui/Section'
import PageHeader from '../components/ui/PageHeader'
import ComingSoon from '../components/ui/ComingSoon'

export default function ExercisesPage() {
  // Liest den Muskel aus der Adresse, z.B. /uebungen?muskel=brust (kommt von der Muskel-Karte)
  const [searchParams] = useSearchParams()
  const muscle = findMuscle(searchParams.get('muskel'))

  return (
    <Section>
      <title>Übungen – JJJ Fitness</title>
      <PageHeader eyebrow="Übungsbibliothek" title="Übungen">
        Finde die richtige Übung für jeden Muskel, mit Anleitung Schritt für Schritt.
      </PageHeader>

      {muscle && (
        <p className="mt-8 inline-flex rounded-full border border-accent/40 px-4 py-2 text-sm">
          Filter aktiv:&nbsp;<strong className="text-accent">{muscle.name}</strong>
        </p>
      )}

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
