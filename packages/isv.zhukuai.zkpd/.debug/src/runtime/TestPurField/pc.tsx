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
import {
  CloseCircleOutlined,
  QuestionCircleOutlined,
  PlusSquareOutlined,
  MinusSquareOutlined,
} from '@ant-design/icons';
import {
  ColumnTypes,
  DataType,
  ISwapFormField,
  NewPage,
} from '../../types/runtime';
import { searchBarSubmitRK } from '../../utils/searchUtils';
import { changePage } from '../../utils/pageUtils';
import {
  deleteRowForTaxCalcTables,
  handleSaveTaxTable,
  handleTaxTableStatistics,
} from '../../components/handleTables';
import { asyncSetProps } from '../../utils/asyncSetProps';
const { Content, Sider } = Layout;
import { EditableRow } from '../../components/editableRow';
import { EditableCell } from '../../components/editableCell';
import { ImportDialog } from '../../components/importData';
import { parsePrintString } from '../../utils/printStringParser';
import { purColumns } from '../../printColumns/TestPurField';
import { DetailDialogDesktop } from '../../components/addDetail';
import { uniqueArrayByKey } from '../../utils/normalizeUtils';

import { SelectBtn } from '../../components/selectBtn/index';
import { PaginationBox } from '../../components/paginationBox/index';

import './pc.less';
import { arrayOf } from 'prop-types';

const { Search } = Input;
const { TabPane } = Tabs;

const myColumns = [
  {
    title: '采购主题',
    dataIndex: 'name',
    render: (_, record: any) => {
      const text = record.xuan === 1 ? '#000000' : '#000000';
      const style = {
        color: text,
      };
      return (
        <Tooltip placement="topLeft" title={record.name}>
          <span style={style}>{record.name}</span>
        </Tooltip>
      );
    },
  },
  {
    title: '采购金额',
    dataIndex: 'detailed_money',
    width: 100,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 100,
    ellipsis: true,
    render: (_, record: any) => (
      <a
        onClick={() =>
          dd.ready(() => {
            dd.biz.util.openSlidePanel({
              url: record.url, //打开侧边栏的url
              title: '详情', //侧边栏顶部标题
              onSuccess: function (result) {},
              onFail: function () {},
            });
          })
        }
      >
        查看详情
      </a>
    ),
  },
];

const myColumsChildren = [
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
    dataIndex: 'number',
  },
  {
    title: '累计申请量',
    dataIndex: 'number1',
  },
  {
    title: '总计划量',
    dataIndex: 'number2',
  },
  {
    title: '参考价格',
    dataIndex: 'number3',
  },
  {
    title: '小计(元)',
    dataIndex: 'number4',
  },
  {
    title: '备注',
    dataIndex: 'number5',
  },
];

const columnsNew = [
  {
    title: '计划主题',
    dataIndex: 'name',
    render: (_, record: any) => {
      const text = record.xuan === 1 ? '#000000' : '#000000';
      const style = {
        color: text,
      };
      return (
        <Tooltip placement="topLeft" title={record.name}>
          <span style={style}>{record.name}</span>
        </Tooltip>
      );
    },
  },
  {
    title: '项目名称',
    dataIndex: 'project_name',
    width: 200,
  },
];

const treeDiagramColumns = [
  {
    title: '物品名称',
    dataIndex: 'name',
    render: (_: any, record: any) => (
      <Tooltip placement="topLeft" title={record.name}>
        <span>{record.name}</span>
      </Tooltip>
    ),
  },

  {
    title: '物品类型',
    dataIndex: 'type_name',
  },
  {
    title: '单位',
    dataIndex: 'unit',
  },
  {
    title: '规格型号',
    dataIndex: 'size',
  },
];

const FormField: ISwapFormField = {
  getInitialState() {
    return {
      infourl: '',
      detailPage: 1,
      defaultActiveKey: 'purchase_Apply_For',
      value: undefined,
      msgdata: '',
      newOptine: [],
      visibleModal: false,
      //   dstatus: '1',
      detailname: '',
      Inputmoney2: '',
      Inputmoney1: '', // 含税
      current_page: '',
      total2: '',
      allData: {
        type: '',
        pageSize: 10,
        page: 1,
        name: '',
      },
      isModalVisible: false,
      isModalVisibletree: false,

      // 采购清单
      listData: [],
      dataSource: [],

      // 材料总计划
      materialSource: [],
      materialSourceRun: [],

      dataSourceRun: [], // 基础表格数据渲染

      treeData: [],
      pagination: {
        current: 1,
        pageSize: 10,
      },

      loading: false,
      leaveLongVal: '',

      count: 1,
      fixedColumn: '',
      currentEditId: 0,
      currentSelectData: [],
      currentSelectDataid: [],
      selectedRowKeys: [], // 一级表格选中的keys
      selectAutoProValue: '', // 所属项目 label值
      expandedRowKeys: [], // 关联modal下表格展开子表格数据keys
      childrenRowKeys: [], // 子表格数据选中的keys
    };
  },
  methods() {
    const _this = this;
    return {
      returnDetailName(detailname: string = ''): string {
        const { defaultActiveKey } = _this.state;
        const selectBtnTitle: string = detailname
          ? defaultActiveKey === 'purchase_Apply_For'
            ? `采购申请-${detailname}`
            : `材料总计划-${detailname}`
          : '';
        return selectBtnTitle;
      },
      addNewDetail(): void {
        _this.setState({
          visibleModal: true,
        });
      },
      handleModalCancel(): void {
        _this.setState({
          visibleModal: false,
        });
      },
      handleSetTableData(data: Array<any>): void {
        const sourceData = [..._this.state.dataSource];
        let newData = [];
        if (sourceData && sourceData.length > 0) {
          newData = sourceData.concat(data);
        } else {
          newData = data;
        }
        console.log('dataLength', newData.length);
        _this.setState(
          {
            dataSource: [...newData],
          },
          () => {
            handleTaxTableStatistics(_this);
          },
        );
      },
      handleSearch(value: any, rk_id: string) {
        searchBarSubmitRK(_this, value, rk_id);
      },
      handleChangePage(page: number, pageSize: number, type: string) {
        const { allData } = _this.state;
        Object.assign(allData, { page, pageSize, type });
        _this.setState(
          {
            allData,
          },
          () => {
            _this.asyncSetFieldProps();
          },
        );
      },
      handleTreeChangePage(page: any) {
        _this.setState({ detailPage: page });
        changePage(_this, page, '-1');
      },
      handleRowChange(row: DataType) {
        _this.setState({
          currentEditId: row.key,
        });
      },
      ResetClick() {
        _this.setState({
          Inputmoney2: 0,
          Inputmoney1: 0,
          detailname: '',
          selectedRowKeys: [],
          expandedRowKeys: [],
          childrenRowKeys: [],
          dataSource: [],
          dataSourceRun: [],
        });
      },
      iconClick() {
        _this.setState({
          infourl: '',
          detailname: '',
          dataSource: [],
          Inputmoney2: 0,
          Inputmoney1: 0,
        });
      },

      handleRowDelete(row: any) {
        const { childrenRowKeys, dataSources } = _this.state;
        const { id } = row;
        const removeChildId = childrenRowKeys.filter(v => v !== id);
        if (removeChildId.length <= 0) {
          _this.setState({
            dataSource: [],
            Inputmoney2: 0,
            Inputmoney1: 0,
            detailname: '',
            selectedRowKeys: [],
            expandedRowKeys: [],
            childrenRowKeys: [],
          });
        } else {
          const newDataSource = dataSources.filter(v => v.id !== id);
          let newInputmoney1 = 0;
          let newInputmoney2 = 0;
          newDataSource.forEach(item => {
            /**
             * amount_tax 含税金额
             * no_amount_tax  不含税金额
             */
            const { amount_tax, no_amount_tax } = item;
            newInputmoney1 += Number(amount_tax) ? Number(amount_tax) : 0;
            newInputmoney2 += Number(no_amount_tax) ? Number(no_amount_tax) : 0;
          });
          this.setState({
            childrenRowKeys: removeChildId,
            dataSources: newDataSource,
            Inputmoney2: newInputmoney2,
            Inputmoney1: newInputmoney1,
          });
        }

        // deleteRowForTaxCalcTables(_this, row);
      },
      handleProjectAdd() {
        const { defaultActiveKey } = _this.state;
        const newPage = {
          type: defaultActiveKey,
          pageSize: 10,
          page: 1,
          name: '',
        };
        _this.setState(
          {
            allData: newPage,
            dataSource: [],
            dataSourceRun: [],
          },
          () => {
            _this.asyncSetFieldProps();
            _this.setState({
              isModalVisible: true,
            });
          },
        );
      },
      handleDetailAdd() {
        const { form } = _this.props;
        const projectName = form.getFieldValue('Autopro');
        if (!projectName) {
          return notification.open({
            message: '请先选择项目',
          });
        }
        const newpage = {
          type: 'material_Info',
          pageSize: 10,
          page: _this.state.detailPage,
          name: '',
        };
        _this.setState(
          {
            allData: newpage,
          },
          () => {
            _this.asyncSetFieldProps();
            _this.setState({
              isModalVisibletree: true,
            });
          },
        );
      },
      handleSave(row: DataType, values: any) {
        const dataList = _this.state.dataSource;

        const key = Object.keys(values)[0];
        //console.log('Key', key);
        const data = handleSaveTaxTable(_this, dataList, row, key);
        _this.setState(
          {
            dataSource: [...data],
          },
          () => {
            handleTaxTableStatistics(_this);
          },
        );
      },
      rowClick(record: DataType) {
        const newData = [..._this.state.dataSource];
        const index = newData.findIndex(
          item => item.key === _this.state.currentEditId,
        );
        const key = newData[index].key;
        newData[index] = record;
        newData[index].key = key;
        //console.log('SET DATASOURCE 3');
        _this.setState({ dataSource: newData, isModalVisible: false });
      },
      handleMaterialOK() {
        const newData = [..._this.state.dataSource];
        const selectData = [..._this.state.currentSelectData];
        let lData = [];
        if (selectData.length > 0) {
          selectData.forEach(element => {
            newData.push(element);
          });
        }
        lData = [...uniqueArrayByKey(newData, ['id'])];
        //console.log('Remove duplicate', lData);
        //console.log('SET STATE DATASOURCE 2');
        _this.setState({
          dataSource: lData,
          isModalVisibletree: false,
          selectedRowKeys: [],
        });
      },
      handleMaterialCancel() {
        _this.setState({ isModalVisibletree: false, selectedRowKeys: [] });
      },
      setExpandedRowKeys(record) {
        console.log(record, 'recordasdasdasdasdasdasdasdasdas');
      },
      addSelfTable() {
        const { form } = _this.props;
        const field = form.getFieldInstance('TestPurTable');

        const { dataSourceRun } = _this.state;
        dataSourceRun.map((item: any, index) => {
          const {
            name,
            unit,
            size,
            det_quantity,
            no_unit_price,
            unit_price,
            tax_rate,
            tax_amount,
            no_amount_tax,
            amount_tax,
            quantity_rk,
            quantity_zong,
          } = item;
          const newlist = [
            { key: 'name', value: name || '' },
            { key: 'unit', value: unit || '' },
            { key: 'size', value: size || '' },
            { key: 'det_quantity', value: det_quantity || '' },
            { key: 'no_unit_price', value: no_unit_price || '' },
            { key: 'unit_price', value: unit_price || '' },
            { key: 'tax_rate', value: tax_rate || '' },
            { key: 'tax_amount', value: tax_amount || '' },
            { key: 'no_amount_tax', value: no_amount_tax || '' },
            { key: 'amount_tax', value: amount_tax || '' },
            { key: 'quantity_rk', value: quantity_rk || '' },
            { key: 'quantity_zong', value: quantity_zong || '' },
          ];
          console.log(newlist, 'newlist');
          field.tbody.add(newlist);
          console.log('77777', field.tbody);
        });
      },
    };
  },
  handleOk() {
    const { dataSource, defaultActiveKey, materialSourceRun } = this.state;
    const arr =
      defaultActiveKey === 'purchase_Apply_For'
        ? [...dataSource]
        : [...materialSourceRun];
    this.setState(
      {
        isModalVisible: false,
        dataSourceRun: arr,
        selectedRowKeys: [],
        expandedRowKeys: [],
        childrenRowKeys: [],
      },
      () => {
        this.methods().addSelfTable();
      },
    );
  },
  handleCancel() {
    this.setState({
      isModalVisible: false,
      selectedRowKeys: [],
      expandedRowKeys: [],
      childrenRowKeys: [],
    });
  },
  asyncSetFieldProps(data?: NewPage) {
    const _this = this;
    const { allData } = this.state;
    console.log(allData, 'allData');
    const bizAlias = 'TestPur';
    const promise = asyncSetProps(
      _this,
      allData,
      bizAlias,
      'material_contract',
    );

    promise
      .then(res => {
        console.log('ASYNC', res);
        const { dataArray, page, count, type } = res;
        if (type === 'purchase_Apply_For') {
          // 采购申请
          dataArray.forEach(item => {
            const { id, childrens } = item;
            const lg = childrens.length || 0;
            childrens.forEach(childItem => {
              childItem.pId = id;
              childItem.length = lg;
            });
          });

          console.log(dataArray, 'dataArray');
          this.setState({
            listData: dataArray,
            current_page: page || 1,
            total2: count || 0,
          });
        } else if (type === 'Material_master_plan') {
          // 材料总计划 materialSource
          console.log();
        } else if (type === 'material_Info') {
          // 物资明细
        }

        // const treeArray = [
        //   {
        //     title: '物资类型',
        //     key: '0',
        //     children: res.extendArray,
        //   },
        // ];
        // _this.setState({
        //   treeData: [...treeArray],
        //   current_page: res.currentPage,
        //   total3: res.totalCount,
        // });
        // const dStatus = _this.state.dstatus;
        // console.log(_this.state.dstatus, res, 'ressssss');
        // if (dStatus === '2') {
        //   const dataArray = [...res.dataArray];
        //   _this.setState({
        //     treelistData: dataArray,
        //   });
        //   handleTaxTableStatistics(_this, dataArray);
        // } else if (dStatus === '3') {
        //   const dataArray = [...res.dataArray];
        //   //console.log('SET STATE DATASOURCE 1');
        //   _this.setState({
        //     dataSource: [...dataArray],
        //   });
        //   handleTaxTableStatistics(_this, dataArray);
        // } else if (dStatus === '1') {
        //   if (res.dataArray.length === 0) {
        //     _this.setState({
        //       listData: [],
        //       current_page: 1,
        //       total2: 0,
        //     });
        //   } else {
        //     _this.setState({
        //       listData: [...res.dataArray],
        //       current_page: res.currentPage,
        //       total2: res.totalCount,
        //     });
        //   }
        // }
        // if (_this.state.msgdata === '1') {
        //   notification.open({
        //     message: res.message,
        //   });
        //   _this.setState({
        //     msgdata: '0',
        //   });
        // }
      })
      .catch(e => {
        console.log('ASYNC ERROR', e);
      });
  },
  fieldDidMount() {
    const { form } = this.props;
    /* 监听‘所属项目’START */
    const label = form.getFieldProp('TestPur', 'label');
    const selectAutoPro = form.getFieldInstance('Autopro');
    const initValue = selectAutoPro.getValue();
    const _this = this;
    form.onFieldExtendValueChange('Autopro', (value: any) => {
      console.log(value, 'valuesssssssssssss');
      const { selectAutoProValue } = this.state;
      const initFlag =
        (!selectAutoProValue && value.label !== initValue) ||
        value.label !== selectAutoProValue;
      if (initFlag) {
        _this.setState({
          selectAutoProValue: label,
          Inputmoney2: 0,
          Inputmoney1: 0,
          detailname: '',
          dataSource: [],
          childrenRowKeys: [],
          selectedRowKeys: [],
          expandedRowKeys: [],
        });
      }
    });
    /* 监听‘所属项目’END */

    /* 监听‘不含税金额合计 & 含税金额合计’ START */
    const noAmountTax = form.getFieldInstance('noAmountTax');
    const noAmountTaxValue = noAmountTax.getValue();
    noAmountTax.hide();
    form.onFieldValueChange('noAmountTax', value => {
      this.setState({
        Inputmoney2: value,
      });
    });
    const amountTax = form.getFieldInstance('amountTax');
    const amountTaxValue = amountTax.getValue();
    amountTax.hide();
    form.onFieldValueChange('amountTax', value => {
      this.setState({
        Inputmoney1: value,
      });
    });
    /* 监听‘不含税金额合计 & 含税金额合计’ END */

    /* 监听‘项目地址’START */
    const Address = form.getFieldInstance('Address');

    console.log(
      form.getFieldExtendValue('Address'),
      form.getFieldValue('Address'),
      Address.getValue(),
      'add',
    );
    form.onFieldExtendValueChange('Address', value => {
      console.log(value, 'address');
    });
    /* 监听‘项目地址’END */

    /* 监听‘日期区间’START */
    form.onFieldValueChange('dateRange', value => {
      console.log(value, '日期区间');
    });
    /* 监听‘日期区间’END */

    this.setState({
      Inputmoney1: amountTaxValue,
      Inputmoney2: noAmountTaxValue,
    });

    //TestPurTable
    // form.onFieldValueChange('TestPurTable', value => {
    //   console.log(
    //     value,
    //     'tableTestPurTableTestPurTableTestPurTableTestPurTableTestPurTableTestPurTable',
    //   );
    // });
  },
  fieldDidUpdate() {
    if (!this.props.runtimeProps.viewMode) {
      const { form } = this.props;
      const { dataSourceRun, detailname, infourl, Inputmoney1, Inputmoney2 } =
        this.state;
      //console.log('发起页：fieldDidUpdate');
      const editData = {
        hanmoney: Inputmoney1 ? Number(Inputmoney1) : 0, // 含税金额合计
        nomoney: Inputmoney2 ? Number(Inputmoney2) : 0, // 不含税金额合计
        detailname: detailname || '',
        infourl: infourl || '', // 详情地址
        detailedData: [...dataSourceRun], //物资明细
      };
      if (Inputmoney1) {
        form.setFieldValue('CaiConMoney', Number(Inputmoney1));
        form.setFieldExtendValue('CaiConMoney', Number(Inputmoney1));
      }

      const str1 = `不含税金额合计(元)：${Inputmoney2}\n 含税金额合计(元)：${Inputmoney1}`;
      const str =
        detailname + parsePrintString(dataSourceRun, purColumns, str1);

      console.log(str);

      form.setFieldValue('TestPur', str);
      form.setFieldExtendValue('TestPur', editData);
    }
  },
  fieldRender() {
    const { form } = this.props;
    const field = form.getFieldInstance('TestPur');
    const label = form.getFieldProp('TestPur', 'label');
    const required = form.getFieldProp('TestPur', 'required');

    const { selectedRowKeys } = this.state;
    const deColumns = [
      {
        title: '物资名称',
        dataIndex: 'name',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.name}>
            <span>{record.name}</span>
          </Tooltip>
        ),
      },
      {
        title: '单位',
        dataIndex: 'unit',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.unit}>
            <span>{record.unit}</span>
          </Tooltip>
        ),
      },
      {
        title: '规格型号',
        dataIndex: 'size',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.size}>
            <span>{record.size}</span>
          </Tooltip>
        ),
      },
      {
        title: '数量',
        dataIndex: 'det_quantity',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.det_quantity}>
            <span>{record.det_quantity}</span>
          </Tooltip>
        ),
      },
      {
        title: '不含税单价(元)',
        dataIndex: 'no_unit_price',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.no_unit_price}>
            <span>{record.no_unit_price}</span>
          </Tooltip>
        ),
      },
      {
        title: '含税单价(元)',
        dataIndex: 'unit_price',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.unit_price}>
            <span>{record.unit_price}</span>
          </Tooltip>
        ),
      },
      {
        title: '税率(%)',
        dataIndex: 'tax_rate',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.tax_rate}>
            <span>{record.tax_rate}</span>
          </Tooltip>
        ),
      },

      {
        title: '税额',
        dataIndex: 'tax_amount',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.tax_amount}>
            <span>{record.tax_amount}</span>
          </Tooltip>
        ),
      },
      {
        title: '不含税金额(元)',
        dataIndex: 'no_amount_tax',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.no_amount_tax}>
            <span>{record.no_amount_tax}</span>
          </Tooltip>
        ),
      },
      {
        title: '含税金额(元)',
        dataIndex: 'amount_tax',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.amount_tax}>
            <span>{record.amount_tax}</span>
          </Tooltip>
        ),
      },
      {
        title: '已入库量',
        dataIndex: 'quantity_rk',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.quantity_rk}>
            <span>{record.quantity_rk}</span>
          </Tooltip>
        ),
      },
      {
        title: '总计划量',
        dataIndex: 'quantity_zong',

        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.quantity_zong}>
            <span>{record.quantity_zong}</span>
          </Tooltip>
        ),
      },
    ];
    const etColumns = [
      {
        title: '物资名称',
        dataIndex: 'name',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.name}>
            <span>{record.name}</span>
          </Tooltip>
        ),
      },
      {
        title: '单位',
        dataIndex: 'unit',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.unit}>
            <span>{record.unit}</span>
          </Tooltip>
        ),
      },
      {
        title: '规格型号',
        dataIndex: 'size',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.size}>
            <span>{record.size}</span>
          </Tooltip>
        ),
      },
      {
        title: '数量',
        dataIndex: 'det_quantity',
        editable: true,
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.det_quantity}>
            <span>{record.det_quantity}</span>
          </Tooltip>
        ),
      },
      {
        title: (
          <div>
            不含税单价(元)
            <Tooltip
              placement="top"
              title={
                <div>
                  <span>
                    含税单价=不含税单价*（1+税率）,含税单价/不含税单价二选一填入
                  </span>
                </div>
              }
            >
              <QuestionCircleOutlined />
              {/* <a-icon type="info-circle" /> */}
            </Tooltip>
          </div>
        ),
        dataIndex: 'no_unit_price',
        editable: true,
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.no_unit_price}>
            <span>{record.no_unit_price}</span>
          </Tooltip>
        ),
      },
      {
        // title: '含税单价(元)',
        title: (
          <div>
            含税单价(元)
            <Tooltip
              placement="top"
              title={
                <div>
                  <span>
                    含税单价=不含税单价*（1+税率）,含税单价/不含税单价二选一填入
                  </span>
                </div>
              }
            >
              <QuestionCircleOutlined />
              {/* <a-icon type="info-circle" /> */}
            </Tooltip>
          </div>
        ),
        dataIndex: 'unit_price',
        editable: true,
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.unit_price}>
            <span>{record.unit_price}</span>
          </Tooltip>
        ),
      },
      {
        title: '税率(%)',
        dataIndex: 'tax_rate',
        editable: true,
        isNumber: true,
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.tax_rate}>
            <span>{record.tax_rate}</span>
          </Tooltip>
        ),
      },

      {
        title: '税额(元)',
        dataIndex: 'tax_amount',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.tax_amount}>
            <span>{record.tax_amount}</span>
          </Tooltip>
        ),
      },
      {
        title: '不含税金额(元)',
        dataIndex: 'no_amount_tax',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.no_amount_tax}>
            <span>{record.no_amount_tax}</span>
          </Tooltip>
        ),
      },
      {
        title: '含税金额(元)',
        dataIndex: 'amount_tax',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.amount_tax}>
            <span>{record.amount_tax}</span>
          </Tooltip>
        ),
      },
      {
        title: '已入库量',
        dataIndex: 'quantity_rk',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.quantity_rk}>
            <span>{record.quantity_rk}</span>
          </Tooltip>
        ),
      },
      {
        title: '总计划量',
        dataIndex: 'quantity_zong',

        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.quantity_zong}>
            <span>{record.quantity_zong}</span>
          </Tooltip>
        ),
      },
      {
        title: '操作',
        dataIndex: 'operation',

        render: (_, record: any) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="确定删除?"
              cancelText="取消"
              okText="确定"
              onConfirm={() => this.methods().handleRowDelete(record)}
            >
              <a>删除</a>
            </Popconfirm>
          ) : null,
      },
    ];
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = etColumns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: DataType) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          isNumber: col.isNumber,
          title: col.title,
          handleSave: this.methods().handleSave,
          handleChange: this.methods().handleRowChange,
        }),
      };
    });

    const onSelect = (keys: React.Key[], info: any) => {
      console.log('Trigger Select', keys, info);
      const treedata: NewPage = {
        type: '',
        pageSize: 10,
        page: 1,
        name: '',
      };
      this.setState(
        {
          allData: treedata,
        },
        () => {
          this.asyncSetFieldProps(treedata);
        },
      );
    };

    const onExpand = () => {
      //console.log('Trigger Expand');
    };
    const Tabschange = key => {
      const newpage: NewPage = {
        type: key,
        pageSize: 10,
        page: 1,
        name: '',
      };
      this.setState(
        {
          defaultActiveKey: key,
          allData: newpage,
          //   dataSource: [],
          //   dataSourceRun: [],
          //   selectedRowKeys: [],
          //   expandedRowKeys: [],
          //   childrenRowKeys: [],
        },
        () => {
          this.asyncSetFieldProps();
        },
      );
    };
    const rowSelectionMaterial = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        let newData = [...selectedRows];
        let newDataid = [];
        if (newData.length > 0) {
          newData = newData.map(item => {
            return Object.assign(item, {
              num: 1,
            });
          });
          newDataid = newData.map(item => {
            return item.id;
          });
        }
        this.setState({
          currentSelectData: newData,
          currentSelectDataid: newDataid,
        });
        this.setState({ selectedRowKeys });
      },
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        const { name, childrens, url = '' } = selectedRows[0];
        const childId: string[] = [];
        const newDetailname: string = this.methods().returnDetailName(name);

        // let newInputmoney1: number = 0;
        // let newInputmoney2: number = 0;
        childrens.forEach(item => {
          const { id, amount_tax, no_amount_tax } = item;
          childId.push(id);
          //   newInputmoney1 += Number(amount_tax) ? Number(amount_tax) : 0;
          //   newInputmoney2 += Number(no_amount_tax) ? Number(no_amount_tax) : 0;
        });

        this.setState(
          {
            selectedRowKeys,
            expandedRowKeys: selectedRowKeys,
            childrenRowKeys: childId,
            dataSource: childrens,
            detailname: newDetailname,
            // Inputmoney1: newInputmoney1,
            // Inputmoney2: newInputmoney2,
            infourl: url,
          },
          () => {
            this.methods().addSelfTable();
          },
        );

        // let dtar = '';
        // let url = '';
        // let newData = [...selectedRows];
        // let newDataid = [];
        // if (newData.length > 0) {
        //   newData = newData.map(item => {
        //     return Object.assign(item, {
        //       num: 1,
        //     });
        //   });
        //   newDataid = newData.map(item => {
        //     return item.id;
        //   });
        // }
        // if (this.state.detdate === 'a1') {
        //   dtar = '采购申请-' + (newData[0] ? newData[0]['name'] : '');
        // } else if (this.state.detdate === 'b1') {
        //   dtar = '材料总计划-' + (newData[0] ? newData[0]['name'] : '');
        // }
        // url = newData[0] ? newData[0]['url'] : '';
        // this.setState({
        //   currentSelectData: newData,
        //   currentSelectDataid: newDataid,
        //   detailname: dtar,
        //   infourl: url,
        // });
      },
    };

    const onFinish = (values: any) => {
      this.setState({
        msgdata: '1',
      });
      const newdate = this.state.allData;
      newdate.wz_add = values;
      this.asyncSetFieldProps(newdate);
      this.setState({
        visibleModal: false,
      });
    };
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    const returnChildrenTable = record => {
      const { childrens } = record;
      const { listData, dataSource } = this.state;
      return (
        <Table
          className="childrenTable"
          scroll={{ x: true }}
          columns={etColumns.filter(v => v.dataIndex !== 'operation')}
          dataSource={childrens}
          rowKey={record => record.id}
          pagination={false}
          rowSelection={{
            type: 'checkbox',
            columnTitle: ' ', //  隐藏全选勾选框
            selectedRowKeys: this.state.childrenRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              if (selectedRowKeys.length > 0) {
                const { pId } = selectedRows[0];
                const { name = '' } = listData.filter(v => v.id === pId)?.[0];
                const newDetailname: string =
                  this.methods().returnDetailName(name);
                const newDataSource: any[] = [...dataSource, ...selectedRows];

                // let newInputmoney1: number = 0;
                // let newInputmoney2: number = 0;
                // newDataSource.forEach(item => {
                //   const { amount_tax, no_amount_tax } = item;
                //   newInputmoney1 += Number(amount_tax) ? Number(amount_tax) : 0;
                //   newInputmoney2 += Number(no_amount_tax)
                //     ? Number(no_amount_tax)
                //     : 0;
                // });

                this.setState(
                  {
                    childrenRowKeys: selectedRowKeys,
                    selectedRowKeys: [pId], // 反选 父级
                    detailname: newDetailname,
                    dataSource: newDataSource,
                    // Inputmoney1: newInputmoney1,
                    // Inputmoney2: newInputmoney2,
                  },
                  () => {
                    this.methods().addSelfTable;
                  },
                );
              } else {
                this.setState({
                  childrenRowKeys: selectedRowKeys,
                  selectedRowKeys: [],
                  detailname: '',
                  dataSource: [],
                  Inputmoney1: 0,
                  Inputmoney2: 0,
                });
              }
            },
          }}
        />
      );
    };

    const { detailname } = this.state;

    //详情
    if (this.props.runtimeProps.viewMode) {
      let value = field.getExtendValue();
      // if (!value.detailedData) {
      //   value = field.getValue();
      // }
      const {
        detailname = '',
        nomoney = 0,
        infourl = '',
        hanmoney = 0,
        detailedData = [],
      } = value ? value : {};
      return (
        <div className="field-wrapper">
          <div className="label" style={{ marginTop: '10px' }}>
            {label}
          </div>
          <div
            style={{ color: '#409eff' }}
            onClick={() =>
              dd.ready(() => {
                dd.biz.util.openSlidePanel({
                  url: infourl, //打开侧边栏的url
                  title: '详情', //侧边栏顶部标题
                  onSuccess: function (result) {},
                  onFail: function () {},
                });
              })
            }
          >
            {detailname}dsaadsasdsad
          </div>

          <div className="label" style={{ marginTop: '10px' }}>
            {label}
          </div>

          {/* <div>
                      {detailedData.map(item => {
                        return <div>{item.toString()}</div>;
                      })}
                    </div> */}
          <div>
            <Table
              scroll={{ x: '1500px' }}
              components={components}
              className="full-size-editable"
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={value instanceof Array ? value : detailedData}
              columns={deColumns}
              pagination={false}
            />
          </div>
          <div className="label" style={{ marginTop: '10px' }}>
            不含税金额合计(元)
          </div>
          <div>{nomoney ? Number(nomoney).toFixed(2) : ''}</div>
          <div className="label" style={{ marginTop: '10px' }}>
            含税金额合计(元)
          </div>
          <div>{hanmoney ? Number(hanmoney).toFixed(2) : ''}</div>
        </div>
      );
    }

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
                {'Version: 3.1.4'}
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
            <SelectBtn
              title={detailname}
              initSelect={this.methods().handleProjectAdd}
              resetSelect={this.methods().handleProjectAdd}
              deleteSelect={this.methods().ResetClick}
            />
            {/* <Input
              onClick={this.methods().handleProjectAdd}
              readOnly
              value={this.state.detailname}
              placeholder="请选择"
              suffix={
                <CloseCircleOutlined
                  onClick={this.methods().iconClick}
                  style={{ color: 'rgba(0,0,0,.45)' }}
                />
              }
            /> */}
          </div>
          <div style={{ marginTop: '10px' }}>
            {/* <Table
              scroll={{ x: '1500px' }}
              components={components}
              className="full-size-editable"
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={dataSource}
              columns={columns as ColumnTypes}
              pagination={false}
            /> */}
            <div
              style={{
                display: 'flex',
                marginTop: '16px',
                marginBottom: '16px',
              }}
            >
              <Button
                style={{ marginRight: '16px' }}
                onClick={this.methods().handleDetailAdd}
                type="primary"
              >
                添加明细
              </Button>
              <ImportDialog
                columns={columns}
                binding={this}
                setTableData={this.methods().handleSetTableData}
                bizAlias="TestPur"
              />
            </div>
            <div className="label" style={{ marginTop: '10px' }}>
              不含税金额合计(元)
            </div>
            <div>
              <Input
                readOnly
                value={this.state.Inputmoney2}
                placeholder="自动计算"
              />
            </div>
            <div className="label" style={{ marginTop: '10px' }}>
              含税金额合计(元)
            </div>
            <div>
              <Input
                readOnly
                value={this.state.Inputmoney1}
                placeholder="自动计算"
              />
            </div>

            {/* <div></div> */}
          </div>

          <Modal className="isvzhukuaizkpd" 
            title="关联"
            width={1000}
            visible={this.state.isModalVisible}
            footer={[
              //   <Button key="back" onClick={this.handleCancel}>
              //     返回
              //   </Button>,
              <Button
                key="submit"
                type="primary"
                loading={this.state.loading}
                onClick={this.handleOk}
              >
                确定
              </Button>,
            ]}
            onCancel={this.handleCancel}
          >
            <Tabs
              className="Tabs_class"
              defaultActiveKey="purchase_Apply_For"
              centered
              onChange={Tabschange}
            >
              <TabPane tab="采购申请" key="purchase_Apply_For">
                <Search
                  placeholder="请输入"
                  allowClear
                  enterButton="搜索"
                  size="large"
                  onSearch={val => {
                    this.methods().handleSearch(val, 'a');
                  }}
                  onChange={e => {
                    if (e.target.value === '') {
                      this.methods().handleSearch('', 'a');
                    }
                  }}
                />
                <Table
                  //   scroll={{ x: '1500px' }}
                  rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                  }}
                  className="full-size-editable"
                  rowKey={record => record.id}
                  columns={myColumns}
                  dataSource={this.state.listData}
                  loading={this.state.loading}
                  pagination={false}
                  expandable={{
                    expandedRowRender: returnChildrenTable,
                    expandedRowKeys: this.state.expandedRowKeys,
                    expandIcon: props => {
                      const { expandedRowKeys } = this.state;
                      const {
                        record,
                        record: { id },
                        onExpand,
                      } = props;
                      const flag = expandedRowKeys.includes(id);
                      const ICON = flag
                        ? MinusSquareOutlined
                        : PlusSquareOutlined;
                      return (
                        <ICON
                          onClick={e => {
                            onExpand(record, e);
                          }}
                        />
                      );
                    },
                    onExpand: (expanded, record) => {
                      console.log(expanded, record);
                      const { id } = record;
                      this.setState({
                        expandedRowKeys: expanded ? [id] : [],
                      });
                    },
                  }}
                ></Table>
                <PaginationBox>
                  <Pagination
                    defaultCurrent={1}
                    total={this.state.total2}
                    hideOnSinglePage={true}
                    className="pagination"
                    onChange={(page: number, pageSize: number) => {
                      this.methods().handleChangePage(
                        page,
                        pageSize,
                        'purchase_Apply_For',
                      );
                    }}
                  />
                </PaginationBox>
              </TabPane>
              <TabPane tab="材料总计划" key="Material_master_plan">
                <Search
                  placeholder="请输入"
                  allowClear
                  enterButton="搜索"
                  size="large"
                  onSearch={val => {
                    this.methods().handleSearch(val, 'b');
                  }}
                  onChange={e => {
                    if (e.target.value === '') {
                      this.methods().handleSearch('', 'b');
                    }
                  }}
                />
                <Table
                  //   scroll={{ x: '1500px' }}
                  rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                  }}
                  className="full-size-editable"
                  rowKey={record => record.id}
                  columns={columnsNew}
                  dataSource={this.state.listData}
                  loading={this.state.loading}
                  pagination={false}
                ></Table>
                <PaginationBox>
                  <Pagination
                    defaultCurrent={1}
                    total={this.state.total2}
                    hideOnSinglePage={true}
                    className="pagination"
                    onChange={(page: number, pageSize: number) => {
                      this.methods().handleChangePage(
                        page,
                        pageSize,
                        'Material_master_plan',
                      );
                    }}
                  />
                </PaginationBox>
              </TabPane>
            </Tabs>
          </Modal>
          {/* 树形 */}

          <Modal className="isvzhukuaizkpd" 
            title="选择物资"
            width={1000}
            visible={this.state.isModalVisibletree}
            footer={[
              <Button key="back" onClick={this.methods().handleMaterialCancel}>
                返回
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={this.state.loading}
                onClick={this.methods().handleMaterialOK}
              >
                确定
              </Button>,
            ]}
            onCancel={this.methods().handleMaterialCancel}
          >
            <Layout>
              <Sider className="newside_new">
                <Tree
                  defaultExpandedKeys={['0']}
                  blockNode
                  onSelect={onSelect}
                  onExpand={onExpand}
                  treeData={this.state.treeData}
                />
              </Sider>
              <Content>
                <div className="header_tab_class">
                  <Search
                    placeholder="请输入"
                    allowClear
                    enterButton="搜索"
                    size="large"
                    onSearch={val => {
                      this.methods().handleSearch(val, '-1');
                    }}
                    onChange={e => {
                      if (e.target.value === '') {
                        this.methods().handleSearch('', '-1');
                      }
                    }}
                  />
                  <DetailDialogDesktop
                    treeData={this.state.treeData}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  />
                </div>
                <Table
                  scroll={{ y: '255px' }}
                  rowSelection={{
                    type: 'checkbox',
                    ...rowSelectionMaterial,
                  }}
                  rowKey={record => record.id}
                  columns={treeDiagramColumns}
                  dataSource={this.state.treelistData}
                  loading={this.state.loading}
                  pagination={false}
                ></Table>
                <Pagination
                  showSizeChanger={false}
                  defaultCurrent={1}
                  total={this.state.total3}
                  hideOnSinglePage={true}
                  className="pagination"
                  onChange={this.methods().handleTreeChangePage}
                />
              </Content>
            </Layout>
          </Modal>
          {/* 新增个 */}
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
