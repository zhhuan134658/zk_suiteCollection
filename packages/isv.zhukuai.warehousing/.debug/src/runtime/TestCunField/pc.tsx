//重构完成
import React from 'react';
import {
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
const myColumns = [
  {
    title: '仓库名称',
    dataIndex: 'name',
    render: (_, record: any) => (
      <Tooltip placement="topLeft" title={record.name}>
        <span>{record.name}</span>
      </Tooltip>
    ),
  },
  {
    title: '编号',
    dataIndex: 'number',
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
  {
    title: '备注',
    dataIndex: 'remarks',
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
      searchvalue: '',
      detailPage: 1,
      defaultActiveKey: 'a',
      value: undefined,
      msgdata: '',
      newOptine: [],
      visibleModal: false,
      detdate: 'a1',
      dstatus: '1',
      Inputmoney2: '',
      Inputmoney1: '',
      detailnamein: '',
      detailname: '',
      crophouse: '',
      ck_name: '',
      current_page: '', //当前页
      total2: '',
      allData: {
        rk_id: ['a'],
        number: '10',
        page: '1',
        name: '',
        ck_name: '',
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

      handleSearch(value: any, rk_id: string) {
        if (rk_id === '-1') {
          const newPage = {
            rk_id: ['-1'],
            number: '10',
            page: 1,
            name: value,
            ck_name: _this.state.detailname,
          };
          _this.setState({
            allData: newPage,
          });
          _this.asyncSetFieldProps(newPage);
        } else if (rk_id === 'a') {
          const newPage = {
            rk_id: ['-1'],
            number: '10',
            page: 1,
            name: value,
            isHouse: '1',
            ck_name: _this.state.detailname,
          };
          _this.setState({
            allData: newPage,
          });
          _this.asyncSetFieldProps(newPage);
        }
      },
      handleChangePage(page: any) {
        console.log('Page', page);
        changePage(_this, page);
      },
      handleTreeChangePage(page: any) {
        console.log('TreePage', page);
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
      iconClick(typename) {
        if (typename === 'out') {
          _this.setState({
            // detailnamein: '',
            detailname: '',
            dataSource: [],
          });
        } else {
          _this.setState({
            detailnamein: '',
          });
        }
      },

      handleRowDelete(row: DataType) {
        deleteRowForTaxCalcTables(_this, row);
      },
      handleProjectAdd(crophouse) {
        const newData = _this.state.defaultActiveKey;
        _this.setState({
          dstatus: '1',
        });
        const newPage = {
          rk_id: [newData],
          number: '10',
          page: 1,
          name: '',
          isHouse: '1',
          ck_name: '',
        };
        _this.setState({
          allData: newPage,
        });
        _this.asyncSetFieldProps(newPage);
        _this.setState({
          isModalVisible: true,
          crophouse,
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
          ck_name: '',
          rk_id: ['-1'],
          number: '10',
          page: _this.state.detailPage,
          name: '',
        };
        newpage.ck_name = _this.state.detailname;
        console.log('NewPage', newpage);
        _this.asyncSetFieldProps(newpage);
        _this.setState({
          isModalVisibletree: true,
          allData: newpage,
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
        console.log('Remove duplicate', lData);
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
    const allselect = this.state.currentSelectData;
    const crophouse = this.state.crophouse;
    if (crophouse === 'out') {
      const allData = this.state.allData;
      allData['ck_name'] = allselect[0].name;
      this.setState({
        detailname: allselect[0].name,
        ck_name: allselect[0].name,
        isModalVisible: false,
        selectedRowKeys: [],
        allData,
      });
    } else if (crophouse === 'in') {
      this.setState({
        detailnamein: allselect[0].name,
        isModalVisible: false,
        selectedRowKeys: [],
      });
    }
  },
  handleCancel() {
    this.setState({ isModalVisible: false, selectedRowKeys: [] });
  },
  asyncSetFieldProps(data: any) {
    const _this = this;
    const bizAlias = 'TestCun';
    const promise = asyncSetProps(_this, data, bizAlias);
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
        res.dataArray.forEach((e, i) => {
          if (e['wz_number']) {
            e['det_quantity'] = e['wz_number'];
          }
          res.dataArray[i] = e;
        });
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
          _this.setState({
            listData: [...res.dataArray],
            current_page: res.currentPage,
            total2: res.totalCount,
          });
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
      const editData = {
        hanmoney: 0,
        nomoney: 0,
        warehouse: '',
        warehousein: '',
        detailedData: [], //物资明细
      };
      if (this.state.Inputmoney1) {
        editData.hanmoney = Number(this.state.Inputmoney1);
      }
      if (this.state.Inputmoney2) {
        editData.nomoney = Number(this.state.Inputmoney2);
      }
      editData.warehouse = this.state.detailname;
      editData.warehousein = this.state.detailnamein;
      editData.detailedData = this.state.dataSource;
      // 打印数据
      const newlistdata = this.state.dataSource;
      const str2 =
        '调出仓库：' +
        this.state.detailname +
        '\n' +
        '调入仓库' +
        this.state.detailnamein;
      let str0 =
        '\n' +
        '设备名称 单位 规格型号 调拨数量 库存数量 不含税单价 含税单价 税率 税额 不含税金额 含税金额';
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
          newlistdata[i].wz_number +
          ' ' +
          newlistdata[i].ku_cun +
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
      const { form } = this.props;
      form.setFieldValue('TestCun', str);
      form.setFieldExtendValue('TestCun', editData);
    }
  },
  fieldRender() {
    const { form } = this.props;
    const field = form.getFieldInstance('TestCun');
    const label = form.getFieldProp('TestCun', 'label');
    const required = form.getFieldProp('TestCun', 'required');
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
        title: '规格型号',
        dataIndex: 'size',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.size}>
            <span>{record.size}</span>
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
        title: '调拨数量',
        dataIndex: 'wz_number',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.wz_number}>
            <span>{record.wz_number}</span>
          </Tooltip>
        ),
      },
      {
        title: '库存数量',
        dataIndex: 'ku_cun',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.ku_cun}>
            <span>{record.ku_cun}</span>
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
        title: '调拨数量',
        dataIndex: 'wz_number',
        editable: true,
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.wz_number}>
            <span>{record.wz_number}</span>
          </Tooltip>
        ),
      },
      {
        title: '库存数量',
        dataIndex: 'ku_cun',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.ku_cun}>
            <span>{record.ku_cun}</span>
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
              cancelText="取消"
              okText="确定"
              title="确定删除?"
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
        console.log('CHANGE', selectedRowKeys, selectedRows);
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
      // if (!value.detailedData) {
      //   value = field.getValue();
      // }
      const {
        warehouse = '',
        warehousein = '',
        detailedData = [],
      } = value ? value : {};
      return (
        <div className="field-wrapper">
          <div className="label" style={{ marginTop: '10px' }}>
            调出仓库
          </div>
          <div>{warehouse}</div>
          <div className="label" style={{ marginTop: '10px' }}>
            调入仓库
          </div>
          <div>{warehousein}</div>

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
        </div>
      );
    }
    return (
      <div className="TestCunField_class">
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
                调出仓库
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
              onClick={this.methods().handleProjectAdd.bind(this, 'out')}
              readOnly
              value={this.state.detailname}
              placeholder="请选择"
              suffix={
                <CloseCircleOutlined
                  onClick={this.methods().iconClick.bind(this, 'out')}
                  style={{ color: 'rgba(0,0,0,.45)' }}
                />
              }
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <div className="label" style={{ marginTop: '10px' }}>
              {required ? (
                <span style={{ color: '#ea6d5c' }}>*</span>
              ) : (
                <span style={{ color: '#fff' }}>*</span>
              )}
              调入仓库
            </div>
            <Input
              onClick={this.methods().handleProjectAdd.bind(this, 'in')}
              readOnly
              value={this.state.detailnamein}
              placeholder="请选择"
              suffix={
                <CloseCircleOutlined
                  onClick={this.methods().iconClick.bind(this, 'in')}
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
                bizAlias="TestCun"
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
          <Modal className="isvzhukuaiwarehousing" 
            title="选择仓库"
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
              columns={myColumns}
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
          </Modal>
          {/* 树形 */}

          <Modal className="isvzhukuaiwarehousing" 
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
