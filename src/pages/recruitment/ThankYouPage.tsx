import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Button } from "../../components/ui";
import { CheckCircleIcon } from "../../components/icons";
import SiafiLogo from "../../assets/SIAFI_logo.png";
import { Footer } from "../../layouts/Footer";
import { useRecruitmentForm } from "../../context/FormContext";
import { getInitialState } from "../../context/initialState";

export function ThankYouPage() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const { reset } = useRecruitmentForm();

  useEffect(() => {
    reset(getInitialState());
    localStorage.removeItem('formData');
  }, [reset]);

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={200}
        gravity={0.1}
      />
      <div className="flex-grow flex flex-col items-center justify-center text-center p-6 bg-radial-gradient">
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
            className="w-32 h-auto mx-auto"
            style={{ filter: "drop-shadow(0 0 0.5rem rgba(0, 122, 255, 0.2))" }}
          />
        </header>

        <main className="w-full max-w-lg flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01]
            }}
          >
            <CheckCircleIcon className="w-24 h-24 text-siafi-success mx-auto mb-6" />
          </motion.div>

          <motion.h1 
            className="text-siafi-h1 text-siafi-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            ¡Gracias por registrarte!
          </motion.h1>

          <motion.p 
            className="text-siafi-body text-gray-500 mb-10 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Nos pondremos en contacto contigo pronto. Revisa tu correo electrónico y sigue nuestras redes sociales para mantenerte al día.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <Button
              onClick={handleRedirect}
              variant="secondary"
              className="px-6 py-3 text-lg font-bold"
            >
              Volver al inicio
            </Button>
          </motion.div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
