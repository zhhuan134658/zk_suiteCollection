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
  DatePicker,
} from 'antd';
import { ColumnTypes, DataType, ISwapFormField } from '../../types/runtime';
import { searchBarSubmitRK } from '../../utils/searchUtils';
import { changePage } from '../../utils/pageUtils';
import { handleTaxTableStatistics } from '../../components/handleTables';
import { asyncSetProps } from '../../utils/asyncSetProps';
const { Content, Sider } = Layout;
import { EditableRow } from '../../components/editableRow';
import { EditableCell } from '../../components/editableCell';
import { fpAdd } from '../../utils/fpOperations';
import { ImportDialog } from '../../components/importData';
import { DetailDialogDesktop } from '../../components/addDetail';
import { uniqueArrayByKey } from '../../utils/normalizeUtils';
const { Search } = Input;
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
      updata: 1,
      datenum: 0,
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
      ResetClick() {
        _this.setState({
          dataSource: [],
          Inputmoney1: 0,
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

      handleRowDelete(row: any, index: any) {
        console.log('55555', _this.state.dataSource);

        const arr = [..._this.state.dataSource];

        arr.splice(index, 1);
        console.log('11111', arr);
        _this.setState({
          dataSource: [...arr],
          updata: _this.state.updata + 1,
        });
        if (arr.length > 0) {
          let newarr2 = [];
          newarr2 = arr.filter(item => {
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
        } else {
          _this.setState({
            Inputmoney1: 0,
          });
        }
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
        const datenum = _this
          .methods()
          .getDaysBetween(row.plan_in_riqi, row.plan_out_riqi);
        // const datenum = _this.state.datenum;

        const newData = [..._this.state.dataSource];
        const index = newData.findIndex(item => row.id === item.id);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        if (row.price && row.zl_number) {
          newData[index].subtotal = row.zl_number * row.price * Number(datenum);
        }
        console.log('NEWDATA', newData);
        _this.setState({
          dataSource: [...newData],
        });
        const newarr1 = [...newData];
        let newarr2 = [];

        newarr2 = newarr1.filter(item => {
          if (item.subtotal) {
            return item;
          }
        });
        newarr2 = newarr2.map(item => {
          return item.subtotal;
        });
        console.log('newarr2', newarr2);
        _this.setState({
          Inputmoney1: newarr2.reduce(fpAdd, 0).toFixed(2),
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
            const newarr1 = [...newData];
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
      getDaysBetween(dateString1, dateString2) {
        const startDate = Date.parse(dateString1);
        const endDate = Date.parse(dateString2);
        if (startDate > endDate) {
          return 0;
        }
        if (startDate === endDate) {
          return 1;
        }
        const days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
        return days + 1;
      },
      timeChange(record, index, name, date, dateString) {
        const newData = [..._this.state.dataSource];
        newData[index][name] = dateString;
        console.log(record, index, name, date, dateString, newData);
        if (record.plan_in_riqi && record.plan_out_riqi) {
          const timenum = _this
            .methods()
            .getDaysBetween(record.plan_in_riqi, record.plan_out_riqi);
          if (timenum === 0) {
            notification.open({
              message: '请先选择正确的日期',
            });
            // _this.setState({ datenum: timenum });
          } else {
            _this.setState({ dataSource: [...newData] }, () => {
              _this.methods().handleSave(record);
            });
          }
          //   _this.setState({});
          console.log(timenum);
        }
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
    const bizAlias = 'TestLecon';
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
        detailedData: [], //物资明细
      };
      if (this.state.Inputmoney1) {
        editData.hanmoney = Number(this.state.Inputmoney1);
      }
      editData.detailedData = this.state.dataSource;
      // 打印数据
      const newlistdata = this.state.dataSource;
      const str2 = '';
      let str0 =
        '\n' +
        '设备名称 单位 规格型号 结算周期(始) 结算周期(终) 数量 单价 小计';
      const str1 = '\n' + '合计：' + this.state.Inputmoney1;
      for (let i = 0; i < newlistdata.length; i++) {
        str0 +=
          '\n' +
          newlistdata[i].name +
          ' ' +
          newlistdata[i].unit +
          ' ' +
          newlistdata[i].size +
          ' ' +
          newlistdata[i].plan_in_riqi +
          ' ' +
          newlistdata[i].plan_out_riqi +
          ' ' +
          newlistdata[i].zl_number +
          ' ' +
          newlistdata[i].price +
          ' ' +
          newlistdata[i].subtotal;
      }
      const str = str2 + str0 + str1;
      console.log(str);
      const { form } = this.props;
      form.setFieldValue('TestLecon', str);
      form.setFieldExtendValue('TestLecon', editData);
    }
  },
  fieldRender() {
    const { form } = this.props;
    const field = form.getFieldInstance('TestLecon');
    const label = form.getFieldProp('TestLecon', 'label');
    const required = form.getFieldProp('TestLecon', 'required');
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
        title: '结算周期(始)',
        dataIndex: 'plan_in_riqi',
        width: 200,
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.plan_in_riqi}>
            <span>{record.plan_in_riqi}</span>
          </Tooltip>
        ),
      },
      {
        title: '结算周期(终)',
        dataIndex: 'plan_out_riqi',
        width: 200,
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.plan_out_riqi}>
            <span>{record.plan_out_riqi}</span>
          </Tooltip>
        ),
      },
      {
        title: '数量',
        dataIndex: 'zl_number',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.zl_number}>
            <span>{record.zl_number}</span>
          </Tooltip>
        ),
      },
      {
        title: '单价(元)',
        dataIndex: 'price',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.price}>
            <span>{record.price}</span>
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
        title: '结算周期(始)',
        dataIndex: 'plan_in_riqi',
        key: 'plan_in_riqi',
        width: 200,
        render: (text, record, index) => {
          return (
            <DatePicker
              format="YYYY-MM-DD"
              placeholder="请选择日期"
              onChange={this.methods().timeChange.bind(
                this,
                record,
                index,
                'plan_in_riqi',
              )}
            />
          );
        },
      },
      {
        title: '结算周期(终)',
        dataIndex: 'plan_out_riqi',
        key: 'plan_out_riqi',
        width: 200,
        render: (text, record, index) => {
          return (
            <DatePicker
              format="YYYY-MM-DD"
              placeholder="请选择日期"
              onChange={this.methods().timeChange.bind(
                this,
                record,
                index,
                'plan_out_riqi',
              )}
            />
          );
        },
      },
      {
        title: '数量',
        dataIndex: 'zl_number',
        editable: true,
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.zl_number}>
            <span>{record.zl_number}</span>
          </Tooltip>
        ),
      },
      {
        title: '单价(元)',
        dataIndex: 'price',
        editable: true,
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.price}>
            <span>{record.price}</span>
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
        title: '操作',
        dataIndex: 'operation',
        render: (_, record: any, index: any) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              cancelText="取消"
              okText="确定"
              title="确定删除?"
              onConfirm={() => this.methods().handleRowDelete(record, index)}
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
      const { hanmoney = 0, detailedData = [] } = value ? value : {};
      return (
        <div className="field-wrapper">
          <div className="label" style={{ marginTop: '10px' }}>
            {label}
          </div>
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
      <div className="TestLeconField_class">
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
                bizAlias="TestLecon"
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

          {/* 树形 */}

          <Modal className="isvzhukuaizkgl" 
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
