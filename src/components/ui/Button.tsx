import type { ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  variant?: Variant
  size?: Size
  // Wenn "to" gesetzt ist, wird der Button zu einem Link auf eine andere Seite
  to?: string
  onClick?: () => void
}

// Klassen, die alle Buttons gemeinsam haben
const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-300 ' +
  'hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 disabled:pointer-events-none disabled:opacity-50'

// Aussehen je nach Variante
const variants: Record<Variant, string> = {
  // Hauptaktion: Akzentfarbe, nur 1x pro Bereich verwenden
  primary: 'bg-accent text-accent-ink hover:shadow-glow',
  // Nebenaktion: nur Rahmen
  secondary: 'border border-white/15 text-text hover:border-accent hover:text-accent',
  // Ganz zurückhaltend, z.B. für "Abbrechen"
  ghost: 'text-muted hover:text-text',
}

// Grösse je nach Variante
const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  className = '',
  children,
  type = 'button',
  onClick,
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}
