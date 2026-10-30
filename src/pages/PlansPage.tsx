import Section from '../components/ui/Section'
import PageHeader from '../components/ui/PageHeader'
import ComingSoon from '../components/ui/ComingSoon'

export default function PlansPage() {
  return (
    <Section>
      <title>Trainingspläne – JJJ Fitness</title>
      <PageHeader eyebrow="Trainingspläne" title="Dein Plan für jede Woche">
        Drei bewährte Pläne, vom ersten Training bis zum Fortgeschrittenen.
      </PageHeader>
      <ComingSoon
        stage={4}
        items={[
          'Ganzkörper 3x pro Woche (Anfänger)',
          'Oberkörper/Unterkörper 4x pro Woche',
          'Push/Pull/Legs',
          'Tabs pro Trainingstag, Plan als PDF druckbar',
        ]}
      />
    </Section>
  )
}
