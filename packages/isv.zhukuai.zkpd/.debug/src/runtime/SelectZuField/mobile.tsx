import { Drawer, InputItem, SearchBar } from 'antd-mobile';
import React from 'react';
import { createPortal } from 'react-dom';
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
        newData['rk_id'] = ['a'];
        _this.asyncSetFieldProps(newData);
        _this.setState({
          showElem: 'inherit',
        });
      },
      onExtraClick() {
        const { form } = _this.props;
        _this.setState({ inputvalue: '' });
        form.setFieldValue('Zumoney', '');
        form.setFieldExtendValue('Zumoney', '');
        form.setFieldValue('SelectZu', '');
        form.setFieldExtendValue('SelectZu', '');
      },
      handleClick(item: any) {
        const { form } = _this.props;
        _this.setState({ inputvalue: item.name, showElem: 'none' }, () => {
          form.setFieldValue('Zumoney', item.contract_money);
          form.setFieldExtendValue('Zumoney', item.contract_money);
          form.setFieldValue('Selectjia', item.supplier);
          form.setFieldExtendValue('Selectjia', item.supplier);
          form.setFieldValue('SelectZu', item.name);
          form.setFieldExtendValue('SelectZu', item.name);
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
    const promise = asyncSetProps(_this, data, 'SelectZu', 'lease_settlement');
    promise.then(res => {
      const dataArray = res.dataArray;
      if (dataArray.length === 0) {
        _this.setState({ inputvalue: '暂无合同' });
        _this.props.form.setFieldValue('SelectZu', '暂无合同');
        _this.props.form.setFieldExtendValue('SelectZu', '暂无合同');
      } else {
        _this.setState({
          listData: [...res.dataArray],
        });
      }
    });
  },
  fieldDidUpdate() {
    return null;
  },
  fieldRender() {
    // fix in codepen
    const { form } = this.props;
    const label = form.getFieldProp('SelectZu', 'label');
    const required = form.getFieldProp('SelectZu', 'required');
    const parser = [
      {
        key: 'name',
        label: '合同名称',
        index: 1,
        title: true,
      },
      {
        key: 'supplier',
        label: '租赁单位',
        index: 2,
      },
      {
        key: 'contract_money',
        label: '合同金额',
        index: 3,
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
        <FancyList
          data={parseListData(this.state.listData, parser)}
          itemClick={this.methods().handleClick}
        />
      </div>
    );
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
              <Drawer className="isvzhukuaizkpd" 
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
