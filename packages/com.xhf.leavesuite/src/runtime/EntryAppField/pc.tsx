import React from 'react';
import { Input, Button } from 'antd';
import { IFormField } from '../../types';

import './pc.less';

interface ISwapFormField extends IFormField {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAdd: () => void;
}

/**
 * 自定义控件运行态 PC 视图
 */
const FormField: ISwapFormField = {
  /** 控件首次渲染完成之后 */
  fieldDidMount() {
    // 属性改变时，UI及时响应
    const { form, bizAlias } = this.props;
    const field = form.getFieldInstance(bizAlias);
    field.onPropChange(() => this.forceUpdate());
  },
  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { form, bizAlias } = this.props;
    // value对于复杂控件，用于显示
    form.setFieldValue(bizAlias, e.target.value);

    // extendValue用于存储数据

    //  sys 中用于列表搜索
    form.setFieldExtendValue(bizAlias, {
      bizData: JSON.stringify({a:1,b:2}),
      sys: {
        // 用于列表搜索
        searchValue: ['小明'],
        // 用于打印
        printValue: [''],
        exportValue: [''],
      },
    });

  },
  /** 操作明细组件 */
  handleAdd() {
    const { form } = this.props;
    window.form = form;
    const field = form.getFieldInstance('entryAppTable');
    const rows = field!.tbody!.rows || [];
    //TODO:xhf-动态修改明细组件
    // 动态添加一行
    // key 对应 bizAlias
    field.tbody.add([{key: "entryAppTableNumber",value: "999"},{key: "entryAppTableText",value: "1212"}])
    // 动态修改某一单元格
    rows.map(el => {
      el!.fields.map(ol => {
        const bizAlias = ol.getProp('bizAlias');
        if (bizAlias === 'entryAppTableText') {
          ol.setValue('1');
        }
      });
    });
  },
  fieldRender() {
    const { form } = this.props;
    const field = form.getFieldInstance('entryAppType');
    const label = form.getFieldProp('entryAppType', 'label');
    const placeholder = form.getFieldProp('entryAppType', 'placeholder');

    return (
      <div className="pc-custom-field-wrap">
        <div className="label">{label}</div>
        {field.getProp('viewMode') ? (
          field.getValue()
        ) : (
          <>
            <div className="label">
              <Input placeholder={placeholder} onChange={this.handleChange} allowClear/>
            </div>
            <Button onClick={()=>{ this.handleAdd() }}>明细控件-动态添加数据</Button>
          </>
        )}
      </div>
    );
  },
};

export default FormField;
