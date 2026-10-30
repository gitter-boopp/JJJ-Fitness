# JJJ Fitness

Fitness-Website für Muskelaufbau: Übungen, Trainingspläne und Ernährung.
Ein Schulprojekt von KV-Lernenden aus Basel (Fach Projektmanagement).

## Starten

Voraussetzung: [Node.js](https://nodejs.org) ab Version 20.

```bash
npm install      # einmalig: alle Pakete installieren
npm run dev      # Entwicklungs-Server starten -> http://localhost:5173
```

Weitere Befehle:

```bash
npm run build    # Fertige Version bauen (Ordner dist/)
npm run preview  # Die gebaute Version lokal ansehen
npm run lint     # Code auf typische Fehler prüfen
```

## Auf dem Handy testen

```bash
npm run dev -- --host
```

Vite zeigt dann eine "Network"-Adresse an (z.B. `http://192.168.1.23:5173`). Diese im Handy-Browser öffnen. Handy und Computer müssen im gleichen WLAN sein.

## Feedback-Formular verbinden (Formspree)

Das Formular auf «Über uns» schickt die Antworten an [Formspree](https://formspree.io). Formspree leitet sie per E-Mail an euch weiter. Der Gratis-Plan reicht für ein Schulprojekt. Solange das Formular nicht verbunden ist, ist der Senden-Button gesperrt, und es erscheint ein Hinweis.

1. Bei formspree.io ein Konto erstellen. Das muss eine Person aus dem Team selbst machen.
2. Ein neues Formular anlegen. Formspree zeigt dann eine Adresse wie `https://formspree.io/f/abcdwxyz`.
3. Die Datei `.env.example` kopieren und die Kopie `.env.local` nennen. Dort die ID eintragen (der Teil nach `/f/`):
   ```
   VITE_FORMSPREE_ID=abcdwxyz
   ```
4. Den Entwicklungs-Server neu starten (`npm run dev`).
5. Für die Live-Seite die gleiche Variable bei Vercel eintragen: *Project → Settings → Environment Variables*.

`.env.local` wird absichtlich nicht in Git gespeichert.

## Wo finde ich was?

- `CLAUDE.md`: Projekt-Brief mit allen Anforderungen
- `CHANGELOG.md`: Was wann von wem gemacht wurde
- `src/index.css`: Farben und Schriften (Design-System)
- `src/pages/`: Eine Datei pro Seite
- `src/components/`: Wiederverwendbare Bausteine
- `/styleguide` im Browser: Übersicht über alle Bausteine
