import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

export interface TableRowProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isHeader?: boolean;
  striped?: boolean;
}

export const TableRow = forwardRef<HTMLDivElement, TableRowProps>(({
  children,
  isHeader = false,
  striped = false,
  className = '',
  ...props
}, ref) => {
  const rowClasses = [
    'box-border',
    'gap-2.5',
    'grid',
    'h-[50px]',
    'p-4',
    'relative',
    'shrink-0',
    'w-full',
    isHeader 
      ? 'bg-gray-100 font-semibold text-siafi-body text-gray-900 rounded-tl-[4px] rounded-tr-[4px]'
      : striped 
        ? 'bg-gray-100' 
        : 'bg-white',
    !isHeader && 'text-siafi-body text-gray-900 font-normal',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={rowClasses}
      {...props}
    >
      {children}
    </div>
  );
});

TableRow.displayName = 'TableRow';