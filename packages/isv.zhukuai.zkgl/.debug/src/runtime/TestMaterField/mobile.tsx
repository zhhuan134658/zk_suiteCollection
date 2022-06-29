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
    vlauedata.biao_name = 'material_payment';
    const TestMaterField = form.getFieldInstance('TestMater');
    const key = TestMaterField.getProp('id');
    const value = '1';
    const bizAsyncData = [
      {
        key,
        bizAlias: 'TestMater',
        extendValue: vlauedata,
        value,
      },
    ];

    // 入参和返回参考套件数据刷新集成接口文档

    spi
      .refreshData({
        modifiedBizAlias: ['TestMater'], // spi接口要改动的是leaveReason的属性值
        bizAsyncData,
      })
      .then(res => {
        console.log(JSON.parse(res.dataList[0].value));
        //   表格数据
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
      dtar = '材料结算-' + item.name;
    } else if (this.state.detdate === 'b1') {
      dtar = '采购合同-' + item.name;
    } else if (this.state.detdate === 'c1') {
      dtar = '采购订单-' + item.name;
    } else if (this.state.detdate === 'd1') {
      dtar = '材料入库-' + item.name;
    }
    console.log(dtar);
    form.setFieldValue('Conname', item.contract_name);
    form.setFieldExtendValue('Conname', item.contract_name);
    this.setState({ inputvalue: dtar, showElem: 'none' });
    form.setFieldValue('TestMater', dtar);
    form.setFieldExtendValue('TestMater', dtar);
    form.setFieldValue('Selectjia', item.supplier);
    form.setFieldExtendValue('Selectjia', item.supplier);
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
    const field = form.getFieldInstance('TestMater');
    const label = form.getFieldProp('TestMater', 'label');
    const required = form.getFieldProp('TestMater', 'required');
    const tabs = [
      { title: '材料结算' },
      { title: '采购合同' },
      { title: '采购订单' },
      { title: '材料入库' },
    ];
    const parsers = {
      materialTotal: [
        {
          key: 'name',
          label: '结算主题',
          index: 1,
          title: true,
        },
        {
          key: 'supplier',
          label: '供应商',
          index: 2,
        },
        {
          key: 'settle_money',
          label: '结算金额',
          index: 3,
        },
      ],
      purchaseContract: [
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
      purchaseOrder: [
        {
          key: 'name',
          label: '采购名称',
          index: 1,
          title: true,
        },
        {
          key: 'supplier',
          label: '供应商',
          index: 2,
        },
        {
          key: 'tax_total_money',
          label: '结算金额',
          index: 3,
        },
      ],
      materialIn: [
        {
          key: 'name',
          label: '入库主题',
          index: 1,
          title: true,
        },
        {
          key: 'supplier',
          label: '供应商',
          index: 2,
        },
        {
          key: 'extend_four',
          label: '库房',
          index: 3,
        },
      ],
    };
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
            }
            this.setState({
              allData: newpage,
            });
            this.asyncSetFieldProps(newpage);
          }}
        >
          <div>
            <FancyList
              data={parseListData(this.state.listData, parsers.materialTotal)}
              itemClick={this.habdlClick}
            />
          </div>
          <div>
            <FancyList
              data={parseListData(
                this.state.listData,
                parsers.purchaseContract,
              )}
              itemClick={this.habdlClick}
            />
          </div>
          <div>
            <FancyList
              data={parseListData(this.state.listData, parsers.purchaseOrder)}
              itemClick={this.habdlClick}
            />
          </div>
          <div>
            <FancyList
              data={parseListData(this.state.listData, parsers.materialIn)}
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
};

export default FormField;
