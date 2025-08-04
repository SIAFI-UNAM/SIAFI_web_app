import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { RadioIcon } from './RadioIcon';

export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
}

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(({
  label,
  className = '',
  containerClassName = '',
  labelClassName = '',
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
    'gap-3',
    'items-center',
    'justify-start',
    'relative',
    containerClassName,
  ].join(' ');

  const radioClasses = [
    'relative',
    'shrink-0',
    'size-4',
    'rounded-full',
    'transition-all',
    'duration-200',
    'ease-in-out',
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
    'font-siafi-inter',
    'text-siafi-body',
    'text-gray-900',
    'cursor-pointer',
    'select-none',
    disabled ? 'cursor-not-allowed opacity-50' : '',
    labelClassName,
  ].filter(Boolean).join(' ');

  const getRadioStyle = () => {
    if (checked) {
      return {
        backgroundColor: '#ffffff',
        borderColor: 'var(--color-primary)',
        borderWidth: '2px',
      };
    }
    return {
      backgroundColor: '#ffffff',
      borderColor: disabled ? '#d1d5db' : '#d1d5db',
      borderWidth: '2px',
    };
  };

  return (
    <div className={containerClasses}>
      <div className={radioClasses}>
        <input
          ref={ref}
          id={inputId}
          type="radio"
          className={`${inputClasses} ${className}`}
          disabled={disabled}
          checked={checked}
          {...props}
        />
        
        <div
          className="absolute inset-0 rounded-full border-solid flex items-center justify-center transition-all duration-200 pointer-events-none"
          style={getRadioStyle()}
          aria-hidden="true"
        >
          <RadioIcon checked={!!checked} />
        </div>
      </div>
      
      {label && (
        <label 
          htmlFor={inputId}
          className={labelClasses}
        >
          {label}
        </label>
      )}
    </div>
  );
});

RadioButton.displayName = 'RadioButton';