import Hero from '../components/home/Hero'
import Stats from '../components/home/Stats'
import Offer from '../components/home/Offer'
import MuscleMap from '../components/home/MuscleMap'
import Rules from '../components/home/Rules'

// Die Startseite setzt sich aus einzelnen Abschnitten zusammen.
// Jeder Abschnitt liegt in einer eigenen Datei in src/components/home/
export default function HomePage() {
  return (
    <>
      {/* React 19 setzt <title> automatisch in den <head> der Seite */}
      <title>JJJ Fitness – Muskelaufbau einfach erklärt</title>

      <Hero />
      <Stats />
      <Offer />
      <MuscleMap />
      <Rules />
    </>
  )
}
