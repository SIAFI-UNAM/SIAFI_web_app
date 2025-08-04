import React from 'react';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  color?: 'gray' | 'primary' | 'secondary';
  thickness?: 'thin' | 'medium' | 'thick';
  className?: string;
}


export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  color = 'gray',
  thickness = 'thin',
  className = ''
}) => {
  const orientationClasses = {
    horizontal: 'w-full h-0 border-t',
    vertical: 'h-full w-0 border-l'
  };

  const colorClasses = {
    gray: 'border-gray-200',
    primary: 'border-siafi-primary',
    secondary: 'border-siafi-secondary'
  };

  const thicknessClasses = {
    thin: orientation === 'horizontal' ? 'border-t' : 'border-l',
    medium: orientation === 'horizontal' ? 'border-t-2' : 'border-l-2', 
    thick: orientation === 'horizontal' ? 'border-t-4' : 'border-l-4'
  };

  return (
    <div 
      className={`${orientationClasses[orientation]} ${colorClasses[color]} ${thicknessClasses[thickness]} ${className}`}
      role="separator"
      aria-hidden="true"
    />
  );
};

export default Divider;