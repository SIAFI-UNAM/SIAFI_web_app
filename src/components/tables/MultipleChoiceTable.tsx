import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { Table } from './Table';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { TableRow } from './TableRow';
import { TableCell } from './TableCell';
import { RadioButton } from '../forms';

export interface MultipleChoiceOption {
  value: string | number;
  label: string;
}

export interface MultipleChoiceRow {
  id: string;
  label: string;
  selectedValue?: string | number;
  disabled?: boolean;
}

export interface MultipleChoiceTableProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  title?: string;
  subtitle?: string;
  options: MultipleChoiceOption[];
  rows: MultipleChoiceRow[];
  onChange?: (rowId: string, selectedValue: string | number) => void;
  firstColumnLabel?: string;
  maxWidth?: string;
  striped?: boolean;
}

export const MultipleChoiceTable = forwardRef<HTMLDivElement, MultipleChoiceTableProps>(({
  title,
  subtitle,
  options = [],
  rows = [],
  onChange,
  firstColumnLabel = 'Item',
  maxWidth = '1000px',
  striped = true,
  className = '',
  ...props
}, ref) => {
  const totalColumns = options.length + 1;
  const gridTemplateColumns = `2fr ${Array(options.length).fill('1fr').join(' ')}`;

  const handleSelectionChange = (rowId: string, value: string) => {
    if (onChange) {
      const option = options.find(opt => opt.value.toString() === value);
      if (option) {
        onChange(rowId, option.value);
      }
    }
  };

  return (
    <div 
      ref={ref}
      className={`box-border content-stretch flex flex-col gap-[18px] items-start justify-start pb-3 pt-0 px-0 relative shrink-0 w-full ${className}`}
      {...props}
    >
      {(title || subtitle) && (
        <div className="w-full">
          {title && (
            <h3 className="text-siafi-body-bold font-bold text-gray-700 mb-0">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="font-normal italic text-gray-700 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <Table maxWidth={maxWidth}>
        <TableHeader>
          <TableRow 
            isHeader 
            style={{ gridTemplateColumns }}
          >
            <TableCell isHeader align="left">
              {firstColumnLabel}
            </TableCell>
            
            {options.map((option) => (
              <TableCell
                key={option.value}
                isHeader
                align="center"
              >
                {option.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow style={{ gridTemplateColumns: '1fr' }}>
              <TableCell align="center">
                <span className="text-gray-500 text-siafi-body">
                  No hay elementos disponibles
                </span>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, index) => (
              <TableRow
                key={row.id}
                striped={striped && index % 2 === 1}
                style={{ gridTemplateColumns }}
              >
                <TableCell align="left">
                  <span className="text-siafi-body text-gray-900">
                    {row.label}
                  </span>
                </TableCell>
                
                {options.map((option) => (
                  <TableCell
                    key={`${row.id}-${option.value}`}
                    align="center"
                  >
                    <RadioButton
                      name={`choice-${row.id}`}
                      value={option.value.toString()}
                      checked={row.selectedValue?.toString() === option.value.toString()}
                      disabled={row.disabled}
                      onChange={(e) => handleSelectionChange(row.id, e.target.value)}
                      containerClassName="justify-center"
                    />
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
MultipleChoiceTable.displayName = 'MultipleChoiceTable';
