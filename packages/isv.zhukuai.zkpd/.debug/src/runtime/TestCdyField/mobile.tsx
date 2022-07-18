//重构完成
import 'dingtalk-jsapi/entry/union';
import * as dd from 'dingtalk-jsapi'; // 此方式为整体加载，也可按需进行加载

import { Drawer, InputItem, SearchBar, Tabs, Toast } from 'antd-mobile';
import React from 'react';
import { createPortal } from 'react-dom';
import {
  handleSaveTaxTable,
  handleTaxTableStatistics,
} from '../../components/handleTables';
import { DataType, ISwapFormField } from '../../types/runtime';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { searchBarChange, searchBarSubmit } from '../../utils/searchUtils';
import { HandledDetailDialogMobile } from '../../components/addDetail';
import {
  parseListData,
  traverseAndParseTreeData,
  uniqueArrayByKey,
} from '../../utils/normalizeUtils';
import { FancyList } from '../../components/fancyLists';
import { DetailList } from '../../components/listDetail';
const now = new Date();

const FormField: ISwapFormField = {
  getInitialState() {
    return {
      infourl: '',
      updateTreeDate: '1',
      activeKey: '',
      datadate: '',
      leftTreeDate: [],
      stateData: [],
      stateKey: [],

      deColumns: [
        {
          title: '物资名称',
          dataIndex: 'name',
        },
        {
          title: '单位',
          dataIndex: 'unit',
        },
        {
          title: '规格型号',
          dataIndex: 'size',
        },
        {
          title: '需用数量',
          dataIndex: 'det_quantity',
        },
        {
          title: '不含税单价(元)',
          dataIndex: 'no_unit_price',
        },
        {
          title: '含税单价(元)',
          dataIndex: 'unit_price',
        },
        {
          title: '税率(%)',
          dataIndex: 'tax_rate',
        },

        {
          title: '税额(元)',
          dataIndex: 'tax_amount',
        },
        {
          title: '不含税金额(元)',
          dataIndex: 'no_amount_tax',
        },
        {
          title: '含税金额(元)',
          dataIndex: 'amount_tax',
        },
        {
          title: '已入库量',
          dataIndex: 'quantity_rk',
        },
        {
          title: '总计划量',
          dataIndex: 'quantity_zong',
        },
      ],
      Inputmoney1: '',
      checkData: [],
      chenkdata: '',
      treevalue: undefined,
      treeData: [],
      cascadeValue: [],
      cascadeData: [],
      showTypes: true,
      popUpVisible: false,
      popUpCascadeVisible: false,
      detdate: 'c1',
      date: now,
      checkindex: '',
      SearchBarvalue: '',
      showElem: 'none',
      showElem2: 'none',
      showElem3: 'none',
      inputvalue: '',
      allData: { type: '0', number: '99999', page: '1', name: '' },
      listData: [],
      fixedColumn: '',
      materialList: [
        {
          id: '',
          typename: '',
          name: '',
          size: '',
          unit: '',
          det_quantity: '',
          no_unit_price: '',
          tax_rate: '',
          tax_amount: '',
          amount_tax: '',
          no_amount_tax: '',
        },
      ],
    };
  },
  handleOk: function (): void {
    throw new Error('Function not implemented.');
  },
  handleCancel() {
    this.setState({
      showElem: 'none',
    });
  },
  methods() {
    const _this = this;
    return {
      ResetClick() {
        _this.setState({
          detailname: '',
          Inputmoney2: 0,
          Inputmoney1: 0,
          materialList: [
            {
              id: '',
              typename: '',
              name: '',
              size: '',
              unit: '',
              det_quantity: '',
              no_unit_price: '',
              tax_rate: '',
              tax_amount: '',
              amount_tax: '',
              no_amount_tax: '',
            },
          ],
        });
      },
      runDDDateTiem() {
        console.log('调用ddapi');
        dd.ready(function () {
          dd.device.notification.alert({
            message: '测试',
            title: '提示',
            buttonName: '收到',
            //@ts-ignore
            onSuccess: function () {
              //onSuccess将在点击button之后回调
              /*回调*/
              console.log(231312);
            },
          });
        });

        // dd.ready(function () {
        //   dd.biz.util.datepicker({
        //     format: 'yyyy-MM-dd', //注意：format只支持android系统规范，即2015-03-31格式为yyyy-MM-dd
        //     value: '2015-04-17', //默认显示日期
        //     onSuccess: function (date: any): void {
        //       console.log(date, 'dats');
        //     },
        //     //   onFail: function (err) {},
        //   });
        // });
      },
    };
  },
  asyncSetFieldProps(data: any, type = 0, updateCascade = true) {
    const _this = this;
    const promise = asyncSetProps(
      _this,
      data,
      'TestCin',
      'material_warehousing',
    );
    promise.then(res => {
      console.log('1234543=======', res);
      _this.setState({
        listData: [...res.dataArray],
      });
      const treeArray = [
        {
          title: '物资类型',
          key: '0',
          children: [...res.extendArray],
        },
      ];
      if (updateCascade && res.extendArray.length > 0) {
        const cascadeArray = [traverseAndParseTreeData(treeArray[0])];
        _this.setState({
          cascadeData: cascadeArray,
        });
      }
      if (_this.state.updateTreeDate === '1') {
        _this.setState({
          leftTreeDate: [...treeArray],
          treeData: [...treeArray],
          stateData: [[...treeArray]],
        });
      }
      switch (type) {
        case 1:
          _this.setState({
            materialList: res.dataArray,
          });
          handleTaxTableStatistics(_this, res.dataArray);
          break;
        case 2:
          _this.setState({
            checkData: res.dataArray,
          });
          break;
        default:
          break;
      }
      if (res.message) {
        Toast.info(res.message, 1);
      }
    });
  },
  fieldDidUpdate() {
    if (!this.props.runtimeProps.viewMode) {
      console.log('发起页1：fieldDidUpdate');
      const editData = {
        hanmoney: 0,
        nomoney: 0,
        infourl: '',
        detailname: '',
        detailedData: [], //物资明细
      };
      if (this.state.infourl) {
        editData.infourl = this.state.infourl;
      }
      if (this.state.Inputmoney1) {
        editData.hanmoney = Number(this.state.Inputmoney1);
      }
      if (this.state.Inputmoney2) {
        editData.nomoney = Number(this.state.Inputmoney2);
      }
      editData.detailname = this.state.chenkdata;
      editData.detailedData = this.state.materialList;
      const newlistdata = this.state.materialList;
      const str2 = this.state.chenkdata;
      let str0 =
        '\n' +
        '设备名称 单位 规格型号 数量 不含税单价 含税单价 税率 税额 不含税金额 含税金额';
      const str1 =
        '\n' +
        ' 不含税金额合计(元):' +
        this.state.Inputmoney2 +
        '\n' +
        '含税金额合计(元):' +
        this.state.Inputmoney1;
      for (let i = 0; i < newlistdata.length; i++) {
        str0 +=
          '\n' +
          newlistdata[i].name +
          ' ' +
          newlistdata[i].unit +
          ' ' +
          newlistdata[i].size +
          ' ' +
          newlistdata[i].det_quantity +
          ' ' +
          newlistdata[i].no_unit_price +
          ' ' +
          newlistdata[i].unit_price +
          ' ' +
          newlistdata[i].tax_rate +
          ' ' +
          newlistdata[i].tax_amount +
          ' ' +
          newlistdata[i].no_amount_tax +
          ' ' +
          newlistdata[i].amount_tax;
      }
      const str = str2 + str0 + str1;

      const { form } = this.props;
      form.setFieldValue('TestCin', str);
      form.setFieldExtendValue('TestCin', editData);
    }
  },
  fieldRender() {
    const { form } = this.props;
    const field = form.getFieldInstance('TestCin');
    const label = form.getFieldProp('TestCin', 'label');
    // const onChangetree = value => {
    //   console.log(value);
    //   this.setState({ cascadeValue: value });
    // };

    return (
      <div className="CorpHouse_class_m">
        <div className="field-wrapper">
          <div className="field-wrapper">
            <div className="m-group m-group-mobile">
              <div className="m-field-wrapper">
                <div className="m-field m-field-mobile m-select-field">
                  <div className="m-field-head">
                    <div className="m-field-label">
                      <span>{label}abcdefghigk</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 测试 */}

            <div onClick={this.methods().runDDDateTiem}>调用钉钉api</div>
          </div>
        </div>
      </div>
    );
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
