import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { RecruitmentFormProvider } from "../context/FormContext";
import { AnimatePresence } from "framer-motion";
import { WelcomePage } from "../pages/recruitment/WelcomePage";
import { PersonalDataPage } from "../pages/recruitment/PersonalDataPage";
import { PreferencesAndParticipationPage } from "../pages/recruitment/PreferencesAndParticipationPage";
import { TechnicalSkillsPage } from "../pages/recruitment/TechnicalSkillsPage";
import { ExperienceAndTrackRecordPage } from "../pages/recruitment/ExperienceAndTrackRecordPage";
import { MotivationAndExpectationsPage } from "../pages/recruitment/MotivationAndExpectationsPage";
import { ThankYouPage } from "../pages/recruitment/ThankYouPage";
import { RecruitmentLayout } from "../layouts/RecruitmentLayout"; 
import { ScrollToTop } from "../utils/ScrollToTop";
import { PageTransition } from "../components/ui";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/reclutamiento" element={<WelcomePage />} />

        <Route element={<RecruitmentLayout />}>
          <Route path="/reclutamiento/informacion-personal" element={<PageTransition><PersonalDataPage /></PageTransition>} />
          <Route path="/reclutamiento/preferencias-y-participacion" element={<PageTransition><PreferencesAndParticipationPage /></PageTransition>} />
          <Route path="/reclutamiento/habilidades-tecnicas" element={<PageTransition><TechnicalSkillsPage /></PageTransition>} />
          <Route path="/reclutamiento/experiencia-y-trayectoria" element={<PageTransition><ExperienceAndTrackRecordPage /></PageTransition>} />
          <Route path="/reclutamiento/motivacion-y-expectativas" element={<PageTransition><MotivationAndExpectationsPage /></PageTransition>} />
        </Route>
        <Route path="/reclutamiento/gracias" element={<PageTransition><ThankYouPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export function AppRouter() {
  return (
    <Router>
      <RecruitmentFormProvider>
        <ScrollToTop />
        <AnimatedRoutes />
      </RecruitmentFormProvider>
    </Router>
  );
}
