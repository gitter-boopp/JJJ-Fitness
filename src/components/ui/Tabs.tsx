import { useRef } from 'react'
import type { KeyboardEvent } from 'react'
import { motion } from 'motion/react'

type TabItem = { id: string; label: string }

type TabsProps = {
  items: TabItem[]
  value: string // id des aktiven Tabs
  onChange: (id: string) => void
  label: string // Beschreibung für Screenreader
  idPrefix: string // für die Verknüpfung Tab <-> Inhalt (aria-controls)
}

// Tab-Leiste. Der Hintergrund des aktiven Tabs gleitet beim Wechseln mit (layoutId).
// Mit den Pfeiltasten links/rechts kann man zwischen den Tabs wechseln.
export default function Tabs({ items, value, onChange, label, idPrefix }: TabsProps) {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    let next = index
    if (event.key === 'ArrowRight') next = (index + 1) % items.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + items.length) % items.length
    else return
    event.preventDefault()
    onChange(items[next].id)
    buttonRefs.current[next]?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/10 bg-surface p-1 [scrollbar-width:none]"
    >
      {items.map((item, index) => {
        const active = item.id === value
        return (
          <button
            key={item.id}
            ref={(element) => {
              buttonRefs.current[index] = element
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${item.id}`}
            aria-selected={active}
            aria-controls={`${idPrefix}-panel`}
            // Nur der aktive Tab ist per Tab-Taste erreichbar, die anderen per Pfeiltasten
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
              active ? 'text-accent-ink' : 'text-muted hover:text-text'
            }`}
          >
            {active && (
              <motion.span
                layoutId={`${idPrefix}-pill`}
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              />
            )}
            {/* relative: Text liegt über dem gleitenden Hintergrund */}
            <span className="relative">{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
