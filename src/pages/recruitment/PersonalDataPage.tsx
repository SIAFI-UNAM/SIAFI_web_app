import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { Input } from "../../components/forms";
import { Button } from "../../components/ui";
import { SiafiLogo } from "../../components/footer";
import { Footer } from "../../layouts";
import { type FormState } from "../../types/FormData";

export function PersonalDataPage() {
  const navigate = useNavigate();
  const { register, trigger, formState: { errors } } = useFormContext<FormState>();

  const handleContinue = async () => {
    const isValid = await trigger([
      "personalData.name",
      "personalData.lastName",
      "personalData.phoneNumber",
      "personalData.email",
      "personalData.studentId",
      "personalData.career",
      "personalData.semester"
    ]);
    if (isValid) {
      navigate('/reclutamiento/preferencias-y-participacion');
    }
  };

  return (
    <div className="bg-siafi-surface flex flex-col items-center justify-center min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6"><SiafiLogo /></div>
        <div className="text-center mb-6">
          <h1 className="text-siafi-h2 text-siafi-on-surface mb-2">Información Personal</h1>
          <p className="text-siafi-body text-siafi-on-surface">
            Esta información nos ayudará a conocerte y mantenernos en contacto.
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <Input
              label="Nombre(s)"
              placeholder="Tu nombre"
              fullWidth
              {...register("personalData.name", { required: "El nombre es obligatorio." })}
            />
            {errors.personalData?.name && <p className="text-red-500 text-sm mt-1">{errors.personalData.name.message}</p>}
          </div>
          <div>
            <Input
              label="Apellido(s)"
              placeholder="Tu apellido"
              fullWidth
              {...register("personalData.lastName", { required: "El apellido es obligatorio." })}
            />
            {errors.personalData?.lastName && <p className="text-red-500 text-sm mt-1">{errors.personalData.lastName.message}</p>}
          </div>
          <div>
            <Input
              label="Número de teléfono"
              placeholder=""
              fullWidth
              type="tel"
              {...register("personalData.phoneNumber", { 
                  required: "El número de teléfono es obligatorio.",
                  pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Ingresa un número de 10 dígitos."
                  }
              })}
            />
            {errors.personalData?.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.personalData.phoneNumber.message}</p>}
          </div>
          <div>
            <Input
              label="Correo electrónico"
              placeholder="tu.correo@dominio.com"
              fullWidth
              type="email"
              {...register("personalData.email", { 
                  required: "El correo es obligatorio.",
                  pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "El formato del correo no es válido."
                  }
              })}
            />
            {errors.personalData?.email && <p className="text-red-500 text-sm mt-1">{errors.personalData.email.message}</p>}
          </div>
          <div>
            <Input
              label="Número de cuenta"
              placeholder="31..."
              fullWidth
              {...register("personalData.studentId", { required: "El número de cuenta es obligatorio." })}
            />
            {errors.personalData?.studentId && <p className="text-red-500 text-sm mt-1">{errors.personalData.studentId.message}</p>}
          </div>
          <div>
            <Input
              label="Carrera"
              placeholder="Ingeniería en Computación"
              fullWidth
              {...register("personalData.career", { required: "La carrera es obligatoria." })}
            />
            {errors.personalData?.career && <p className="text-red-500 text-sm mt-1">{errors.personalData.career.message}</p>}
          </div>
          <div>
            <Input
              label="Semestre actual"
              placeholder="7"
              fullWidth
              type="number"
              {...register("personalData.semester", { 
                  required: "El semestre es obligatorio.",
                  valueAsNumber: true 
              })}
            />
            {errors.personalData?.semester && <p className="text-red-500 text-sm mt-1">{errors.personalData.semester.message}</p>}
          </div>
        </form>

        <div className="mt-8 space-y-3">
          <Button
            variant="primary"
            fullWidth
            onClick={handleContinue}
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
  );
}
