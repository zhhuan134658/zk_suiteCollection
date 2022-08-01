import 'dingtalk-jsapi/entry/union';
import * as dd from 'dingtalk-jsapi'; // 此方式为整体加载，也可按需进行加载
import React from 'react';
import { Input, Popconfirm } from 'antd';

import { asyncSetProps } from '../../utils/asyncSetProps';
import { ISwapFormField } from '../../types/runtime';
import { CustomField } from '../../components/customField';

const FormField: ISwapFormField = {
  getInitialState() {
    return {
      state: 1,
      allData: {
        type: '',
        pageSize: 10,
        page: 1,
        name: '', // 搜索value
        supplier_type: '', // 树结构type
      },
    };
  },
  fieldDidMount() {
    const { form } = this.props;
    const field = form.getFieldInstance('TestPurTables');
    const getProp = field.getProp();
    const getValue = field.getValue();
    const getExtendValue = field.getExtendValue();
    console.log(getProp, getValue, getExtendValue, 'cccccccccccccccc');
    form.onFieldExtendValueChange('TestPurTables', value => {
      console.log(value, 'aaaaaaaaaaaaaaaaaaaa');
    });
    form.onFieldValueChange('TestPurTables', value => {
      console.log(value, 'vbbbbbbbbbbbbb', getValue);
    });
    // const dataSourceRun = [
    //   {
    //     name: '1234',
    //     number: 1,
    //   },
    //   {
    //     name: '4321',
    //     number: 2,
    //   },
    // ];
    // dataSourceRun.map((item: any, index) => {
    //   const {
    //     name,
    //     number,
    //     // unit,
    //     // size,
    //     // det_quantity,
    //     // no_unit_price,
    //     // unit_price,
    //     // tax_rate,
    //     // tax_amount,
    //     // no_amount_tax,
    //     // amount_tax,
    //     // quantity_rk,
    //     // quantity_zong,
    //   } = item;
    //   const newlist = [
    //     { key: 'name', value: name || '' },
    //     { key: 'number', value: number || '' },
    //     // { key: 'unit', value: unit || '' },
    //     // { key: 'size', value: size || '' },
    //     // { key: 'det_quantity', value: det_quantity || '' },
    //     // { key: 'no_unit_price', value: no_unit_price || '' },
    //     // { key: 'unit_price', value: unit_price || '' },
    //     // { key: 'tax_rate', value: tax_rate || '' },
    //     // { key: 'tax_amount', value: tax_amount || '' },
    //     // { key: 'no_amount_tax', value: no_amount_tax || '' },
    //     // { key: 'amount_tax', value: amount_tax || '' },
    //     // { key: 'quantity_rk', value: quantity_rk || '' },
    //     // { key: 'quantity_zong', value: quantity_zong || '' },
    //   ];
    //   //   console.log(newlist, 'newlist');
    //   field.tbody.add(newlist);
    //   //   console.log('77777', field.tbody);
    // });
  },
  methods() {
    return {
      addSelfTable: (): void => {
        console.log('add');
        const { form } = this.props;
        const field = form.getFieldInstance('TestPurTables');

        // const { dataSourceRun } = this.state;
        const dataSourceRun = [
          {
            name: '1234',
            number: 1,
          },
          {
            name: '4321',
            number: 2,
          },
        ];
        dataSourceRun.map((item: any, index) => {
          const {
            name,
            number,
            // unit,
            // size,
            // det_quantity,
            // no_unit_price,
            // unit_price,
            // tax_rate,
            // tax_amount,
            // no_amount_tax,
            // amount_tax,
            // quantity_rk,
            // quantity_zong,
          } = item;
          const newlist = [
            { key: 'name', value: name || '' },
            { key: 'number', value: number || '' },
            // { key: 'unit', value: unit || '' },
            // { key: 'size', value: size || '' },
            // { key: 'det_quantity', value: det_quantity || '' },
            // { key: 'no_unit_price', value: no_unit_price || '' },
            // { key: 'unit_price', value: unit_price || '' },
            // { key: 'tax_rate', value: tax_rate || '' },
            // { key: 'tax_amount', value: tax_amount || '' },
            // { key: 'no_amount_tax', value: no_amount_tax || '' },
            // { key: 'amount_tax', value: amount_tax || '' },
            // { key: 'quantity_rk', value: quantity_rk || '' },
            // { key: 'quantity_zong', value: quantity_zong || '' },
          ];
          console.log(field.tbody, 'field.tbody');
          //   console.log(newlist, 'newlist');
          //   field.tbody.add(newlist);
          //   console.log('77777', field.tbody);
        });
      },
    };
  },
  asyncSetFieldProps() {
    const { allData } = this.state;
    asyncSetProps(this, allData, 'TestCdy').then(res => {
      console.log(res, 'asd');
    });
  },
  fieldDidUpdate() {},
  fieldRender() {
    const { form } = this.props;
    const field = form.getFieldInstance('TestCdy');
    const label = form.getFieldProp('TestCdy', 'label');
    const required = form.getFieldProp('TestCdy', 'required');
    return (
      <CustomField required={required} label={label}>
        <div>测试明细</div>
        <div onClick={this.methods().addSelfTable}>addbaioge</div>
      </CustomField>
    );
  },
};

export default FormField;
