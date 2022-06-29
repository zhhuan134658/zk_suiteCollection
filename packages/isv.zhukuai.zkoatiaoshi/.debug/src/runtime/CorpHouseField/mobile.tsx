import { Drawer, InputItem, SearchBar } from 'antd-mobile';
import React from 'react';
import { createPortal } from 'react-dom';
import { StorageMobileDialog } from '../../components/addDetail';
import { FancyList } from '../../components/fancyLists';
import { ISwapFormField, SimpleData } from '../../types/runtime';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { parseListData } from '../../utils/normalizeUtils';
import { searchBarChange, searchBarSubmit } from '../../utils/searchUtils';

const FormField: ISwapFormField = {
  getInitialState() {
    return {
      SearchBarvalue: '',
      showElem: 'none',
      inputvalue: '',
      allData: { type: '0', number: '99999', page: '1', name: '' },
      listData: [],
    };
  },
  asyncSetFieldProps(data) {
    const _this = this;
    const promise = asyncSetProps(_this, data, 'CorpHouse');
    promise.then(res => {
      _this.setState({
        listData: [...res.dataArray],
      });
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
            form.setFieldValue('CorpHouse', item.name);
            form.setFieldExtendValue('CorpHouse', item.name);
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
    const field = form.getFieldInstance('CorpHouse');
    const label = form.getFieldProp('CorpHouse', 'label');
    const required = form.getFieldProp('CorpHouse', 'required');
    const onFinish = (values: any) => {
      this.setState({
        msgdata: '1',
      });
      console.log('Success:', values);
      //   const [form] = Form.useForm();
      const newdate = this.state.allData;
      newdate['cang_add'] = values;
      this.asyncSetFieldProps(newdate);
      newdate['cang_add'] = '';
    };
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
    const parser = [
      {
        key: 'name',
        label: '仓库名称',
        index: 1,
        title: true,
      },
      {
        key: 'number',
        label: '编号',
        index: 2,
      },
      {
        key: 'address',
        label: '地址',
        index: 3,
      },
      {
        key: 'remarks',
        label: '备注',
        index: 4,
      },
    ];

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
        <StorageMobileDialog
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        ></StorageMobileDialog>
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
            {/* <InputItem
                clear
                value={this.state.inputvalue}
                placeholder="请选择"
                onClick={this.onOpenChange}
              ></InputItem> */}
            {/* 使用这种方式，将组件挂在到根元素下，防止样式污染 */}
            {createPortal(
              <Drawer className="isvzhukuaizkoatiaoshi" 
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
