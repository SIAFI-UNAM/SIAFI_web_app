import React from 'react';
import siafiLogo from '../../assets/SIAFI_logo.png';

interface SiafiLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SiafiLogo: React.FC<SiafiLogoProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-auto w-36',
    md: 'h-auto w-56',
    lg: 'h-auto w-50',
  };

  return (
    <img
      src={siafiLogo}
      alt="Logo SIAFI - Sociedad de Inteligencia Artificial de la Facultad de Ingeniería"
      className={`${sizeClasses[size]} ${className} w-`}
    />
  );
};

export default SiafiLogo;
