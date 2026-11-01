# Testprotokoll – JJJ Fitness

Hier halten wir fest, was getestet wurde, womit und mit welchem Ergebnis.
Teil 1 sind die automatischen Tests aus Etappe 8. Teil 2 füllt ihr selbst aus, wenn ihr auf euren echten Handys testet.

Legende: ✅ in Ordnung · ⚠️ kleines Problem · ❌ Fehler

---

## Teil 1: Automatische Tests (Etappe 8, 01.11.2026)

Getestet im eingebauten Browser (Chromium) und mit Chrome im Headless-Modus.

### Handy-Darstellung

Geprüft wurden alle Seiten: Startseite, Übungen, Übungs-Detail, Trainingspläne, Ernährung, Über uns, Design-System und 404. Kontrolliert wurde jeweils:

- seitliches Scrollen
- Elemente, die rechts über den Bildschirm hinausragen
- Buttons und Links ohne Beschriftung
- Schrift kleiner als 12 px
- Tippflächen kleiner als 32 px

| Test | Breite | Sprache | Ergebnis |
| --- | --- | --- | --- |
| Kein seitliches Scrollen, nichts ragt über den Rand | 375 px (iPhone 12–15) | DE | ✅ |
| Kein seitliches Scrollen, nichts ragt über den Rand | 320 px (iPhone SE 1. Gen.) | DE | ✅ |
| Kein seitliches Scrollen, nichts ragt über den Rand | 320 px | FR (längere Wörter) | ✅ |
| Alle Buttons und Links haben eine Beschriftung (für Screenreader) | 375 px | DE | ✅ |
| Keine Schrift kleiner als 12 px | 375 px | DE | ✅ |
| Tippflächen mindestens ca. 32 px | 375 px | DE | ⚠️ → behoben: Footer-Links, DE/FR-Umschalter, «Alle Übungen», Muskel-Chips vergrössert |

### Funktionen

| Test | Ergebnis |
| --- | --- |
| Navigation: alle Menüpunkte, Handy-Menü öffnen/schliessen, Escape schliesst | ✅ |
| Muskel-Karte: Klick wählt Muskel, Button führt zur gefilterten Übungsliste | ✅ |
| Übungsfilter: Muskel, Equipment, Level, Suche, Zurücksetzen, leere Ansicht | ✅ |
| Detailseite: «Alle Übungen» stellt die vorherigen Filter wieder her | ✅ |
| Trainingspläne: Planwechsel, Tabs (auch mit Pfeiltasten), Wochenübersicht | ✅ |
| PDF-Druck: Druckansicht schwarz auf weiss, 2 A4-Seiten, Spalten W1–W4 | ✅ |
| Kalorienrechner: Ergebnis stimmt mit Handrechnung (17 J., 175 cm, 65 kg, leicht aktiv → 2540–2590 kcal) | ✅ |
| Kalorienrechner: ungültige Eingabe (500 kg) wird rot markiert | ✅ |
| Feedback-Formular: ohne Sterne / Serverfehler / Erfolg (simuliert, nichts verschickt) | ✅ |
| Sprachumschalter: alle Seiten auf Französisch, Wahl bleibt nach Neuladen | ✅ |
| `npm run i18n:check`: fr.json passt zu de.json | ✅ |

### Barrierefreiheit und Technik

| Test | Ergebnis |
| --- | --- |
| «Bewegung reduzieren»: Zähler zeigen sofort die Endzahl, weiches Scrollen aus | ✅ |
| `<html lang>` wechselt zwischen `de-CH` und `fr-CH` | ✅ |
| Fertige Version (`npm run build` + `npm run preview`): direkte Links wie `/uebungen/kreuzheben` funktionieren | ✅ |
| 404-Seite bei unbekannter Adresse | ✅ |
| Keine Fehler in der Browser-Konsole | ✅ |
| Code-Splitting: Startseite lädt nur 3 JS-Dateien (ca. 180 KB komprimiert), Unterseiten werden nachgeladen | ✅ |

---

## Teil 2: Tests auf echten Geräten (füllt ihr aus)

Testet am besten mit der Live-Adresse von Vercel. Notiert bei Problemen, was genau passiert ist, und macht einen Screenshot.

| Gerät | Betriebssystem | Browser | Getestet von | Datum | Ergebnis | Bemerkungen |
| --- | --- | --- | --- | --- | --- | --- |
| z.B. iPhone 13 | iOS 18 | Safari | | | | |
| | Android | Chrome | | | | |
| Laptop | Windows | Edge | | | | |
| Laptop | macOS | Safari | | | | |
| Laptop | | Firefox | | | | |

### Checkliste pro Gerät

- [ ] Startseite: Überschrift fährt rein, Zahlen zählen hoch
- [ ] Handy-Menü öffnen und schliessen
- [ ] Muskel antippen → «Übungen ansehen»
- [ ] Übungen filtern und suchen
- [ ] Eine Übung öffnen und wieder zurück
- [ ] Trainingsplan wechseln, Tage antippen
- [ ] «Als PDF drucken» (auf dem Handy: Teilen → Drucken)
- [ ] Rechner ausfüllen (Zahlen-Tastatur erscheint?)
- [ ] Rezept aufklappen
- [ ] Sprache auf FR wechseln und zurück
- [ ] Feedback senden (nachdem Formspree verbunden ist)
- [ ] Link in WhatsApp schicken: Erscheint das Vorschaubild?
- [ ] Auf dem iPhone «Zum Home-Bildschirm» hinzufügen: Erscheint das «J»-Icon?

### Lighthouse (Qualitäts-Check von Google)

1. Die Live-Seite in Chrome öffnen.
2. Rechtsklick → «Untersuchen» → Tab «Lighthouse».
3. «Mobile» wählen → «Analyze page load».
4. Die vier Werte eintragen und einen Screenshot für die Doku machen.

| Seite | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Startseite | | | | |
| Übungen | | | | |
| Ernährung | | | | |
