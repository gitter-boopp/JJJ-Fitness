// Einstiegspunkt der App: Hier wird React in die Seite (index.html) eingehängt.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'

// Schriften lokal einbinden (statt von Google-Servern zu laden -> besser für den Datenschutz)
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/inter'
// Grund-CSS für das weiche Scrollen mit Lenis
import 'lenis/dist/lenis.css'
// Unser eigenes CSS mit Tailwind und dem Design-System
import './index.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*
      reducedMotion="user": Wenn jemand im Betriebssystem "Bewegung reduzieren"
      eingeschaltet hat, schaltet Motion Bewegungs-Animationen automatisch ab.
    */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
)
