// App.tsx legt fest, welche Seite bei welcher Adresse (URL) angezeigt wird.
import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'

import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

// Code-Splitting: Die Unterseiten werden erst geladen, wenn man sie öffnet.
// So muss der Browser beim ersten Besuch nur die Startseite herunterladen -> schneller.
// (Startseite und 404-Seite laden wir direkt, die braucht man sofort.)
const ExercisesPage = lazy(() => import('./pages/ExercisesPage'))
const ExerciseDetailPage = lazy(() => import('./pages/ExerciseDetailPage'))
const PlansPage = lazy(() => import('./pages/PlansPage'))
const NutritionPage = lazy(() => import('./pages/NutritionPage'))
const LexiconPage = lazy(() => import('./pages/LexiconPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const StyleguidePage = lazy(() => import('./pages/StyleguidePage'))

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Alle Seiten liegen im gleichen Layout (Navigation oben, Footer unten) */}
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="uebungen" element={<ExercisesPage />} />
          {/* :slug ist ein Platzhalter, z.B. /uebungen/liegestuetz */}
          <Route path="uebungen/:slug" element={<ExerciseDetailPage />} />
          <Route path="trainingsplaene" element={<PlansPage />} />
          <Route path="ernaehrung" element={<NutritionPage />} />
          <Route path="lexikon" element={<LexiconPage />} />
          <Route path="ueber-uns" element={<AboutPage />} />
          <Route path="styleguide" element={<StyleguidePage />} />
          {/* "*" passt auf alle anderen Adressen -> 404-Seite */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
