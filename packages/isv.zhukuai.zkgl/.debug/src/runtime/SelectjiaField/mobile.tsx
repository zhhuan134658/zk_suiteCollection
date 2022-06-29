import { Drawer, InputItem, SearchBar, Toast } from 'antd-mobile';
import React from 'react';
import { createPortal } from 'react-dom';
import { SupplierMobileDialog } from '../../components/addDetail';
import { FancyList } from '../../components/fancyLists';
import { ISwapFormField } from '../../types/runtime';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { parseListData } from '../../utils/normalizeUtils';
import { searchBarChange } from '../../utils/searchUtils';

const FormField: ISwapFormField = {
  getInitialState() {
    return {
      SearchBarvalue: '',
      showElem: 'none',
      inputvalue: '',
      allData: { type: '0', number: '99999', page: '1', name: '' },
      listData: [],
      supplierTypes: [],
    };
  },
  handleOk: function (): void {
    throw new Error('Function not implemented.');
  },
  handleCancel() {
    this.setState({
      showElem: 'none',
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
      onExtraClick() {
        _this.setState({ inputvalue: '' });
      },
      handleClick(item: any) {
        const { form } = _this.props;
        _this.setState({ inputvalue: item.name, showElem: 'none' }, () => {
          form.setFieldValue('Selectjia', item.name);
          form.setFieldExtendValue('Selectjia', item.name);
        });
      },
      onSubmit(value: any) {
        const data = _this.state.allData;
        data.name = value;
        _this.asyncSetFieldProps(data);
      },
      onSearchBarChange(value: any) {
        searchBarChange(_this, value, '');
      },
    };
  },
  asyncSetFieldProps(data: any) {
    const _this = this;
    const promise = asyncSetProps(_this, data, 'Selectjia');
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
  fieldDidUpdate() {
    return null;
  },
  fieldRender() {
    // fix in codepen
    const { form } = this.props;
    const field = form.getFieldInstance('Selectjia');
    const label = form.getFieldProp('Selectjia', 'label');
    const required = form.getFieldProp('Selectjia', 'required');
    const parser = [
      {
        key: 'name',
        label: '单位名称',
        index: 1,
        title: true,
      },
      {
        key: 'number',
        label: '单位编号',
        index: 2,
      },
      {
        key: 'charge_person',
        label: '分管人',
        index: 3,
      },
      {
        key: 'supplier_type_name',
        label: '单位类型',
        index: 4,
      },
      {
        key: 'unit_nature',
        label: '单位性质',
        index: 5,
      },
    ];
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
    form.onFieldExtendValueChange('Selectjia', (value: any) => {
      if (this.state.inputvalue !== value) {
        this.setState({
          inputvalue: value,
        });
      }
    });

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
    const sidebar = (
      <div style={{ width: '100vw' }}>
        <SearchBar
          value={this.state.SearchBarvalue}
          placeholder="请输入名称"
          onSubmit={this.methods().onSubmit}
          onChange={this.methods().onSearchBarChange}
          onCancel={this.handleCancel}
          showCancelButton
        />
        <SupplierMobileDialog
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          supplierTypes={this.state.supplierTypes}
        />
        <FancyList
          data={parseListData(this.state.listData, parser)}
          itemClick={this.methods().handleClick}
        />
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
      <div className="CorpHouse_class_m">
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
                        extra="x"
                        onExtraClick={this.methods().onExtraClick}
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
              <Drawer className="isvzhukuaizkgl" 
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
