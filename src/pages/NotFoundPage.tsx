import Section from '../components/ui/Section'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'

// Wird angezeigt, wenn jemand eine Adresse aufruft, die es nicht gibt.
export default function NotFoundPage() {
  return (
    <Section>
      <title>Seite nicht gefunden – JJJ Fitness</title>
      <PageHeader eyebrow="Fehler 404" title="Diese Seite gibt es nicht.">
        Vielleicht hat sich ein Tippfehler eingeschlichen.
      </PageHeader>
      <Button to="/" className="mt-10">
        Zur Startseite
      </Button>
    </Section>
  )
}
