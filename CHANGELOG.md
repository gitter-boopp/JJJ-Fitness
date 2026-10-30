# Changelog – JJJ Fitness

Hier halten wir nach jeder Etappe fest, was gemacht wurde und wer dran war.
Neueste Einträge stehen oben.

---

## Etappe 5 – Ernährung und Rechner

**Datum:** 30.10.2026
**Wer:** [Namen eintragen]

### Was wir gemacht haben

- **Grundlagen:** 4 Karten zu Kalorien, Protein, Kohlenhydraten und Fett, mit kcal pro Gramm und guten Lebensmitteln. Dazu ein kurzer Abschnitt «Und Supplements?»: Man braucht keine.
- **Kalorien- und Proteinrechner** (`src/utils/nutrition.ts`):
  - Grundumsatz mit der Mifflin-St-Jeor-Formel
  - × Aktivitätsfaktor (5 Stufen von «kaum aktiv» bis «extrem aktiv») = Gesamtumsatz
  - Ziel Muskelaufbau = Gesamtumsatz + 250 bis 300 kcal
  - Protein = 1,6 bis 2,2 g pro kg Körpergewicht
  - Beispiel-Verteilung als Balken (Protein 1,8 g/kg, Fett 1 g/kg aber mind. 25%, Rest Kohlenhydrate)
- Die Zahlen gleiten beim Ändern weich zum neuen Wert.
- **Eingaben prüfen:** Alter 15–80, Grösse 120–230 cm, Gewicht 35–250 kg. Bei falschen Werten erscheint ein Hinweis, und das Feld wird rot.
- **Ruhiger Hinweis:** Die Werte sind Richtwerte, bei Fragen eine Fachperson fragen. Unter 18 gibt es einen Zusatzhinweis, dass man im Wachstum genug essen soll.
- **6 Rezepte** (`src/data/recipes.ts`) mit Zeit, Preis, Makros pro Portion, aufklappbaren Zutaten und Zubereitung: Overnight Oats, Rührei-Wrap, Poulet-Reis-Bowl, Linsen-Bolognese, Thon-Kichererbsen-Salat und Quark-Beeren-Bowl
- Die Buttons «Zum Rechner» und «Zu den Rezepten» scrollen weich zum Abschnitt.

### Entscheide und warum

| Entscheid | Warum |
| --- | --- |
| Mifflin-St-Jeor-Formel | Gilt in Studien als eine der genauesten Formeln für den Grundumsatz und ist einfach nachzurechnen. Wir haben sie mit einem Beispiel überprüft (Mann, 25 J., 180 cm, 80 kg = 1805 kcal). |
| Ein Rechner für Kalorien und Protein zusammen | Das Gewicht muss man nur einmal eingeben, und man sieht alles auf einen Blick. |
| Nur das Ziel «Muskelaufbau», kein Abnehmen | So steht es im Brief: kein Fokus auf Abnehmen, keine Diät-Extreme. «Gewicht halten» zeigen wir nur zum Vergleich. |
| Ergebnis auf 10 kcal gerundet | Eine Formel ist immer eine Schätzung. «2’587 kcal» würde eine Genauigkeit vortäuschen, die es nicht gibt. |
| Eingaben werden nicht gespeichert und nicht verschickt | Alles wird nur im Browser gerechnet. Gewicht und Alter sind persönliche Daten. |
| Hinweis für unter 18-Jährige | Die Formel ist für Erwachsene gemacht, und unser Zielpublikum ist teilweise jünger. |
| Keine Supplement-Empfehlungen | Steht so im Brief. Mit normalem Essen erreicht man sein Protein auch. |

---

## Etappe 4 – Trainingspläne

**Datum:** 30.10.2026
**Wer:** [Namen eintragen]

### Was wir gemacht haben

- **3 Pläne** in `src/data/plans.ts`:
  - Ganzkörper 3x pro Woche (Anfänger, Tag A/B im Wechsel)
  - Oberkörper/Unterkörper 4x pro Woche (ab ca. 3 Monaten Training)
  - Push/Pull/Legs 3x pro Woche (Fortgeschrittene, optional 6x)
- **Plan-Auswahl** mit drei Karten. Der gewählte Plan steht in der Adresse, z.B. `/trainingsplaene?plan=push-pull-legs`.
- **Wochenübersicht** Mo–So mit Trainings- und Ruhetagen. Ein Klick auf einen Trainingstag öffnet ihn.
- **Tabs pro Trainingstag** mit gleitendem Lime-Hintergrund. Die Tabs lassen sich auch mit den Pfeiltasten bedienen.
- **Tabelle** pro Tag: Übung (mit Link zur Anleitung), Muskeln, Sätze und Wiederholungen. Auf dem Handy werden Sätze und Wiederholungen zusammengefasst («4 × 6–8»), damit nichts abgeschnitten wird.
- **4 Tipps:** Aufwärmen, Steigern, Pausen, Technik vor Gewicht
- **Als PDF drucken:** Der Button öffnet den Druck-Dialog. Gedruckt wird eine eigene Druckansicht in Schwarz auf Weiss mit allen Trainingstagen und leeren Spalten W1–W4 zum Eintragen der Gewichte (Trainingsprotokoll). Navigation und Footer werden beim Drucken ausgeblendet.

### Entscheide und warum

| Entscheid | Warum |
| --- | --- |
| Pläne verweisen per `slug` auf die Übungen | Jede Übung ist nur einmal beschrieben. Ändern wir eine Übung, stimmt sie automatisch in allen Plänen. |
| Drucken mit `window.print()` statt PDF-Bibliothek | Jeder Browser kann «Als PDF sichern». Es braucht keine zusätzliche Bibliothek, und die Seite bleibt schnell. |
| Eigene Druckansicht schwarz auf weiss | Dunkler Hintergrund würde viel Tinte verbrauchen. Auf Papier sind alle Tage untereinander praktischer als Tabs. |
| Spalten W1–W4 im Ausdruck | So kann man den Ausdruck ins Gym mitnehmen und die Gewichte eintragen. Das hilft bei der progressiven Steigerung. |
| Push/Pull/Legs als 3x-Woche | Für Jugendliche reichen 3 Trainings, Erholung ist wichtig. 6x ist als Option erwähnt. |
| Tabs mit Pfeiltasten | So funktionieren Tabs nach den Regeln für Barrierefreiheit (WAI-ARIA). |

---

## Etappe 3 – Übungsbibliothek mit Filter

**Datum:** 30.10.2026
**Wer:** [Namen eintragen]

### Was wir gemacht haben

- **30 Übungen** in `src/data/exercises.ts`, verteilt auf Brust, Rücken, Schultern, Arme, Beine und Bauch. Jede Übung hat Beschreibung, Haupt- und Hilfsmuskeln, Equipment, Level, Sätze/Wiederholungen, 4 Schritte, häufige Fehler und 2 Alternativen.
- **Übungsliste** (`/uebungen`) mit Suchfeld und drei Filtern: Muskelgruppe, Equipment (Körpergewicht, Kurzhantel, Langhantel, Maschine) und Level (Anfänger, Fortgeschritten)
- Die Filter stehen in der Adresse, z.B. `/uebungen?muskel=brust&level=anfaenger`. Die Muskel-Karte auf der Startseite filtert jetzt richtig.
- Beim Filtern gleiten die Karten an ihren neuen Platz. Bei 0 Treffern gibt es einen Hinweis mit «Filter zurücksetzen».
- Die Suche findet auch Wörter ohne Umlaute («rucken» findet «Rücken») und sucht in Name, Muskeln und Equipment.
- **Detailseite** pro Übung (`/uebungen/liegestuetz` usw.): Körper-Grafik vorne/hinten mit Haupt- und Hilfsmuskeln, Sätze und Wiederholungen, Ausführung Schritt für Schritt, häufige Fehler, Alternativen. «Alle Übungen» führt zurück zur Liste mit den gleichen Filtern wie vorher.
- Die Körper-Grafik ist jetzt ein wiederverwendbarer Baustein (`BodyFigure`), den Startseite, Übungskarten und Detailseite gemeinsam nutzen. Neuer Baustein `Chip` für alle Filter-Buttons.
- Der Counter auf der Startseite zählt die Übungen jetzt automatisch.

### Entscheide und warum

| Entscheid | Warum |
| --- | --- |
| Körper-Grafik statt Foto als Standard | Zeigt sofort, welche Muskeln trainiert werden, und hat keine Bildrechte-Probleme. Fotos/GIFs können wir pro Übung mit dem Feld `image` ergänzen (mit Quelle). |
| Filter in der URL | Gefilterte Links kann man teilen, und die Zurück-Taste im Browser funktioniert. |
| Muskelfilter zeigt auch Übungen, bei denen der Muskel nur mithilft | So findet man mehr passende Übungen. Übungen mit dem Muskel als Hauptmuskel stehen zuoberst. |
| Filter auf dem Handy seitlich wischbar | Spart Platz. Sonst wären die Filter allein schon einen ganzen Bildschirm hoch. |
| Daten in einer TS-Datei statt Datenbank | So steht es im Brief. Ausserdem prüft TypeScript, dass jede Übung alle Felder hat. |

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
