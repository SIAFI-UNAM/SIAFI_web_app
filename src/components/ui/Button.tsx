import React from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { Spinner } from './Spinner';

type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'medium';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  children,
  onClick,
  type = 'button',
  className = '',
  fullWidth = false,
}) => {
  const isDisabled = disabled || loading;

  const baseClasses = [
    'box-border',
    'content-stretch', 
    'flex',
    'flex-row',
    'gap-2.5',
    'items-center',
    'justify-center',
    'relative',
    'rounded',
    'transition-all',
    'duration-200',
    'ease-in-out',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'text-siafi-body-medium',
  ].join(' ');

  const sizeClasses: Record<ButtonSize, string> = {
    medium: 'px-4 py-3',
  };

  const variantClasses: Record<ButtonVariant, {
    normal: string;
    hover: string;
    disabled: string;
    loading: string;
  }> = {
    primary: {
      normal: 'bg-siafi-primary text-white focus:ring-siafi-primary cursor-pointer',
      hover: 'hover:bg-siafi-primary-hover hover:transform hover:scale-[1.02] active:scale-[0.98]',
      disabled: 'bg-siafi-primary/50 text-white cursor-not-allowed',
      loading: 'bg-gray-100 text-gray-500 cursor-not-allowed',
    },
    secondary: {
      normal: 'bg-siafi-background text-siafi-primary border border-siafi-primary focus:ring-siafi-primary cursor-pointer',
      hover: 'hover:bg-gray-100 hover:border-siafi-primary-hover hover:text-siafi-primary-hover hover:transform hover:scale-[1.02] active:scale-[0.98]',
      disabled: 'bg-siafi-background text-siafi-primary/50 border-siafi-primary/50 cursor-not-allowed',
      loading: 'bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed',
    },
    danger: {
      normal: 'bg-siafi-danger text-white focus:ring-siafi-danger cursor-pointer',
      hover: 'hover:bg-siafi-danger-hover hover:transform hover:scale-[1.02] active:scale-[0.98]',
      disabled: 'bg-siafi-danger/50 text-white cursor-not-allowed',
      loading: 'bg-gray-100 text-gray-500 cursor-not-allowed',
    },
  };

  const getStateClasses = () => {
    if (loading) return variantClasses[variant].loading;
    if (disabled) return variantClasses[variant].disabled;
    return `${variantClasses[variant].normal} ${variantClasses[variant].hover}`;
  };

  const widthClasses = fullWidth ? 'w-full' : 'shrink-0';

  const finalClasses = [
    baseClasses,
    sizeClasses[size],
    getStateClasses(),
    widthClasses,
    className,
  ].join(' ');

  const handleClick = () => {
    if (!isDisabled && onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      className={finalClasses}
      onClick={handleClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
    >
      {loading && <Spinner size="small" />}
      {!loading && children}
    </button>
  );
};