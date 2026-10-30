import Section from '../components/ui/Section'
import PageHeader from '../components/ui/PageHeader'
import ComingSoon from '../components/ui/ComingSoon'

export default function AboutPage() {
  return (
    <Section>
      <title>Über uns – JJJ Fitness</title>
      <PageHeader eyebrow="Über uns" title="Wer hinter JJJ Fitness steckt">
        Wir sind KV-Lernende aus Basel und bauen diese Seite im Fach Projektmanagement.
      </PageHeader>
      <ComingSoon
        stage={6}
        items={['Wer wir sind und warum wir das Projekt machen', 'Feedback-Formular mit Bewertung 1–5', 'Bildquellen']}
      />
    </Section>
  )
}
