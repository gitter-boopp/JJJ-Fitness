import Button from '../components/ui/Button'
import Section from '../components/ui/Section'
import ComingSoon from '../components/ui/ComingSoon'

// Startseite. In Etappe 1 nur ein einfacher Hero, die Animationen kommen in Etappe 2.
export default function HomePage() {
  return (
    <>
      {/* React 19 setzt <title> automatisch in den <head> der Seite */}
      <title>JJJ Fitness – Muskelaufbau einfach erklärt</title>

      <Section className="md:py-32">
        <p className="mb-6 text-sm font-semibold tracking-widest text-accent uppercase">Muskelaufbau für Einsteiger</p>
        <h1 className="max-w-4xl text-5xl leading-[0.95] sm:text-6xl md:text-8xl">
          Stärker werden. <span className="block text-muted">Schritt für Schritt.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-muted md:text-xl">
          Übungen, Trainingspläne und Ernährung an einem Ort. Verständlich erklärt, ohne Extrem-Diäten und ohne
          Werbung.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button to="/uebungen" size="lg">
            Jetzt starten
          </Button>
          <Button to="/trainingsplaene" size="lg" variant="secondary">
            Trainingspläne ansehen
          </Button>
        </div>

        <ComingSoon
          stage={2}
          items={[
            'Überschrift fährt Wort für Wort rein, dahinter ein bewegter Gradient',
            '3 Karten: Übungen, Trainingspläne, Ernährung',
            'Interaktive Muskel-Karte',
            'Die 5 Grundregeln für Muskelaufbau',
          ]}
        />
      </Section>
    </>
  )
}
