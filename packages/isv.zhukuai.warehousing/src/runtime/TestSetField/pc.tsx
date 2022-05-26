//重构完成
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
import { CloseCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { ColumnTypes, DataType, ISwapFormField } from '../../types/runtime';
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
import { DetailDialogDesktop } from '../../components/addDetail';
import { uniqueArrayByKey } from '../../utils/normalizeUtils';
const { Search } = Input;
const { TabPane } = Tabs;

const mycolumnsa = [
  {
    title: (
      <div>
        合同名称
        {/* <Tooltip
          placement="top"
          title={
            <div>
              <span>灰色字体为已关联过选项</span>
            </div>
          }
        >
          <QuestionCircleOutlined />
        </Tooltip> */}
      </div>
    ),
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
    title: '供应商',
    dataIndex: 'supplier',
  },
  {
    title: '合同金额',
    dataIndex: 'contract_money',
  },
];
const mycolumnsb = [
  {
    title: (
      <div>
        采购名称
        {/* <Tooltip
          placement="top"
          title={
            <div>
              <span>灰色字体为已关联过选项</span>
            </div>
          }
        >
          <QuestionCircleOutlined />
        </Tooltip> */}
      </div>
    ),
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
    title: '供应商',
    dataIndex: 'supplier',
  },
  {
    title: '订单金额',
    dataIndex: 'tax_total_money',
  },
];
const mycolumnsc = [
  {
    title: (
      <div>
        入库主题
        {/* <Tooltip
          placement="top"
          title={
            <div>
              <span>灰色字体为已关联过选项</span>
            </div>
          }
        >
          <QuestionCircleOutlined />
        </Tooltip> */}
      </div>
    ),
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
    title: '供应商',
    dataIndex: 'supplier',
  },
  {
    title: '库房',
    dataIndex: 'extend_four',
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
      detailPage: 1,
      defaultActiveKey: 'a',
      value: undefined,
      msgdata: '',
      newOptine: [],
      visibleModal: false,
      detdate: 'a1',
      dstatus: '1',
      detailname: '',
      Inputmoney2: '',
      Inputmoney1: '',
      current_page: '', //当前页
      total2: '',
      allData: {
        rk_id: ['a'],
        number: '10',
        page: '1',
        name: '',
      },
      isModalVisible: false,
      isModalVisibletree: false,
      listData: [],

      treeData: [],
      pagination: {
        current: 1,
        pageSize: 10,
      },

      loading: false,
      leaveLongVal: '',

      //   dataSource: [],
      dataSource: [],
      count: 1,
      fixedColumn: '', // fixed unit_price or no_unit_price during calculation
      currentEditId: 0,
      currentSelectData: [],
      currentSelectDataid: [],
      selectedRowKeys: [],
    };
  },
  methods() {
    const _this = this;
    return {
      addNewDetail() {
        _this.setState({
          visibleModal: true,
        });
      },
      handleModalCancel() {
        _this.setState({
          visibleModal: false,
        });
      },
      handleSearch(value: any, rk_id: string) {
        searchBarSubmitRK(_this, value, rk_id);
      },
      handleChangePage(page: any) {
        changePage(_this, page);
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
          dataSource: [],
          Inputmoney2: 0,
          Inputmoney1: 0,
        });
      },
      iconClick() {
        _this.setState({
          detailname: '',
          dataSource: [],
          Inputmoney2: 0,
          Inputmoney1: 0,
        });
      },
      handleRowDelete(row: DataType) {
        deleteRowForTaxCalcTables(_this, row);
      },
      handleProjectAdd() {
        const newData = _this.state.defaultActiveKey;
        _this.setState({
          dstatus: '1',
        });
        const newPage = {
          rk_id: [newData],
          number: '10',
          page: 1,
          name: '',
        };
        _this.setState({
          allData: newPage,
        });
        _this.asyncSetFieldProps(newPage);
        _this.setState({
          isModalVisible: true,
        });
      },
      handleDetailAdd() {
        const { form } = _this.props;
        const projectName = form.getFieldValue('Autopro');
        if (!projectName) {
          return notification.open({
            message: '请先选择项目',
          });
        }
        _this.setState({
          dstatus: '2',
        });
        const newpage = {
          rk_id: ['-1'],
          number: '10',
          page: _this.state.detailPage,
          name: '',
        };
        _this.asyncSetFieldProps(newpage);
        _this.setState({
          isModalVisibletree: true,
        });
      },
      handleSave(row: DataType, values: any) {
        const dataList = _this.state.dataSource;
        const key = Object.keys(values)[0];
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
      handleSetTableData(data: any) {
        console.log('DATA', data);
        const sourceData = _this.state.dataSource;
        let newData = [];
        if (sourceData && sourceData.length > 0) {
          newData = sourceData.concat(data);
        } else {
          newData = data;
        }
        _this.setState(
          {
            dataSource: newData,
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
        console.log('SET DATASOURCE 3');
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
        console.log('SET STATE DATASOURCE 2');
        _this.setState({
          dataSource: lData,
          isModalVisibletree: false,
          selectedRowKeys: [],
        });
      },
      handleMaterialCancel() {
        _this.setState({ isModalVisibletree: false, selectedRowKeys: [] });
      },
    };
  },
  handleOk() {
    this.setState({ dstatus: '3' });
    console.log(this.state.detdate);
    const cDataid = [...this.state.currentSelectDataid];
    const newData = this.state.allData;
    newData.rk_id = [this.state.detdate, ...cDataid];
    console.log(newData);
    this.asyncSetFieldProps(newData);
    this.setState({
      isModalVisible: false,
      selectedRowKeys: [],
    });
  },
  handleCancel() {
    this.setState({ isModalVisible: false, selectedRowKeys: [] });
  },
  asyncSetFieldProps(data: any) {
    const _this = this;
    const bizAlias = 'TestSet';
    const promise = asyncSetProps(_this, data, bizAlias, 'material_settlement');
    promise
      .then(res => {
        console.log('ASYNC', res);
        const treeArray = [
          {
            title: '物资类型',
            key: '0',
            children: res.extendArray,
          },
        ];
        _this.setState({
          treeData: [...treeArray],
          current_page: res.currentPage,
          total3: res.totalCount,
        });
        const dStatus = _this.state.dstatus;
        if (dStatus === '2') {
          const dataArray = [...res.dataArray];
          _this.setState({
            treelistData: dataArray,
          });
          handleTaxTableStatistics(_this, dataArray);
        } else if (dStatus === '3') {
          const dataArray = [...res.dataArray];
          console.log('SET STATE DATASOURCE 1');
          _this.setState({
            dataSource: [...dataArray],
          });
          handleTaxTableStatistics(_this, dataArray);
        } else if (dStatus === '1') {
          if (res.dataArray.length === 0) {
            _this.setState({
              listData: [],
              current_page: 1,
              total2: 0,
            });
          } else {
            _this.setState({
              listData: [...res.dataArray],
              current_page: res.currentPage,
              total2: res.totalCount,
            });
          }
        }
        if (_this.state.msgdata === '1') {
          notification.open({
            message: res.message,
          });
          _this.setState({
            msgdata: '0',
          });
        }
      })
      .catch(e => {
        console.log('ASYNC ERROR', e);
      });
  },
  fieldDidUpdate() {
    if (!this.props.runtimeProps.viewMode) {
      console.log('发起页：fieldDidUpdate');
      const { form } = this.props;
      const editData = {
        hanmoney: 0,
        nomoney: 0,
        detailname: '',
        detailedData: [], //物资明细
      };
      if (this.state.Inputmoney1) {
        editData.hanmoney = Number(this.state.Inputmoney1);
        console.log('Inputmoney2', this.state.Inputmoney1);
        form.setFieldValue('CaiJieMoney', Number(this.state.Inputmoney1));
        form.setFieldExtendValue('CaiJieMoney', Number(this.state.Inputmoney1));
      }
      if (this.state.Inputmoney2) {
        editData.nomoney = Number(this.state.Inputmoney2);
      }
      editData.detailname = this.state.detailname;
      editData.detailedData = this.state.dataSource;
      // 打印数据
      const newlistdata = this.state.dataSource;
      const str2 = this.state.detailname;
      let str0 =
        '\n' +
        '设备名称 单位 规格型号 数量 不含税单价 含税单价 税率 税额 不含税金额 含税金额';
      const str1 =
        '\n' +
        '不含税金额合计(元):' +
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
      console.log(str);

      form.setFieldValue('TestSet', str);
      form.setFieldExtendValue('TestSet', editData);
    }

    // this.state.dataSource;
    // this.state.Inputmoney1;
    // this.state.Inputmoney2;
  },
  fieldRender() {
    const { form } = this.props;
    const field = form.getFieldInstance('TestSet');
    const label = form.getFieldProp('TestSet', 'label');
    const required = form.getFieldProp('TestSet', 'required');
    const { dataSource, selectedRowKeys } = this.state;
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
          title: col.title,
          handleSave: this.methods().handleSave,
          handleChange: this.methods().handleRowChange,
        }),
      };
    });

    const onSelect = (keys: React.Key[], info: any) => {
      console.log('Trigger Select', keys, info);
      const treedata = {
        type: keys[0],
        number: '10',
        page: '1',
        rk_id: ['-1'],
      };
      this.setState({
        allData: treedata,
      });
      this.asyncSetFieldProps(treedata);
    };

    const onExpand = () => {
      console.log('Trigger Expand');
    };
    const Tabschange = key => {
      console.log(key);

      const newpage = {
        rk_id: [key],
        number: '10',
        page: 1,
        name: '',
      };
      this.setState({
        defaultActiveKey: key,
        allData: newpage,
        detdate: key + '1',
      });
      this.asyncSetFieldProps(newpage);
    };
    const rowSelectionMaterial = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(
        //   `selectedRowKeys: ${selectedRowKeys}`,
        //   'selectedRows: ',
        //   selectedRows,
        // );
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
        let dtar = '';
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

        if (this.state.detdate === 'a1') {
          dtar = '采购合同-' + (newData[0] ? newData[0]['name'] : '');
        } else if (this.state.detdate === 'b1') {
          dtar = '采购订单-' + (newData[0] ? newData[0]['name'] : '');
        } else if (this.state.detdate === 'c1') {
          dtar = '材料入库-' + (newData[0] ? newData[0]['name'] : '');
        }
        this.setState({
          currentSelectData: newData,
          currentSelectDataid: newDataid,
          detailname: dtar,
        });
        form.setFieldExtendValue(
          'Selectjia',
          newData[0] ? newData[0]['supplier'] : '',
        );
        form.setFieldValue(
          'Selectjia',
          newData[0] ? newData[0]['supplier'] : '',
        );

        form.setFieldExtendValue(
          'Conname',
          newData[0] ? newData[0]['contract_name'] : '',
        );
        form.setFieldValue(
          'Conname',
          newData[0] ? newData[0]['contract_name'] : '',
        );

        this.setState({ selectedRowKeys });
      },
    };
    const onFinish = (values: any) => {
      this.setState({
        msgdata: '1',
      });
      console.log('Success:', values);
      //   const [form] = Form.useForm();
      const newdate = this.state.allData;
      newdate.wz_add = values;
      this.asyncSetFieldProps(newdate);
      this.setState({
        visibleModal: false,
      });

      //   form.resetFields();
    };
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
    //详情
    if (this.props.runtimeProps.viewMode) {
      let value = field.getExtendValue();
      const {
        detailname = '',
        nomoney = 0,
        hanmoney = 0,
        detailedData = [],
      } = value ? value : {};

      return (
        <div className="field-wrapper">
          <div className="label" style={{ marginTop: '10px' }}>
            {label}
          </div>
          <div>{detailname}</div>

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
      <div className="TestSetField_class">
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
            <Input
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
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <Table
              scroll={{ x: '1500px' }}
              components={components}
              className="full-size-editable"
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={dataSource}
              columns={columns as ColumnTypes}
              pagination={false}
            />
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
                bizAlias="TestSet"
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
          </div>

          <Modal
            title="关联"
            width={1000}
            visible={this.state.isModalVisible}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                返回
              </Button>,
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
              defaultActiveKey="a"
              centered
              onChange={Tabschange}
            >
              <TabPane tab="采购合同" key="a">
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
                  scroll={{ x: '1500px' }}
                  rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                  }}
                  className="full-size-editable"
                  rowKey={record => record.id}
                  columns={mycolumnsa}
                  dataSource={this.state.listData}
                  loading={this.state.loading}
                  pagination={false}
                ></Table>
                <Pagination
                  defaultCurrent={1}
                  total={this.state.total2}
                  hideOnSinglePage={true}
                  className="pagination"
                  onChange={this.methods().handleChangePage}
                />
              </TabPane>
              <TabPane tab="采购订单" key="b">
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
                  scroll={{ x: '1500px' }}
                  rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                  }}
                  className="full-size-editable"
                  rowKey={record => record.id}
                  columns={mycolumnsb}
                  dataSource={this.state.listData}
                  loading={this.state.loading}
                  pagination={false}
                ></Table>
                <Pagination
                  defaultCurrent={1}
                  total={this.state.total2}
                  hideOnSinglePage={true}
                  className="pagination"
                  onChange={this.methods().handleChangePage}
                />
              </TabPane>
              <TabPane tab="材料入库" key="c">
                <Search
                  placeholder="请输入"
                  allowClear
                  enterButton="搜索"
                  size="large"
                  onSearch={val => {
                    this.methods().handleSearch(val, 'c');
                  }}
                  onChange={e => {
                    if (e.target.value === '') {
                      this.methods().handleSearch('', 'c');
                    }
                  }}
                />
                <Table
                  scroll={{ x: '1500px' }}
                  rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                  }}
                  className="full-size-editable"
                  rowKey={record => record.id}
                  columns={mycolumnsc}
                  dataSource={this.state.listData}
                  loading={this.state.loading}
                  pagination={false}
                ></Table>
                <Pagination
                  defaultCurrent={1}
                  total={this.state.total2}
                  hideOnSinglePage={true}
                  className="pagination"
                  onChange={this.methods().handleChangePage}
                />
              </TabPane>
            </Tabs>
          </Modal>
          {/* 树形 */}

          <Modal
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
};

export default FormField;
