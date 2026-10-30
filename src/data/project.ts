// Infos über uns und das Projekt (Seite "Über uns")

// ---------- Team ----------
// TODO: Eure echten Vornamen und Rollen eintragen.
// Aus Datenschutzgründen zeigen wir keine Fotos und keine Nachnamen, nur die Initialen.
export type TeamMember = {
  name: string
  role: string
  tasks: string // was die Person im Projekt macht
}

export const team: TeamMember[] = [
  { name: '[Vorname 1]', role: 'Projektleitung', tasks: 'Planung, Termine, Kommunikation mit der Lehrperson' },
  { name: '[Vorname 2]', role: 'Inhalte', tasks: 'Übungen, Trainingspläne und Rezepte recherchieren und prüfen' },
  { name: '[Vorname 3]', role: 'Design & Tests', tasks: 'Design, Bilder, Tests auf dem Handy, französische Texte' },
]

// ---------- Eckdaten ----------
export const projectFacts: { label: string; value: string }[] = [
  { label: 'Schule', value: 'KV Basel' },
  { label: 'Fach', value: 'Projektmanagement' },
  { label: 'Zielpublikum', value: 'Jugendliche und junge Erwachsene, 15–25 Jahre' },
  { label: 'Projektende', value: 'Eine Woche nach den Osterferien 2027' },
]

// ---------- Projektverlauf ----------
// Nach jeder Etappe hier done: true setzen.
export type Stage = {
  number: number
  title: string
  done: boolean
}

export const stages: Stage[] = [
  { number: 1, title: 'Setup, Design-System und Navigation', done: true },
  { number: 2, title: 'Startseite mit Animationen', done: true },
  { number: 3, title: 'Übungsbibliothek mit Filter', done: true },
  { number: 4, title: 'Trainingspläne', done: true },
  { number: 5, title: 'Ernährung und Rechner', done: true },
  { number: 6, title: 'Über uns und Feedback-Formular', done: true },
  { number: 7, title: 'Französisch-Version', done: false },
  { number: 8, title: 'Feinschliff, Tests auf dem Handy, Deployment', done: false },
]

// ---------- Quellen ----------
// Hier jede Bildquelle eintragen, sobald wir Fotos verwenden (Pflicht!).
export const credits: { title: string; items: string[] }[] = [
  {
    title: 'Bilder und Grafiken',
    items: [
      'Muskel-Karte, Körper-Grafiken und Icons: selbst gezeichnet (SVG)',
      'Fotos: noch keine. Wir verwenden nur freie Bilder von Unsplash oder Pexels oder eigene Fotos, jeweils mit Quellenangabe.',
    ],
  },
  {
    title: 'Schriften',
    items: ['Space Grotesk (SIL Open Font License)', 'Inter (SIL Open Font License)'],
  },
  {
    title: 'Technik',
    items: [
      'React, Vite, TypeScript',
      'Tailwind CSS',
      'Motion (früher Framer Motion) für Animationen',
      'Lenis für weiches Scrollen',
      'React Router',
      'Formspree für das Feedback-Formular',
    ],
  },
  {
    title: 'Fachliche Grundlagen',
    items: [
      'Kalorienbedarf: Mifflin-St-Jeor-Formel (Mifflin et al., 1990)',
      'Proteinempfehlung 1,6–2,2 g/kg: Meta-Analyse von Morton et al., British Journal of Sports Medicine (2018)',
    ],
  },
]
