import './mobile.less';

import { InputItem, Picker } from 'antd-mobile';
import React from 'react';
import { ISwapFormField } from '../../types/runtime';
import { asyncSetProps } from '../../utils/asyncSetProps';
import arrayTreeFilter from 'array-tree-filter';
const FormField: ISwapFormField = {
  getInitialState() {
    return {
      pickerValuedata: '',
      pickerValue: [],
      visible: false,
      value: null,
      province: [],
      modal2: false,
      SearchBarvalue: '',
      showElem: 'none',
      inputvalue: '',
      allData: { type: '0', number: '99999', page: '1', name: '' },
      listData: [],
    };
  },
  asyncSetFieldProps(data) {
    const _this = this;
    const promise = asyncSetProps(_this, data, 'PositionDes');
    promise.then(res => {
      _this.setState({
        province: [...res.dataArray],
        current_page: res.currentPage,
        total2: res.totalCount,
      });
    });
  },
  methods() {
    const _this = this;
    return {
      sublisk() {
        const newdate = _this.state.allData;
        _this.asyncSetFieldProps(newdate);
        _this.setState({ visible: true });
      },

      onPickerChange(value) {
        const { form } = _this.props;
        _this.setState({ pickerValue: value });
        const desData = { Optionsid: '', Optionsname: '' };
        if (!value) {
          _this.setState({ pickerValuedata: '' }, () => {
            form.setFieldValue('PositionDes', desData);
            form.setFieldExtendValue('PositionDes', desData);
          });
        } else {
          const treeChildren = arrayTreeFilter(
            _this.state.province,
            (c: any, level) => c.value === value[level],
          );
          const newdata = treeChildren.map(v => v.label).join('/');
          desData.Optionsid = value;
          desData.Optionsname = newdata;
          _this.setState({ pickerValuedata: newdata }, () => {
            form.setFieldValue('PositionDes', desData);
            form.setFieldExtendValue('PositionDes', {
              data: desData,
            });
          });
        }
      },
    };
  },
  handleOk() {
    this.setState({
      visible: false,
    });
  },
  handleCancel() {
    this.setState({
      showElem: 'none',
    });
  },
  fieldRender() {
    const { form } = this.props;
    const field = form.getFieldInstance('PositionDes');
    const label = form.getFieldProp('PositionDes', 'label');
    //详情
    if (this.props.runtimeProps.viewMode) {
      const value = field.getExtendValue() ? field.getExtendValue() : '';
      const { Optionsname = '' } = value;
      return (
        <div className="field-wrapper">
          <div className="m-field-view">
            <label className="m-field-view-label">{label}</label>
            <div className="m-field-view-value">
              {/* {JSON.stringify(Optionsname)} */}
              {Optionsname}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="CorpHouse_class_m">
        <Picker
          visible={this.state.visible}
          data={this.state.province}
          value={this.state.pickerValue}
          onChange={this.methods().onPickerChange}
          onOk={this.handleOk}
          onDismiss={() => this.setState({ visible: false })}
        >
          <div className="field-wrapper">
            <div className="m-group m-group-mobile">
              <div className="m-field-wrapper">
                <div className="m-field m-field-mobile m-mobile-input vertical">
                  <div className="m-field-head" style={{ marginLeft: '-7px' }}>
                    <label className="m-field-label">
                      <span>{label}</span>
                    </label>
                  </div>
                  <div className="m-field-box">
                    <div className="m-field-content left">
                      <div className="input-wrapper">
                        <InputItem
                          editable={false}
                          className="ant-input m-mobile-inner-input"
                          type="text"
                          placeholder="请选择"
                          value={this.state.pickerValuedata}
                          onClick={this.methods().sublisk}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Picker>
      </div>
    );
  },
  onExtraClick: function (): void {
    throw new Error('Function not implemented.');
  },
  onOpenChange: function (): void {
    throw new Error('Function not implemented.');
  },
  onCancel: function (): void {
    throw new Error('Function not implemented.');
  },
  onSearchBarChange: function (value: any): void {
    throw new Error('Function not implemented.');
  },
  onSubmit: function (value: any): void {
    throw new Error('Function not implemented.');
  },
  habdlClick: function (item: any): void {
    throw new Error('Function not implemented.');
  },
};

export default FormField;
