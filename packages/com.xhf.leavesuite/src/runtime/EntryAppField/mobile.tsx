import React from 'react';
import {
  Modal,
  List,
  Button,
} from 'antd-mobile';
import { IFormField } from '../../types';

import './mobile.less';

/**
 * 自定义控件运行态 Mobile 视图
 */
const FormField: IFormField = {
  getInitialState() {
    return {
      visible: false,
    };
  },
  fieldRender() {
    // 如果不需要定制视图 这里直接return null即可 引擎会默认识别children进行渲染
    // return null;
    // 定制渲染
    return (
      <>
        <div 
          className="mobile-wrap" 
          onClick={()=>{
            this.setState({
              visible: true,
            })
          }}
        >自定义组件，点击弹窗</div>;
        <Modal
          popup
          style={
            {
              top: 0
            }
          }
          visible={this.state.visible}
          onClose={()=>{
            this.setState({
              visible: false,
            })
          }}
          animationType="slide-up"
        >
          <List renderHeader={() => <div>委托买入</div>} className="popup-list">
            {['股票名称', '股票代码', '买入价格'].map((i, index) => (
              <List.Item key={index}>{i}</List.Item>
            ))}
            <List.Item>
              <Button type="primary" onClick={()=>{
                  this.setState({
                    visible: false,
                  })
              }}>买入</Button>
            </List.Item>
          </List>
        </Modal>
      </>
    )
  },
};

export default FormField;
