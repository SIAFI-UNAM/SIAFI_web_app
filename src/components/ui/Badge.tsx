import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default';
type BadgeSize = 'small' | 'medium';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({
  variant = 'default',
  size = 'medium',
  children,
  className = '',
  ...props
}, ref) => {
  const baseClasses = [
    'box-border',
    'content-stretch',
    'flex',
    'flex-row',
    'gap-2.5',
    'items-center',
    'justify-center',
    'relative',
    'rounded-[20px]',
    'shrink-0',
    'text-siafi-caption',
    'font-normal',
    'transition-all',
    'duration-200',
    'ease-in-out',
  ].join(' ');

  const sizeClasses = {
    small: 'px-2 py-0.5 text-[10px]',
    medium: 'px-3 py-1 text-[12px]',
  };

  const variantClasses = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-600', 
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    default: 'bg-gray-100 text-gray-700',
  };

  const finalClasses = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className,
  ].join(' ');

  return (
    <span
      ref={ref}
      className={finalClasses}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';