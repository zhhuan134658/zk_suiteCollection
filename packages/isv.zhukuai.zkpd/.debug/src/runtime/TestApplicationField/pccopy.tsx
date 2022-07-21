import 'dingtalk-jsapi/entry/union';
import * as dd from 'dingtalk-jsapi'; // 此方式为整体加载，也可按需进行加载
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
import { searchBarSubmitRK } from '../../utils/searchUtils';
import { changePage } from '../../utils/pageUtils';
import {
  deleteRowForTaxCalcTables,
  handleTaxTableStatistics,
} from '../../components/handleTables';
import { asyncSetProps } from '../../utils/asyncSetProps';
const { Content, Sider } = Layout;
import { EditableRow } from '../../components/editableRow';
import { EditableCell } from '../../components/editableCell';
import { ImportDialog } from '../../components/importData';
import { fpAdd } from '../../utils/fpOperations';
import { parsePrintString } from '../../utils/printStringParser';
import { applicationColumns } from '../../printColumns/TestApplicationField';
import { DetailDialogDesktop } from '../../components/addDetail';
import { uniqueArrayByKey } from '../../utils/normalizeUtils';
const { Search } = Input;
const myColumns = [
  {
    title: <div>名称</div>,
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
  },
  {
    title: '操作',
    dataIndex: 'operation',

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
      current_page: '',
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
      fixedColumn: '',
      currentEditId: 0,
      currentSelectData: [],
      currentSelectDataid: [],
      selectedRowKeys: [],
    };
  },
  methods() {
    const _this = this;
    return {
      openinfo() {
        dd.ready(() => {
          dd.biz.util.openSlidePanel({
            url: _this.state.infourl, //打开侧边栏的url
            title: '详情', //侧边栏顶部标题
            onSuccess: function (result) {},
            onFail: function () {},
          });
        });
      },
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
      handleSave(row) {
        const newData = [..._this.state.dataSource];
        const index = newData.findIndex(item => row.id === item.id);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        if (row.need_quantity && row.refer_price) {
          newData[index].subtotal = (
            row.need_quantity * row.refer_price
          ).toFixed(2);
        } else {
          newData[index].subtotal = 0;
        }
        _this.setState({
          dataSource: [...newData],
        });
        console.log(newData);
        const newarr1 = [..._this.state.dataSource];
        let newarr2 = [];
        newarr2 = newarr1.filter(item => {
          if (item.subtotal) {
            return item;
          }
        });
        newarr2 = newarr2.map(item => {
          return item.subtotal;
        });

        _this.setState({
          Inputmoney1: newarr2.reduce(fpAdd, 0).toFixed(2),
        });
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
    const bizAlias = 'TestApplication';
    const promise = asyncSetProps(
      _this,
      data,
      bizAlias,
      'material_requirement_plan',
    );
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
      const editData = {
        hanmoney: null,
        nomoney: null,
        detailname: '',
        infourl: '',
        detailedData: [], //物资明细
      };
      if (this.state.Inputmoney1) {
        editData.hanmoney = Number(this.state.Inputmoney1);
      }
      if (this.state.infourl) {
        editData.infourl = this.state.infourl;
      }
      if (this.state.Inputmoney2) {
        editData.nomoney = Number(this.state.Inputmoney2);
      }
      editData.detailname = this.state.detailname;
      editData.detailedData = this.state.dataSource;
      console.log(editData);
      // 打印数据
      const newlistdata = this.state.dataSource;
      const str2 = this.state.detailname;
      const str1 = ' 合计(元):' + this.state.Inputmoney1;
      const str =
        str2 + parsePrintString(newlistdata, applicationColumns, str1);
      console.log(str);
      const { form } = this.props;
      form.setFieldValue('TestApplication', str);
      form.setFieldExtendValue('TestApplication', editData);
    }
  },
  fieldRender() {
    const { form } = this.props;
    const field = form.getFieldInstance('TestApplication');
    const label = form.getFieldProp('TestApplication', 'label');
    const required = form.getFieldProp('TestApplication', 'required');
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
        title: '需用数量',
        dataIndex: 'need_quantity',

        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.need_quantity}>
            <span>{record.need_quantity}</span>
          </Tooltip>
        ),
      },
      {
        title: '累计申请量',
        dataIndex: 'quantity_sq',

        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.quantity_sq}>
            <span>{record.quantity_sq}</span>
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
        title: '参考价格',
        dataIndex: 'refer_price',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.refer_price}>
            <span>{record.refer_price}</span>
          </Tooltip>
        ),
      },

      {
        title: '小计(元)',
        dataIndex: 'subtotal',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.subtotal}>
            <span>{record.subtotal}</span>
          </Tooltip>
        ),
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.remarks}>
            <span>{record.remarks}</span>
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
        title: '需用数量',
        dataIndex: 'need_quantity',
        editable: true,
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.need_quantity}>
            <span>{record.need_quantity}</span>
          </Tooltip>
        ),
      },
      {
        title: '累计申请量',
        dataIndex: 'quantity_sq',

        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.quantity_sq}>
            <span>{record.quantity_sq}</span>
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
        title: '参考价格',
        dataIndex: 'refer_price',
        editable: true,

        render: (_, record: any) => {
          let n1 = Number(record.refer_price);

          if (isNaN(n1)) {
            record.judge = true;
            return (
              <Tooltip placement="topLeft" title="该单元格应该为数字">
                <span style={{ color: '#ff0000' }}>{record.refer_price}</span>
              </Tooltip>
            );
          } else {
            return (
              <Tooltip placement="topLeft" title={record.refer_price}>
                <span>{record.refer_price}</span>
              </Tooltip>
            );
          }
        },
      },
      {
        title: '小计(元)',
        dataIndex: 'subtotal',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.subtotal}>
            <span>{record.subtotal}</span>
          </Tooltip>
        ),
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        editable: true,
        isNumber: false,
        render: (_, record: any) => {
          return (
            <Tooltip placement="topLeft" title={record.remarks}>
              <span>{record.remarks}</span>
            </Tooltip>
          );
        },
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
        let url = '';
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

        dtar = newData[0] ? newData[0]['name'] : '';
        url = newData[0] ? newData[0]['url'] : '';
        this.setState({
          currentSelectData: newData,
          currentSelectDataid: newDataid,
          detailname: dtar,
          infourl: url,
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
      //   if (!value.detailedData) {
      //     value = field.getValue();
      //   }
      console.log('787878', value);
      const {
        // infourl = '',
        detailname = '',
        hanmoney = 0,
        detailedData = [],
      } = value ? value : {};
      return (
        <div className="field-wrapper">
          <div className="label" style={{ marginTop: '10px', color: 'red' }}>
            {label}
          </div>
          <div>{detailname}</div>

          <div className="label" style={{ marginTop: '10px' }}>
            {label}
          </div>
          {/* <div>{infourl}</div> */}
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
            合计(元)
          </div>
          <div>{hanmoney ? Number(hanmoney).toFixed(2) : ''}</div>
        </div>
      );
    }
    return (
      <div className="TestApplicationField_class">
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
                bizAlias="TestApplication"
              />
            </div>

            <div className="label" style={{ marginTop: '10px' }}>
              合计(元)
            </div>
            <div>
              <Input
                readOnly
                value={this.state.Inputmoney1}
                placeholder="自动计算"
              />
            </div>
          </div>

          <Modal className="isvzhukuaizkpd" 
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
