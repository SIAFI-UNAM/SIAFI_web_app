import { AppRouter } from './routes/AppRouter';
import { RecruitmentFormProvider } from './context/FormContext';

function App() {

  return (
    <RecruitmentFormProvider>
      
        <AppRouter />

    </RecruitmentFormProvider>
  );
}

export default App;
erikyvanov