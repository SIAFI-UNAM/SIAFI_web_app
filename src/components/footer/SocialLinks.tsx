import React from 'react';

interface SocialLinksProps {
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  orientation = 'horizontal',
  size = 'md',
  className = ''
}) => {
  const containerClass = orientation === 'horizontal' ? 'flex-row' : 'flex-col';
  
  const sizeClasses = {
    sm: 'size-5', 
    md: 'size-6',  
    lg: 'size-8'  
  };

  const iconSize = sizeClasses[size];

  const socialIcons = {
    instagram: "/api/placeholder/24/24",
    facebook: "/api/placeholder/24/24", 
    tiktok: "/api/placeholder/24/24"
  };

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/siafi_unam',
      icon: socialIcons.instagram,
      ariaLabel: 'Síguenos en Instagram'
    },
    {
      name: 'Facebook', 
      url: 'https://facebook.com/siafi_unam',
      icon: socialIcons.facebook,
      ariaLabel: 'Síguenos en Facebook'
    },
    {
      name: 'TikTok',
      url: 'https://tiktok.com/@siafi_unam', 
      icon: socialIcons.tiktok,
      ariaLabel: 'Síguenos en TikTok'
    }
  ];

  return (
    <div 
      className={`box-border content-stretch flex ${containerClass} gap-5 items-center justify-start p-0 relative shrink-0 ${className}`}
      role="navigation"
      aria-label="Enlaces de redes sociales"
    >
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconSize} bg-center bg-cover bg-no-repeat shrink-0 hover:opacity-80 transition-opacity duration-200 focus:opacity-80 focus:outline-none focus:ring-2 focus:ring-siafi-primary focus:ring-offset-2 rounded`}
          style={{ backgroundImage: `url('${social.icon}')` }}
          aria-label={social.ariaLabel}
          title={social.ariaLabel}
        />
      ))}
    </div>
  );
};

export default SocialLinks;