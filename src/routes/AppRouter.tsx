import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import { 
  PersonalDataPage, 
  PreferencesAndParticipationPage, 
  TechnicalSkillsPage, 
  ExperienceAndTrackRecordPage, 
  MotivationAndExpectationsPage 
} from '../pages/recruitment'
import { ScrollToTop } from '../utils/ScrollToTop'
import { RecruitmentFormProvider } from '../context/FormContext'

export function AppRouter() {
  return (
    <Router>
      <RecruitmentFormProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/reclutamiento/informacion-personal" element={<PersonalDataPage />} />
          <Route path="/reclutamiento/preferencias-y-participacion" element={<PreferencesAndParticipationPage />} />
          <Route path="/reclutamiento/habilidades-tecnicas" element={<TechnicalSkillsPage />} />
          <Route path="/reclutamiento/experiencia-y-trayectoria" element={<ExperienceAndTrackRecordPage />} />
          <Route path="/reclutamiento/motivacion-y-expectativas" element={<MotivationAndExpectationsPage />} />
          <Route path="*" element={<Navigate to="/reclutamiento/informacion-personal" replace />} />
        </Routes>
      </RecruitmentFormProvider>
    </Router>
  )
}
