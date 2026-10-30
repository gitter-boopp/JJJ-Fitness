import type { ReactNode } from 'react'
import Container from './Container'

type SectionProps = {
  children: ReactNode
  id?: string
  className?: string
}

// Ein Seitenabschnitt mit einheitlichem Abstand oben und unten.
// So sehen alle Abschnitte auf allen Seiten gleich "luftig" aus.
export default function Section({ children, id, className = '' }: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}
