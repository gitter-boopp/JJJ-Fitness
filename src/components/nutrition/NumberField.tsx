import { useI18n } from '../../i18n/i18n'

type NumberFieldProps = {
  id: string
  label: string
  unit: string // z.B. "kg"
  value: string // Wir speichern den Text, damit man das Feld auch leeren kann
  onChange: (value: string) => void
  min: number
  max: number
}

// Eingabefeld für eine Zahl mit Einheit und Fehlermeldung.
export default function NumberField({ id, label, unit, value, onChange, min, max }: NumberFieldProps) {
  const { t } = useI18n()
  const number = Number(value)
  // Fehler nur zeigen, wenn schon etwas eingegeben wurde
  const invalid = value !== '' && (Number.isNaN(number) || number < min || number > max)
  const errorId = `${id}-error`

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-muted">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal" // Zahlen-Tastatur auf dem Handy
          min={min}
          max={max}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={invalid}
          aria-describedby={invalid ? errorId : undefined}
          className={`w-full rounded-xl border bg-surface-2 py-3 pr-12 pl-4 font-display text-lg font-bold text-text focus:outline-none ${
            invalid ? 'border-red-400/70' : 'border-white/10 focus:border-accent/60'
          }`}
        />
        <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm text-muted">
          {unit}
        </span>
      </div>
      {invalid && (
        <p id={errorId} className="mt-2 text-sm text-red-300">
          {t('calculator.error', { min, max })}
        </p>
      )}
    </div>
  )
}
