import { useNavigate } from "react-router-dom";
import { useFormContext, Controller } from "react-hook-form";
import { useState } from "react";
import { Input, FileInput } from "../../components/forms";
import { Button } from "../../components/ui";
import { SiafiLogo } from "../../components/footer";
import { Footer } from "../../layouts";
import { type FormState } from "../../types/FormData";

export function PersonalDataPage() {
  const navigate = useNavigate();
  const { register, trigger, control, getValues, setError, formState: { errors } } = useFormContext<FormState>();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleContinue = async () => {
    const localValidation = await trigger([
      "name", "lastname", "phone_number", "email", "major", "semester",
    ]);
    if (!localValidation) return;

    setIsVerifying(true);

    const { email, phone_number, recruitment_event_id } = getValues();
    let hasServerError = false;

    try {
      const [emailRes, phoneRes] = await Promise.all([
        fetch('https://lfq5q7b8-8000.usw3.devtunnels.ms/api/v1/application/email/exists', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, recruitment_event_id }),
        }),
        fetch('https://lfq5q7b8-8000.usw3.devtunnels.ms/api/v1/application/phone_number/exists', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone_number, recruitment_event_id }),
        })
      ]);

      if (emailRes.ok) {
        const data = await emailRes.json();
        if (data.exists) {
          setError("email", { type: "manual", message: "Este correo electrónico ya está registrado." });
          hasServerError = true;
        }
      } else if (emailRes.status !== 404) {
        // Handle other non-404 errors for email check
        setError("email", { type: "manual", message: "Error al verificar el correo." });
        hasServerError = true;
      }
      
      if (phoneRes.ok) {
        const data = await phoneRes.json();
        if (data.exists) {
          setError("phone_number", { type: "manual", message: "Este número de teléfono ya está registrado." });
          hasServerError = true;
        }
      } else if (phoneRes.status !== 404) {
        // Handle other non-404 errors for phone check
        setError("phone_number", { type: "manual", message: "Error al verificar el teléfono." });
        hasServerError = true;
      }

    } catch (error) {
      // Handle network errors
      setError("root", { type: "manual", message: "Error de red, por favor intentalo de nuevo." });
      hasServerError = true;
    } finally {
      setIsVerifying(false);
      if (!hasServerError) {
        navigate('/reclutamiento/preferencias-y-participacion');
      }
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
              {...register("name", { 
                required: "El nombre es obligatorio.",
                minLength: { value: 1, message: "El nombre debe tener al menos 1 caracter." },
                maxLength: { value: 100, message: "El nombre no debe exceder los 100 caracteres." },
                pattern: { value: /^[a-zA-ZÀ-ÿ\s]+$/, message: "Solo se permiten letras y espacios." }
              })}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Input
              label="Apellido(s)"
              placeholder="Tu apellido"
              fullWidth
              {...register("lastname", { 
                required: "El apellido es obligatorio.",
                minLength: { value: 1, message: "El apellido debe tener al menos 1 caracter." },
                maxLength: { value: 100, message: "El apellido no debe exceder los 100 caracteres." },
                pattern: { value: /^[a-zA-ZÀ-ÿ\s]+$/, message: "Solo se permiten letras y espacios." }
              })}
            />
            {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname.message}</p>}
          </div>
          <div>
            <Input
              label="Número de teléfono"
              placeholder=""
              fullWidth
              type="tel"
              {...register("phone_number", { 
                required: "El número de teléfono es obligatorio.",
                minLength: { value: 10, message: "Debe tener al menos 10 dígitos." },
                pattern: { value: /^\+?[\d\s\-()]{10,}$/, message: "Formato de teléfono no válido." }
              })}
            />
            {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number.message}</p>}
          </div>
          <div>
            <Input
              label="Correo electrónico"
              placeholder="tu.correo@dominio.com"
              fullWidth
              type="email"
              {...register("email", { 
                required: "El correo es obligatorio.",
                pattern: { value: /\S+@\S+\.\S+/, message: "El formato del correo no es válido." }
              })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Input
              label="Carrera"
              placeholder="Ingeniería en Computación"
              fullWidth
              {...register("major", { 
                required: "La carrera es obligatoria.",
                minLength: { value: 1, message: "La carrera debe tener al menos 1 caracter." },
                maxLength: { value: 200, message: "La carrera no debe exceder los 200 caracteres." }
              })}
            />
            {errors.major && <p className="text-red-500 text-sm mt-1">{errors.major.message}</p>}
          </div>
          <div>
            <Input
              label="Semestre actual"
              placeholder="7"
              fullWidth
              type="number"
              {...register("semester", { 
                required: "El semestre es obligatorio.",
                valueAsNumber: true,
                min: { value: 1, message: "El semestre debe ser al menos 1." },
                max: { value: 20, message: "El semestre no debe ser mayor a 20." }
              })}
            />
            {errors.semester && <p className="text-red-500 text-sm mt-1">{errors.semester.message}</p>}
          </div>
          <div>
            <Controller
                control={control}
                name="cv"
                rules={{ 
                    validate: {
                        isPdf: (file: File | null) => !file || file.type === "application/pdf" || "Solo se aceptan archivos PDF.",
                        maxSize: (file: File | null) => !file || file.size <= 10 * 1024 * 1024 || "El archivo no debe pesar más de 10MB."
                    }
                }}
                render={({ field: { onChange, value, name, ref } }) => (
                    <FileInput
                        label="Sube tu CV en PDF (Opcional)"
                        name={name}
                        value={value}
                        onChange={onChange}
                        ref={ref}
                    />
                )}
            />
            {errors.cv && <p className="text-red-500 text-sm mt-1">{errors.cv.message}</p>}
          </div>
        </form>

        <div className="mt-8 space-y-3">
          <Button
            variant="primary"
            fullWidth
            onClick={handleContinue}
            loading={isVerifying}
            disabled={isVerifying}
          >
            {isVerifying ? "Verificando..." : "Continuar"}
          </Button>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => navigate('/reclutamiento')}
            disabled={isVerifying}
          >
            Regresar
          </Button>
        </div>
        {errors.root && <p className="text-red-500 text-sm mt-2 text-center">{errors.root.message}</p>}

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
