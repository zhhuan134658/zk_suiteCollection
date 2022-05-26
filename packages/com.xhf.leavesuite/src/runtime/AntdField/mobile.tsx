import React from 'react';
import { createPortal } from 'react-dom';
import { IFormField } from '../../types';
import {
  Drawer,
  List,
} from 'antd-mobile';
import './mobile.less';


interface ISwapFormField extends IFormField {
  onOpenChange: () => void;
  handleClick: (item) => void;
}

/**
 * 自定义控件运行态 Mobile 视图
 */
const FormField: ISwapFormField = {
  getInitialState() {
    return {
      open: false,
      inputValue: '',
      listData: [
        {id:1, name: 'a', type:'a'},
        {id:2, name: 'b', type:'a'},
        {id:3, name: 'c', type:'a'},
      ],
    };
  },
  onOpenChange() {
    this.setState({ open: !this.state.open });
  },
  handleClick(item: { id:any, name: string; type: string }) {
    const { form, bizAlias } = this.props;
    console.log(item);
    this.setState({ inputValue: item.name, open: false }, () => {
      form.setFieldValue(bizAlias, item.name);
      form.setFieldExtendValue(bizAlias, {
        data: item,
      });
    });
  },

  fieldRender() {
    const { form, runtimeProps, bizAlias } = this.props;
    const { viewMode } = runtimeProps;
    const field = form.getFieldInstance(bizAlias);
    const label = field.getProp('label');
    const required = field.getProp('required');
    const placeholder = field.getProp('placeholder');

    // 详情页
    if (viewMode) {
      const value = field.getValue();
      return (
        <div className="field-wrapper">
          <div className="label">{label}</div>
          <div style={{ marginTop: '10px' }}> {value}</div>
        </div>
      );
    }
    
    const { listData, inputValue, open } = this.state;
    const sidebar = (
      <div>
        <List>
          {listData.map((item, index) => {
            return (
              <List.Item
                onClick={() => { this.handleClick(item) }}
                key={index}
                multipleLine
              >
                {item.name}
              </List.Item>
            );
          })}
        </List>
      </div>
    );
    return (
      <div className="CorpHouse_class_m">
        <div className="field-wrapper">
          <div className="m-group m-group-mobile">
            <div className="m-field-wrapper">
              <div className="m-field m-field-mobile m-mobile-input vertical">
                <div className="m-field-head" style={{ marginLeft: '-5px' }}>
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
                      <input
                        readOnly
                        className="ant-input m-mobile-inner-input"
                        type="text"
                        placeholder="请选择"
                        value={inputValue}
                        onClick={()=>{ this.onOpenChange() }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 使用这种方式，将组件挂在到根元素下，防止样式污染 */}
            {createPortal(
              <Drawer
                open={true}
                style={{
                  zIndex: 11,
                  minHeight: document.documentElement.clientHeight,
                  display: open ? 'block' : 'none',
                }}
                enableDragHandle
                contentStyle={{
                  color: '#A6A6A6',
                  textAlign: 'center',
                  paddingTop: 42,
                }}
                sidebar={sidebar}
                onOpenChange={() => {this.onOpenChange()}}
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
