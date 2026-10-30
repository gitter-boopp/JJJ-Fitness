import type { ComponentType, SVGProps } from 'react'
import { Link } from 'react-router'

import Reveal from '../motion/Reveal'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'
import { ArrowRightIcon, BowlIcon, CalendarIcon, DumbbellIcon } from '../ui/Icons'

type OfferItem = {
  title: string
  text: string
  path: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

const items: OfferItem[] = [
  {
    title: 'Übungen',
    text: 'Rund 30 Übungen mit Anleitung, häufigen Fehlern und Alternativen. Filterbar nach Muskel und Equipment.',
    path: '/uebungen',
    Icon: DumbbellIcon,
  },
  {
    title: 'Trainingspläne',
    text: 'Drei fertige Pläne, vom Ganzkörper-Training für Anfänger bis Push/Pull/Legs.',
    path: '/trainingsplaene',
    Icon: CalendarIcon,
  },
  {
    title: 'Ernährung',
    text: 'Kalorien und Protein einfach erklärt, mit Rechner und günstigen Rezepten.',
    path: '/ernaehrung',
    Icon: BowlIcon,
  },
]

export default function Offer() {
  return (
    <Section>
      <SectionHeading eyebrow="Was dich erwartet" title="Alles für deinen Muskelaufbau, an einem Ort.">
        Kein Durcheinander aus Videos und Foren. Hier findest du das Wichtigste, verständlich erklärt.
      </SectionHeading>

      <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
        {items.map(({ title, text, path, Icon }, index) => (
          <li key={path}>
            <Reveal delay={index * 0.1} className="h-full">
              {/* "group": Elemente in der Karte können auf den Hover der ganzen Karte reagieren */}
              <Link
                to={path}
                className="group flex h-full flex-col rounded-2xl border border-white/5 bg-surface p-3 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow motion-reduce:hover:translate-y-0"
              >
                {/* Bildbereich. Später kommt hier ein Foto rein (Unsplash/Pexels, Quelle notieren!).
                    Bei Hover zoomt der Inhalt minimal. */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-surface-2">
                  <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgb(198_255_61/0.18),transparent_60%)] transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100">
                    <Icon className="size-16 text-accent" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-2xl">{title}</h3>
                  <p className="mt-2 flex-1 text-muted">{text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Ansehen
                    <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
