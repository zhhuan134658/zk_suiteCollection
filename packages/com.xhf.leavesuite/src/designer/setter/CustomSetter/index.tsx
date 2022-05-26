import React from 'react';
import { Switch } from 'antd';
import { ISuiteDesignerSetter } from '../../../types';
import './style.less';

interface ISuiteSetterDemo extends ISuiteDesignerSetter {
  handleChange: (checked: boolean) => void;
}

const SuiteSetterDemo: ISuiteSetterDemo = {
  getInitialState() {
    return {
      checked: false,
    };
  },
  setterDidMount() {
    console.log('setterDidMount', window);
    const props = this.getFieldProps('entryAppReason'); 
    this.setState({
      checked: props.hidden
    })
  },
  handleChange(checked) {
    this.setFieldProps('entryAppReason', {
      hidden: checked,
    }); 
    this.setState({
      checked
    })
  },

  setterRender() {
    return (
      <div>
        <div>{this.props.label}</div>
        <Switch checked={this.state.checked} onChange={this.handleChange} />
      </div>
    );
  },
};

export default SuiteSetterDemo;
