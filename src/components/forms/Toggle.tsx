import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  labelPosition?: 'left' | 'right';
  containerClassName?: string;
  labelClassName?: string;
  size?: 'medium';
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(({
  label,
  labelPosition = 'left',
  className = '',
  containerClassName = '',
  labelClassName = '',
  size = 'medium',
  disabled = false,
  checked,
  id,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  const containerClasses = [
    'box-border',
    'content-stretch',
    'flex',
    'flex-row',
    'items-center',
    'relative',
    labelPosition === 'left' ? 'justify-between' : 'justify-start gap-3',
    containerClassName,
  ].join(' ');

  const toggleClasses = [
    'relative',
    'transition-all',
    'duration-300',
    'ease-in-out',
    'rounded-full',
    'shrink-0',
    size === 'medium' ? 'h-6 w-11' : 'h-6 w-11',
    disabled ? 'cursor-not-allowed opacity-50' : '',
  ].filter(Boolean).join(' ');

  const inputClasses = [
    'absolute',
    'opacity-0',
    'w-full',
    'h-full',
    'cursor-pointer',
    disabled ? 'cursor-not-allowed' : '',
  ].filter(Boolean).join(' ');

  const labelClasses = [
    'font-bold',
    'text-siafi-body',
    'text-gray-700',
    'cursor-pointer',
    'select-none',
    disabled ? 'cursor-not-allowed opacity-50' : '',
    labelClassName,
  ].filter(Boolean).join(' ');

  const thumbClasses = [
    'absolute',
    'top-0.5',
    'size-5',
    'bg-white',
    'rounded-full',
    'transition-all',
    'duration-300',
    'ease-in-out',
    'shadow-sm',
    'pointer-events-none',
    checked ? 'translate-x-5' : 'translate-x-0.5',
  ].join(' ');

  const getToggleStyle = () => {
    if (disabled) {
      return {
        backgroundColor: '#e5e7eb',
      };
    }
    if (checked) {
      return {
        backgroundColor: 'var(--color-primary)',
      };
    }
    return {
      backgroundColor: '#d1d5db',
    };
  };

  const toggleElement = (
    <div className={toggleClasses}>
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        className={`${inputClasses} ${className}`}
        disabled={disabled}
        checked={checked}
        {...props}
      />
      
      <div
        className="absolute inset-0 rounded-full transition-all duration-300 pointer-events-none"
        style={getToggleStyle()}
        aria-hidden="true"
      />
      
      <div className={thumbClasses} aria-hidden="true" />
    </div>
  );

  const labelElement = label && (
    <label 
      htmlFor={inputId}
      className={labelClasses}
    >
      {label}
    </label>
  );

  return (
    <div className={containerClasses}>
      {labelPosition === 'left' && labelElement}
      {toggleElement}
      {labelPosition === 'right' && labelElement}
    </div>
  );
});

Toggle.displayName = 'Toggle';