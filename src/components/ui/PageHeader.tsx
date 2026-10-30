import type { ReactNode } from 'react'

type PageHeaderProps = {
  eyebrow: string // Kleine Zeile über dem Titel
  title: string
  children?: ReactNode // Einleitungstext
}

// Einheitlicher Kopfbereich für alle Unterseiten.
export default function PageHeader({ eyebrow, title, children }: PageHeaderProps) {
  return (
    <header className="max-w-3xl">
      <p className="mb-4 text-sm font-semibold tracking-widest text-accent uppercase">{eyebrow}</p>
      <h1 className="text-4xl leading-[1.05] sm:text-5xl md:text-6xl">{title}</h1>
      {children && <p className="mt-6 text-lg text-muted md:text-xl">{children}</p>}
    </header>
  )
}
