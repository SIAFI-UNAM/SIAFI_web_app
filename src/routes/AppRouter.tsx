import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { PersonalDataPage } from '../pages/recruitment/PersonalDataPage'
import { PreferencesAndParticipationPage } from '../pages/recruitment/PreferencesAndParticipationPage'
import { TechnicalSkillsPage } from '../pages/recruitment/TechnicalSkillsPage'
import { ExperienceAndTrackRecordPage } from '../pages/recruitment/ExperienceAndTrackRecordPage'
import { MotivationAndExpectationsPage } from '../pages/recruitment/MotivationAndExpectationsPage'
import { ScrollToTop } from '../utils/ScrollToTop'

export function AppRouter() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/reclutamiento/informacion-personal" element={<PersonalDataPage />} />
        <Route path="/reclutamiento/preferencias-y-participacion" element={<PreferencesAndParticipationPage />} />
        <Route path="/reclutamiento/habilidades-tecnicas" element={<TechnicalSkillsPage />} />
        <Route path="/reclutamiento/experiencia-y-trayectoria" element={<ExperienceAndTrackRecordPage />} />
        <Route path="/reclutamiento/motivacion-y-expectativas" element={<MotivationAndExpectationsPage />} />
        <Route path="*" element={<Navigate to="/reclutamiento/informacion-personal" replace />} />
      </Routes>
    </Router>
  )
}
