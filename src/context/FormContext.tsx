import React, { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useForm, FormProvider as RHFFormProvider, type UseFormReturn, useFormContext } from 'react-hook-form';
import { type FormState } from '../types/FormData';
import { getInitialState } from './initialState';

interface RecruitmentFormContextProps {
  submitForm: (data: FormState) => Promise<boolean>;
  isSubmitting: boolean;
  submitError: string | null;
}

const RecruitmentFormContext = createContext<RecruitmentFormContextProps | undefined>(undefined);

const loadFormData = (): FormState => {
  try {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
        const initialState = getInitialState();
        return {
          ...initialState,
          ...parsed,
          selected_nuclei: parsed.selected_nuclei || [],
          development_areas: parsed.development_areas || [],
        };
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

  useEffect(() => {
    const savedData = loadFormData();
    savedData.cv = null;
    reset(savedData);
  }, [reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      const dataToStore = JSON.parse(JSON.stringify(value));
      
      dataToStore.cv = null;
      
      localStorage.setItem('formData', JSON.stringify(dataToStore));
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  
  const submitForm = async (data: FormState): Promise<boolean> => {
    setIsSubmitting(true);
    setSubmitError(null);

    const formDataToSend = new FormData();
    
    if (data.cv) {
      formDataToSend.append('cv_pdf_file', data.cv);
    }

    const dataToSend: Partial<FormState> = { ...data };
    delete dataToSend.cv;

    formDataToSend.append('application_data_json', JSON.stringify(dataToSend));

    try {
      const apiURL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiURL}/api/v1/applications`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        return true;
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Error al enviar el formulario.' }));
        setSubmitError(errorData.detail || errorData.message || 'Ocurrió un error inesperado.');
        return false;
      }
    } catch (error: any) {
      setSubmitError(error.message || 'Error de red. Inténtalo de nuevo.');
      return false;
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
