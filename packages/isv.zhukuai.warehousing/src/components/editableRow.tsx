import { Form, FormInstance } from 'antd';
import React from 'react';
import { EditableRowProps } from '../types/runtime';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider key={index} value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export { EditableContext, EditableRow };
