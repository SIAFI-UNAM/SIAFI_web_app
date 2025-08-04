import React from 'react';
import { SiafiLogo } from '../components/footer/SiafiLogo';
import unamLogo from '../assets/UNAM_logo.svg';
import fiLogo from '../assets/FI_logo.png';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ 
  className = ''
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className={`bg-siafi-surface border-t border-gray-200 mt-auto ${className}`}
      role="contentinfo"
      aria-label="Pie de página"
    >
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-0 items-center justify-between">
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-4 items-center">
            <SiafiLogo size="sm" />
            
            <p className="hidden md:block text-siafi-caption text-siafi-on-surface leading-tight max-w-lg">
              ©{currentYear} SIAFI: Sociedad de Inteligencia Artificial de la Facultad de Ingeniería - UNAM
            </p>
          </div>
          
          <div className="flex gap-5 items-center">
            <a href="https://instagram.com/siafi_unam" target="_blank" rel="noopener noreferrer" 
               className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded hover:from-purple-600 hover:to-pink-600 transition-all duration-200 focus:ring-2 focus:ring-siafi-primary" 
               aria-label="Síguenos en Instagram">
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://facebook.com/siafi_unam" target="_blank" rel="noopener noreferrer"
               className="w-6 h-6 bg-blue-600 rounded hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-siafi-primary" 
               aria-label="Síguenos en Facebook">
              <span className="sr-only">Facebook</span>
            </a>
            <a href="https://tiktok.com/@siafi_unam" target="_blank" rel="noopener noreferrer"
               className="w-6 h-6 bg-black rounded hover:bg-gray-800 transition-colors duration-200 focus:ring-2 focus:ring-siafi-primary" 
               aria-label="Síguenos en TikTok">
              <span className="sr-only">TikTok</span>
            </a>
          </div>
        </div>

        <div className="block md:hidden w-full text-center mt-6">
          <p className="text-siafi-caption text-siafi-on-surface leading-tight px-4">
            ©{currentYear} SIAFI: Sociedad de Inteligencia Artificial de la Facultad de Ingeniería - UNAM
          </p>
        </div>
        
        <div className="flex gap-3 items-center justify-center md:justify-start mt-14">
          <img 
            src={unamLogo} 
            alt="Logo UNAM" 
            className="w-[76px] h-auto"
            title="Escudo de la Universidad Nacional Autónoma de México"
          />
          <img 
            src={fiLogo} 
            alt="Logo Facultad de Ingeniería" 
            className="w-[74px] h-auto"
            title="Logo de la Facultad de Ingeniería UNAM"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;