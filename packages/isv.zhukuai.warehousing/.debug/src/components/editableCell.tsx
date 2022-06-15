import { InputNumber, Form, Input } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { IEditableCellProps } from '../types/runtime';
import { EditableContext } from './editableRow';

const EditableCell: React.FC<IEditableCellProps> = props => {
  const {
    editable,
    children,
    isNumber,
    dataIndex,
    record,
    handleSave,
    ...restProps
  } = props;
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputNonNumberRef = useRef<Input>(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      if (isNumber) {
        inputRef.current?.focus();
      } else {
        inputNonNumberRef.current?.focus();
      }
    }
  }, [editing, isNumber]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values }, values);
    } catch (err) {
      console.log('SAVE FAILED:', err);
    }
  };
  let childrenNode = children;

  if (editable) {
    childrenNode =
      editing && isNumber ? (
        <Form.Item style={{ margin: 0 }} name={dataIndex}>
          <InputNumber
            className="editable-cell-value-input number"
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
            min={0}
            step="0.01"
            placeholder="请输入"
          />
        </Form.Item>
      ) : !isNumber && editing ? (
        <Form.Item style={{ margin: 0 }} name={dataIndex}>
          <Input
            className="editable-cell-value-input"
            ref={inputNonNumberRef}
            onPressEnter={save}
            onBlur={save}
            placeholder="请输入"
          />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
  }
  return <td {...restProps}>{childrenNode}</td>;
};

EditableCell.defaultProps = {
  isNumber: true,
};

export { EditableCell };
