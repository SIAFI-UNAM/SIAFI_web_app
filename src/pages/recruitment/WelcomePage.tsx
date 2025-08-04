import { useNavigate } from "react-router-dom";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Button } from "../../components/ui";
import SiafiLogo from "../../assets/SIAFI_logo.png";
import { Footer } from "../../layouts/Footer";

export function WelcomePage() {
  const navigate = useNavigate();
  const [text] = useTypewriter({
    words: ["Tu camino en la Inteligencia Artificial comienza aquí."],
    loop: 1,
    typeSpeed: 50,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });

  const handleStart = () => {
    navigate("/reclutamiento/informacion-personal");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-grow flex flex-col items-center justify-center text-center px-6 py-16 md:py-24 bg-radial-gradient">
        <style>
          {`
            .bg-radial-gradient {
              background-image: radial-gradient(circle at center, #f0f7ff 10%, white 70%);
            }
          `}
        </style>
        <header className="mb-8">
          <img
            src={SiafiLogo}
            alt="Logo de SIAFI"
            className="w-48 h-auto mx-auto shadow-lg rounded-full"
            style={{ filter: "drop-shadow(0 0 0.75rem rgba(0, 122, 255, 0.25))" }}
          />
        </header>

        <main className="w-full max-w-2xl flex flex-col items-center">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
            <div className="text-siafi-h3 font-mono text-gray-800">
              <span>{text}</span>
              <Cursor cursorColor="#007AFF" />
            </div>
          </div>

          <p className="text-siafi-body text-gray-500 mb-10 max-w-xl mx-auto">
            Forma parte de la <strong className="text-gray-700">Sociedad de Inteligencia Artificial</strong> de la <strong className="text-gray-700">Facultad de Ingeniería</strong>, donde <strong className="text-gray-600">aprenderás</strong>, <strong className="text-gray-600">desarrollarás proyectos</strong> y <strong className="text-gray-600">crecerás</strong> con nosotros.
          </p>

          <Button
            onClick={handleStart}
            variant="primary"
            className="px-6 py-3 text-lg font-bold"
          >
            ¡Comenzar ahora!
          </Button>
        </main>
      </div>
      <Footer />
    </div>
  );
}
