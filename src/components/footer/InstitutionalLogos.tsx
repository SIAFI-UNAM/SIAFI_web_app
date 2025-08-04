import React from 'react';

interface InstitutionalLogosProps {
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  alignment?: 'left' | 'center' | 'right';
  className?: string;
}

export const InstitutionalLogos: React.FC<InstitutionalLogosProps> = ({
  orientation = 'horizontal',
  size = 'md',
  alignment = 'left',
  className = ''
}) => {
  const containerClass = orientation === 'horizontal' ? 'flex-row' : 'flex-col';
  
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center', 
    right: 'justify-end'
  };

  const sizeClasses = {
    sm: {
      unam: 'h-16 w-14', 
      ingenieria: 'h-18 w-14' 
    },
    md: {
      unam: 'h-21 w-19',  
      ingenieria: 'h-24 w-19' 
    },
    lg: {
      unam: 'h-28 w-25', 
      ingenieria: 'h-32 w-26' 
    }
  };

  const logoUrls = {
    unam: "/api/placeholder/76/85",
    ingenieria: "/api/placeholder/78/97"
  };

  const logos = [
    {
      name: 'UNAM',
      url: logoUrls.unam,
      sizeClass: sizeClasses[size].unam,
      alt: 'Escudo de la Universidad Nacional Autónoma de México'
    },
    {
      name: 'Ingeniería',
      url: logoUrls.ingenieria, 
      sizeClass: sizeClasses[size].ingenieria,
      alt: 'Logo de la Facultad de Ingeniería UNAM'
    }
  ];

  return (
    <div 
      className={`box-border content-stretch flex ${containerClass} gap-2.5 items-center ${alignmentClasses[alignment]} p-0 relative shrink-0 ${className}`}
      role="img"
      aria-label="Logos institucionales de UNAM y Facultad de Ingeniería"
    >
      {logos.map((logo, index) => (
        <div
          key={index}
          className={`${logo.sizeClass} bg-center bg-cover bg-no-repeat shrink-0`}
          style={{ backgroundImage: `url('${logo.url}')` }}
          role="img"
          aria-label={logo.alt}
          title={logo.alt}
        />
      ))}
    </div>
  );
};

export default InstitutionalLogos;