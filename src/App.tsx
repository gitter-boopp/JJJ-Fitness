// App.tsx legt fest, welche Seite bei welcher Adresse (URL) angezeigt wird.
import { BrowserRouter, Route, Routes } from 'react-router'

import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ExercisesPage from './pages/ExercisesPage'
import ExerciseDetailPage from './pages/ExerciseDetailPage'
import PlansPage from './pages/PlansPage'
import NutritionPage from './pages/NutritionPage'
import AboutPage from './pages/AboutPage'
import StyleguidePage from './pages/StyleguidePage'
import NotFoundPage from './pages/NotFoundPage'

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
          <Route path="ueber-uns" element={<AboutPage />} />
          <Route path="styleguide" element={<StyleguidePage />} />
          {/* "*" passt auf alle anderen Adressen -> 404-Seite */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
