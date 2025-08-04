import { Textarea, RadioGroup } from "../../components/forms";
import { Button } from "../../components/ui";
import { SiafiLogo } from "../../components/footer";
import { Footer } from "../../layouts";

const recruitmentSources = [
  { value: "social-media", label: "Redes sociales (Instagram, Tiktok, Facebook)" },
  { value: "email", label: "Correo institucional" },
  { value: "poster", label: "Cartel en la Facultad" },
  { value: "class", label: "Clase o profesor/a lo mencionó" },
  { value: "event", label: "Asistí a un evento de SIAFI" },
  { value: "fair", label: "Feria de asociaciones estudiantiles" },
  { value: "other", label: "Otros: _____________________________________________" },
]

export function MotivationAndExpectationsPage() {
  return (
    <div className="bg-siafi-surface flex flex-col items-center justify-center min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <SiafiLogo />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-siafi-h2 text-siafi-on-surface mb-2">
            Motivación y Expectativas
          </h1>
          <p className="text-siafi-body text-siafi-on-surface">
            Queremos saber qué te mueve a formar parte de SIAFI y qué esperas de esta experiencia.
          </p>
        </div>

        <form className="space-y-7">
          <Textarea
            label="¿Por qué te interesa ser parte de SIAFI y qué crees que puedes aportar?"
            placeholder="Escribe tu respuesta"
            fullWidth
            height="large"
          />
          <Textarea
            label="¿Cuáles son tus expectativas al unirte a SIAFI?"
            placeholder="Escribe tu respuesta"
            fullWidth
            height="large"
          />

          <RadioGroup
            title="¿Cómo te enteraste del proceso de reclutamiento?"
            name="recruitment-source"
            options={recruitmentSources}
          />

          <Textarea
            label="¿Hay algún dato adicional que te gustaría compartir con nosotros?"
            placeholder="Escribe tu respuesta"
            fullWidth
            height="large"
          />
        </form>

        <div className="mt-8 space-y-3">
          <Button
            variant="primary"
            fullWidth
            type="submit"
          >
            Enviar
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
  )
}
