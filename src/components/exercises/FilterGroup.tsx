import type { ReactNode } from 'react'

type FilterGroupProps = {
  legend: string // Überschrift der Gruppe, z.B. "Equipment"
  children: ReactNode // die Chips
  scrollable?: boolean // Auf dem Handy seitlich wischen statt umbrechen
}

// Gruppe von Filter-Chips mit Überschrift.
// <fieldset> und <legend> sagen Screenreadern, dass die Buttons zusammengehören.
export default function FilterGroup({ legend, children, scrollable = false }: FilterGroupProps) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 text-sm font-medium text-muted">{legend}</legend>
      <div
        className={
          scrollable
            ? // Handy: eine Zeile zum Wischen, die bis an den Bildschirmrand geht. Ab sm: umbrechen.
              '-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0'
            : 'flex flex-wrap gap-2'
        }
      >
        {children}
      </div>
    </fieldset>
  )
}
