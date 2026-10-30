// Die Menüpunkte der Hauptnavigation. Navbar und Footer lesen beide diese Liste,
// so müssen wir einen neuen Menüpunkt nur hier eintragen.
// Der Text kommt aus der Übersetzung: "nav.<key>"

export type NavItem = {
  key: 'exercises' | 'plans' | 'nutrition' | 'about'
  path: string // Adresse der Seite
}

export const navItems: NavItem[] = [
  { key: 'exercises', path: '/uebungen' },
  { key: 'plans', path: '/trainingsplaene' },
  { key: 'nutrition', path: '/ernaehrung' },
  { key: 'about', path: '/ueber-uns' },
]
