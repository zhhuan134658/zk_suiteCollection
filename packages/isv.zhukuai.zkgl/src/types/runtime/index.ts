import { Table } from 'antd';
import React, { ReactNode } from 'react';
import { IFormField } from '..';

interface EditableRowProps {
  index: number;
}

interface SwapFormField extends IFormField {
  getInitialState: () => any;
  handleOk: () => void;
  handleCancel: () => void;
  onExtraClick: () => void;
  onOpenChange: () => void;
  onCancel: () => void;
  onSearchBarChange: (value: any) => void;
  onSubmit: (value: any) => void;
  habdlClick: (item: any) => void;
  methods: () => any;
  asyncSetFieldProps: (data: any, type?: any) => void;
}

interface Item {
  id: number;
  key: string;
  name: string;
  size: string;
  type: string;
  num1: number;
  num2: number;
  num3: number;
}

const defaultEditableCellProps = {
  isNumber: true,
  editable: true,
};
type EditableCellProps = {
  children: ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item, values: any) => void;
} & Partial<typeof defaultEditableCellProps>;
interface DataType {
  unit_price: any;
  id: any;
  det_quantity: any;
  no_unit_price: any;
  tax_rate: any;
  amount_tax: any;
  tax_amount: any;
  no_amount_tax: any;
  key: React.Key;
  name: string;
  size: string;
  type: string;
  unit: string;
}

interface SimpleData {
  extend_first: any;
  id: any;
  num1: number;
  num2: number;
  key: React.Key;
  name: string;
  size: string;
  type: string;
}

interface TableColumn {
  title: string;
  key: string;
}

interface TableData {
  columns: Array<TableColumn>;
  data: any[];
}

interface TableCellData {
  label: string;
  placeholder: string;
  value: string | number;
}

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export {
  DataType,
  EditableCellProps as IEditableCellProps,
  EditableRowProps,
  SwapFormField as ISwapFormField,
  EditableTableProps,
  ColumnTypes,
  SimpleData,
  TableData,
  TableColumn,
  TableCellData,
};
