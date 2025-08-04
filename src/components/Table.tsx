import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  maxWidth?: string;
  fullWidth?: boolean;
}

export interface TableHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface TableBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface TableRowProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isHeader?: boolean;
  striped?: boolean;
}

export interface TableCellProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isHeader?: boolean;
  align?: 'left' | 'center' | 'right';
  gridColumn?: number;
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

Table.displayName = 'Table';
TableHeader.displayName = 'TableHeader';
TableBody.displayName = 'TableBody';
TableRow.displayName = 'TableRow';
TableCell.displayName = 'TableCell';