import { Drawer, InputItem, SearchBar, Toast } from 'antd-mobile';
import React from 'react';
import { createPortal } from 'react-dom';
import { FancyList } from '../../components/fancyLists';
import { ISwapFormField } from '../../types/runtime';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { parseListData } from '../../utils/normalizeUtils';
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
        const { form } = _this.props;
        const project = form.getFieldValue('Autopro');
        if (!project) {
          return Toast.info('请先选择项目', 1);
        }
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
          form.setFieldValue('SelectCon', item.name);
          form.setFieldExtendValue('SelectCon', item.name);
          form.setFieldValue('Conmoney', item.money);
          form.setFieldExtendValue('Conmoney', item.money);
          form.setFieldValue('Selectjia', item.party_a);
          form.setFieldExtendValue('Selectjia', item.party_a);
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
    const promise = asyncSetProps(
      _this,
      data,
      'SelectCon',
      'lease_completion_settlement',
    );
    promise.then(res => {
      _this.setState({
        listData: [...res.dataArray],
      });
    });
  },
//   fieldDidUpdate() {
//     if (!this.props.runtimeProps.viewMode) {
//       console.log('发起页：fieldDidUpdate');

//       const editData = {
//         hanmoney: 0,
//         nomoney: 0,
//         detailname: '',
//         detailedData: [], //物资明细
//       };
//       if (this.state.Inputmoney1) {
//         editData.hanmoney = Number(this.state.Inputmoney1);
//       }
//       if (this.state.Inputmoney2) {
//         editData.nomoney = Number(this.state.Inputmoney2);
//       }
//       editData.detailname = this.state.chenkdata;
//       editData.detailedData = this.state.materialList;
//       const { form } = this.props;
//       form.setFieldValue('TestPur', editData);
//       form.setFieldExtendValue('TestPur', {
//         data: editData,
//       });
//     }
//   },
  fieldRender() {
    // fix in codepen
    const { form } = this.props;
    const field = form.getFieldInstance('SelectCon');
    const label = form.getFieldProp('SelectCon', 'label');
    const required = form.getFieldProp('SelectCon', 'required');
    const parser = [
      {
        key: 'name',
        label: '合同名称',
        index: 1,
        title: true,
      },
      {
        key: 'party_a',
        label: '甲方',
        index: 2,
      },
      {
        key: 'money',
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
