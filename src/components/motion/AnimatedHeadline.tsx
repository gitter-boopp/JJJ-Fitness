import { Fragment } from 'react'
import { motion } from 'motion/react'

type Line = {
  text: string
  className?: string
}

type AnimatedHeadlineProps = {
  lines: Line[]
  className?: string
  delay?: number // Wann das erste Wort startet (Sekunden)
}

// Überschrift, bei der jedes Wort einzeln von unten "reinfährt".
// Trick: Jedes Wort steckt in einer Box mit overflow-hidden. Das Wort startet
// unterhalb der Box (unsichtbar) und fährt dann hoch an seinen Platz.
export default function AnimatedHeadline({ lines, className = '', delay = 0.1 }: AnimatedHeadlineProps) {
  // Wir zählen die Wörter über alle Zeilen hinweg, damit die Staffelung durchläuft
  let wordIndex = 0
  const fullText = lines.map((line) => line.text).join(' ')

  return (
    // aria-label: Screenreader lesen den ganzen Satz statt einzelne Wörter
    <h1 className={className} aria-label={fullText}>
      {lines.map((line) => (
        <span key={line.text} aria-hidden className={`block ${line.className ?? ''}`}>
          {line.text.split(' ').map((word) => {
            const index = wordIndex++
            return (
              <Fragment key={index}>
                {/* pb/-mb: etwas Platz unten, damit Buchstaben wie "g" nicht abgeschnitten werden */}
                <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: delay + index * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                  </motion.span>
                </span>
                {/* Leerzeichen nach jedem Wort. Es muss AUSSERHALB der Box stehen,
                    sonst "verschluckt" der Browser es. */}{' '}
              </Fragment>
            )
          })}
        </span>
      ))}
    </h1>
  )
}
