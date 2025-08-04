import { useNavigate } from "react-router-dom";
import { useFormContext, Controller } from "react-hook-form";
import { Textarea, RadioGroup } from "../../components/forms";
import { Button } from "../../components/ui";
import { SiafiLogo } from "../../components/footer";
import { Footer } from "../../layouts";
import { useRecruitmentContext } from "../../context/FormContext";
import { type FormState } from "../../types/FormData";
import { getInitialState } from "../../context/initialState";

const recruitmentSources = [
  { value: "redes_sociales", label: "Redes sociales" },
  { value: "correo_institucional", label: "Correo institucional" },
  { value: "cartel_facultad", label: "Cartel en la Facultad" },
  { value: "mencion_profesor", label: "Un profesor/a lo mencionó" },
  { value: "evento_siafi", label: "Evento de SIAFI" },
  { value: "feria_asociaciones", label: "Feria de asociaciones" },
  { value: "otro", label: "Otro" },
];

export function MotivationAndExpectationsPage() {
  const navigate = useNavigate();
  const { register, control, handleSubmit: handleRHFSubmit, reset, formState: { errors } } = useFormContext<FormState>();
  const { submitForm, isSubmitting, submitError } = useRecruitmentContext();

  const onFormSubmit = (data: FormState) => {
    submitForm(data);
  };
  
  const handleReset = () => {
    reset(getInitialState());
    localStorage.removeItem('formData');
  }

  return (
    <div className="bg-siafi-surface flex flex-col items-center justify-center min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6"><SiafiLogo /></div>
        <div className="text-center mb-6">
          <h1 className="text-siafi-h2 text-siafi-on-surface mb-2">Motivación y Expectativas</h1>
          <p className="text-siafi-body text-siafi-on-surface">
            Cuéntanos qué te mueve a formar parte de SIAFI.
          </p>
        </div>

        <form className="space-y-7" onSubmit={handleRHFSubmit(onFormSubmit)}>
          <Textarea
            label="¿Por qué te interesa ser parte de SIAFI y qué crees que puedes aportar?"
            placeholder="Escribe tu respuesta"
            fullWidth
            height="large"
            {...register("why_join_text", {
              required: "Este campo es obligatorio.",
              minLength: { value: 10, message: "La respuesta debe tener al menos 10 caracteres." },
              maxLength: { value: 1000, message: "La respuesta no debe exceder los 1000 caracteres." }
            })}
          />
          {errors.why_join_text && <p className="text-red-500 text-sm mt-1">{errors.why_join_text.message}</p>}

          <Textarea
            label="¿Cuáles son tus expectativas al unirte a SIAFI?"
            placeholder="Escribe tu respuesta"
            fullWidth
            height="large"
            {...register("expectations_text", {
              required: "Este campo es obligatorio.",
              minLength: { value: 10, message: "La respuesta debe tener al menos 10 caracteres." },
              maxLength: { value: 1000, message: "La respuesta no debe exceder los 1000 caracteres." }
            })}
          />
          {errors.expectations_text && <p className="text-red-500 text-sm mt-1">{errors.expectations_text.message}</p>}

          <Controller
            name="how_found_us_text"
            control={control}
            rules={{ required: "Por favor, selecciona una opción." }}
            render={({ field }) => (
                <RadioGroup
                    title="¿Cómo te enteraste del reclutamiento?"
                    name={field.name}
                    options={recruitmentSources}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                />
            )}
          />
          {errors.how_found_us_text && <p className="text-red-500 text-sm mt-1">{errors.how_found_us_text.message}</p>}
          
          <Textarea
            label="Si tienes algún otro comentario, déjalo aquí (Opcional)"
            placeholder="Escribe tu respuesta"
            fullWidth
            height="large"
            {...register("additional_info_text", {
              maxLength: { value: 1000, message: "No exceder 1000 caracteres." },
            })}
          />
          {errors.additional_info_text && <p className="text-red-500 text-sm mt-1">{errors.additional_info_text.message}</p>}
        
            <div className="pt-4 space-y-3">
                {submitError && (
                    <div className="text-red-500 text-center p-2 bg-red-100 border border-red-400 rounded">
                    {submitError}
                    </div>
                )}
                <Button
                    variant="primary"
                    fullWidth
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Enviando..." : "¡Enviar registro!"}
                </Button>
                <Button
                    variant="secondary"
                    fullWidth
                    onClick={() => navigate('/reclutamiento/experiencia-y-trayectoria')}
                    disabled={isSubmitting}
                >
                    Regresar
                </Button>
                <Button
                    variant="danger"
                    fullWidth
                    onClick={handleReset}
                    disabled={isSubmitting}
                >
                    Reiniciar Formulario
                </Button>
            </div>
        </form>

        <div className="flex justify-center items-center space-x-2 mt-6">
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-siafi-primary rounded-full"></div>
        </div>
      </div>
      <div className="w-full max-w-6xl mx-auto pt-20">
        <Footer />
      </div>
    </div>
  );
}
