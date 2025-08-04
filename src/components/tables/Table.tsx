import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  maxWidth?: string;
  fullWidth?: boolean;
}

export const Table = forwardRef<HTMLDivElement, TableProps>(({
  children,
  maxWidth = '1000px',
  fullWidth = true,
  className = '',
  ...props
}, ref) => {
  const tableClasses = [
    'box-border',
    'content-stretch',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'overflow-clip',
    'p-0',
    'relative',
    'rounded',
    'shrink-0',
    fullWidth ? 'w-full' : 'w-auto',
    className,
  ].join(' ');

  const style = {
    maxWidth: fullWidth ? maxWidth : 'auto',
    ...props.style,
  };

  return (
    <div
      ref={ref}
      className={tableClasses}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
});

Table.displayName = 'Table';