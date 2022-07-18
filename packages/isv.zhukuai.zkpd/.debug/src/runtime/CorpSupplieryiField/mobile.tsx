import { Drawer, InputItem, List, SearchBar, Toast } from 'antd-mobile';
import React from 'react';
import { createPortal } from 'react-dom';
import { SupplierMobileDialog } from '../../components/addDetail';
import { ISwapFormField, SimpleData } from '../../types/runtime';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { searchBarChange, searchBarSubmit } from '../../utils/searchUtils';

const FormField: ISwapFormField = {
  getInitialState() {
    const { form } = this.props;
    return {
      SearchBarvalue: '',
      showElem: 'none',
      inputvalue: '',
      allData: { type: '0', number: '99999', page: '1', name: '' },
      listData: [],
      supplierTypes: [],
    };
  },
  asyncSetFieldProps(data) {
    const _this = this;
    const promise = asyncSetProps(_this, data, 'CorpSupplieryi');
    promise.then(res => {
      const dropDownData = [...res.extendArray.data];
      dropDownData.splice(0, 1);
      _this.setState({
        listData: [...res.dataArray],
        supplierTypes: dropDownData,
      });
      if (res.message) {
        Toast.info(res.message, 1);
      }
    });
  },
  methods() {
    const _this = this;
    return {
      onOpenChange() {
        const newData = _this.state.allData;
        _this.asyncSetFieldProps(newData);
        _this.setState({
          showElem: 'inherit',
        });
      },
      handleClick(item: SimpleData) {
        const { form } = _this.props;
        _this.setState(
          {
            inputvalue: item.name,
            showElem: 'none',
          },
          () => {
            form.setFieldValue('CorpSupplieryi', item.name);
            form.setFieldExtendValue('CorpSupplieryi', item.name);
            try {
              form.setFieldValue('paraNumber', item.extend_first);
              form.setFieldExtendValue('paraNumber', item.extend_first);
            } catch (e) {
              console.log('没有extend_first字段');
            }
          },
        );
      },
      onSubmit(value: string) {
        searchBarSubmit(_this, value, '');
      },
      onSearchBarChange(value: string) {
        searchBarChange(_this, value, '');
      },
    };
  },
  handleOk() {
    this.setState({
      showElem: 'none',
    });
  },
  handleCancel() {
    this.setState({
      showElem: 'none',
    });
  },
  fieldRender() {
    const { form } = this.props;
    const field = form.getFieldInstance('CorpSupplieryi');
    const label = form.getFieldProp('CorpSupplieryi', 'label');
    const required = form.getFieldProp('CorpSupplieryi', 'required');
    const onFinish = (values: any) => {
      this.setState({
        msgdata: '1',
      });
      console.log('Success:', values);
      const newdate = this.state.allData;
      newdate.supplier_add = values;
      this.asyncSetFieldProps(newdate);
      newdate.supplier_add = '';
    };
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
    form.onFieldExtendValueChange('CorpSupplieryi', (value: string) => {
      if (this.state.inputvalue !== value) {
        this.setState({
          inputvalue: value,
        });
      }
    });
    const sidebar = (
      <div style={{ width: '100vw' }}>
        <SearchBar
          value={this.state.SearchBarvalue}
          placeholder="请输入"
          onSubmit={this.methods().onSubmit}
          onChange={this.methods().onSearchBarChange}
          onCancel={this.handleCancel}
          showCancelButton
        />
        <SupplierMobileDialog
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          supplierTypes={this.state.supplierTypes}
        ></SupplierMobileDialog>
        <List>
          {this.state.listData.map((item, index) => {
            return (
              <List.Item
                onClick={this.methods().handleClick.bind(this, item)}
                key={index}
                multipleLine
              >
                {item.name}
              </List.Item>
            );
          })}
        </List>
      </div>
    );
    //详情
    if (this.props.runtimeProps.viewMode) {
      const value = field.getExtendValue() ? field.getExtendValue() : '';
      return (
        <div className="field-wrapper">
          <div className="m-field-view">
            <label className="m-field-view-label">{label}</label>
            <div className="m-field-view-value"> {value}</div>
          </div>
        </div>
      );
    }
    return (
      <div className="CorpSupplier_class_m">
        <div className="field-wrapper">
          <div className="m-group m-group-mobile">
            <div className="m-field-wrapper">
              <div className="m-field m-field-mobile m-mobile-input vertical">
                <div className="m-field-head" style={{ marginLeft: '-7px' }}>
                  <label className="m-field-label">
                    <span>
                      {required ? (
                        <span style={{ color: '#ea6d5c' }}>*</span>
                      ) : (
                        <span style={{ color: '#fff' }}>*</span>
                      )}
                      {label}
                    </span>
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
                        value={this.state.inputvalue}
                        onClick={this.methods().onOpenChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {createPortal(
              <Drawer className="isvzhukuaiwarehousing" 
                open={true}
                style={{
                  minHeight: document.documentElement.clientHeight,
                  display: this.state.showElem,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgb(255, 255, 255)',
                  position: 'fixed',
                  zIndex: 100,
                }}
                enableDragHandle
                contentStyle={{
                  color: '#A6A6A6',
                  textAlign: 'center',
                  paddingTop: 42,
                }}
                sidebar={sidebar}
                onOpenChange={this.methods().onOpenChange}
              ></Drawer>,
              document.getElementById('MF_APP'),
            )}
          </div>
        </div>
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
