# Changelog – JJJ Fitness

Hier halten wir nach jeder Etappe fest, was gemacht wurde und wer dran war.
Neueste Einträge stehen oben.

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
