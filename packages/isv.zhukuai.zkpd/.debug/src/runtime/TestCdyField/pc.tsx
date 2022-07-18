import 'dingtalk-jsapi/entry/union';
import * as dd from 'dingtalk-jsapi'; // 此方式为整体加载，也可按需进行加载
import React from 'react';
import {
  Tabs,
  notification,
  Table,
  Tooltip,
  Modal,
  Input,
  Button,
  Popconfirm,
  Layout,
  Pagination,
  Tree,
} from 'antd';

import { asyncSetProps } from '../../utils/asyncSetProps';
import { ColumnTypes, DataType, ISwapFormField } from '../../types/runtime';

const FormField: ISwapFormField = {
  getInitialState() {
    return {
      state: 1,
    };
  },
  methods() {
    return {
      ResetClick: () => {
        this.setState(
          {
            state: 2,
          },
          () => {
            console.log(this.state.state);
          },
        );
      },
      onChange: e => {
        console.log(e.target.value);
      },
      SetStates: () => {
        this.setState({});
      },
      openSolidModal: () => {
        dd.ready(function () {
          dd.biz.util.openSlidePanel({
            url: 'about:blank', //打开侧边栏的url
            title: 'title', //侧边栏顶部标题
            onSuccess: function (result) {
              /*
            调用biz.navigation.quit接口进入onSuccess, result为调用biz.navigation.quit传入的数值
        */
            },
            onFail: function () {
              /*
            tips:点击右上角上角关闭按钮会进入onFail
         */
            },
          });
        });
      },
    };
  },
  asyncSetFieldProps(data: any) {
    const _this = this;
    const bizAlias = 'TestCdy';
    const promise = asyncSetProps(_this, data, bizAlias);
    promise.then(res => {
      console.log('TESTCDY', res);
    });
  },
  fieldDidUpdate() {},
  fieldRender() {
    const { form } = this.props;
    const field = form.getFieldInstance('TestCdy');
    const label = form.getFieldProp('TestCdy', 'label');
    const required = form.getFieldProp('TestCdy', 'required');
    return (
      <div className="TestPurField_class">
        <div className="pc-custom-field-wrap">
          <div>
            <div
              className="label"
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <div>
                {required ? (
                  <span style={{ color: '#ea6d5c' }}>*</span>
                ) : (
                  <span style={{ color: '#fff' }}>*</span>
                )}
                {label}
              </div>
              <div
                style={{
                  position: 'fixed',
                  bottom: 0,
                  right: 0,
                  opacity: 0.15,
                }}
              >
                {'Version: 3.1.2'}
              </div>
              <div style={{ color: '#409EFF', cursor: 'pointer' }}>
                <Popconfirm
                  title="是否重置？重置后明细表格将清空。"
                  onConfirm={this.methods().ResetClick}
                  okText="是"
                  cancelText="否"
                >
                  <span>重置明细</span>
                </Popconfirm>
              </div>
            </div>
          </div>

          <div onClick={this.methods().ResetClick}>修改state</div>

          <div style={{ marginTop: '10px' }}>state:{this.state.state}</div>
          <div>
            <Input placeholder="testcdy" onChange={this.methods().onChange} />
          </div>

          <div onClick={this.methods().openSolidModal}>打开侧边面板</div>
        </div>
      </div>
    );
  },
  suiteDidMount: function () {
    throw new Error('Function not implemented.');
  },
  handleOk: function (): void {
    throw new Error('Function not implemented.');
  },
  handleCancel: function (): void {
    throw new Error('Function not implemented.');
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
