import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from '../App'
import { PersonalDataPage } from '../pages/recruitment/PersonalDataPage'
import { PreferencesAndParticipationPage } from '../pages/recruitment/PreferencesAndParticipationPage'
import { TechnicalSkillsPage } from '../pages/recruitment/TechnicalSkillsPage'
import { ExperienceAndTrackRecordPage } from '../pages/recruitment/ExperienceAndTrackRecordPage'
import { MotivationAndExpectationsPage } from '../pages/recruitment/MotivationAndExpectationsPage'

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/reclutamiento/informacion-personal" element={<PersonalDataPage />} />
        <Route path="/reclutamiento/preferencias-y-participacion" element={<PreferencesAndParticipationPage />} />
        <Route path="/reclutamiento/habilidades-tecnicas" element={<TechnicalSkillsPage />} />
        <Route path="/reclutamiento/experiencia-y-trayectoria" element={<ExperienceAndTrackRecordPage />} />
        <Route path="/reclutamiento/motivacion-y-expectativas" element={<MotivationAndExpectationsPage />} />
      </Routes>
    </Router>
  )
}