import React from 'react';
import {
  Table,
  Tooltip,
  Modal,
  Input,
  Button,
  Pagination,
  notification,
  Tabs,
} from 'antd';
import { CloseCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { DataType, ISwapFormField, SimpleData } from '../../types/runtime';
import { changePage } from '../../utils/pageUtils';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { searchBarSubmitRK } from '../../utils/searchUtils';
import { fpAdd } from '../../utils/fpOperations';
const { TabPane } = Tabs;
const { Search } = Input;

//采购合同
const myColumns = [
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
    dataIndex: 'settle_money',
  },
];

const myColumns1 = [
  {
    title: (
      <div>
        结算主题
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
    title: '结算金额',
    dataIndex: 'settle_money',
  },
];

//材料入库
const myColumns2 = [
  {
    title: (
      <div>
        入库名称
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
    title: '入库金额',
    dataIndex: 'settle_money',
  },
];

//采购订单
const myColumns3 = [
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
    dataIndex: 'settle_money',
  },
];
const FormField: ISwapFormField = {
  getInitialState() {
    return {
      detailPage: 1,
      defaultActiveKey: 'a',
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

      currentEditId: 0,
      currentSelectData: [],
      currentSelectDataid: [],
      selectedRowKeys: [],
    };
  },
  methods() {
    const _this = this;
    return {
      handleSearch(value: any) {
        const newData = _this.state.allData;
        const defaultActiveKey = _this.state.defaultActiveKey;
        newData.name = value;
        newData.page = 1;
        newData.rk_id = [defaultActiveKey];
        _this.setState({ allData: newData });
        _this.asyncSetFieldProps(newData);
      },
      handleChangePage(page: any) {
        changePage(_this, page);
      },
      handleRowChange(row: DataType) {
        _this.setState({
          currentEditId: row.key,
        });
      },
      handleRowDelete(row: any) {
        const dataSource = [..._this.state.dataSource];
        if (row.tax_money) {
          const newvalue = _this.state.Inputmoney1;
          _this.setState({
            Inputmoney1: (newvalue - row.tax_money).toFixed(2),
          });
        }
        if (row.notax_money) {
          const newvalue2 = _this.state.Inputmoney2;
          _this.setState({
            Inputmoney2: (newvalue2 - row.notax_money).toFixed(2),
          });
        }
        _this.setState({
          dataSource: dataSource.filter(item => item.id !== row.id),
        });
      },
      iconClick() {
        const { form } = _this.props;
        _this.setState({ detailname: '' });
        form.setFieldValue('Conname', '');
        form.setFieldExtendValue('Conname', '');
        form.setFieldValue('Selectjia', '');
        form.setFieldExtendValue('Selectjia', '');
      },
      handleAddNew() {
        const { form } = _this.props;
        const value = form.getFieldValue('Autopro');
        if (value) {
          const defaultKey = _this.state.defaultActiveKey;
          _this.setState({ dstatus: '1' });
          const newPage = {
            rk_id: [defaultKey],
            number: '10',
            page: '1',
            name: '',
            project_name: value,
          };
          _this.setState({ allData: newPage, isModalVisible: true });
          _this.asyncSetFieldProps(newPage);
        } else {
          notification.open({
            duration: 2,
            message: '请先选择项目',
          });
        }
      },
      handleAdd() {
        _this.setState({ dstatus: '2' });
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

      handleSave(row: any) {
        const newData = _this.state.dataSource;
        const index = newData.findIndex(
          (item: SimpleData) => item.id === row.id,
        );
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        if (row.rk_number) {
          newData[index].tax_money = row.rk_number * row.tax_price;
        }
        if (row.tax_rate) {
          newData[index].notax_price = (
            row.tax_money *
            row.tax_rate *
            0.01
          ).toFixed(2);
          newData[index].notax_money = (
            row.tax_money *
            (100 - row.tax_rate) *
            0.01
          ).toFixed(2);
        }
        _this.setState({ dataSource: newData });
        const newarr1 = [..._this.state.dataSource];
        let newarr2 = [];

        newarr2 = newarr1.filter(item => {
          if (item.tax_money) {
            return item;
          }
        });
        newarr2 = newarr2.map(item => {
          return item.tax_money;
        });

        _this.setState({
          Inputmoney1: newarr2.reduce(fpAdd, 0).toFixed(2),
        });
        // 不含税金额合计;
        const newarr3 = [..._this.state.dataSource];
        let newarr4 = [];

        newarr4 = newarr3.filter(item => {
          if (item.notax_money) {
            return item;
          }
        });
        newarr4 = newarr4.map(item => {
          return item.notax_money;
        });

        _this.setState({
          Inputmoney2: newarr4.reduce(fpAdd, 0).toFixed(2),
        });
      },
      rowClick(record: any) {
        const { form } = _this.props;
        const newData = [..._this.state.dataSource];
        const index = newData.findIndex(
          item => _this.state.currentEditId === item.id,
        );
        const currentKey = newData[index].key;
        newData[index] = record;
        newData[index].key = currentKey;
        _this.setState({ dataSource: newData, isModalVisible: false }, () => {
          form.setFieldValue('TestMater', record);
          form.setFieldExtendValue('TestMater', record);
        });
      },
    };
  },
  handleOk() {
    this.setState({
      dstatus: '3',
      isModalVisible: false,
      selectedRowKeys: [],
    });
  },
  handleCancel() {
    this.setState({ isModalVisible: false, selectedRowKeys: [] });
  },
  asyncSetFieldProps(data: any) {
    const _this = this;
    const bizAlias = 'TestMater';
    const promise = asyncSetProps(_this, data, bizAlias, 'ticket_register');
    promise.then(res => {
      const dataArray = res.dataArray;
      if (dataArray.length === 0) {
        _this.setState({ Inputvalue: '暂无合同' });
        _this.props.form.setFieldValue('TestMater', '暂无合同');
        _this.setState({
          listData: [],
          current_page: 1,
          total2: 0,
        });
      } else {
        _this.setState({
          listData: dataArray,
          current_page: res.currentPage,
          total2: res.totalCount,
        });
      }
    });
  },
  fieldDidUpdate() {
    if (!this.props.runtimeProps.viewMode) {
      console.log('发起页：fieldDidUpdate');
      const { form } = this.props;
      form.setFieldValue('TestMater', this.state.detailname);
      form.setFieldExtendValue('TestMater', this.state.detailname);
    }
  },

  fieldRender() {
    const { form, runtimeProps } = this.props;
    const { viewMode } = runtimeProps;
    const field = form.getFieldInstance('TestMater');
    const label = form.getFieldProp('TestMater', 'label');
    const required = form.getFieldProp('TestMater', 'required');
    const { selectedRowKeys } = this.state;

    const Tabschange = key => {
      console.log(key);

      const newpage = {
        defaultActiveKey: key,
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
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(
        //   `selectedRowKeys: ${selectedRowKeys}`,
        //   'selectedRows: ',
        //   selectedRows,
        // );
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
        console.log('======' + JSON.stringify(newDataid));
        if (this.state.detdate === 'a1') {
          dtar = '材料结算-' + newData[0].name;
        } else if (this.state.detdate === 'b1') {
          dtar = '采购合同-' + newData[0].name;
        } else if (this.state.detdate === 'c1') {
          dtar = '采购订单-' + newData[0].name;
        } else if (this.state.detdate === 'd1') {
          dtar = '材料入库-' + newData[0].name;
        }
        form.setFieldValue(
          'Conname',
          newData[0] ? newData[0]['contract_name'] : '',
        );
        form.setFieldExtendValue(
          'Conname',
          newData[0] ? newData[0]['contract_name'] : '',
        );
        form.setFieldValue(
          'Selectjia',
          newData[0] ? newData[0]['supplier'] : '',
        );
        form.setFieldExtendValue(
          'Selectjia',
          newData[0] ? newData[0]['supplier'] : '',
        );
        this.setState({
          currentSelectData: newData,
          currentSelectDataid: newDataid,
          detailname: dtar,
        });
        this.setState({ selectedRowKeys });
      },
    };

    // 详情页
    if (viewMode) {
      const value = field.getExtendValue() ? field.getExtendValue() : '';
      return (
        <div className="field-wrapper">
          <div className="label" style={{ marginTop: '10px' }}>
            {label}
          </div>
          <div style={{ marginTop: '10px' }}> {value}</div>
        </div>
      );
    }

    let MyColumns = myColumns;

    switch (this.state.defaultActiveKey) {
      case 'b':
        MyColumns = myColumns;
        break;

      case 'c':
        MyColumns = myColumns3;
        break;

      case 'd':
        MyColumns = myColumns2;
        break;
      default:
        break;
    }

    return (
      <div className="TestMaterField_class">
        <div className="pc-custom-field-wrap">
          <div className="label" style={{ marginTop: '10px' }}>
            {required ? (
              <span style={{ color: '#ea6d5c' }}>*</span>
            ) : (
              <span style={{ color: '#fff' }}>*</span>
            )}
            {label}
          </div>
          <div>
            <Input
              readOnly
              value={this.state.detailname}
              onClick={this.methods().handleAddNew}
              placeholder="请选择"
              suffix={
                <CloseCircleOutlined
                  onClick={this.methods().iconClick}
                  style={{ color: 'rgba(0,0,0,.45)' }}
                />
              }
            />
          </div>

          <Modal className="isvzhukuaiwarehousing" 
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
              <TabPane tab="材料结算" key="a"></TabPane>
              <TabPane tab="采购合同" key="b"></TabPane>
              <TabPane tab="采购订单 " key="c"></TabPane>
              <TabPane tab="材料入库" key="d"></TabPane>
            </Tabs>
            <Search
              placeholder="请输入"
              allowClear
              enterButton="搜索"
              size="large"
              onSearch={val => {
                this.methods().handleSearch(val, this.state.defaultActiveKey);
              }}
              onChange={e => {
                if (e.target.value === '') {
                  this.methods().handleSearch('', this.state.defaultActiveKey);
                }
              }}
            />
            <Table
              scroll={{ y: '255px' }}
              rowSelection={{
                type: 'radio',
                ...rowSelection,
              }}
              rowKey={record => record.id}
              columns={MyColumns}
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
        </div>
      </div>
    );
  },
};

export default FormField;
