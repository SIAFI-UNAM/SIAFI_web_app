import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { CheckIcon } from './CheckIcon';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
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
    'gap-2',
    'items-start',
    'justify-start',
    'relative',
    containerClassName,
  ].join(' ');

  const checkboxClasses = [
    'relative',
    'shrink-0',
    'size-5',
    'rounded',
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

  const getCheckboxStyle = () => {
    if (checked) {
      return {
        backgroundColor: 'var(--color-primary)',
        borderColor: 'var(--color-primary)',
      };
    }
    return {
      backgroundColor: '#ffffff',
      borderColor: disabled ? '#d1d5db' : '#d1d5db',
    };
  };

  return (
    <div className={containerClasses}>
      <div className={checkboxClasses}>
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
          className="absolute inset-0 rounded border-2 border-solid flex items-center justify-center transition-all duration-200 pointer-events-none"
          style={getCheckboxStyle()}
          aria-hidden="true"
        >
          {checked && <CheckIcon />}
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

Checkbox.displayName = 'Checkbox';