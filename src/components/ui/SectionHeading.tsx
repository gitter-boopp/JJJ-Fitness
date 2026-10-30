import type { ReactNode } from 'react'
import Reveal from '../motion/Reveal'

type SectionHeadingProps = {
  eyebrow: string // Kleine Zeile über dem Titel
  title: string
  children?: ReactNode // Einleitungstext
}

// Überschrift für einen Abschnitt innerhalb einer Seite (h2).
// Für den Titel ganz oben auf einer Unterseite gibt es PageHeader (h1).
export default function SectionHeading({ eyebrow, title, children }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-2xl md:mb-16">
      <p className="mb-4 text-sm font-semibold tracking-widest text-accent uppercase">{eyebrow}</p>
      <h2 className="text-3xl leading-tight sm:text-4xl md:text-5xl">{title}</h2>
      {children && <p className="mt-5 text-lg text-muted">{children}</p>}
    </Reveal>
  )
}
