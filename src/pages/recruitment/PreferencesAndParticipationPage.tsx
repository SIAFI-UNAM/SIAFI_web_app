import { Checkbox } from "../../components/forms/checkbox";
import { Textarea } from "../../components/forms";
import { Button } from "../../components/ui";
import { SiafiLogo } from "../../components/footer";
import { Footer } from "../../layouts";

export function PreferencesAndParticipationPage() {
  return (
    <div className="bg-siafi-surface flex flex-col items-center justify-center min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <SiafiLogo />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-siafi-h2 text-siafi-on-surface mb-2">
            Preferencias y Participación
          </h1>
          <p className="text-siafi-body text-siafi-on-surface">
            Queremos saber cómo te gustaría contribuir en SIAFI y en qué áreas te interesa colaborar.
          </p>
        </div>

        <form className="space-y-7">
          <div>
            <label className="text-siafi-body text-gray-700 font-bold">
              ¿En qué núcleo te gustaría colaborar activamente dentro de SIAFI?
              <span className="font-normal italic"> (Puedes aplicar a más de uno, pero solo serás seleccionado en uno.)</span>
            </label>
            <div className="mt-4 space-y-4">
              <Checkbox label="Organización" />
              <Checkbox label="Proyectos" />
              <Checkbox label="Difusión" />
              <Checkbox label="Capacitación" />
            </div>
          </div>
          <Textarea
            label="¿Qué crees que podrías aportar al área o áreas seleccionadas?"
            placeholder="Escribe tu respuesta"
            fullWidth
            height="large"
          />
          <Textarea
            label="¿Cuáles son tus principales soft skills? (Por ejemplo: liderazgo, trabajo en equipo, comunicación, adaptabilidad, etc.)"
            placeholder="Escribe tu respuesta"
            fullWidth
            height="large"
          />
        </form>

        <div className="mt-8 space-y-3">
          <Button
            variant="primary"
            fullWidth
          >
            Continuar
          </Button>
          <Button
            variant="secondary"
            fullWidth
          >
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
