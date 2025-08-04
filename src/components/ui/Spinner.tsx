import React from 'react';

type SpinnerSize = 'small' | 'medium' | 'large';
type SpinnerColor = 'primary' | 'secondary' | 'gray';

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'medium',
  color = 'gray',
  className = '',
}) => {
  const sizeClasses: Record<SpinnerSize, string> = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  };

  const colorClasses: Record<SpinnerColor, string> = {
    primary: 'text-siafi-primary',
    secondary: 'text-siafi-secondary',
    gray: 'text-gray-400',
  };

  const finalClasses = [
    'animate-spin',
    'inline-block',
    sizeClasses[size],
    colorClasses[color],
    className,
  ].join(' ');

  return (
    <svg
      className={finalClasses}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      role="status"
      aria-label="Cargando"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};