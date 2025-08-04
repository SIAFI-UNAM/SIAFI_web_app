import React, { useState, forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';

type TextareaVariant = 'default' | 'error';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextareaVariant;
  label?: string;
  helpText?: string;
  error?: string;
  containerClassName?: string;
  fullWidth?: boolean;
  height?: 'medium' | 'large';
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  variant = 'default',
  label,
  helpText,
  error,
  className = '',
  containerClassName = '',
  fullWidth = true,
  height = 'medium',
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
    'gap-2',
    'items-start',
    'justify-start',
    'relative',
    fullWidth ? 'w-full' : 'shrink-0',
    containerClassName,
  ].join(' ');

  const textareaContainerClasses = [
    'bg-gray-50',
    'box-border',
    'content-stretch',
    'flex',
    'flex-row',
    'gap-2.5',
    'items-start',
    'justify-start',
    'px-4',
    'py-3',
    'relative',
    'rounded',
    'transition-all',
    'duration-200',
    'ease-in-out',
    height === 'large' ? 'h-32' : 'h-24',
    fullWidth ? 'w-full' : 'w-[408px]',
  ].join(' ');

  const getBorderClasses = () => {
    if (disabled) return 'border-gray-200';
    if (isError) return 'border-red-500';
    if (isFocused) return 'border-siafi-primary border-2';
    return 'border-gray-300';
  };

  const textareaClasses = [
    'bg-transparent',
    'border-0',
    'flex-1',
    'font-siafi-inter',
    'text-siafi-body',
    'outline-none',
    'placeholder:text-gray-300',
    'resize-none',
    'w-full',
    'h-full',
    disabled ? 'cursor-not-allowed text-gray-400' : 'text-gray-900',
  ].filter(Boolean).join(' ');

  const labelClasses = [
    'font-bold',
    'text-siafi-body',
    'text-gray-700',
    fullWidth ? 'w-full' : 'w-[408px]',
  ].join(' ');

  const helpTextClasses = [
    'text-siafi-caption',
    isError ? 'text-red-500' : 'text-gray-700',
  ].join(' ');

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  return (
    <div className={containerClasses}>
      {label && (
        <label className={labelClasses}>
          {label}
        </label>
      )}
      
      <div className={textareaContainerClasses}>
        <div
          aria-hidden="true"
          className={`absolute border border-solid inset-0 pointer-events-none rounded ${getBorderClasses()}`}
        />
        
        {/* Textarea */}
        <textarea
          ref={ref}
          className={`${textareaClasses} ${className}`}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </div>
      
      {(helpText || error) && (
        <p className={helpTextClasses}>
          {error || helpText}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';