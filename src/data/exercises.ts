import type { MuscleId } from './muscles'

// Alle Übungen der Übungsbibliothek.
//
// Neue Übung hinzufügen? Einfach einen neuen Eintrag in die Liste unten kopieren
// und anpassen. Die "slug" muss eindeutig sein, sie steht in der Adresse:
// /uebungen/liegestuetz

export type Equipment = 'koerpergewicht' | 'kurzhantel' | 'langhantel' | 'maschine'
export type Level = 'anfaenger' | 'fortgeschritten'

export type Exercise = {
  slug: string // Kurzname für die URL (nur Kleinbuchstaben, keine Umlaute, Bindestriche)
  name: string
  description: string // Ein Satz, worum es geht
  primary: MuscleId[] // Hauptmuskeln
  secondary: MuscleId[] // Muskeln, die mithelfen
  equipment: Equipment
  level: Level
  sets: string // Empfohlene Anzahl Sätze
  reps: string // Empfohlene Wiederholungen (oder Sekunden)
  steps: string[] // Ausführung Schritt für Schritt
  mistakes: string[] // Häufige Fehler
  alternatives: string[] // slugs von ähnlichen Übungen
  // Optional: eigenes Foto oder GIF. Nur freie Bilder (Unsplash/Pexels) oder eigene Fotos!
  // Bilder in public/images/uebungen/ ablegen, z.B. src: '/images/uebungen/liegestuetz.jpg'
  image?: { src: string; alt: string; credit: string }
}

// Texte für die Filter-Buttons
export const equipmentOptions: { id: Equipment; label: string }[] = [
  { id: 'koerpergewicht', label: 'Körpergewicht' },
  { id: 'kurzhantel', label: 'Kurzhantel' },
  { id: 'langhantel', label: 'Langhantel' },
  { id: 'maschine', label: 'Maschine' },
]

export const levelOptions: { id: Level; label: string }[] = [
  { id: 'anfaenger', label: 'Anfänger' },
  { id: 'fortgeschritten', label: 'Fortgeschritten' },
]

export const exercises: Exercise[] = [
  // ---------- Brust ----------
  {
    slug: 'liegestuetz',
    name: 'Liegestütz',
    description: 'Der Klassiker ohne Geräte für Brust, Schultern und Trizeps.',
    primary: ['brust'],
    secondary: ['trizeps', 'schultern', 'bauch'],
    equipment: 'koerpergewicht',
    level: 'anfaenger',
    sets: '3',
    reps: '8–15',
    steps: [
      'Hände etwas breiter als schulterbreit auf den Boden setzen, die Finger zeigen nach vorne.',
      'Den Körper von Kopf bis Fersen in eine gerade Linie bringen, Bauch und Gesäss anspannen.',
      'Langsam nach unten gehen, bis die Brust fast den Boden berührt. Die Ellbogen zeigen schräg nach hinten (ca. 45 Grad).',
      'Kraftvoll nach oben drücken, bis die Arme gestreckt sind.',
    ],
    mistakes: [
      'Die Hüfte hängt durch oder ragt nach oben. Bauch anspannen!',
      'Die Ellbogen zeigen gerade zur Seite. Das belastet die Schultern.',
      'Nur halb runtergehen. Lieber auf den Knien üben und die volle Bewegung machen.',
    ],
    alternatives: ['bankdruecken', 'dips'],
  },
  {
    slug: 'bankdruecken',
    name: 'Bankdrücken',
    description: 'Die wichtigste Langhantel-Übung für eine kräftige Brust.',
    primary: ['brust'],
    secondary: ['trizeps', 'schultern'],
    equipment: 'langhantel',
    level: 'anfaenger',
    sets: '3',
    reps: '6–10',
    steps: [
      'Flach auf die Bank legen, die Augen sind unter der Stange, die Füsse stehen fest am Boden.',
      'Die Stange etwas breiter als schulterbreit greifen und die Schulterblätter nach hinten unten ziehen.',
      'Die Stange kontrolliert auf die untere Brust senken.',
      'Die Stange nach oben drücken, bis die Arme gestreckt sind.',
    ],
    mistakes: [
      'Die Stange auf der Brust abprallen lassen.',
      'Das Gesäss hebt von der Bank ab.',
      'Schwer trainieren ohne Sicherung. Bei schweren Gewichten immer eine Person zum Sichern dabeihaben.',
    ],
    alternatives: ['kurzhantel-schraegbankdruecken', 'liegestuetz'],
  },
  {
    slug: 'kurzhantel-schraegbankdruecken',
    name: 'Schrägbankdrücken mit Kurzhanteln',
    description: 'Betont den oberen Teil der Brust und trainiert jede Seite einzeln.',
    primary: ['brust'],
    secondary: ['schultern', 'trizeps'],
    equipment: 'kurzhantel',
    level: 'anfaenger',
    sets: '3',
    reps: '8–12',
    steps: [
      'Die Bank auf 30 bis 45 Grad einstellen und dich mit den Kurzhanteln auf den Oberschenkeln hinsetzen.',
      'Zurücklehnen und die Hanteln seitlich neben die Brust bringen.',
      'Die Hanteln nach oben drücken, bis sie sich über der Brust fast berühren.',
      'Langsam wieder absenken, bis du eine leichte Dehnung in der Brust spürst.',
    ],
    mistakes: [
      'Die Bank ist zu steil eingestellt. Dann arbeiten vor allem die Schultern.',
      'Die Hanteln fallen lassen statt kontrolliert senken.',
      'Den Rücken stark ins Hohlkreuz drücken.',
    ],
    alternatives: ['bankdruecken', 'butterfly'],
  },
  {
    slug: 'dips',
    name: 'Dips',
    description: 'Anspruchsvolle Übung mit dem eigenen Körpergewicht für Brust und Trizeps.',
    primary: ['brust', 'trizeps'],
    secondary: ['schultern'],
    equipment: 'koerpergewicht',
    level: 'fortgeschritten',
    sets: '3',
    reps: '6–12',
    steps: [
      'Dich am Barren hochstützen, die Arme sind gestreckt, die Schultern weg von den Ohren.',
      'Den Oberkörper leicht nach vorne neigen.',
      'Langsam absenken, bis die Oberarme etwa parallel zum Boden sind.',
      'Kräftig nach oben drücken, bis die Arme wieder gestreckt sind.',
    ],
    mistakes: [
      'Zu tief absenken. Das belastet die Schultern.',
      'Die Schultern ziehen hoch zu den Ohren.',
      'Mit Schwung arbeiten statt kontrolliert.',
    ],
    alternatives: ['liegestuetz', 'trizepsdruecken-kabel'],
  },
  {
    slug: 'butterfly',
    name: 'Butterfly an der Maschine',
    description: 'Isoliert die Brust, ideal zum Abschluss des Brusttrainings.',
    primary: ['brust'],
    secondary: ['schultern'],
    equipment: 'maschine',
    level: 'anfaenger',
    sets: '3',
    reps: '10–15',
    steps: [
      'Den Sitz so einstellen, dass die Griffe auf Brusthöhe sind.',
      'Die Griffe fassen, die Ellbogen sind leicht gebeugt, der Rücken liegt an der Lehne.',
      'Die Arme in einem Bogen vor der Brust zusammenführen.',
      'Langsam zurück, bis du eine leichte Dehnung spürst.',
    ],
    mistakes: [
      'Zu weit nach hinten gehen und die Schultern überdehnen.',
      'Die Arme ganz strecken oder stark beugen.',
      'Das Gewicht zurückschnellen lassen.',
    ],
    alternatives: ['kurzhantel-schraegbankdruecken', 'liegestuetz'],
  },

  // ---------- Rücken ----------
  {
    slug: 'klimmzug',
    name: 'Klimmzug',
    description: 'Die Königsübung für einen breiten Rücken.',
    primary: ['ruecken'],
    secondary: ['bizeps', 'schultern'],
    equipment: 'koerpergewicht',
    level: 'fortgeschritten',
    sets: '3',
    reps: '5–10',
    steps: [
      'Die Stange etwas breiter als schulterbreit greifen, die Handflächen zeigen nach vorne.',
      'Die Schulterblätter nach unten ziehen und den Bauch anspannen.',
      'Hochziehen, bis das Kinn über der Stange ist.',
      'Kontrolliert wieder ablassen, bis die Arme fast gestreckt sind.',
    ],
    mistakes: [
      'Mit den Beinen Schwung holen.',
      'Nur halbe Wiederholungen machen.',
      'Du schaffst noch keinen Klimmzug? Starte mit dem Latzug oder nimm ein Widerstandsband als Hilfe.',
    ],
    alternatives: ['latzug', 'kurzhantelrudern'],
  },
  {
    slug: 'latzug',
    name: 'Latzug',
    description: 'Zieht wie ein Klimmzug, aber mit einstellbarem Gewicht.',
    primary: ['ruecken'],
    secondary: ['bizeps'],
    equipment: 'maschine',
    level: 'anfaenger',
    sets: '3',
    reps: '8–12',
    steps: [
      'Hinsetzen und die Knie unter dem Polster fixieren.',
      'Die Stange breit greifen und den Oberkörper leicht zurücklehnen.',
      'Die Stange zur oberen Brust ziehen, die Ellbogen zeigen nach unten.',
      'Langsam nach oben führen, bis die Arme gestreckt sind.',
    ],
    mistakes: [
      'Die Stange hinter den Nacken ziehen.',
      'Mit dem ganzen Oberkörper nach hinten reissen.',
      'Die Schultern hochziehen, statt die Schulterblätter nach unten zu ziehen.',
    ],
    alternatives: ['klimmzug', 'kurzhantelrudern'],
  },
  {
    slug: 'langhantelrudern',
    name: 'Langhantel-Rudern vorgebeugt',
    description: 'Baut Dicke und Kraft im ganzen Rücken auf.',
    primary: ['ruecken'],
    secondary: ['bizeps', 'nacken'],
    equipment: 'langhantel',
    level: 'fortgeschritten',
    sets: '3',
    reps: '6–10',
    steps: [
      'Hüftbreit stehen und die Stange schulterbreit greifen.',
      'Die Knie leicht beugen und den Oberkörper mit geradem Rücken nach vorne neigen (ca. 45 Grad).',
      'Die Stange zum unteren Bauch ziehen und die Schulterblätter zusammendrücken.',
      'Kontrolliert absenken, bis die Arme gestreckt sind.',
    ],
    mistakes: [
      'Ein runder Rücken.',
      'Der Oberkörper richtet sich bei jeder Wiederholung auf.',
      'Zu schweres Gewicht, das nur mit Schwung hochkommt.',
    ],
    alternatives: ['kurzhantelrudern', 'latzug'],
  },
  {
    slug: 'kurzhantelrudern',
    name: 'Einarmiges Kurzhantel-Rudern',
    description: 'Trainiert jede Rückenseite einzeln und schont den unteren Rücken.',
    primary: ['ruecken'],
    secondary: ['bizeps'],
    equipment: 'kurzhantel',
    level: 'anfaenger',
    sets: '3',
    reps: '8–12 pro Seite',
    steps: [
      'Ein Knie und eine Hand auf die Bank stützen, der Rücken ist gerade.',
      'Die Hantel mit dem freien Arm hängen lassen.',
      'Die Hantel Richtung Hüfte ziehen, der Ellbogen bleibt nah am Körper.',
      'Langsam absenken. Nach allen Wiederholungen die Seite wechseln.',
    ],
    mistakes: [
      'Der Oberkörper dreht sich mit.',
      'Die Hantel zur Schulter statt zur Hüfte ziehen.',
      'Den Rücken rund machen.',
    ],
    alternatives: ['langhantelrudern', 'latzug'],
  },
  {
    slug: 'kreuzheben',
    name: 'Kreuzheben',
    description: 'Ganzkörper-Übung für Rücken, Gesäss und Beine.',
    primary: ['ruecken', 'gesaess', 'beinbeuger'],
    secondary: ['quadrizeps', 'nacken', 'bauch'],
    equipment: 'langhantel',
    level: 'fortgeschritten',
    sets: '3',
    reps: '4–8',
    steps: [
      'Die Füsse stehen hüftbreit, die Stange ist über der Fussmitte.',
      'In die Knie gehen und die Stange schulterbreit greifen. Der Rücken ist gerade, die Brust raus.',
      'Den Bauch anspannen und die Stange nah am Körper hochziehen, bis du aufrecht stehst.',
      'Die Stange kontrolliert und nah an den Beinen wieder absenken.',
    ],
    mistakes: [
      'Ein runder Rücken. Das ist das grösste Verletzungsrisiko.',
      'Die Stange ist weit weg vom Körper.',
      'Oben ins Hohlkreuz lehnen.',
      'Ohne Technik-Check starten. Lass dir die Übung am Anfang von einer erfahrenen Person zeigen.',
    ],
    alternatives: ['rumaenisches-kreuzheben', 'hip-thrust'],
  },

  // ---------- Schultern & Nacken ----------
  {
    slug: 'kurzhantel-schulterdruecken',
    name: 'Kurzhantel-Schulterdrücken',
    description: 'Baut kräftige, runde Schultern auf.',
    primary: ['schultern'],
    secondary: ['trizeps'],
    equipment: 'kurzhantel',
    level: 'anfaenger',
    sets: '3',
    reps: '8–12',
    steps: [
      'Auf eine Bank mit aufrechter Lehne setzen.',
      'Die Hanteln auf Schulterhöhe halten, die Handflächen zeigen nach vorne.',
      'Die Hanteln über den Kopf drücken, bis die Arme fast gestreckt sind.',
      'Langsam zurück auf Schulterhöhe.',
    ],
    mistakes: [
      'Ein starkes Hohlkreuz.',
      'Die Hanteln oben zusammenschlagen.',
      'Zu schwer starten.',
    ],
    alternatives: ['seitheben', 'face-pulls'],
  },
  {
    slug: 'seitheben',
    name: 'Seitheben',
    description: 'Trainiert die seitliche Schulter und macht die Schultern breiter.',
    primary: ['schultern'],
    secondary: [],
    equipment: 'kurzhantel',
    level: 'anfaenger',
    sets: '3',
    reps: '12–15',
    steps: [
      'Aufrecht stehen, die Hanteln hängen seitlich neben den Oberschenkeln.',
      'Die Ellbogen leicht gebeugt lassen.',
      'Die Arme seitlich anheben bis auf Schulterhöhe.',
      'Langsam wieder senken.',
    ],
    mistakes: [
      'Mit Schwung aus dem Oberkörper arbeiten.',
      'Die Arme höher als die Schultern heben.',
      'Zu schweres Gewicht. Bei dieser Übung reicht wenig.',
    ],
    alternatives: ['kurzhantel-schulterdruecken', 'face-pulls'],
  },
  {
    slug: 'face-pulls',
    name: 'Face Pulls',
    description: 'Stärkt die hintere Schulter und sorgt für eine gute Haltung.',
    primary: ['schultern'],
    secondary: ['nacken', 'ruecken'],
    equipment: 'maschine',
    level: 'anfaenger',
    sets: '3',
    reps: '12–15',
    steps: [
      'Ein Seil am Kabelzug auf Kopfhöhe einhängen.',
      'Das Seil mit beiden Händen greifen und einen Schritt zurückgehen.',
      'Das Seil Richtung Gesicht ziehen. Die Hände gehen dabei auseinander, die Ellbogen bleiben hoch.',
      'Kurz halten, dann langsam zurück.',
    ],
    mistakes: [
      'Zu schwer und mit Rücklage ziehen.',
      'Die Ellbogen zeigen nach unten.',
      'Die Schultern hochziehen.',
    ],
    alternatives: ['seitheben', 'kurzhantelrudern'],
  },
  {
    slug: 'shrugs',
    name: 'Shrugs (Schulterheben)',
    description: 'Einfache Übung für den Trapezmuskel im Nacken.',
    primary: ['nacken'],
    secondary: [],
    equipment: 'kurzhantel',
    level: 'anfaenger',
    sets: '3',
    reps: '10–15',
    steps: [
      'Aufrecht stehen und die Hanteln seitlich halten.',
      'Die Arme bleiben die ganze Zeit gestreckt.',
      'Die Schultern gerade nach oben Richtung Ohren ziehen.',
      'Oben kurz halten und langsam absenken.',
    ],
    mistakes: ['Die Schultern kreisen lassen.', 'Den Kopf nach vorne schieben.', 'Mit den Armen mitziehen.'],
    alternatives: ['face-pulls', 'kreuzheben'],
  },

  // ---------- Arme ----------
  {
    slug: 'kurzhantel-curl',
    name: 'Kurzhantel-Curl',
    description: 'Der Klassiker für den Bizeps.',
    primary: ['bizeps'],
    secondary: [],
    equipment: 'kurzhantel',
    level: 'anfaenger',
    sets: '3',
    reps: '8–12',
    steps: [
      'Aufrecht stehen, die Handflächen zeigen nach vorne.',
      'Die Oberarme bleiben ruhig neben dem Körper.',
      'Die Hanteln Richtung Schulter beugen.',
      'Langsam wieder absenken, bis die Arme gestreckt sind.',
    ],
    mistakes: ['Mit dem Rücken Schwung holen.', 'Die Ellbogen wandern nach vorne.', 'Nur halb absenken.'],
    alternatives: ['hammercurl', 'langhantel-curl'],
  },
  {
    slug: 'hammercurl',
    name: 'Hammer-Curl',
    description: 'Curl mit neutralem Griff, trainiert auch die Unterarme.',
    primary: ['bizeps'],
    secondary: [],
    equipment: 'kurzhantel',
    level: 'anfaenger',
    sets: '3',
    reps: '10–12',
    steps: [
      'Die Hanteln seitlich halten, die Daumen zeigen nach vorne.',
      'Die Oberarme ruhig halten.',
      'Die Hanteln zur Schulter beugen, der Griff bleibt dabei neutral.',
      'Kontrolliert absenken.',
    ],
    mistakes: ['Schwung aus der Hüfte holen.', 'Die Handgelenke abknicken.', 'Zu schnell absenken.'],
    alternatives: ['kurzhantel-curl', 'langhantel-curl'],
  },
  {
    slug: 'langhantel-curl',
    name: 'Langhantel-Curl',
    description: 'Mehr Gewicht für den Bizeps, beide Arme gleichzeitig.',
    primary: ['bizeps'],
    secondary: [],
    equipment: 'langhantel',
    level: 'anfaenger',
    sets: '3',
    reps: '8–10',
    steps: [
      'Die Stange schulterbreit greifen, die Handflächen zeigen nach vorne.',
      'Die Ellbogen bleiben nah am Körper.',
      'Die Stange zur Brust beugen.',
      'Langsam absenken.',
    ],
    mistakes: ['Der Oberkörper lehnt sich zurück.', 'Die Ellbogen wandern nach vorne.', 'Die Handgelenke knicken ab.'],
    alternatives: ['kurzhantel-curl', 'hammercurl'],
  },
  {
    slug: 'trizepsdruecken-kabel',
    name: 'Trizepsdrücken am Kabel',
    description: 'Isoliert den Trizeps und schont die Gelenke.',
    primary: ['trizeps'],
    secondary: [],
    equipment: 'maschine',
    level: 'anfaenger',
    sets: '3',
    reps: '10–15',
    steps: [
      'Ein Seil oder eine Stange oben am Kabelzug einhängen.',
      'Aufrecht stehen, die Ellbogen sind eng am Körper.',
      'Den Griff nach unten drücken, bis die Arme gestreckt sind.',
      'Langsam zurück, bis die Ellbogen etwa 90 Grad gebeugt sind.',
    ],
    mistakes: [
      'Die Ellbogen bewegen sich nach vorne und hinten.',
      'Der Oberkörper lehnt sich über das Gewicht.',
      'Das Gewicht zurückschnellen lassen.',
    ],
    alternatives: ['french-press', 'dips'],
  },
  {
    slug: 'french-press',
    name: 'French Press (Stirndrücken)',
    description: 'Langhantel-Übung für einen kräftigen Trizeps.',
    primary: ['trizeps'],
    secondary: [],
    equipment: 'langhantel',
    level: 'fortgeschritten',
    sets: '3',
    reps: '8–12',
    steps: [
      'Auf die Bank legen und die Stange (am besten eine SZ-Stange) mit gestreckten Armen über der Brust halten.',
      'Die Oberarme bleiben senkrecht.',
      'Die Stange langsam Richtung Stirn senken. Nur die Ellbogen beugen sich.',
      'Zurück nach oben strecken.',
    ],
    mistakes: [
      'Die Ellbogen gehen weit auseinander.',
      'Die Oberarme bewegen sich mit.',
      'Zu schweres Gewicht. Das belastet die Ellbogen.',
    ],
    alternatives: ['trizepsdruecken-kabel', 'dips'],
  },

  // ---------- Beine & Gesäss ----------
  {
    slug: 'kniebeuge',
    name: 'Kniebeuge mit Langhantel',
    description: 'Die Grundübung für Beine und Gesäss.',
    primary: ['quadrizeps', 'gesaess'],
    secondary: ['beinbeuger', 'bauch', 'ruecken'],
    equipment: 'langhantel',
    level: 'fortgeschritten',
    sets: '3',
    reps: '5–8',
    steps: [
      'Die Stange auf den oberen Rücken legen (nicht auf den Nacken). Die Füsse stehen schulterbreit.',
      'Den Bauch anspannen und die Brust aufrecht halten.',
      'Die Hüfte nach hinten unten bewegen, bis die Oberschenkel mindestens parallel zum Boden sind.',
      'Über die ganze Fusssohle kraftvoll nach oben drücken.',
    ],
    mistakes: [
      'Die Knie fallen nach innen.',
      'Die Fersen heben ab.',
      'Der Rücken wird unten in der Bewegung rund.',
    ],
    alternatives: ['goblet-squat', 'beinpresse'],
  },
  {
    slug: 'goblet-squat',
    name: 'Goblet Squat',
    description: 'Kniebeuge mit Kurzhantel, perfekt zum Lernen der Technik.',
    primary: ['quadrizeps', 'gesaess'],
    secondary: ['bauch'],
    equipment: 'kurzhantel',
    level: 'anfaenger',
    sets: '3',
    reps: '10–12',
    steps: [
      'Eine Kurzhantel senkrecht vor der Brust halten.',
      'Die Füsse stehen schulterbreit, die Fussspitzen zeigen leicht nach aussen.',
      'Tief in die Hocke gehen, die Ellbogen sind zwischen den Knien.',
      'Aufrichten, bis du wieder gerade stehst.',
    ],
    mistakes: ['Die Knie fallen nach innen.', 'Der Oberkörper kippt weit nach vorne.', 'Die Fersen heben ab.'],
    alternatives: ['kniebeuge', 'ausfallschritte'],
  },
  {
    slug: 'ausfallschritte',
    name: 'Ausfallschritte',
    description: 'Trainiert jedes Bein einzeln und verbessert das Gleichgewicht.',
    primary: ['quadrizeps', 'gesaess'],
    secondary: ['beinbeuger'],
    equipment: 'kurzhantel',
    level: 'anfaenger',
    sets: '3',
    reps: '8–12 pro Bein',
    steps: [
      'Aufrecht stehen und die Hanteln seitlich halten. Am Anfang geht es auch ohne Gewicht.',
      'Einen grossen Schritt nach vorne machen.',
      'Das hintere Knie Richtung Boden senken, bis beide Knie etwa 90 Grad gebeugt sind.',
      'Mit dem vorderen Bein zurück in den Stand drücken.',
    ],
    mistakes: ['Das vordere Knie knickt nach innen.', 'Der Schritt ist zu kurz.', 'Der Oberkörper fällt nach vorne.'],
    alternatives: ['goblet-squat', 'beinpresse'],
  },
  {
    slug: 'beinpresse',
    name: 'Beinpresse',
    description: 'Viel Gewicht für die Beine, ohne den Rücken zu belasten.',
    primary: ['quadrizeps', 'gesaess'],
    secondary: [],
    equipment: 'maschine',
    level: 'anfaenger',
    sets: '3',
    reps: '10–12',
    steps: [
      'Hinsetzen, Rücken und Gesäss liegen fest am Polster.',
      'Die Füsse schulterbreit in die Mitte der Plattform stellen.',
      'Die Plattform langsam absenken, bis die Knie etwa 90 Grad gebeugt sind.',
      'Hochdrücken, ohne die Knie ganz durchzustrecken.',
    ],
    mistakes: [
      'Die Knie oben komplett durchdrücken.',
      'Das Gesäss hebt vom Polster ab.',
      'Zu wenig tief absenken.',
    ],
    alternatives: ['kniebeuge', 'goblet-squat'],
  },
  {
    slug: 'rumaenisches-kreuzheben',
    name: 'Rumänisches Kreuzheben',
    description: 'Trainiert die Rückseite der Beine und das Gesäss.',
    primary: ['beinbeuger', 'gesaess'],
    secondary: ['ruecken'],
    equipment: 'kurzhantel',
    level: 'anfaenger',
    sets: '3',
    reps: '8–12',
    steps: [
      'Hüftbreit stehen, die Hanteln sind vor den Oberschenkeln.',
      'Die Knie leicht beugen und so lassen.',
      'Die Hüfte nach hinten schieben und die Hanteln nah an den Beinen bis unter die Knie senken.',
      'Das Gesäss anspannen und die Hüfte nach vorne schieben, bis du aufrecht stehst.',
    ],
    mistakes: [
      'Ein runder Rücken.',
      'Die Knie zu stark beugen. Dann wird es eine Kniebeuge.',
      'Die Hanteln sind weit weg von den Beinen.',
    ],
    alternatives: ['kreuzheben', 'beinbeuger-maschine'],
  },
  {
    slug: 'hip-thrust',
    name: 'Hip Thrust',
    description: 'Die beste Übung, um gezielt das Gesäss zu trainieren.',
    primary: ['gesaess'],
    secondary: ['beinbeuger'],
    equipment: 'langhantel',
    level: 'anfaenger',
    sets: '3',
    reps: '8–12',
    steps: [
      'Den oberen Rücken an eine Bank lehnen. Die Langhantel liegt mit einem Polster auf der Hüfte.',
      'Die Füsse hüftbreit aufstellen, die Knie sind gebeugt.',
      'Die Hüfte nach oben drücken, bis Oberkörper und Oberschenkel eine Linie bilden.',
      'Oben das Gesäss kurz anspannen, dann langsam absenken.',
    ],
    mistakes: [
      'Oben ins Hohlkreuz drücken.',
      'Die Füsse stehen zu weit weg oder zu nah.',
      'Den Kopf in den Nacken legen.',
    ],
    alternatives: ['rumaenisches-kreuzheben', 'kniebeuge'],
  },
  {
    slug: 'beinbeuger-maschine',
    name: 'Beinbeuger an der Maschine',
    description: 'Isoliert die hinteren Oberschenkel.',
    primary: ['beinbeuger'],
    secondary: ['waden'],
    equipment: 'maschine',
    level: 'anfaenger',
    sets: '3',
    reps: '10–15',
    steps: [
      'Die Maschine so einstellen, dass das Polster knapp über den Fersen liegt.',
      'Hinlegen oder hinsetzen (je nach Maschine) und die Griffe fassen.',
      'Die Fersen Richtung Gesäss ziehen.',
      'Langsam zurück, bis die Beine fast gestreckt sind.',
    ],
    mistakes: ['Die Hüfte hebt ab.', 'Das Gewicht zurückfallen lassen.', 'Zu schnelle Wiederholungen.'],
    alternatives: ['rumaenisches-kreuzheben', 'hip-thrust'],
  },
  {
    slug: 'wadenheben',
    name: 'Wadenheben',
    description: 'Geht überall, zum Beispiel auf einer Treppenstufe.',
    primary: ['waden'],
    secondary: [],
    equipment: 'koerpergewicht',
    level: 'anfaenger',
    sets: '3',
    reps: '12–20',
    steps: [
      'Mit den Fussballen auf eine Stufe stellen, die Fersen hängen frei.',
      'An einer Wand oder einem Geländer festhalten.',
      'Die Fersen so hoch wie möglich anheben.',
      'Langsam absenken, bis die Fersen unter der Stufe sind.',
    ],
    mistakes: ['Wippen statt kontrolliert bewegen.', 'Die Bewegung ist zu klein.', 'Die Knie beugen.'],
    alternatives: ['beinpresse', 'ausfallschritte'],
  },

  // ---------- Bauch ----------
  {
    slug: 'plank',
    name: 'Unterarmstütz (Plank)',
    description: 'Stärkt den ganzen Rumpf, ganz ohne Geräte.',
    primary: ['bauch'],
    secondary: ['schultern'],
    equipment: 'koerpergewicht',
    level: 'anfaenger',
    sets: '3',
    reps: '30–60 Sek.',
    steps: [
      'Die Unterarme auf den Boden legen, die Ellbogen sind unter den Schultern.',
      'Die Beine nach hinten strecken und dich auf die Zehenspitzen stützen.',
      'Den Körper in eine gerade Linie bringen, Bauch und Gesäss anspannen.',
      'Die Position halten und ruhig weiteratmen.',
    ],
    mistakes: ['Die Hüfte hängt durch.', 'Das Gesäss ragt nach oben.', 'Die Luft anhalten.'],
    alternatives: ['crunch', 'haengendes-beinheben'],
  },
  {
    slug: 'crunch',
    name: 'Crunch',
    description: 'Einfache Übung für die geraden Bauchmuskeln.',
    primary: ['bauch'],
    secondary: [],
    equipment: 'koerpergewicht',
    level: 'anfaenger',
    sets: '3',
    reps: '12–20',
    steps: [
      'Auf den Rücken legen, die Knie sind gebeugt, die Füsse stehen am Boden.',
      'Die Hände an die Schläfen oder vor die Brust legen.',
      'Die Schultern vom Boden abheben, indem du den Bauch anspannst.',
      'Langsam zurück, ohne den Kopf abzulegen.',
    ],
    mistakes: [
      'Mit den Händen am Kopf ziehen.',
      'Mit Schwung hochkommen.',
      'Ganz aufsitzen, statt nur die Schultern zu heben.',
    ],
    alternatives: ['plank', 'haengendes-beinheben'],
  },
  {
    slug: 'haengendes-beinheben',
    name: 'Hängendes Beinheben',
    description: 'Anspruchsvolle Bauchübung an der Klimmzugstange.',
    primary: ['bauch'],
    secondary: [],
    equipment: 'koerpergewicht',
    level: 'fortgeschritten',
    sets: '3',
    reps: '8–12',
    steps: [
      'An die Stange hängen, die Arme sind gestreckt.',
      'Den Bauch anspannen, nicht schwingen.',
      'Die Knie oder die gestreckten Beine nach oben ziehen, mindestens bis auf Hüfthöhe.',
      'Langsam wieder absenken.',
    ],
    mistakes: [
      'Hin und her schwingen.',
      'Nur die Beine heben, ohne das Becken einzurollen.',
      'Zu schnell absenken.',
    ],
    alternatives: ['crunch', 'plank'],
  },
]

// Hilfsfunktion: Übung anhand der slug finden
export function findExercise(slug: string | undefined): Exercise | undefined {
  return exercises.find((exercise) => exercise.slug === slug)
}

// Hilfsfunktionen: Text für Equipment und Level holen
export function equipmentLabel(id: Equipment): string {
  return equipmentOptions.find((option) => option.id === id)?.label ?? id
}

export function levelLabel(id: Level): string {
  return levelOptions.find((option) => option.id === id)?.label ?? id
}
