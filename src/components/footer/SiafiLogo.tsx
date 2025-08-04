import React from 'react';

interface SiafiLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SiafiLogo: React.FC<SiafiLogoProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-10 w-24', 
    md: 'h-15 w-37.5', 
    lg: 'h-20 w-50' 
  };

  const logoUrl = "/api/placeholder/150/60";

  return (
    <div 
      className={`${sizeClasses[size]} bg-center bg-cover bg-no-repeat shrink-0 ${className}`}
      style={{ backgroundImage: `url('${logoUrl}')` }}
      aria-label="Logo SIAFI - Sociedad de Inteligencia Artificial de la Facultad de Ingeniería"
      role="img"
    />
  );
};

export default SiafiLogo;