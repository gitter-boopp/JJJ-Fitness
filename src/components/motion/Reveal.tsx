import type { ReactNode } from 'react'
import { motion } from 'motion/react'

type RevealProps = {
  children: ReactNode
  className?: string
  // Verzögerung in Sekunden. Für "gestaffelt": jedes Element etwas später starten lassen
  delay?: number
}

// Blendet Inhalte weich von unten ein, sobald sie beim Scrollen sichtbar werden.
// Das passiert nur einmal (once: true), sonst wäre es beim Hoch- und Runterscrollen nervig.
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      // amount: 0.2 = startet, wenn 20% des Elements sichtbar sind
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
