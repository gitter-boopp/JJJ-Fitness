import Card from './Card'

type ComingSoonProps = {
  stage: number // In welcher Etappe wir die Seite bauen
  items: string[] // Was auf die Seite kommt
}

// Platzhalter für Seiten, die wir erst in einer späteren Etappe bauen.
export default function ComingSoon({ stage, items }: ComingSoonProps) {
  return (
    <Card className="mt-12 max-w-2xl">
      <p className="text-sm font-semibold text-accent">Kommt in Etappe {stage}</p>
      <ul className="mt-4 space-y-2 text-muted">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent/60" />
            {item}
          </li>
        ))}
      </ul>
    </Card>
  )
}
