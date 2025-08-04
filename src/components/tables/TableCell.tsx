import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

export interface TableCellProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isHeader?: boolean;
  align?: 'left' | 'center' | 'right';
  gridColumn?: number;
}

export const TableCell = forwardRef<HTMLDivElement, TableCellProps>(({
  children,
  isHeader = false,
  align = 'left',
  gridColumn,
  className = '',
  ...props
}, ref) => {
  const alignClasses = {
    left: 'text-left justify-start',
    center: 'text-center justify-center place-self-center',
    right: 'text-right justify-end',
  };

  const cellClasses = [
    'flex',
    'items-center',
    'relative',
    'shrink-0',
    isHeader ? 'font-semibold' : 'font-normal',
    alignClasses[align],
    className,
  ].join(' ');

  const style = gridColumn ? { gridColumn: `${gridColumn}` } : {};

  return (
    <div
      ref={ref}
      className={cellClasses}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
});

TableCell.displayName = 'TableCell';