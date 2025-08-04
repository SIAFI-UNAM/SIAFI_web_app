import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecruitmentFormProvider } from "../context/FormContext";
import { WelcomePage } from "../pages/recruitment/WelcomePage";
import { PersonalDataPage } from "../pages/recruitment/PersonalDataPage";
import { PreferencesAndParticipationPage } from "../pages/recruitment/PreferencesAndParticipationPage";
import { TechnicalSkillsPage } from "../pages/recruitment/TechnicalSkillsPage";
import { ExperienceAndTrackRecordPage } from "../pages/recruitment/ExperienceAndTrackRecordPage";
import { MotivationAndExpectationsPage } from "../pages/recruitment/MotivationAndExpectationsPage";
import { RecruitmentLayout } from "../layouts/RecruitmentLayout"; 
import { ScrollToTop } from "../utils/ScrollToTop";

export function AppRouter() {
  return (
    <Router>
      <RecruitmentFormProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/reclutamiento" element={<WelcomePage />} />

          <Route element={<RecruitmentLayout />}>
            <Route path="/reclutamiento/informacion-personal" element={<PersonalDataPage />} />
            <Route path="/reclutamiento/preferencias-y-participacion" element={<PreferencesAndParticipationPage />} />
            <Route path="/reclutamiento/habilidades-tecnicas" element={<TechnicalSkillsPage />} />
            <Route path="/reclutamiento/experiencia-y-trayectoria" element={<ExperienceAndTrackRecordPage />} />
            <Route path="/reclutamiento/motivacion-y-expectativas" element={<MotivationAndExpectationsPage />} />
          </Route>
        </Routes>
      </RecruitmentFormProvider>
    </Router>
  );
}
