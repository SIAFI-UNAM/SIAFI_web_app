import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { Textarea } from "../../components/forms";
import { Button } from "../../components/ui";
import { SiafiLogo } from "../../components/footer";
import { Footer } from "../../layouts";
import { type FormState } from "../../types/FormData";

export function ExperienceAndTrackRecordPage() {
  const navigate = useNavigate();
  const { register, trigger, formState: { errors } } = useFormContext<FormState>();

  const handleContinue = async () => {
    const isValid = await trigger([
      "previous_experience_text",
      "proud_moment_text",
      "soft_skills_text",
      "team_inspiration_text",
    ]);
    if (isValid) {
      navigate('/reclutamiento/motivacion-y-expectativas');
    }
  };

  return (
    <div className="bg-siafi-surface flex flex-col items-center justify-center min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6"><SiafiLogo /></div>
        <div className="text-center mb-6">
          <h1 className="text-siafi-h2 text-siafi-on-surface mb-2">Experiencia y Trayectoria</h1>
          <p className="text-siafi-body text-siafi-on-surface">
            Cuéntanos sobre tu experiencia, logros y habilidades blandas.
          </p>
        </div>

        <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
          <Textarea
            label="Platícanos de un evento personal o profesional del que te sientas orgulloso."
            placeholder="Escribe tu respuesta"
            fullWidth
            height="large"
            {...register("proud_moment_text", {
              required: "Este campo es obligatorio.",
              minLength: { value: 10, message: "La respuesta debe tener al menos 10 caracteres." },
              maxLength: { value: 1000, message: "La respuesta no debe exceder los 1000 caracteres." }
            })}
          />
          {errors.proud_moment_text && <p className="text-red-500 text-sm mt-1">{errors.proud_moment_text.message}</p>}

          <Textarea
            label="Describe una situación en la que tus habilidades de comunicación y trabajo en equipo fueron clave."
            placeholder="Escribe tu respuesta"
            fullWidth
            height="large"
            {...register("soft_skills_text", {
              required: "Este campo es obligatorio.",
              minLength: { value: 10, message: "La respuesta debe tener al menos 10 caracteres." },
              maxLength: { value: 1000, message: "La respuesta no debe exceder los 1000 caracteres." }
            })}
          />
          {errors.soft_skills_text && <p className="text-red-500 text-sm mt-1">{errors.soft_skills_text.message}</p>}

          <Textarea
            label="¿Qué te inspira de trabajar en equipo para construir un proyecto?"
            placeholder="Escribe tu respuesta"
            fullWidth
            height="large"
            {...register("team_inspiration_text", {
              required: "Este campo es obligatorio.",
              minLength: { value: 10, message: "La respuesta debe tener al menos 10 caracteres." },
              maxLength: { value: 1000, message: "La respuesta no debe exceder los 1000 caracteres." }
            })}
          />
          {errors.team_inspiration_text && <p className="text-red-500 text-sm mt-1">{errors.team_inspiration_text.message}</p>}
          
          <Textarea
            label="¿Has sido parte de alguna sociedad, grupo estudiantil o proyecto relacionado con IA? (Opcional)"
            placeholder="Escribe tu respuesta"
            fullWidth
            height="large"
            {...register("previous_experience_text", {
              maxLength: { value: 1000, message: "La respuesta no debe exceder los 1000 caracteres." }
            })}
          />
          {errors.previous_experience_text && <p className="text-red-500 text-sm mt-1">{errors.previous_experience_text.message}</p>}
          
          <Textarea
            label="Si tienes experiencia detallada en proyectos, descríbela aquí (Opcional)"
            placeholder="Describe tus proyectos, tu rol y las tecnologías que usaste."
            fullWidth
            height="large"
            {...register("detailed_experience_text", {
              maxLength: { value: 2000, message: "La respuesta no debe exceder los 2000 caracteres." }
            })}
          />
          {errors.detailed_experience_text && <p className="text-red-500 text-sm mt-1">{errors.detailed_experience_text.message}</p>}
        </form>

        <div className="mt-8 space-y-3">
          <Button variant="primary" fullWidth onClick={handleContinue}>Continuar</Button>
          <Button variant="secondary" fullWidth onClick={() => navigate('/reclutamiento/habilidades-tecnicas')}>Regresar</Button>
        </div>

        <div className="flex justify-center items-center space-x-2 mt-6">
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-siafi-primary rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
        </div>
      </div>
      <div className="w-full max-w-6xl mx-auto pt-20">
        <Footer />
      </div>
    </div>
  );
}
