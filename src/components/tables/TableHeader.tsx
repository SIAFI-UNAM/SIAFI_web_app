import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

export interface TableHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const TableHeader = forwardRef<HTMLDivElement, TableHeaderProps>(({
  children,
  className = '',
  ...props
}, ref) => {
  const headerClasses = [
    'bg-gray-100',
    'box-border',
    'font-semibold',
    'text-siafi-body',
    'text-gray-900',
    'w-full',
    className,
  ].join(' ');

  return (
    <div
      ref={ref}
      className={headerClasses}
      {...props}
    >
      {children}
    </div>
  );
});

TableHeader.displayName = 'TableHeader';