import { useNavigate } from "react-router-dom";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "../../components/forms/checkbox";
import { Textarea } from "../../components/forms";
import { Button } from "../../components/ui";
import { SiafiLogo } from "../../components/footer";
import { Footer } from "../../layouts";
import { type FormState } from "../../types/FormData";

const areas = ["Organización", "Proyectos", "Difusión", "Capacitación"];

export function PreferencesAndParticipationPage() {
  const navigate = useNavigate();
  const { register, control, trigger, formState: { errors } } = useFormContext<FormState>();

  const handleContinue = async () => {
    const isValid = await trigger(["preferences.interestedAreas", "preferences.participationReason"]);
    if (isValid) {
      navigate('/reclutamiento/habilidades-tecnicas');
    }
  };

  return (
    <div className="bg-siafi-surface flex flex-col items-center justify-center min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6"><SiafiLogo /></div>
        <div className="text-center mb-6">
          <h1 className="text-siafi-h2 text-siafi-on-surface mb-2">Preferencias y Participación</h1>
          <p className="text-siafi-body text-siafi-on-surface">
            Queremos saber cómo te gustaría contribuir y en qué áreas te interesa colaborar.
          </p>
        </div>

        <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
          <div>
            <Controller
              name="preferences.interestedAreas"
              control={control}
              rules={{ required: "Debes seleccionar al menos un área de interés." }}
              render={({ field }) => (
                <div>
                  <label className="text-siafi-body text-gray-700 font-bold">
                    ¿En qué núcleo te gustaría colaborar?
                    <span className="font-normal italic"> (Puedes seleccionar más de uno)</span>
                  </label>
                  <div className="mt-4 space-y-4">
                    {areas.map((area) => (
                      <Checkbox
                        key={area}
                        label={area}
                        checked={field.value?.includes(area) ?? false}
                        onChange={() => {
                          const currentAreas = field.value || [];
                          const newAreas = currentAreas.includes(area)
                            ? currentAreas.filter((a: string) => a !== area)
                            : [...currentAreas, area];
                          field.onChange(newAreas);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            />
            {errors.preferences?.interestedAreas && <p className="text-red-500 text-sm mt-1">{errors.preferences.interestedAreas.message}</p>}
          </div>
          <div>
            <Textarea
              label="¿Qué crees que podrías aportar al área o áreas seleccionadas?"
              placeholder="Escribe tu respuesta"
              fullWidth
              height="large"
              {...register("preferences.participationReason", { required: "Este campo es obligatorio." })}
            />
            {errors.preferences?.participationReason && <p className="text-red-500 text-sm mt-1">{errors.preferences.participationReason.message}</p>}
          </div>
        </form>

        <div className="mt-8 space-y-3">
          <Button variant="primary" fullWidth onClick={handleContinue}>
            Continuar
          </Button>
          <Button variant="secondary" fullWidth onClick={() => navigate('/reclutamiento/informacion-personal')}>
            Regresar
          </Button>
        </div>
        
        <div className="flex justify-center items-center space-x-2 mt-6">
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-siafi-primary rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
        </div>
      </div>
      <div className="w-full max-w-6xl mx-auto pt-20">
        <Footer />
      </div>
    </div>
  )
}
