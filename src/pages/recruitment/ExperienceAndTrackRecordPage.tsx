import { Textarea } from "../../components/forms";
import { Button } from "../../components/ui";
import { SiafiLogo } from "../../components/footer";
import { Footer } from "../../layouts";

export function ExperienceAndTrackRecordPage() {
  return (
    <div className="bg-siafi-surface flex flex-col items-center justify-center min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <SiafiLogo />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-siafi-h2 text-siafi-on-surface mb-2">
            Experiencia y Trayectoria
          </h1>
          <p className="text-siafi-body text-siafi-on-surface">
            Cuéntanos sobre tu experiencia previa en proyectos, grupos estudiantiles o logros relevantes.
          </p>
        </div>

        <form className="space-y-7">
          <Textarea
            label="¿Has sido parte de alguna sociedad, grupo estudiantil o proyecto relacionado con IA?"
            placeholder="Escribe tu respuesta"
            fullWidth
            height="large"
          />
          <Textarea
            label="Platícanos de un evento personal o profesional del que te sientas orgulloso. ¿Cuál fue tu participación y qué impacto tuvo?"
            placeholder="Escribe tu respuesta"
            fullWidth
            height="large"
          />
          <Textarea
            label="Cuéntanos de una ocasión en la que motivaste a tu equipo a trabajar de una nueva manera. ¿Qué cambio propusiste y qué resultados obtuviste?"
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
  )
}
