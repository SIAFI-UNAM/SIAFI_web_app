import React from 'react';
import { RadioButton } from './RadioButton';

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