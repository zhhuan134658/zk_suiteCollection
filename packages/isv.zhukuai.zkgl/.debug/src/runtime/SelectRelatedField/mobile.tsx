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
        _this.asyncSetFieldProps(newData);
        _this.setState({
          showElem: 'inherit',
        });
      },
      onExtraClick() {
        const { form } = _this.props;
        _this.setState({ inputvalue: '' });
        form.setFieldValue('SelectRelated', '');
        form.setFieldExtendValue('SelectRelated', '');
        form.setFieldValue('Moneytest', '');
        form.setFieldExtendValue('Moneytest', '');
      },
      handleClick(record: any) {
        const { form } = _this.props;

        _this.setState({ inputvalue: record.title });
        form.setFieldValue('SelectRelated', record.title);
        form.setFieldExtendValue('SelectRelated', record.title);

        form.setFieldValue('Moneytest', record.money);
        form.setFieldExtendValue('Moneytest', record.money);
        console.log('record', record);
        _this.setState({ showElem: 'none' });
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
    const { form } = _this.props;
    data['bond_type'] = form.getFieldValue('RadioField');
    data['contract_name'] = form.getFieldValue('SelectHe');
    const projectName = form.getFieldValue('SelectDeposit');
    const promise = asyncSetProps(
      _this,
      data,
      'SelectRelated',
      '',
      projectName,
    );
    promise.then(res => {
      const listData = [...res.dataArray];
      _this.setState({
        listData: [...listData],
      });
    });
  },
  fieldDidUpdate() {
    return null;
  },
  fieldRender() {
    // fix in codepen
    const { form } = this.props;
    const field = form.getFieldInstance('SelectRelated');
    const label = form.getFieldProp('SelectRelated', 'label');
    const required = form.getFieldProp('SelectRelated', 'required');

    const setUpParser = () => {
      const type = form.getFieldValue('RadioField');
      let parser: Array<any> = [];
      switch (type) {
        case '投标保证金支出':
          parser = [
            {
              key: 'extend_five',
              label: '主题',
              index: 1,
              title: true,
            },
            {
              key: 't1',
              label: '收取单位',
              index: 2,
            },
            {
              key: 'bond_money',
              label: '保证金金额',
              index: 3,
              icon: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pYTtdmPkiF1637911760715.png',
            },
          ];
          break;
        case '履约保证金支出':
          parser = [
            {
              key: 'extend_two',
              label: '主题',
              index: 1,
              title: true,
            },
            {
              key: 'party_a',
              label: '甲方单位',
              index: 2,
            },
            {
              key: 'bond_money',
              label: '保证金金额',
              index: 3,
              icon: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pYTtdmPkiF1637911760715.png',
            },
          ];
          break;
        case '劳务分包保证金退回':
          parser = [
            {
              key: 'extend_five',
              label: '主题',
              index: 1,
              title: true,
            },
            {
              key: 't1',
              label: '劳务分包单位',
              index: 2,
            },
            {
              key: 'return_money',
              label: '退回金额',
              index: 3,
              icon: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pYTtdmPkiF1637911760715.png',
            },
          ];
          break;
        case '专业分包保证金退回':
          parser = [
            {
              key: 'extend_five',
              label: '主题',
              index: 1,
              title: true,
            },
            {
              key: 't1',
              label: '分包单位',
              index: 2,
            },
            {
              key: 'return_money',
              label: '退回金额',
              index: 3,
              icon: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pYTtdmPkiF1637911760715.png',
            },
          ];
          break;
        case '投标保证金退回':
          parser = [
            {
              key: 'extend_five',
              label: '主题',
              index: 1,
              title: true,
            },
            {
              key: 'bond_money',
              label: '保证金金额',
              index: 3,
              icon: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pYTtdmPkiF1637911760715.png',
            },
          ];
          break;
        case '履约保证金退回':
          parser = [
            {
              key: 'extend_two',
              label: '主题',
              index: 1,
              title: true,
            },
            {
              key: 'party_a',
              label: '甲方单位',
              index: 2,
            },
            {
              key: 'return_money',
              label: '退回金额',
              index: 3,
              icon: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pYTtdmPkiF1637911760715.png',
            },
          ];
          break;
        case '劳务分包保证金收入':
          parser = [
            {
              key: 'extend_five',
              label: '主题',
              index: 1,
              title: true,
            },
            {
              key: 'unit',
              label: '劳务分包单位',
              index: 2,
            },
            {
              key: 'bond_money',
              label: '保证金金额',
              index: 3,
              icon: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pYTtdmPkiF1637911760715.png',
            },
          ];
          break;
        case '专业分包保证金收入':
          parser = [
            {
              key: 'extend_five',
              label: '主题',
              index: 1,
              title: true,
            },
            {
              key: 't1',
              label: '分包单位',
              index: 2,
            },
            {
              key: 'bond_money',
              label: '保证金金额',
              index: 3,
              icon: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pYTtdmPkiF1637911760715.png',
            },
          ];
          break;
        default:
          parser = [
            {
              key: 'name',
              label: '申请名称',
              index: 1,
              title: true,
            },
            {
              key: 'bond_money',
              label: '申请金额',
              index: 2,
              icon: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pYTtdmPkiF1637911760715.png',
            },
          ];
          break;
      }
      return parser;
    };

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
          data={parseListData(this.state.listData, setUpParser())}
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
