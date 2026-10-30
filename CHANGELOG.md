# Changelog – JJJ Fitness

Hier halten wir nach jeder Etappe fest, was gemacht wurde und wer dran war.
Neueste Einträge stehen oben.

---

## Etappe 2 – Startseite mit Animationen

**Datum:** 30.10.2026
**Wer:** [Namen eintragen]

### Was wir gemacht haben

- **Hero:** Die Überschrift fährt Wort für Wort von unten rein. Dahinter schweben zwei unscharfe Lime-Farbflecken langsam über ein feines Gitter.
- **Parallax:** Beim Runterscrollen bewegt sich der Hero-Text langsamer als die Seite und blendet aus.
- **Zahlen-Counter:** «30+ Übungen», «3 Trainingspläne», «11 Muskelgruppen», «2 Sprachen» zählen hoch, sobald sie sichtbar werden.
- **3 Angebots-Karten** (Übungen, Trainingspläne, Ernährung): Beim Hover heben sie sich an, leuchten in Lime und der Bildbereich zoomt minimal. Der Pfeil rutscht nach rechts.
- **Interaktive Muskel-Karte:** SVG-Körper vorne und hinten mit 11 Muskelgruppen. Hover färbt den Muskel ein, Klick wählt ihn aus und zeigt eine Beschreibung. Der Button führt zu `/uebungen?muskel=...`. Dazu gibt es alle Muskeln als Buttons, fürs Handy und für die Tastatur.
- **Die 5 Grundregeln** als nummerierte Karten, die gestaffelt einblenden, plus eine Kachel «Bereit? Plan wählen»
- **Scroll-Reveal:** Überschriften und Karten blenden beim Scrollen weich von unten ein (Baustein `Reveal`).
- **Seitenübergänge:** Beim Wechsel der Seite blendet die alte aus und die neue gleitet ein (`PageTransition`).
- Die Übungsseite zeigt bereits an, welcher Muskel-Filter aktiv ist. Der richtige Filter folgt in Etappe 3.
- Neue Datendateien: `src/data/muscles.ts`, `src/data/rules.ts`, `src/data/bodyShapes.ts`

### Entscheide und warum

| Entscheid | Warum |
| --- | --- |
| Gradient statt Video im Hero | Ein Video wäre mehrere MB gross und würde die Seite auf dem Handy langsam machen. Der Gradient läuft als CSS-Animation und braucht fast keine Leistung. |
| Muskel-Karte selbst als SVG gezeichnet | Keine Bildrechte-Probleme, gestochen scharf in jeder Grösse, und jeder Muskel ist einzeln klickbar. Wir zeichnen nur die linke Hälfte, die rechte wird gespiegelt. |
| Muskeln zusätzlich als Buttons | Auf dem Handy sind kleine Muskeln schwer zu treffen, und mit der Tastatur kann man SVG-Formen schlecht bedienen. |
| Muskel-Auswahl in der URL (`?muskel=brust`) | So kann man einen gefilterten Link teilen oder als Lesezeichen speichern. |
| Noch keine Fotos in den Karten | Die Bilder wählen wir selbst aus (Unsplash/Pexels) und notieren die Quelle. Der Platz dafür ist schon vorbereitet. |
| Animationen nur einmal beim Reinscrollen | Würden sie bei jedem Hoch- und Runterscrollen neu starten, wäre das unruhig und nervig. |
| «Bewegung reduzieren» | Hero, Parallax, Counter, Reveals und weiches Scrollen schalten sich ab. Inhalte sind dann sofort sichtbar. |

---

## Etappe 1 – Setup, Design-System, Navigation

**Datum:** 30.10.2026
**Wer:** [Namen eintragen]

### Was wir gemacht haben

- Projekt mit Vite, React und TypeScript aufgesetzt
- Bibliotheken installiert: Tailwind CSS v4, Motion (Framer Motion), Lenis, React Router
- Design-System in `src/index.css` festgelegt: Farben (Dark Mode, Akzent Neon-Lime `#C6FF3D`), Schriften (Space Grotesk + Inter), Glow-Schatten
- Wiederverwendbare Bausteine: `Button` (3 Varianten, 3 Grössen), `Card` (mit Hover-Effekt), `Container`, `Section`, `PageHeader`
- Sticky Navigation: wird beim Scrollen kleiner und bekommt einen Blur-Hintergrund. Der aktive Menüpunkt hat einen gleitenden Lime-Strich.
- Handy-Menü (Burger) mit gestaffelter Einblend-Animation, schliesst mit Escape oder Klick auf einen Link
- Weiches Scrollen mit Lenis, bei jedem Seitenwechsel geht es nach oben
- Platzhalter für alle 5 Seiten und eine 404-Seite
- Seite `/styleguide` zeigt alle Farben, Schriften, Buttons und Karten
- `prefers-reduced-motion` wird respektiert (Animationen und weiches Scrollen gehen aus)
- `vercel.json` für das spätere Deployment

### Entscheide und warum

| Entscheid | Warum |
| --- | --- |
| Akzentfarbe Neon-Lime | Hebt sich auf Schwarz am stärksten ab, wirkt sportlich und frisch |
| Space Grotesk + Inter lokal (`@fontsource`) | Kostenlos. Die Schriften werden nicht von Google-Servern geladen, das ist besser für den Datenschutz (nDSG) und schneller. |
| Vercel statt GitHub Pages | Saubere Links wie `/uebungen`, automatisches Deployment bei jedem Push |
| Tailwind v4 mit `@theme` | Alle Farben stehen an einem Ort. Eine Änderung dort wirkt auf der ganzen Seite. |
| Paket `motion` statt `framer-motion` | Gleiche Bibliothek, sie heisst nur neu. `motion` ist die aktuelle, gepflegte Version. |
| Text-Logo statt Bild | Lädt sofort, ist immer scharf, keine Marken- oder Bildrechte-Probleme |
| Seitentitel mit `<title>` direkt in der Seite | React 19 kann das ohne extra Bibliothek |
