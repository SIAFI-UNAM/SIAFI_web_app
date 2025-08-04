import React, { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useForm, FormProvider as RHFFormProvider, type UseFormReturn, useFormContext } from 'react-hook-form';
import { type FormState } from '../types/FormData';
import { getInitialState } from './initialState';

interface RecruitmentFormContextProps {
  submitForm: (data: FormState) => Promise<void>;
  isSubmitting: boolean;
  submitError: string | null;
}

const RecruitmentFormContext = createContext<RecruitmentFormContextProps | undefined>(undefined);

const loadFormData = (): FormState => {
  try {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      if (Object.keys(parsed).length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Error parsing formData from localStorage", error);
  }
  return getInitialState();
};

export const RecruitmentFormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const methods = useForm<FormState>({
    defaultValues: getInitialState(),
  });

  const { watch, reset } = methods;

  // Efecto para cargar los datos desde localStorage al iniciar
  useEffect(() => {
    const savedData = loadFormData();
    // Nos aseguramos de que el campo del CV esté siempre vacío al cargar
    if (savedData.personalData) {
      savedData.personalData.cv = null;
    }
    reset(savedData);
  }, [reset]);

  // Efecto para guardar los datos en localStorage al cambiar
  useEffect(() => {
    const subscription = watch((value) => {
      // Usamos una copia profunda para no afectar el estado real del formulario
      const dataToStore = JSON.parse(JSON.stringify(value));
      
      // Nunca guardamos el archivo en localStorage
      if (dataToStore.personalData) {
        dataToStore.personalData.cv = null;
      }
      
      localStorage.setItem('formData', JSON.stringify(dataToStore));
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  
  const submitForm = async (data: FormState) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    // Usamos FormData para enviar correctamente el archivo
    const formDataToSend = new FormData();
    if (data.personalData.cv) {
      formDataToSend.append('cv', data.personalData.cv);
    }

    // Adjuntamos el resto de los datos como JSON
    Object.entries(data).forEach(([section, sectionData]) => {
      if (section === 'personalData') {
        const { cv, ...rest } = sectionData;
        formDataToSend.append('personalData', JSON.stringify(rest));
      } else {
        formDataToSend.append(section, JSON.stringify(sectionData));
      }
    });

    try {
      const response = await fetch('https://api.example.com/submit', {
        method: 'POST',
        body: formDataToSend, // No establecer 'Content-Type', el navegador lo hace por nosotros
      });

      if (response.ok) {
        reset(getInitialState());
        localStorage.removeItem('formData');
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Error al enviar el formulario' }));
        setSubmitError(errorData.message);
      }
    } catch (error: any) {
      setSubmitError(error.message || 'Error de red. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RHFFormProvider {...methods}>
      <RecruitmentFormContext.Provider value={{ submitForm, isSubmitting, submitError }}>
        {children}
      </RecruitmentFormContext.Provider>
    </RHFFormProvider>
  );
};

export const useRecruitmentForm = (): UseFormReturn<FormState> => {
    const context = useFormContext<FormState>();
    if (!context) {
      throw new Error('useRecruitmentForm must be used within a RecruitmentFormProvider');
    }
    return context;
  };

export const useRecruitmentContext = () => {
  const context = useContext(RecruitmentFormContext);
  if (!context) {
    throw new Error('useRecruitmentContext must be used within a RecruitmentFormProvider');
  }
  return context;
};
