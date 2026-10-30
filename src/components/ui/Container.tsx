import type { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  className?: string
}

// Begrenzt die Breite des Inhalts und sorgt für Abstand zum Bildschirmrand.
// Auf dem Handy 16px (px-4), auf grösseren Bildschirmen mehr.
export default function Container({ children, className = '' }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}
