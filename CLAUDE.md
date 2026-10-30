# Projekt-Brief: JJJ Fitness – Fitness-Website für Muskelaufbau

Claude Code liest diese Datei bei jedem Start automatisch.

## 1. Worum es geht

Wir sind eine Gruppe von KV-Lernenden (KV Basel) und bauen im Fach Projektmanagement eine Fitness-Website. Die Seite zeigt Übungen und Ernährungswissen für den Muskelaufbau. Sie soll modern aussehen, flüssige Animationen haben und auf dem Handy perfekt funktionieren.

- **Projektname:** JJJ Fitness
- **Zielpublikum:** Jugendliche und junge Erwachsene (ca. 15–25), die mit Krafttraining anfangen oder schon etwas trainieren
- **Ziel:** Einsteiger finden an einem Ort alles, was sie für den Muskelaufbau brauchen: welche Übungen, wie ausführen, wie viel essen
- **Projektende:** eine Woche nach den Osterferien 2027
- **Sprache:** Deutsch (Schweizer Rechtschreibung, also "ss" statt "ß"), plus Französisch als zweite Sprache (siehe Punkt 6)

## 2. Tech-Stack

- Vite + React + TypeScript
- Tailwind CSS (v4) für das Styling
- Motion (früher "Framer Motion") für Animationen, Import aus `motion/react`
- Lenis für weiches Scrollen
- React Router für die Unterseiten
- Inhalte (Übungen, Pläne, Rezepte) als JSON- oder TS-Dateien im Projekt, keine Datenbank
- Deployment auf **Vercel**
- Code sauber und gut kommentiert (auf Deutsch), wir sind Anfänger und wollen ihn verstehen

## 3. Design

- Dark Mode als Standard: fast schwarzer Hintergrund (`#0B0B0F`), dunkle Karten (`#16161D`)
- Akzentfarbe: **Neon-Lime `#C6FF3D`**, sparsam einsetzen
- Schrift: Überschriften **Space Grotesk** (fett, gross), Fliesstext **Inter**
- Viel Weissraum, grosse Bilder, klare Struktur
- Mobile first, alles muss auf dem Handy top aussehen
- Bilder: nur freie Bilder (Unsplash/Pexels) oder eigene Fotos, Quelle notieren
- Alle Farben und Schriften sind in `src/index.css` im `@theme`-Block definiert. Die Bausteine sind auf `/styleguide` zu sehen.

## 4. Animationen

- Hero: grosse Überschrift, die Wort für Wort reinfährt, dahinter ein langsam bewegter Gradient oder ein Video-Loop
- Scroll-Reveal: Abschnitte und Karten blenden beim Scrollen weich ein (leicht von unten, gestaffelt)
- Parallax bei grossen Bildern
- Zahlen-Counter, die hochzählen (z.B. "50+ Übungen", "3 Trainingspläne")
- Hover-Effekte auf Karten: leichtes Anheben, Glow in der Akzentfarbe, Bild zoomt minimal
- Seitenübergänge zwischen den Unterseiten (kurzer Fade/Slide)
- Interaktive Muskel-Karte: ein SVG-Körper (vorne/hinten). Hover färbt den Muskel ein, Klick filtert die passenden Übungen
- Sticky Navigation, die beim Scrollen kleiner wird und einen Blur-Hintergrund bekommt
- Wichtig: `prefers-reduced-motion` respektieren und Animationen nicht übertreiben. Die Seite muss schnell bleiben.

## 5. Seiten und Inhalte

**Startseite** (`/`)
- Hero mit Slogan und Button "Jetzt starten"
- Kurz erklärt: Was bietet die Seite? (3 Karten: Übungen / Trainingspläne / Ernährung)
- Muskel-Karte als Highlight
- Kurzer Abschnitt "Die 5 Grundregeln für Muskelaufbau" (progressive Steigerung, genug Protein, leichter Kalorienüberschuss, Schlaf, Konstanz)

**Übungen** (`/uebungen`)
- Übungsbibliothek mit ca. 30 Übungen zum Start
- Filter: Muskelgruppe, Equipment (Körpergewicht, Kurzhantel, Langhantel, Maschine), Level (Anfänger / Fortgeschritten)
- Suchfeld
- Jede Übung hat eine Detailseite mit: Bild oder GIF, Schritt-für-Schritt-Ausführung, häufige Fehler, empfohlene Sätze und Wiederholungen, Alternativen

**Trainingspläne** (`/trainingsplaene`)
- 3 Pläne zum Start: Ganzkörper 3x pro Woche (Anfänger), Oberkörper/Unterkörper 4x, Push/Pull/Legs
- Als übersichtliche Tabelle oder Tabs pro Trainingstag
- Ein Plan ist als PDF druckbar

**Ernährung** (`/ernaehrung`)
- Grundlagen einfach erklärt: Kalorien, Protein, Kohlenhydrate, Fett
- Kalorienrechner (Mifflin-St-Jeor-Formel) mit Ziel "Muskelaufbau" = leichter Überschuss von ca. 250–300 kcal
- Proteinrechner (ca. 1,6–2,2 g pro kg Körpergewicht)
- Einige günstige, einfache Rezepte mit viel Protein (Rezeptkarten mit Makros)
- Beim Rechner ein ruhiger Hinweis: Werte sind Richtwerte, bei gesundheitlichen Fragen Fachperson fragen. Keine Diät-Extreme, kein Fokus auf Abnehmen.

**Über uns** (`/ueber-uns`)
- Wer wir sind, warum wir das Projekt machen (Schulprojekt KV Basel)
- Feedback-Formular (z.B. Formspree oder Google Form eingebettet): "Wie gefällt dir die Seite?", "Was fehlt dir?", Bewertung 1–5

## 6. Französisch-Version

Die Seite bekommt einen Sprachumschalter DE / FR oben in der Navigation. Alle Texte liegen in Übersetzungsdateien (z.B. `de.json` und `fr.json`), damit wir die französischen Texte später im Französischunterricht selbst schreiben oder verbessern können.

## 7. So arbeiten wir

Wir müssen in der Schule zeigen, dass wir echt am Projekt gearbeitet haben. Deshalb:

- In kleinen Etappen bauen, nicht alles auf einmal:
  1. Setup, Design-System (Farben, Schriften, Buttons), Navigation ✅
  2. Startseite mit Animationen ✅
  3. Übungsbibliothek mit Filter ✅
  4. Trainingspläne ✅
  5. Ernährung und Rechner ✅
  6. Über uns und Feedback-Formular
  7. Französisch-Version
  8. Feinschliff, Tests auf dem Handy, Deployment
- Nach jeder Etappe einen Git-Commit mit klarer Nachricht
- `CHANGELOG.md` führen: Datum, was gemacht wurde, wer dran war
- Nach jeder Etappe kurz sagen, was wir jetzt testen und screenshotten sollen
- Bei Entscheidungen kurz erklären, warum, damit wir es in der Schule erklären können

## 8. Was wir NICHT wollen

- Keine Logins, keine Zahlungen, keine Datenbank
- Keine Bilder oder Logos von echten Marken oder Fitness-Influencern
- Keine Supplement-Werbung, keine Extrem-Diäten
- Kein überladenes Design, lieber weniger, dafür sauber

## Projektstruktur (Stand Etappe 5)

```
src/
  main.tsx               Einstieg: Schriften, CSS, MotionConfig
  App.tsx                Alle Routen (welche URL zeigt welche Seite)
  index.css              Tailwind + Design-System (@theme)
  data/                  Inhalte: navigation, muscles, exercises, plans, recipes, nutritionBasics, rules, bodyShapes
  utils/                 Hilfsfunktionen: filterExercises (Suche/Filter), nutrition (Kalorienrechner)
  components/layout/     Layout, Navbar, Footer, Logo, SmoothScroll, PageTransition
  components/ui/         Button, Card, Chip, Tabs, BodyFigure, Container, Section, PageHeader, SectionHeading, Icons, ComingSoon
  components/exercises/  ExerciseCard, FilterGroup
  components/plans/      PlanDetails, WeekOverview, DayTable, PlanPrintView (Druckansicht)
  components/nutrition/  Calculator, NumberField, MacroBar, RecipeCard
  components/motion/     Animations-Bausteine: Reveal, Counter, AnimatedNumber, AnimatedHeadline
  components/home/       Abschnitte der Startseite: Hero, Stats, Offer, MuscleMap, Rules
  pages/                 Eine Datei pro Seite
vercel.json              Damit Unterseiten auf Vercel direkt aufrufbar sind
```
