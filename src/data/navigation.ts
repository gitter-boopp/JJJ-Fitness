// Die Menüpunkte der Hauptnavigation. Navbar und Footer lesen beide diese Liste,
// so müssen wir einen neuen Menüpunkt nur hier eintragen.

export type NavItem = {
  label: string // Text, der im Menü steht
  path: string // Adresse der Seite
}

export const navItems: NavItem[] = [
  { label: 'Übungen', path: '/uebungen' },
  { label: 'Trainingspläne', path: '/trainingsplaene' },
  { label: 'Ernährung', path: '/ernaehrung' },
  { label: 'Über uns', path: '/ueber-uns' },
]
