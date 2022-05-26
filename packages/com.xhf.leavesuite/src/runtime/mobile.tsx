import { ISuiteRuntime } from '../types';
import './mobile.less';
import '@ali/dingtalk-jsapi/entry/union';
interface ISwapDemoSuite extends ISuiteRuntime {
  formDataLinkagehandler: () => void;
}

const SwapDemoSuite: ISwapDemoSuite = {
  suiteDidMount() {
    const { form } = this.props;
    const hiddenReason = form.getSuiteProp('hiddenReason');
    if (hiddenReason) {
      form.getFieldInstance('entryAppReason').hide();
    }

    this.formDataLinkagehandler();
  },

  // 关联选项
  formDataLinkagehandler() {
    const { form } = this.props;
    const entryAppTypeField = form.getFieldInstance('entryAppType');
    const entryAppReasonField = form.getFieldInstance('entryAppReason');

    entryAppTypeField.onExtendValueChange(option => {
      if (option.key === 'option_2') {
        entryAppReasonField.show();
      } else {
        entryAppReasonField.hide();
      }
    });
  },
};

export default SwapDemoSuite;
