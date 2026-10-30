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

## Wo finde ich was?

- `CLAUDE.md`: Projekt-Brief mit allen Anforderungen
- `CHANGELOG.md`: Was wann von wem gemacht wurde
- `src/index.css`: Farben und Schriften (Design-System)
- `src/pages/`: Eine Datei pro Seite
- `src/components/`: Wiederverwendbare Bausteine
- `/styleguide` im Browser: Übersicht über alle Bausteine
