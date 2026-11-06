# Changelog – JJJ Fitness

Hier halten wir nach jeder Etappe fest, was gemacht wurde und wer dran war.
Neueste Einträge stehen oben.

---

## Animierte Übungen

**Datum:** 06.11.2026
**Wer:** Leon, Jan, Janosch

- 12 Übungen zeigen auf der Detailseite jetzt eine animierte Strichfigur (`ExerciseAnimation`, Daten in `src/data/exerciseAnimations.ts`).
- Die Figur ist selbst berechnet statt ein GIF: keine Bildrechte-Probleme, kleine Datei, und Arme und Beine bleiben immer gleich lang.
- Bei «Bewegung reduzieren» steht die Figur still in der Endposition.
- **Fehler behoben:** Eine Einstellung im Seitenübergang (`initial={false}`) hat beim ersten Laden alle Start-Animationen abgeschaltet, auch die Hero-Überschrift. Sie fährt jetzt wirklich Wort für Wort rein.

---

## Erweiterung nach Etappe 8 – Mehr Übungen und Lexikon

**Datum:** 06.11.2026
**Wer:** Leon, Jan, Janosch

### Was wir gemacht haben

- **16 neue Übungen** (jetzt 46), darunter Rotatorenmanschette (Aussen- und Innenrotation) und Spezialübungen wie Nordic Curl, Pendlay-Rudern, Bayesian Curl und Copenhagen Plank
- **2 neue Muskeln** auf der Muskel-Karte und im Filter: Subscapularis und Infraspinatus
- **Neue Seite Lexikon** (`/lexikon`) mit 30 Begriffen, Suche und Kategorien, dazu ein Abschnitt zu den unterschätzten Schultermuskeln
- **Team** mit Vornamen und Alter eingetragen, die erfundenen Rollen entfernt
- Fach auf der Seite von «Projektmanagement» auf «Pimu» geändert

### Entscheide und warum

| Entscheid | Warum |
| --- | --- |
| Ehrlicher Hinweis zur Schulterbreite | Die Breite kommt vor allem vom Deltamuskel. Die Rotatorenmanschette macht die Schulter stabil, wir versprechen nichts Falsches. |
| Subscapularis auf der Karte nur angedeutet | Er liegt hinter den Rippen und ist von aussen nicht sichtbar. |

---

## Etappe 8 – Feinschliff, Tests, Deployment

**Datum:** 01.11.2026 bis 06.11.2026
**Live:** https://jjj-fitness.vercel.app
**Wer:** Leon, Jan, Janosch

### Was wir gemacht haben

- **Handy-Tests:** Alle Seiten automatisch bei 375 px und 320 px geprüft, auf Deutsch und Französisch. Es gibt kein seitliches Scrollen, nichts ragt über den Rand, alle Buttons sind beschriftet, keine Schrift ist zu klein. Details in `TESTPROTOKOLL.md`.
- **Tippflächen vergrössert:** Footer-Links (vorher 17 px hoch), DE/FR-Umschalter, «Alle Übungen»-Link und Muskel-Chips auf der Detailseite
- **Code-Splitting:** Unterseiten werden erst geladen, wenn man sie öffnet (`React.lazy`). Die Startseite lädt ca. 180 statt 187 KB JavaScript.
- **Vorschaubild zum Teilen** (`public/og-image.png`, 1200×630) und Open-Graph-Tags: So sieht der Link in WhatsApp, Teams usw. gut aus.
- **Icon für den Home-Bildschirm** (`apple-touch-icon.png`), `robots.txt` und ein Hinweis, falls JavaScript ausgeschaltet ist
- **«Bewegung reduzieren» getestet:** Zähler zeigen sofort die Endzahl, weiches Scrollen ist aus.
- **Fertige Version getestet** (`npm run build` + `npm run preview`): direkte Links, 404, keine Konsolenfehler
- `TESTPROTOKOLL.md` mit allen Tests und einer Vorlage für eure Tests auf echten Geräten
- `DEPLOYMENT.md` mit einer Schritt-für-Schritt-Anleitung für GitHub und Vercel
- **Projekt in einen festen Ordner verschoben**, weil der alte Ordner mit der Session gelöscht worden wäre
- **Code auf GitHub hochgeladen** (https://github.com/gitter-boopp/JJJ-Fitness) und **auf Vercel veröffentlicht**
- **Autor der Commits auf `gitter-boopp` geändert**, weil sonst der volle Name im öffentlichen Repository sichtbar wäre
- Live-Seite getestet (siehe `TESTPROTOKOLL.md`), Vorschaubild mit voller Adresse eingetragen

### Entscheide und warum

| Entscheid | Warum |
| --- | --- |
| Code-Splitting, obwohl die Ersparnis klein ist | Der grösste Teil sind React, Motion und die Übersetzungen, die man sofort braucht. Jede künftige Unterseite profitiert aber automatisch davon. |
| Keine Übersetzungsdatei nachladen | fr.json separat laden würde ca. 14 KB sparen, aber beim ersten Besuch kurz deutsche Texte aufblitzen lassen. |
| Tippflächen mind. ca. 32 px | Die Richtlinie WCAG 2.2 verlangt mindestens 24 px. Grössere Flächen sind auf dem Handy angenehmer. |
| Vorschaubild selbst gestaltet | Gleicher Look wie die Seite, keine Bildrechte-Probleme |
| Deployment-Anleitung statt automatischem Upload | Für GitHub und Vercel braucht es eure eigenen Konten. Die Anmeldung muss eine Person aus dem Team selbst machen. |
| Öffentliches Repository | Die Lehrperson kann den Commit-Verlauf direkt anschauen. Deshalb stehen keine Nachnamen oder Geheimnisse im Code. |

### Noch offen

- [x] GitHub- und Vercel-Konto erstellen und deployen (siehe `DEPLOYMENT.md`)
- [ ] Formspree verbinden (Formular ist bis dahin gesperrt)
- [x] Vornamen in `src/data/project.ts` und hier im CHANGELOG eintragen
- [ ] Tests auf echten Handys und Lighthouse (siehe `TESTPROTOKOLL.md`)
- [x] Nach dem Deployment Etappe 8 in `src/data/project.ts` auf `done: true` setzen

---

## Etappe 7 – Französisch-Version

**Datum:** 30.10.2026
**Wer:** Leon, Jan, Janosch

### Was wir gemacht haben

- **Eigenes kleines Übersetzungs-System** (`src/i18n/`): `t('nav.exercises')` holt den Text in der gewählten Sprache. Fehlt ein französischer Text, wird automatisch der deutsche angezeigt.
- **Alle Texte in `de.json` und `fr.json`**: Oberflächentexte, 30 Übungen, Muskeln, 3 Pläne, 6 Rezepte, Ernährungs-Grundlagen, Rechner und «Über uns»
- Die Datendateien (`exercises.ts`, `plans.ts`, `recipes.ts` ...) enthalten nur noch Zahlen und Verknüpfungen, die in jeder Sprache gleich sind.
- Die deutschen Texte wurden per Skript aus den alten Dateien übernommen, damit nichts verloren geht.
- **Französische Übersetzung** als vollständiger erster Entwurf (Du-Form → «tu», Schweizer Begriffe wie «séré», «poulet»)
- **Sprachumschalter DE / FR** oben in der Navigation, mit gleitendem Lime-Hintergrund
  - Die Wahl wird im Browser gespeichert.
  - Beim ersten Besuch wird die Browsersprache verwendet.
  - `<html lang>` wird angepasst (`de-CH` / `fr-CH`), damit Screenreader richtig aussprechen.
- **Zahlenformat je Sprache**: Deutsch «2’540», Französisch «2 540»
- **Suche** funktioniert in beiden Sprachen und ignoriert Akzente («developpe» findet «Développé»).
- Einheiten wie «pro Seite» → «par côté» und Kürzel der Trainingstage (OK1 → H1) sind übersetzbar.
- **Prüf-Skript** `npm run i18n:check`: vergleicht `de.json` und `fr.json`
- Die Desktop-Navigation erscheint erst ab 1024 px, weil die französischen Wörter länger sind.
- **Fehler behoben:** Der «Jetzt starten»-Button im Header war auf dem Handy sichtbar (CSS-Klassen `hidden` und `inline-flex` im Konflikt).

### Entscheide und warum

| Entscheid | Warum |
| --- | --- |
| Eigenes Übersetzungs-System statt Bibliothek (z.B. i18next) | Ca. 60 Zeilen Code, die wir ganz verstehen. Für zwei Sprachen braucht es nicht mehr. |
| JSON-Dateien | So steht es im Brief. Die Dateien kann man ohne Programmierkenntnisse im Französischunterricht bearbeiten. |
| Gleiche Struktur in beiden Dateien | Das Prüf-Skript kann so automatisch fehlende Texte finden. |
| Fallback auf Deutsch | Die Seite funktioniert auch, wenn ein französischer Text noch fehlt. |
| Sprache im Browser speichern statt in der URL (`/fr/...`) | Einfacher umzusetzen und für ein Schulprojekt ausreichend. Nachteil: Suchmaschinen finden die französische Version schlechter. |
| «tu» statt «vous» | Unser Zielpublikum ist 15–25 Jahre alt, auf Deutsch duzen wir auch. |

### Für den Französischunterricht

Die Übersetzung ist ein Entwurf. Bitte prüfen: Fachbegriffe der Übungen, Schweizer Ausdrücke und die Typografie vor «?» und «:» (in der Schweiz oft ohne Leerzeichen, in Frankreich mit).

---

## Etappe 6 – Über uns und Feedback-Formular

**Datum:** 30.10.2026
**Wer:** Leon, Jan, Janosch

### Was wir gemacht haben

- **Team:** Karten mit Initialen, Rolle und Aufgaben (`src/data/project.ts`, Namen sind noch Platzhalter)
- **Das Projekt:** Warum wir die Seite bauen, plus Eckdaten (Schule, Fach, Zielpublikum, Projektende)
- **Projektverlauf:** Zeitleiste mit allen 8 Etappen (erledigt / als Nächstes / offen)
- **Feedback-Formular:**
  - Sterne-Bewertung 1–5 (Pflicht), «Was gefällt dir?» und «Was fehlt dir?»
  - Eigene Prüfung: Ohne Sterne erscheint ein Hinweis.
  - Senden über Formspree, mit den Zuständen «Wird gesendet …», Fehlermeldung und Danke-Ansicht mit animiertem Haken
  - Unsichtbares Spam-Schutz-Feld (Honeypot)
  - Ist das Formular noch nicht verbunden, wird der Button gesperrt und ein Hinweis fürs Team angezeigt.
- **Quellen und Technik:** Bilder, Schriften, Bibliotheken und fachliche Quellen (Mifflin-St-Jeor, Morton et al. 2018)
- `.env.example` als Vorlage und eine Anleitung im README, wie man Formspree verbindet
- Der Platzhalter-Baustein `ComingSoon` wurde entfernt, weil jetzt alle Seiten fertig sind.

### Entscheide und warum

| Entscheid | Warum |
| --- | --- |
| Formspree statt Google Form | Das Formular passt ins Design und funktioniert ohne Google-Konto. Ein eingebettetes Google Form sähe fremd aus. |
| Formular-ID in `.env.local` statt im Code | So kann jedes Team-Mitglied sein eigenes Test-Formular nutzen, und die ID ist an einem Ort änderbar. |
| Anonymes Feedback, keine E-Mail-Adresse | Datenschutz (nDSG): Wir sammeln nur, was wir wirklich brauchen. |
| Initialen statt Fotos beim Team | Schützt die Privatsphäre. Viele im Team sind minderjährig. |
| Projektverlauf auf der Seite | Zeigt in der Schule direkt, wie wir das Projekt geplant und umgesetzt haben. |
| Quellen öffentlich auflisten | Bildrechte und Lizenzen müssen angegeben werden, so steht es auch im Brief. |

### Getestet

Das Absenden wurde mit einer Test-ID simuliert, ohne dass Daten verschickt wurden. Geprüft wurden drei Fälle: ohne Sterne, Serverfehler und Erfolg. Ein echter Test folgt, sobald das Formspree-Konto eingerichtet ist.

---

## Etappe 5 – Ernährung und Rechner

**Datum:** 30.10.2026
**Wer:** Leon, Jan, Janosch

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
**Wer:** Leon, Jan, Janosch

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
**Wer:** Leon, Jan, Janosch

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
**Wer:** Leon, Jan, Janosch

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
**Wer:** Leon, Jan, Janosch

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
