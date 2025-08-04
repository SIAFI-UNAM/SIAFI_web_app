// Basic Table Components
export { Table } from './Table';
export { TableHeader } from './TableHeader';
export { TableBody } from './TableBody';
export { TableRow } from './TableRow';
export { TableCell } from './TableCell';

// Advanced Table Components
export { DataTable, createStatusBadge } from './DataTable';
export { MultipleChoiceTable } from './MultipleChoiceTable';

// Types - Basic Table Components
export type { TableProps } from './Table';
export type { TableHeaderProps } from './TableHeader';
export type { TableBodyProps } from './TableBody';
export type { TableRowProps } from './TableRow';
export type { TableCellProps } from './TableCell';

// Types - Advanced Table Components
export type { DataTableProps, DataTableColumn } from './DataTable';
export type { 
  MultipleChoiceTableProps, 
  MultipleChoiceOption, 
  MultipleChoiceRow 
} from './MultipleChoiceTable';