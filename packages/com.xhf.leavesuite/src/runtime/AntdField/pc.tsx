import React from 'react';
import {
  Table,
  Tooltip,
  notification,
  Modal,
  Input,
  InputNumber,
  Button,
  Popconfirm,
  Form,
} from 'antd';
const { Search } = Input;
import { IFormField } from '../../types';
const { Column } = Table;

import './pc.less';

interface ISwapFormField extends IFormField {
  rowClick: (record) => void;
}

/**
 * 自定义控件运行态 PC 视图
 */
const FormField: ISwapFormField = {
  getInitialState() {
    const { form } = this.props;

    return {
      inputValue: '',
      current_page: '', //当前页
      total2: '',
      allData: {
        type: '0',
        number: '10',
        page: '1',
        name: '',
        project_name: '',
      },
      isModalVisible: false,
      listData: [
        {id:1, name: 'a', type:'a'},
        {id:2, name: 'b', type:'a'},
        {id:3, name: 'c', type:'a'},
      ],
      loading: false,

      dataSource: [],

      currentEditId: 0,
      currentSelectData: [],
      selectedRowKeys: [],
    };
  },
  /** 控件首次渲染完成之后 */
  fieldDidMount() {
    // const newdate = this.state.allData;
    // this.asyncSetFieldProps(newdate);
  },

  rowClick(record) {
    const { form, bizAlias } = this.props;

    this.setState({ inputValue: record.name, isModalVisible: false }, () => {
      form.setFieldValue(bizAlias, record.name);
      form.setFieldExtendValue(bizAlias, {data: record});
    });
  },

  fieldRender() {
    const { form, runtimeProps, bizAlias } = this.props;
    const { viewMode } = runtimeProps;
    const field = form.getFieldInstance(bizAlias);
    const label = field.getProp('label');
    const required = field.getProp('required');

    // 详情页
    if (viewMode) {
      const value = field.getValue();
      return (
        <div className="field-wrapper">
          <div className="label">{label}</div>
          <div style={{ marginTop: '10px' }}> {value}</div>
        </div>
      );
    }

    const { isModalVisible, listData, loading, inputValue } = this.state;
    
    return (
      <div className="SelectZuField_class">
        <div className="pc-custom-field-wrap">
          <div className="label">
            {required ? (
              <span style={{ color: '#ea6d5c' }}>* </span>
            ) : (
              <span style={{ color: '#fff' }}>* </span>
            )}
            {label}
          </div>
          <div>
            <Input
              readOnly
              value={inputValue}
              onClick={()=>{
                this.setState({
                  isModalVisible: true,
                });
              }}
              placeholder="请选择"
            />
          </div>

          <Modal
            title="选择"
            width={1000}
            visible={isModalVisible}
            onCancel={()=>{this.setState({isModalVisible:false})}}
            footer={null}
          >
            <Table
              onRow={record => {
                return {
                  onClick: () => { this.rowClick(record) },
                };
              }}
              rowKey={record => record.id}
              dataSource={listData}
              loading={loading}
              pagination={false}
            >
              <Column
                title="名称"
                dataIndex="name"
                key="name"
              />
              <Column
                title="类型"
                width="130px"
                dataIndex="type"
                key="type"
              />
            </Table>
          </Modal>
        </div>
      </div>
    );
  },
};

export default FormField;
