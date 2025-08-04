import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';

export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
}

export interface RadioGroupProps {
  title?: string;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  className?: string;
  titleClassName?: string;
}

const RadioIcon: React.FC<{ checked: boolean }> = ({ checked }) => (
  <div className="relative w-full h-full">
    {checked && (
      <div
        className="absolute inset-1 rounded-full"
        style={{ backgroundColor: 'var(--color-primary)' }}
      />
    )}
  </div>
);

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

export const RadioGroup: React.FC<RadioGroupProps> = ({
  title,
  name,
  value,
  onChange,
  options,
  className = '',
  titleClassName = '',
}) => {
  const containerClasses = [
    'box-border',
    'content-stretch',
    'flex',
    'flex-col',
    'gap-3',
    'items-start',
    'justify-start',
    className,
  ].join(' ');

  const titleClasses = [
    'font-bold',
    'text-siafi-body',
    'text-gray-700',
    titleClassName,
  ].join(' ');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={containerClasses}>
      {title && (
        <div className={titleClasses}>
          {title}
        </div>
      )}
      
      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <RadioButton
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            checked={value === option.value}
            disabled={option.disabled}
            onChange={handleChange}
          />
        ))}
      </div>
    </div>
  );
};