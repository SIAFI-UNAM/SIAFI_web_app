import { useNavigate } from "react-router-dom";
import { useFormContext, Controller } from "react-hook-form";
import { useEffect } from "react";
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
  { id: "skill_python", label: "Python" }, { id: "skill_javascript", label: "JavaScript" },
  { id: "skill_c", label: "C" }, { id: "skill_cpp", label: "C++" },
  { id: "skill_csharp", label: "C#" }, { id: "skill_java", label: "Java" },
];

const devTechRows: MultipleChoiceRow[] = [
    { id: "skill_pytorch", label: "PyTorch" }, { id: "skill_tensorflow_keras", label: "Tensorflow/Keras" },
    { id: "skill_scikit_learn", label: "Scikit-Learn" }, { id: "skill_opencv", label: "OpenCV" },
    { id: "skill_linux", label: "Linux" }, { id: "skill_ros_docker", label: "ROS/Docker" },
];

const microcontrollersRows: MultipleChoiceRow[] = [
    { id: "skill_raspberry", label: "Raspberry Pi" }, { id: "skill_esp32", label: "ESP32" },
    { id: "skill_tiva", label: "Tiva" }, { id: "skill_arduino", label: "Arduino" },
];

const developmentAreasOptions = [
    { id: "desarrollo_frontend", label: "Desarrollo Frontend" }, 
    { id: "desarrollo_backend", label: "Desarrollo Backend" }, 
    { id: "devops_mlops_infraestructura", label: "DevOps/MLOps/Infraestructura" },
    { id: "desarrollo_movil", label: "Desarrollo móvil" }, 
    { id: "desarrollo_modelos_ia", label: "Desarrollo de modelos de IA (modelos de ML o redes neuronales)" },
    { id: "despliegue_modelos_integracion", label: "Despliegue de modelos o integración de APIs de modelos del mercado" }, 
    { id: "otros", label: "Otro" }
];

export function TechnicalSkillsPage() {
  const navigate = useNavigate();
  const { register, control, getValues, setValue, watch, trigger, formState: { errors } } = useFormContext<FormState>();

  const skillFieldsToWatch = [
    ...programmingLanguagesRows.map(r => r.id),
    ...devTechRows.map(r => r.id),
    ...microcontrollersRows.map(r => r.id)
  ] as (keyof FormState)[];

  useEffect(() => {
    skillFieldsToWatch.forEach(fieldName => {
        register(fieldName, { required: "Debes seleccionar un nivel para cada habilidad." });
    });
  }, [register, skillFieldsToWatch]);

  watch(skillFieldsToWatch);

  const handleContinue = async () => {
    const isValid = await trigger(skillFieldsToWatch);
    if (isValid) {
        navigate('/reclutamiento/experiencia-y-trayectoria');
    }
  };
  
  const handleTableChange = (id: string, value: string) => {
    setValue(id as keyof FormState, parseInt(value, 10), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const skillErrors = skillFieldsToWatch.some(field => errors[field]);
  
  const getSelectedValue = (id: keyof FormState) => {
    const value = getValues(id);
    return value === null || value === undefined ? undefined : String(value);
  }

  return (
    <div className="bg-siafi-surface flex flex-col items-center justify-center min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-6"><SiafiLogo /></div>
        <div className="text-center mb-6">
          <h1 className="text-siafi-h2 text-siafi-on-surface mb-2">Habilidades Técnicas</h1>
          <p className="text-siafi-body text-siafi-on-surface">
            Evalúa tu nivel de dominio. Sé honesto, esto nos ayudará a ubicarte mejor.
          </p>
        </div>

        <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
          <MultipleChoiceTable
            title="Lenguajes de Programación"
            subtitle="Nivel de habilidad: 0 = Nulo, 1 = Básico, 2 = Inicial, 3 = Intermedio, 4 = Avanzado, 5 = Dominado"
            firstColumnLabel="Lenguaje"
            options={skillLevelOptions}
            rows={programmingLanguagesRows.map(r => ({ ...r, selectedValue: getSelectedValue(r.id as keyof FormState) }))}
            onChange={(rowId, selectedValue) => handleTableChange(rowId, String(selectedValue))}
          />

          <MultipleChoiceTable
            title="Tecnologías de desarrollo"
            subtitle="Nivel de habilidad: 0 = Nulo, 1 = Básico, 2 = Inicial, 3 = Intermedio, 4 = Avanzado, 5 = Dominado"
            firstColumnLabel="Tecnología"
            options={skillLevelOptions}
            rows={devTechRows.map(r => ({ ...r, selectedValue: getSelectedValue(r.id as keyof FormState) }))}
            onChange={(rowId, selectedValue) => handleTableChange(rowId, String(selectedValue))}
          />
          
          <MultipleChoiceTable
            title="Microcontroladores"
            subtitle="Nivel de habilidad: 0 = Nulo, 1 = Básico, 2 = Inicial, 3 = Intermedio, 4 = Avanzado, 5 = Dominado"
            firstColumnLabel="Tecnología"
            options={skillLevelOptions}
            rows={microcontrollersRows.map(r => ({ ...r, selectedValue: getSelectedValue(r.id as keyof FormState) }))}
            onChange={(rowId, selectedValue) => handleTableChange(rowId, String(selectedValue))}
          />
          {skillErrors && <p className="text-red-500 text-sm mt-1 -translate-y-4 text-center">Debes seleccionar un nivel para cada habilidad en las tablas.</p>}

          <Controller
              name="development_areas"
              control={control}
              render={({ field }) => (
                  <div>
                      <h3 className="text-siafi-body-bold font-bold text-gray-700">¿Áreas de desarrollo de interés? (Opcional)</h3>
                      <p className="font-normal italic text-gray-700 mb-4">(Puedes seleccionar más de una)</p>
                      <div className="space-y-4">
                      {developmentAreasOptions.map(area => (
                          <Checkbox
                          key={area.id}
                          label={area.label}
                          checked={field.value?.includes(area.id) ?? false}
                          onChange={() => {
                              const currentAreas = field.value || [];
                              const newAreas = currentAreas.includes(area.id)
                              ? currentAreas.filter((a: string) => a !== area.id)
                              : [...currentAreas, area.id];
                              field.onChange(newAreas);
                          }}
                          />
                      ))}
                      </div>
                  </div>
              )}
          />

          <Textarea
            label="Si en las áreas de desarrollo seleccionaste 'Otro', cuéntanos más (Opcional)"
            placeholder="Escribe tu respuesta"
            fullWidth
            height="large"
            {...register("other_skills_text", {
                maxLength: { value: 1000, message: "No exceder 1000 caracteres." }
            })}
          />
           {errors.other_skills_text && <p className="text-red-500 text-sm mt-1">{errors.other_skills_text.message}</p>}
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
