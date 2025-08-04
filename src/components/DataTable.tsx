import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from './Table';
import { Badge } from './Badge';

export interface DataTableColumn<T = any> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
}

export interface DataTableProps<T = any> {
  data: T[];
  columns: DataTableColumn<T>[];
  title?: string;
  striped?: boolean;
  maxWidth?: string;
  className?: string;
  emptyText?: string;
  rowKey?: (record: T, index: number) => string;
}

export const DataTable = forwardRef<HTMLDivElement, DataTableProps>(({
  data = [],
  columns = [],
  title,
  striped = true,
  maxWidth = '1000px',
  className = '',
  emptyText = 'No hay datos disponibles',
  rowKey = (_, index) => index.toString(),
  ...props
}, ref) => {
  const gridTemplateColumns = columns.map(col => 
    col.width ? (typeof col.width === 'number' ? `${col.width}px` : col.width) : '1fr'
  ).join(' ');

  const renderCellContent = (column: DataTableColumn, record: any, index: number) => {
    if (column.render) {
      return column.render(
        column.dataIndex ? record[column.dataIndex] : record,
        record,
        index
      );
    }
    
    if (column.dataIndex) {
      return record[column.dataIndex];
    }
    
    return '';
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`} ref={ref} {...props}>
      {title && (
        <h3 className="text-siafi-h4 text-siafi-on-surface">
          {title}
        </h3>
      )}
      
      <Table maxWidth={maxWidth}>
        <TableHeader>
          <TableRow 
            isHeader 
            style={{ gridTemplateColumns }}
          >
            {columns.map((column) => (
              <TableCell
                key={column.key}
                isHeader
                align={column.align}
              >
                {column.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow style={{ gridTemplateColumns: '1fr' }}>
              <TableCell align="center">
                <span className="text-gray-500 text-siafi-body">
                  {emptyText}
                </span>
              </TableCell>
            </TableRow>
          ) : (
            data.map((record, index) => (
              <TableRow
                key={rowKey(record, index)}
                striped={striped && index % 2 === 1}
                style={{ gridTemplateColumns }}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    align={column.align}
                  >
                    {renderCellContent(column, record, index)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
});

export const createStatusBadge = (status: string, variant: 'success' | 'warning' | 'error' | 'info' = 'info') => {
  const variantMap: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
    'accepted': 'success',
    'approved': 'success',
    'completed': 'success',
    'active': 'success',
    'pending': 'warning',
    'in progress': 'warning',
    'warning': 'warning',
    'denied': 'error',
    'rejected': 'error',
    'error': 'error',
    'cancelled': 'error',
    'info': 'info',
    'draft': 'info',
  };

  const statusLower = status.toLowerCase();
  const badgeVariant = variantMap[statusLower] || variant;

  return (
    <Badge variant={badgeVariant} size="medium">
      {status}
    </Badge>
  );
};

DataTable.displayName = 'DataTable';