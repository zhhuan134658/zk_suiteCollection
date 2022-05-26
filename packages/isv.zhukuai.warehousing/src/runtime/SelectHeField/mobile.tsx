import { Drawer, InputItem, List, SearchBar } from 'antd-mobile';
import React from 'react';
import { createPortal } from 'react-dom';
import { ISwapFormField } from '../../types/runtime';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { searchBarChange } from '../../utils/searchUtils';

const listDataParser = [];

const FormField: ISwapFormField = {
  getInitialState() {
    const { form } = this.props;
    return {
      SearchBarvalue: '',
      showElem: 'none',
      inputvalue: '',
      allData: { type: '0', number: '99999', page: '1', name: '' },
      listData: [],
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
      handleClick(item: any) {
        const { form } = _this.props;
        console.log(item);
        _this.setState({ inputvalue: item.name, showElem: 'none' }, () => {
          form.setFieldValue('SelectHe', item.name);
          form.setFieldExtendValue('SelectHe', item.name);
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
    const projectName = _this.props.form.getFieldValue('SelectHe');
    const bondType = _this.props.form.getFieldValue('RadioField');
    data.project_name = projectName;
    data.bond_type = bondType;
    const promise = asyncSetProps(
      _this,
      data,
      'SelectHe',
      'bond_payment_register',
    );
    promise.then(res => {
      const listData = [...res.dataArray];

      _this.setState({
        listData: [...res.dataArray],
      });
    });
  },
  fieldDidUpdate() {
    return null;
  },
  fieldRender() {
    // fix in codepen
    const { form } = this.props;
    const field = form.getFieldInstance('SelectHe');
    const label = form.getFieldProp('SelectHe', 'label');
    const required = form.getFieldProp('SelectHe', 'required');
    form.onFieldExtendValueChange('SelectHe', (value: string) => {
      console.log('vakue', value);
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
          placeholder="请输入名称"
          onSubmit={this.methods().onSubmit}
          onChange={this.methods().onSearchBarChange}
          onCancel={this.handleCancel}
          showCancelButton
        />
        <List>
          {this.state.listData.length === 0 ? (
            <div
              className="fancy-list-empty"
              style={{
                maxWidth: '100vw',
                maxHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px,0',
              }}
            >
              <img
                src={
                  'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//8SyQKD2DCh1638868050008.png'
                }
                style={{
                  maxWidth: '75%',
                  maxHeight: '75%',
                }}
              />
            </div>
          ) : (
            this.state.listData.map((item, index) => {
              const text = item.xuan === 1 ? '#000000' : '#000000';
              const style = {
                color: text,
              };
              return (
                <List.Item
                  onClick={this.methods().handleClick.bind(this, item)}
                  key={index}
                  multipleLine
                >
                  <span style={style}> {item.name}</span>
                </List.Item>
              );
            })
          )}
        </List>
        {/* <List>
          {this.state.listData.map((item, index) => {
            const text = item.xuan === 1 ? '#000000' : '#000000';
            const style = {
              color: text,
            };
            return (
              <List.Item
                onClick={this.methods().handleClick.bind(this, item)}
                key={index}
                multipleLine
              >
                <span style={style}> {item.accountname}</span>
              </List.Item>
            );
          })}
        </List> */}
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
            {createPortal(
              <Drawer
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
