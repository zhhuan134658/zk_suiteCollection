import React from 'react';
import { createPortal } from 'react-dom';

import { IFormField } from '../../types';
import { InputItem, Drawer, Tabs, SearchBar } from 'antd-mobile';
import './mobile.less';
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
  asyncSetFieldProps(vlauedata) {
    const { form, spi } = this.props;
    const Pro_name = form.getFieldValue('Autopro');
    vlauedata.project_name = Pro_name;
    vlauedata.biao_name = 'sub_payment_application';
    const TestSubconField = form.getFieldInstance('TestSubcon');
    const key = TestSubconField.getProp('id');
    const value = '1';
    const bizAsyncData = [
      {
        key,
        bizAlias: 'TestSubcon',
        extendValue: vlauedata,
        value,
      },
    ];

    // 入参和返回参考套件数据刷新集成接口文档

    spi
      .refreshData({
        modifiedBizAlias: ['TestSubcon'], // spi接口要改动的是leaveReason的属性值
        bizAsyncData,
      })
      .then(res => {
        let newarr;
        //   表格数据
        try {
          newarr = JSON.parse(res.dataList[0].value).data;
        } catch (e) {}

        this.setState({
          listData: newarr,
        });
      });
  },
  onExtraClick() {
    const { form } = this.prop;
    this.setState({ inputvalue: '' });
    // form.setFieldValue('SelectTicke', '');
    // form.setFieldExtendValue('SelectTicke', '');
    form.setFieldValue('Selectjia', '');
    form.setFieldExtendValue('Selectjia', '');
    form.setFieldValue('SubconField', '');
    form.setFieldExtendValue('SubconField', '');
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
      dtar = '分包进度款结算-' + item.name;
    } else if (this.state.detdate === 'b1') {
      dtar = '分包完工结算-' + item.name;
    } else if (this.state.detdate === 'c1') {
      dtar = '分包质保金结算-' + item.name;
    } else if (this.state.detdate === 'd1') {
      dtar = '分包合同-' + item.name;
    }
    console.log(dtar);
    form.setFieldValue('SubconField', item.contract_name);
    this.setState({ inputvalue: dtar, showElem: 'none' });
    form.setFieldValue('TestSubcon', dtar);
    form.setFieldExtendValue('TestSubcon', dtar);
    form.setFieldValue('Selectjia', item.sub_unit);
    form.setFieldExtendValue('Selectjia', item.sub_unit);
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
    const field = form.getFieldInstance('TestSubcon');
    const label = form.getFieldProp('TestSubcon', 'label');
    const required = form.getFieldProp('TestSubcon', 'required');
    const parser = [
      {
        key: 'name',
        label: '名称',
        index: 1,
        title: true,
      },
      {
        key: 'sub_unit',
        label: '分包单位',
        index: 2,
      },
      {
        key: 'reply_money',
        label: '结算金额',
        index: 3,
      },
    ];
    const tabs = [
      { title: '分包进度款' },
      { title: '分包完工' },
      { title: '分包质保金' },
      { title: '分包合同' },
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
          renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
          initialPage={0}
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
      <div className="CorpHouse_class_m_1">
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
