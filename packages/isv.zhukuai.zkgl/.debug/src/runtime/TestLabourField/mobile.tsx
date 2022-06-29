import React from 'react';
import { createPortal } from 'react-dom';

import { IFormField } from '../../types';
import { InputItem, Drawer, Tabs, SearchBar } from 'antd-mobile';
import './mobile.less';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { FancyList } from '../../components/fancyLists';
import { parseListData } from '../../utils/normalizeUtils';
/**
 * 自定义控件运行态 Mobile 视图
 */
const FormField: IFormField = {
  getInitialState() {
    return {
      detdate: 'a1',
      SearchBarvalue: '',
      showElem: 'none',
      inputvalue: '',
      allData: { type: '0', number: '99999', page: '1', name: '' },
      listData: [],
    };
  },
  asyncSetFieldProps(vlauedata: any) {
    const _this = this;

    const promise = asyncSetProps(
      _this,
      vlauedata,
      'TestLabour',
      'service_payment_application',
    );
    promise.then(res => {
      console.log(res);
      //   表格数据
      let newarr;
      //   表格数据
      try {
        newarr = res['dataArray'];
      } catch (e) {}

      this.setState({
        listData: newarr,
      });
    });
  },
  onExtraClick() {
    this.setState({ inputvalue: '' });

    console.log('测试点击');
  },
  onOpenChange(...args) {
    console.log('sss');
    console.log(args);
    const newvalue = this.state.allData;
    newvalue.name = '';
    newvalue.type = 0;
    newvalue.page = 1;
    newvalue.rk_id = ['a'];
    newvalue.project_name = '';
    // this.setState({
    //   allData: newvalue,
    // });
    this.asyncSetFieldProps(newvalue);

    this.setState({ showElem: 'inherit' });
  },
  habdlClick(item) {
    const { form } = this.props;

    let dtar = '';
    if (this.state.detdate === 'a1') {
      dtar = '劳务进度款结算-' + item.name;
    } else if (this.state.detdate === 'b1') {
      dtar = '劳务完工结算-' + item.name;
    } else if (this.state.detdate === 'c1') {
      dtar = '劳务质保金结算-' + item.name;
    } else if (this.state.detdate === 'd1') {
      dtar = '零星劳务结算-' + item.name;
    } else if (this.state.detdate === 'e1') {
      dtar = '劳务合同-' + item.name;
    }
    console.log(dtar);
    form.setFieldValue('LabourField', item.contract_name);
    this.setState({ inputvalue: dtar, showElem: 'none' });
    form.setFieldValue('TestLabour', dtar);
    form.setFieldExtendValue('TestLabour', dtar);
    form.setFieldValue('Selectjia', item.team);
    form.setFieldExtendValue('LabourField', item.contract_name);
    form.setFieldExtendValue('Selectjia', item.team);
  },
  onCancel() {
    this.setState({ showElem: 'none' });
  },
  onSubmit(value) {
    const newdate = this.state.allData;
    newdate.name = value;

    this.asyncSetFieldProps(newdate);
  },
  //搜索框
  onSearchBarChange(value) {
    if (!value) {
      const newData = this.state.allData;
      newData.name = value;
      this.asyncSetFieldProps(newData);
    }

    this.setState({ SearchBarvalue: value });
  },
  fieldRender() {
    // fix in codepen
    const { form } = this.props;
    const field = form.getFieldInstance('TestLabour');
    const label = form.getFieldProp('TestLabour', 'label');
    const required = form.getFieldProp('TestLabour', 'required');
    const parser = [
      {
        key: 'name',
        label: '结算名称',
        index: 1,
        title: true,
      },
      {
        key: 'extend_first',
        label: '劳务单位/班组',
        index: 2,
      },
      {
        key: 'reply_money',
        label: '结算金额',
        index: 3,
      },
    ];

    const tabs = [
      { title: '劳务进度款' },
      { title: '劳务完工' },
      { title: '劳务质保金' },
      { title: '零星劳务' },
      { title: '劳务合同' },
    ];

    const sidebar = (
      <div style={{ width: '100vw' }}>
        <SearchBar
          value={this.state.SearchBarvalue}
          placeholder="请输入"
          onSubmit={this.onSubmit}
          onChange={this.onSearchBarChange}
          onCancel={this.onCancel}
          showCancelButton
        />
        <Tabs
          tabs={tabs}
          initialPage={0}
          renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
          onChange={(tab, index) => {
            console.log('onChange', index, tab);
            this.setState({ detdate: 'a1' });
            const newpage = {
              detailPage: 1,
              defaultActiveKey: 'a',
              rk_id: ['a'],
              number: '1000',
              page: 1,
              name: '',
            };
            if (index === 0) {
              this.setState({ detdate: 'a1' });
              newpage.rk_id = ['a'];
            } else if (index === 1) {
              this.setState({ detdate: 'b1' });
              newpage.rk_id = ['b'];
            } else if (index === 2) {
              this.setState({ detdate: 'c1' });
              newpage.rk_id = ['c'];
            } else if (index === 3) {
              this.setState({ detdate: 'd1' });
              newpage.rk_id = ['d'];
            } else if (index === 4) {
              this.setState({ detdate: 'e1' });
              newpage.rk_id = ['e'];
            }
            this.setState({
              allData: newpage,
            });
            this.asyncSetFieldProps(newpage);
          }}
        ></Tabs>
        <FancyList
          data={parseListData(this.state.listData, parser)}
          itemClick={this.habdlClick}
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
                        onExtraClick={this.onExtraClick}
                        className="ant-input m-mobile-inner-input"
                        type="text"
                        placeholder="请选择"
                        value={this.state.inputvalue}
                        onClick={this.onOpenChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 使用这种方式，将组件挂在到根元素下，防止样式污染 */}

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
                onOpenChange={this.onOpenChange}
              ></Drawer>,
              document.getElementById('MF_APP'),
            )}
          </div>
        </div>
      </div>
    );
  },
};

export default FormField;
