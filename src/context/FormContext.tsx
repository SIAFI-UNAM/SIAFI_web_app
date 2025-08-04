import React, { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useForm, FormProvider as RHFFormProvider, type UseFormReturn } from 'react-hook-form';
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

  useEffect(() => {
    const savedData = loadFormData();
    reset(savedData);
  }, [reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem('formData', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  
  const submitForm = async (data: FormState) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch('https://api.example.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        reset(getInitialState());
        localStorage.removeItem('formData');
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Failed to submit form' }));
        setSubmitError(errorData.message || 'Ocurrió un error al enviar.');
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
  return useContext(RecruitmentFormContext as any); 
};

export const useRecruitmentContext = () => {
  const context = useContext(RecruitmentFormContext);
  if (!context) {
    throw new Error('useRecruitmentContext must be used within a RecruitmentFormProvider');
  }
  return context;
};