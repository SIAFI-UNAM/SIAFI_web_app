import { useNavigate } from "react-router-dom";
import { useFormContext, Controller } from "react-hook-form";
import { MultipleChoiceTable, type MultipleChoiceOption, type MultipleChoiceRow } from "../../components/tables";
import { Checkbox } from "../../components/forms/checkbox";
import { Textarea } from "../../components/forms";
import { Button } from "../../components/ui";
import { SiafiLogo } from "../../components/footer";
import { Footer } from "../../layouts";
import { type FormState } from "../../types/FormData";

const skillLevelOptions: MultipleChoiceOption[] = [
    { value: "0", label: "0" }, { value: "1", label: "1" }, { value: "2", label: "2" },
    { value: "3", label: "3" }, { value: "4", label: "4" }, { value: "5", label: "5" },
];

const programmingLanguagesRows: MultipleChoiceRow[] = [
  { id: "python", label: "Python" }, { id: "javascript", label: "JavaScript" },
  { id: "typescript", label: "TypeScript" }, { id: "c-cpp", label: "C/C++" },
  { id: "csharp", label: "C#" }, { id: "java", label: "Java" },
];

const devTechRows: MultipleChoiceRow[] = [
    { id: "pytorch", label: "PyTorch" }, { id: "tensorflow", label: "Tensorflow/Keras" },
    { id: "scikit-learn", label: "Scikit-Learn" }, { id: "opencv", label: "OpenCV" },
    { id: "linux", label: "Linux" }, { id: "ros", label: "ROS" },
];

const microcontrollersRows: MultipleChoiceRow[] = [
    { id: "raspberry-pi", label: "Raspberry Pi" }, { id: "esp32", label: "ESP32" },
    { id: "tiva", label: "Tiva" }, { id: "tm4c", label: "TM4C1294NCPDT" },
];

const developmentAreas = [
    "Desarrollo Frontend", "Desarrollo Backend", "DevOps/MLOps/Infraestructura",
    "Desarrollo móvil", "Desarrollo de modelos de IA (modelos de ML o redes neuronales)",
    "Despliegue de modelos o integración de APIs de modelos del mercado", "Otro"
];

export function TechnicalSkillsPage() {
  const navigate = useNavigate();
  const { register, control, trigger, formState: { errors } } = useFormContext<FormState>();

  const handleContinue = async () => {
    // Se pueden añadir validaciones si es necesario aquí
    navigate('/reclutamiento/experiencia-y-trayectoria');
  };

  return (
    <div className="bg-siafi-surface flex flex-col items-center justify-center min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-6"><SiafiLogo /></div>
        <div className="text-center mb-6">
          <h1 className="text-siafi-h2 text-siafi-on-surface mb-2">Habilidades Técnicas</h1>
          <p className="text-siafi-body text-siafi-on-surface">
            Evalúa tu nivel de dominio. Sé honesto, esto nos ayudará a ubicarte mejor.
          </p>
        </div>

        <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
          <Controller
            name="technicalSkills.programmingLanguages"
            control={control}
            render={({ field }) => (
              <MultipleChoiceTable
                title="Lenguajes de Programación"
                subtitle="Nivel: 0=Nulo, 5=Dominado"
                firstColumnLabel="Lenguaje"
                options={skillLevelOptions}
                rows={programmingLanguagesRows.map(row => ({
                    ...row,
                    selectedValue: field.value?.[row.id],
                }))}
                onChange={(rowId, value) => field.onChange({ ...field.value, [rowId]: value })}
              />
            )}
          />

          <Controller
            name="technicalSkills.devTechnologies"
            control={control}
            render={({ field }) => (
                <MultipleChoiceTable
                    title="Tecnologías de desarrollo"
                    subtitle="Nivel: 0=Nulo, 5=Dominado"
                    firstColumnLabel="Tecnología"
                    options={skillLevelOptions}
                    rows={devTechRows.map(row => ({
                        ...row,
                        selectedValue: field.value?.[row.id],
                    }))}
                    onChange={(rowId, value) => field.onChange({ ...field.value, [rowId]: value })}
                />
            )}
            />

            <Controller
                name="technicalSkills.microcontrollers"
                control={control}
                render={({ field }) => (
                    <MultipleChoiceTable
                        title="Tecnologías de Desarrollo (Microcontroladores)"
                        subtitle="Nivel: 0=Nulo, 5=Dominado"
                        firstColumnLabel="Tecnología"
                        options={skillLevelOptions}
                        rows={microcontrollersRows.map(row => ({
                        ...row,
                        selectedValue: field.value?.[row.id],
                    }))}
                        onChange={(rowId, value) => field.onChange({ ...field.value, [rowId]: value })}
                    />
                )}
            />
          
            <Controller
                name="technicalSkills.developmentAreas"
                control={control}
                render={({ field }) => (
                    <div>
                        <h3 className="text-siafi-body font-bold text-gray-700">¿Áreas de desarrollo de interés?</h3>
                        <p className="text-siafi-body italic text-gray-700 mb-4">(Puedes seleccionar más de una)</p>
                        <div className="space-y-4">
                        {developmentAreas.map(area => (
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

          <Textarea
            label="Si seleccionaste 'Otro', cuéntanos más"
            placeholder="Escribe tu respuesta"
            fullWidth
            height="large"
            {...register("technicalSkills.otherSkillsDetails")}
          />
          <Textarea
            label="¿Usas algún otro lenguaje o herramienta? (Incluye nivel)"
            placeholder="Escribe tu respuesta"
            fullWidth
            height="large"
            {...register("technicalSkills.otherTools")}
          />
        </form>

        <div className="mt-8 space-y-3">
          <Button variant="primary" fullWidth onClick={handleContinue}>
            Continuar
          </Button>
          <Button variant="secondary" fullWidth onClick={() => navigate('/reclutamiento/preferencias-y-participacion')}>
            Regresar
          </Button>
        </div>
        
        <div className="flex justify-center items-center space-x-2 mt-6">
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-siafi-primary rounded-full"></div>
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
