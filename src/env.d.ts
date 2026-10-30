/// <reference types="vite/client" />

// Umgebungsvariablen, die wir in der App verwenden.
// Sie stehen in der Datei .env.local (lokal) bzw. in den Einstellungen bei Vercel.
// Wichtig: Vite gibt nur Variablen weiter, die mit VITE_ beginnen.
interface ImportMetaEnv {
  readonly VITE_FORMSPREE_ID?: string // ID des Formspree-Formulars, z.B. "xyzabcd"
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
