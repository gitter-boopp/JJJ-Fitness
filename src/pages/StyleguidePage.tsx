import Section from '../components/ui/Section'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

// Übersicht über unser Design-System. Praktisch für die Projektdoku (Screenshot!)
// und als Nachschlagewerk, welche Bausteine es schon gibt.

const colors = [
  { name: 'Hintergrund', token: 'bg', hex: '#0B0B0F', className: 'bg-bg border border-white/10' },
  { name: 'Karte', token: 'surface', hex: '#16161D', className: 'bg-surface' },
  { name: 'Karte hell', token: 'surface-2', hex: '#1F1F28', className: 'bg-surface-2' },
  { name: 'Text', token: 'text', hex: '#F5F5F7', className: 'bg-text' },
  { name: 'Nebentext', token: 'muted', hex: '#A1A1AA', className: 'bg-muted' },
  { name: 'Akzent', token: 'accent', hex: '#C6FF3D', className: 'bg-accent' },
]

// Kleine Überschrift für jeden Bereich der Seite
function Heading({ children }: { children: string }) {
  return <h2 className="mb-6 text-2xl md:text-3xl">{children}</h2>
}

export default function StyleguidePage() {
  return (
    <>
      <title>Design-System – JJJ Fitness</title>

      <Section>
        <PageHeader eyebrow="Design-System" title="Unsere Bausteine">
          Farben, Schriften und Komponenten, aus denen die ganze Seite gebaut ist.
        </PageHeader>
      </Section>

      <Section className="pt-0 md:pt-0">
        <Heading>Farben</Heading>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {colors.map((color) => (
            <li key={color.token}>
              <div className={`aspect-square rounded-2xl ${color.className}`} />
              <p className="mt-3 font-medium">{color.name}</p>
              <p className="text-sm text-muted">
                {color.token} · {color.hex}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="pt-0 md:pt-0">
        <Heading>Schriften</Heading>
        <div className="space-y-8">
          <div>
            <p className="mb-2 text-sm text-muted">Überschriften: Space Grotesk, fett</p>
            <p className="font-display text-5xl font-bold tracking-tight md:text-7xl">Stark bleiben.</p>
          </div>
          <div>
            <p className="mb-2 text-sm text-muted">Fliesstext: Inter</p>
            <p className="max-w-2xl text-lg">
              Muskeln wachsen nicht im Training, sondern in der Erholung danach. Genug Schlaf und Protein sind deshalb
              genauso wichtig wie die Übungen selbst.
            </p>
          </div>
        </div>
      </Section>

      <Section className="pt-0 md:pt-0">
        <Heading>Buttons</Heading>
        <div className="flex flex-wrap items-center gap-4">
          <Button>Primär</Button>
          <Button variant="secondary">Sekundär</Button>
          <Button variant="ghost">Zurückhaltend</Button>
          <Button size="sm">Klein</Button>
          <Button size="lg">Gross</Button>
          <Button disabled>Deaktiviert</Button>
        </div>
      </Section>

      <Section className="pt-0 md:pt-0">
        <Heading>Karten</Heading>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <h3 className="text-xl">Normale Karte</h3>
            <p className="mt-2 text-muted">Für Inhalte, die man nur liest.</p>
          </Card>
          <Card interactive>
            <h3 className="text-xl">Interaktive Karte</h3>
            <p className="mt-2 text-muted">Fahr mit der Maus drüber: Sie hebt sich an und leuchtet.</p>
          </Card>
        </div>
      </Section>
    </>
  )
}
