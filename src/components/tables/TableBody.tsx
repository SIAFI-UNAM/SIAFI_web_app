import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

export interface TableBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const TableBody = forwardRef<HTMLDivElement, TableBodyProps>(({
  children,
  className = '',
  ...props
}, ref) => {
  const bodyClasses = [
    'w-full',
    className,
  ].join(' ');

  return (
    <div
      ref={ref}
      className={bodyClasses}
      {...props}
    >
      {children}
    </div>
  );
});

TableBody.displayName = 'TableBody';