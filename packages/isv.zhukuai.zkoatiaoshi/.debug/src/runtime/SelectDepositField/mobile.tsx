import { Drawer, InputItem, List, SearchBar, Toast } from 'antd-mobile';
import React from 'react';
import { createPortal } from 'react-dom';
import { ISwapFormField } from '../../types/runtime';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { searchBarChange } from '../../utils/searchUtils';

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
        const { form } = this.props;
        const value = form.getFieldValue('RadioField');
        if (value) {
          if (value === '投标保证金支出' || value === '投标保证金退回') {
            const newdate = this.state.allData;
            newdate.isProject = '2';
            this.asyncSetFieldProps(newdate);
          } else {
            const newdate = this.state.allData;
            newdate.isProject = '1';
            this.asyncSetFieldProps(newdate);
          }
          this.setState({
            isModalVisible: true,
          });
        } else {
          Toast.info('请先选择合同类型', 1);
        }
        this.setState({ showElem: 'inherit' });
      },
      handleClick(item: any) {
        const { form } = _this.props;
        _this.setState({ Inputvalue: item.name, showElem: 'none' }, () => {
          form.setFieldValue('SelectDeposit', item.name);
          form.setFieldExtendValue('SelectDeposit', item.name);
        });
      },
      onExtraClick() {
        _this.setState({ inputvalue: '' });
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
    const promise = asyncSetProps(_this, data, 'SelectDeposit');
    promise.then(res => {
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
    const field = form.getFieldInstance('SelectDeposit');
    const label = form.getFieldProp('SelectDeposit', 'label');
    const required = form.getFieldProp('SelectDeposit', 'required');
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

        <List>
          {this.state.listData.map((item, index) => {
            return (
              <List.Item
                onClick={this.methods().handleClick.bind(this, item)}
                key={index}
                multipleLine
              >
                {item.accountname}
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
                        extra="x"
                        onExtraClick={this.methods().onExtraClick}
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
