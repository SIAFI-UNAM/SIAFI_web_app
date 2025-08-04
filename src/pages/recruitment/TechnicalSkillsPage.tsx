import { MultipleChoiceTable } from "../../components/tables/MultipleChoiceTable";
import { Checkbox } from "../../components/forms/checkbox";
import { Textarea } from "../../components/forms";
import { Button } from "../../components/ui";
import { SiafiLogo } from "../../components/footer";
import { Footer } from "../../layouts";
import { useNavigate } from "react-router-dom";
import { type MultipleChoiceOption, type MultipleChoiceRow } from "../../components/tables";

const skillLevelOptions: MultipleChoiceOption[] = [
    { value: "0", label: "0" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
];

const programmingLanguagesRows: MultipleChoiceRow[] = [
  { id: "python-skill", label: "Python" },
  { id: "javascript-skill", label: "JavaScript" },
  { id: "typescript-skill", label: "TypeScript" },
  { id: "c-skill", label: "C/C++" },
  { id: "csharp-skill", label: "C#" },
  { id: "java-skill", label: "Java" },
];

const devTechRows: MultipleChoiceRow[] = [
    { id: "pytorch-skill", label: "PyTorch" },
    { id: "tensorflow-skill", label: "Tensorflow/Keras" },
    { id: "scikit-skill", label: "Scikit-Learn" },
    { id: "opencv-skill", label: "OpenCV" },
    { id: "linux-skill", label: "Linux" },
    { id: "ros-skill", label: "ROS" },
];

const microcontrollersRows: MultipleChoiceRow[] = [
    { id: "raspberry-skill", label: "Raspberry Pi" },
    { id: "esp32-skill", label: "ESP32" },
    { id: "tiva-skill", label: "Tiva" },
    { id: "tm4c-skill", label: "TM4C1294NCPDT" },
];


export function TechnicalSkillsPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-siafi-surface flex flex-col items-center justify-center min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-6">
          <SiafiLogo />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-siafi-h2 text-siafi-on-surface mb-2">
            Habilidades Técnicas
          </h1>
          <p className="text-siafi-body text-siafi-on-surface">
            Evalúa tu nivel de dominio en distintas herramientas y tecnologías. Sé honesto, esto nos ayudará a ubicarte mejor.
          </p>
        </div>

        <form className="space-y-7">
          <MultipleChoiceTable
            title="Lenguajes de Programación"
            subtitle="Nivel de habilidad: 0 = Nulo, 1 = Básico, 2 = Inicial, 3 = Intermedio, 4 = Avanzado, 5 = Dominado"
            firstColumnLabel="Lenguaje"
            options={skillLevelOptions}
            rows={programmingLanguagesRows}
          />
          <MultipleChoiceTable
            title="Tecnologías de desarrollo"
            subtitle="Nivel de habilidad: 0 = Nulo, 1 = Básico, 2 = Inicial, 3 = Intermedio, 4 = Avanzado, 5 = Dominado"
            firstColumnLabel="Tecnología"
            options={skillLevelOptions}
            rows={devTechRows}
          />
          <MultipleChoiceTable
            title="Tecnologías de Desarrollo (Microcontroladores)"
            subtitle="Nivel de habilidad: 0 = Nulo, 1 = Básico, 2 = Inicial, 3 = Intermedio, 4 = Avanzado, 5 = Dominado"
            firstColumnLabel="Tecnología"
            options={skillLevelOptions}
            rows={microcontrollersRows}
          />
          <div>
            <h3 className="text-siafi-body font-bold text-gray-700">
              ¿Tienes conocimientos o experiencia en algunas de estas áreas de desarrollo?
            </h3>
            <p className="text-siafi-body italic text-gray-700 mb-4">(Puedes seleccionar más de una opción)</p>
            <div className="space-y-4">
              <Checkbox label="Desarrollo Frontend" />
              <Checkbox label="Desarrollo Backend" />
              <Checkbox label="DevOps/MLOps/Infraestructura" />
              <Checkbox label="Desarrollo móvil" />
              <Checkbox label="Desarrollo de modelos de IA (modelos de ML o redes neuronales)" />
              <Checkbox label="Despliegue de modelos o integración de APIs de modelos del mercado" />
              <Checkbox label="Otros: _____________________________________________" />
            </div>
          </div>

          <Textarea
            label="Si seleccionaste alguna de las opciones anteriores, cuéntanos más a detalle: (Tecnologías que has usado, proyectos en los que has participado, frameworks o herramientas que manejas, etc.)"
            placeholder="Escribe tu respuesta"
            fullWidth
            height="large"
          />
          <Textarea
            label="¿Usas algún otro lenguaje o herramienta de desarrollo? Incluye el nombre y tu nivel de dominio."
            placeholder="Escribe tu respuesta"
            fullWidth
            height="large"
          />
        </form>

        <div className="mt-8 space-y-3">
          <Button variant="primary" fullWidth onClick={() => navigate('/reclutamiento/experiencia-y-trayectoria')}>
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
