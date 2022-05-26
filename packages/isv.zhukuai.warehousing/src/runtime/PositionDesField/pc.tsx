import { notification, Cascader } from 'antd';
import React from 'react';
import { ISwapFormField } from '../../types/runtime';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { uniqueArrayByKey } from '../../utils/normalizeUtils';
const FormField: ISwapFormField = {
  getInitialState() {
    return {
      options: [],
      current_page: '', //当前页
      total2: '',
      allData: { type: '0', number: '10', page: '1', name: '' },
      isModalVisible: false,
      listData: [],
    };
  },
  fieldDidMount() {
    const newData = this.state.allData;
    this.asyncSetFieldProps(newData);
  },
  asyncSetFieldProps(data: any) {
    const _this = this;
    const promise = asyncSetProps(_this, data, 'PositionDes');
    promise.then(res => {
      _this.setState({
        options: [...res.dataArray],
        current_page: res.currentPage,
        total2: res.totalCount,
      });
      if (_this.state.msgdata === '1') {
        notification.open({
          message: res.message,
        });
        _this.setState({
          msgdata: '0',
        });
      }
    });
  },
  methods() {
    const _this = this;
    return {
      onChangeValue(_value: any, selectedOptions: Array<any>) {
        const { form } = _this.props;
        const desData = { Optionsid: '', Optionsname: '' };
        desData.Optionsid =
          selectedOptions[0].value +
          '/' +
          selectedOptions[1].value +
          '/' +
          selectedOptions[2].value;
        desData.Optionsname =
          selectedOptions[0].label +
          '/' +
          selectedOptions[1].label +
          '/' +
          selectedOptions[2].label;
        form.setFieldValue('PositionDes', desData);
        form.setFieldExtendValue('PositionDes', desData);
      },
    };
  },
  handleCancel() {
    this.setState({
      isModalVisible: false,
      selectedRowKeys: [],
    });
  },
  handleOk() {
    const newData = [...this.state.dataSource];
    const selectData = [...this.state.currentSelectData];
    if (selectData.length > 0) {
      selectData.forEach(e => {
        newData.push(e);
      });
    }
    const uniqueData = [...uniqueArrayByKey(newData, ['id'])];
    this.setState({
      dataSource: uniqueData,
      isModalVisible: false,
      selectedRowKeys: [],
    });
  },
  fieldRender() {
    const { form, runtimeProps } = this.props;
    const { viewMode } = runtimeProps;

    const field = form.getFieldInstance('PositionDes');
    const label = form.getFieldProp('PositionDes', 'label');
    const required = form.getFieldProp('PositionDes', 'required');
    // 详情页
    if (viewMode) {
      const value = field.getExtendValue() ? field.getExtendValue() : '';
      const { Optionsname = '' } = value;
      return (
        <div>
          <div className="label" style={{ marginTop: '10px' }}>
            {label}
          </div>
          <div style={{ marginTop: '10px' }}>{Optionsname}</div>
        </div>
      );
    }

    return (
      <div className="pc-custom-field-wrap">
        <div className="label" style={{ marginTop: '10px' }}>
          {required ? (
            <span style={{ color: '#ea6d5c' }}>*</span>
          ) : (
            <span style={{ color: '#fff' }}>*</span>
          )}
          {label}
        </div>

        <div>
          <Cascader
            options={this.state.options}
            onChange={this.methods().onChangeValue}
            placeholder="请选择"
          />
        </div>
      </div>
    );
  },
};

export default FormField;
