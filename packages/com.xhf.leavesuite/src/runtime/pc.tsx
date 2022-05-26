import find from 'lodash/find';
import get from 'lodash/get';
import { ISuiteRuntime } from '../types';
import './pc.less';

interface ISwapDemoSuite extends ISuiteRuntime {
  formDataLinkagehandler: () => void;
  asyncSetFieldProps: () => void;
}

const SwapDemoSuite: ISwapDemoSuite = {
  suiteDidMount() {
    const { form } = this.props;
    console.error(`suiteDidMount`, window);
    const hiddenReason = form.getSuiteProp('hiddenReason');
    const entryAppPostExtendValue = form.getFieldExtendValue('entryAppPost');
    const entryAppReasonField = form.getFieldInstance('entryAppReason');

    if (hiddenReason) {
      entryAppReasonField.hide();
    }

    if (entryAppPostExtendValue?.key === 'option_post_1') {
      entryAppReasonField.hide();
    }

    this.formDataLinkagehandler();
    this.asyncSetFieldProps();
  },

  // 关联选项
  formDataLinkagehandler() {
    const { form } = this.props;
    const entryAppPostField = form.getFieldInstance('entryAppPost');
    const entryAppReasonField = form.getFieldInstance('entryAppReason');

    entryAppPostField.onExtendValueChange(option => {
      if (option.key === 'option_post_2') {
        this.asyncSetFieldProps();
        entryAppReasonField.show();
      } else {
        entryAppReasonField.hide();
      }
    });
  },

  // 动态获取业务数据
  asyncSetFieldProps() {
    const { form, spi } = this.props;
    const entryAppPostField = form.getFieldInstance('entryAppPost');
    const entryAppReasonField = form.getFieldInstance('entryAppReason');
    const value = entryAppPostField.getValue();
    const extendValue = entryAppPostField.getExtendValue();
    const key = entryAppPostField.getProp('id');
    const bizAsyncData = [
      {
        key,
        bizAlias: 'entryAppPost',
        extendValue,
        value,
      },
    ];
    // 动态刷新接口数据
    spi
      .refreshData({
        modifiedBizAlias: ['entryAppReason'], // spi接口要改动的是entryAppReason的属性值
        bizAsyncData,
      }, 
      // 第二个参数可选，为mock数据返回用
      {
            "dataList": [
                {   // 表单数据变化后，类型发生变化，则请求备注动态变化
                    "bizAlias": "entryAppReason",
                    "extendValue": "",
                    "value": `想入职111111111111111了-${Date.now()}`
                }
            ]
        })
      .then(res => {
        const entryAppReasonData = find(
          res.dataList,
          item => item.bizAlias === 'entryAppReason',
        );
        const data = get(entryAppReasonData, 'value');
        entryAppReasonField.setValue(data);
      });
  },
};

export default SwapDemoSuite;
