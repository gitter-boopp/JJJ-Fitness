// Infos über uns und das Projekt (Seite "Über uns").
// Rollen, Aufgaben, Eckdaten, Etappen-Titel und Quellen stehen in den
// Übersetzungsdateien unter "about".

// ---------- Team ----------
// TODO: Eure echten Vornamen eintragen. Rolle und Aufgaben stehen in de.json/fr.json
// unter "about.team.<id>".
// Aus Datenschutzgründen zeigen wir keine Fotos und keine Nachnamen, nur die Initialen.
export const team: { id: string; name: string }[] = [
  { id: 'p1', name: '[Vorname 1]' },
  { id: 'p2', name: '[Vorname 2]' },
  { id: 'p3', name: '[Vorname 3]' },
]

// ---------- Projektverlauf ----------
// Nach jeder Etappe hier done: true setzen.
export const stages: { number: number; done: boolean }[] = [
  { number: 1, done: true },
  { number: 2, done: true },
  { number: 3, done: true },
  { number: 4, done: true },
  { number: 5, done: true },
  { number: 6, done: true },
  { number: 7, done: true },
  { number: 8, done: true },
]
