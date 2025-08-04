import React, { useState, forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

type InputVariant = 'default' | 'error';
type InputSize = 'medium';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  helpText?: string;
  error?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  containerClassName?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = 'default',
  size = 'medium',
  label,
  helpText,
  error,
  leadingIcon,
  trailingIcon,
  className = '',
  containerClassName = '',
  fullWidth = true,
  disabled = false,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const isError = variant === 'error' || !!error;

  const containerClasses = [
    'box-border',
    'content-stretch',
    'flex',
    'flex-col',
    'gap-3',
    'items-start',
    'justify-start',
    'relative',
    fullWidth ? 'w-full' : 'shrink-0',
    containerClassName,
  ].join(' ');

  const inputContainerClasses = [
    'bg-gray-50',
    'box-border',
    'content-stretch',
    'flex',
    'flex-row',
    'items-center',
    'relative',
    'rounded',
    'transition-all',
    'duration-200',
    'ease-in-out',
    fullWidth ? 'w-full' : 'w-[408px]',
    leadingIcon && trailingIcon ? 'justify-between px-4 py-3' :
    leadingIcon ? 'gap-2.5 justify-start px-4 py-3' :
    trailingIcon ? 'justify-between px-4 py-3' :
    'gap-2.5 justify-start px-4 py-3',
  ].join(' ');

  const getBorderClasses = () => {
    if (disabled) return 'border-gray-200';
    if (isError) return 'border-red-500';
    if (isFocused) return 'border-siafi-primary border-2';
    return 'border-gray-300';
  };

  const inputClasses = [
    'bg-transparent',
    'border-0',
    'flex-1',
    'font-siafi-inter',
    'text-siafi-body',
    'outline-none',
    'placeholder:text-gray-300',
    disabled ? 'cursor-not-allowed text-gray-400' : 'text-gray-900',
  ].filter(Boolean).join(' ');

  const labelClasses = [
    'text-siafi-body-bold',
    'text-gray-700',
  ].join(' ');

  const helpTextClasses = [
    'text-siafi-caption',
    isError ? 'text-red-500' : 'text-gray-700',
  ].join(' ');

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(e);
  };

  return (
    <div className={containerClasses}>
      {label && (
        <label className={labelClasses}>
          {label}
        </label>
      )}
      
      <div className={inputContainerClasses}>
        <div
          aria-hidden="true"
          className={`absolute border border-solid inset-0 pointer-events-none rounded ${getBorderClasses()}`}
        />
        
        {leadingIcon && (
          <div className="relative shrink-0 size-6 text-gray-400">
            {leadingIcon}
          </div>
        )}
        
        <input
          ref={ref}
          className={`${inputClasses} ${className}`}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        
        {trailingIcon && (
          <div className="relative shrink-0 size-6 text-gray-400">
            {trailingIcon}
          </div>
        )}
      </div>
      
      {(helpText || error) && (
        <p className={helpTextClasses}>
          {error || helpText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';