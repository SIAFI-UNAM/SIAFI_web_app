import { Input } from "../../components/forms"
import { Button } from "../../components/ui"
import { SiafiLogo } from "../../components/footer"
import { Footer } from "../../layouts"
import { useNavigate } from "react-router-dom"

export function PersonalDataPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-siafi-surface flex flex-col items-center justify-center min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <SiafiLogo />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-siafi-h2 text-siafi-on-surface mb-2">
            Información Personal
          </h1>
          <p className="text-siafi-body text-siafi-on-surface">
            Esta información nos ayudará a conocerte y mantenernos en contacto contigo durante el proceso de reclutamiento.
          </p>
        </div>

        <form className="space-y-6">
          <Input
            label="Nombre completo"
            placeholder="Tu nombre"
            fullWidth
          />
          <Input
            label="Carrera"
            placeholder="Ingeniería en computación"
            fullWidth
          />
          <Input
            label="Semestre actual"
            placeholder="Séptimo"
            fullWidth
          />
          <Input
            label="Número telefónico"
            placeholder="Tu número de teléfono"
            fullWidth
          />
        </form>

        <div className="mt-8 space-y-3">
          <Button
            variant="primary"
            fullWidth
            onClick={() => navigate('/reclutamiento/preferencias-y-participacion')}
          >
            Continuar
          </Button>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => navigate('/reclutamiento')}
          >
            Regresar
          </Button>
        </div>

        <div className="flex justify-center items-center space-x-2 mt-6">
          <div className="w-2 h-2 bg-siafi-primary rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
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
