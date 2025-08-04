import React from 'react';

export interface RadioIconProps {
  checked: boolean;
}

export const RadioIcon: React.FC<RadioIconProps> = ({ checked }) => (
  <div className="relative w-full h-full">
    {checked && (
      <div
        className="absolute inset-1 rounded-full"
        style={{ backgroundColor: 'var(--color-primary)' }}
      />
    )}
  </div>
);