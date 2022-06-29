import React from 'react';
import { createPortal } from 'react-dom';

import { InputItem, Drawer, Tabs, SearchBar } from 'antd-mobile';
import './mobile.less';
import { ISwapFormField } from '../../types/runtime';
import { FancyList } from '../../components/fancyLists';
import { parseListData } from '../../utils/normalizeUtils';

/**
 * 自定义控件运行态 Mobile 视图
 */
const FormField: ISwapFormField = {
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
    vlauedata.biao_name = 'lease_payments';
    const TestRegistField = form.getFieldInstance('TestRegist');
    const key = TestRegistField.getProp('id');
    const value = '1';
    const bizAsyncData = [
      {
        key,
        bizAlias: 'TestRegist',
        extendValue: vlauedata,
        value,
      },
    ];

    // 入参和返回参考套件数据刷新集成接口文档
    spi
      .refreshData({
        modifiedBizAlias: ['TestRegist'],
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
      dtar = '租赁结算-' + item.name;
    } else if (this.state.detdate === 'b1') {
      dtar = '租赁合同-' + item.name;
    } else if (this.state.detdate === 'c1') {
      dtar = '机械费结算-' + item.name;
    }
    console.log(dtar);
    form.setFieldValue('RegistField', item.contract_name);
    this.setState({ inputvalue: dtar, showElem: 'none' });
    form.setFieldValue('TestRegist', dtar);
    form.setFieldExtendValue('TestRegist', dtar);
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
    const field = form.getFieldInstance('TestRegist');
    const label = form.getFieldProp('TestRegist', 'label');
    const required = form.getFieldProp('TestRegist', 'required');
    const parsers = {
      LeaseSettle: [
        {
          key: 'name',
          label: '结算名称',
          index: 1,
          title: true,
        },
        {
          key: 'supplier',
          label: '租赁单位',
          index: 2,
        },
        {
          key: 'reply_money',
          label: '结算金额',
          index: 3,
        },
      ],
      LeaseContract: [
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
      ],
      MachineFeeSettle: [
        {
          key: 'name',
          label: '结算名称',
          index: 1,
          title: true,
        },
        {
          key: 'extend_first',
          label: '租赁单位',
          index: 2,
        },
        {
          key: 'detailed_money',
          label: '结算金额',
          index: 3,
        },
      ],
    };
    const tabs = [
      { title: '租赁结算' },
      { title: '租赁合同' },
      { title: '机械费结算' },
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
            }
            this.setState({
              allData: newpage,
            });
            this.asyncSetFieldProps(newpage);
          }}
        >
          <div>
            <FancyList
              data={parseListData(this.state.listData, parsers.LeaseSettle)}
              itemClick={this.habdlClick}
            />
          </div>
          <div>
            <FancyList
              data={parseListData(this.state.listData, parsers.LeaseContract)}
              itemClick={this.habdlClick}
            />
          </div>
          <div>
            <FancyList
              data={parseListData(
                this.state.listData,
                parsers.MachineFeeSettle,
              )}
              itemClick={this.habdlClick}
            />
          </div>
        </Tabs>
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
  handleOk: function (): void {
    throw new Error('Function not implemented.');
  },
  handleCancel: function (): void {
    throw new Error('Function not implemented.');
  },
  methods: function () {
    throw new Error('Function not implemented.');
  },
};

export default FormField;
