import 'dingtalk-jsapi/entry/union';
import * as dd from 'dingtalk-jsapi'; // 此方式为整体加载，也可按需进行加载
import React from 'react';
import { Table, Tooltip, Modal, Input, Button, Pagination } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { DataType, ISwapFormField, SimpleData } from '../../types/runtime';
import { searchBarSubmit } from '../../utils/searchUtils';
import { changePage } from '../../utils/pageUtils';
import { asyncSetProps } from '../../utils/asyncSetProps';
const { Search } = Input;
import { uniqueArrayByKey } from '../../utils/normalizeUtils';
const myColumns = [
  {
    title: '账户名称',
    dataIndex: 'accountname',
    render: (_, record: any) => (
      <Tooltip placement="topLeft" title={record.accountname}>
        <span>{record.accountname}</span>
      </Tooltip>
    ),
  },
  {
    title: '账号',
    dataIndex: 'accountnumber',
    render: (_, record: any) => (
      <Tooltip placement="topLeft" title={record.accountnumber}>
        <span>{record.accountnumber}</span>
      </Tooltip>
    ),
  },
  {
    title: '开户行',
    dataIndex: 'bankofdeposit',
    render: (_, record: any) => (
      <Tooltip placement="topLeft" title={record.bankofdeposit}>
        <span>{record.bankofdeposit}</span>
      </Tooltip>
    ),
  },
  {
    title: '操作',
    dataIndex: 'operation',

    render: (_, record: any) => (
      <a
        onClick={() =>
          dd.ready(() => {
            dd.biz.util.openSlidePanel({
              url: 'www.baidu.com', //打开侧边栏的url
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

const FormField: ISwapFormField = {
  getInitialState() {
    const { form } = this.props;

    return {
      Inputvalue: '',
      current_page: '',
      total2: '',
      allData: { type: '0', number: '10', page: '1', name: '' },
      isModalVisible: false,
      listData: [],

      treeData: [],
      pagination: {
        current: 1,
        pageSize: 10,
      },

      loading: false,
      leaveLongVal: '',

      dataSource: [],
      count: 1,

      currentEditId: 0,
      currentSelectData: [],
      selectedRowKeys: [],
    };
  },
  methods() {
    const _this = this;
    return {
      handleSearch(value: any) {
        searchBarSubmit(_this, value, '');
      },
      handleChangePage(page: any) {
        changePage(_this, page);
      },
      handleRowChange(row: DataType) {
        _this.setState({
          currentEditId: row.key,
        });
      },
      handleRowDelete(row: SimpleData) {
        const dataSource = [..._this.state.dataSource];
        _this.setState({
          dataSource: dataSource.filter(
            (item: SimpleData) => item.id !== row.id,
          ),
        });
      },
      iconClick() {
        const { form } = _this.props;
        _this.setState({
          Inputvalue: '',
        });
        form.setFieldValue('Inputvalue1', '');
        form.setFieldExtendValue('Inputvalue1', '');
        form.setFieldValue('Inputvalue2', '');
        form.setFieldExtendValue('Inputvalue2', '');
        form.setFieldValue('SelectAcc', '');
        form.setFieldExtendValue('SelectAcc', '');
      },
      handleAdd() {
        const newData = _this.state.allData;
        _this.asyncSetFieldProps(newData);
        _this.setState({
          isModalVisible: true,
        });
      },
      handleSave(row: SimpleData) {
        const newData = _this.state.dataSource;
        const index = newData.findIndex(
          (item: SimpleData) => item.id === row.id,
        );
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        if (row.num2) {
          newData[index].num3 = row.num1 * row.num2;
        }
        _this.setState({ dataSource: newData });
      },
      rowClick(record: any) {
        const { form } = _this.props;
        form.setFieldValue('Inputvalue', record.accountname);
        form.setFieldExtendValue('Inputvalue', record.accountname);
        form.setFieldValue('Inputvalue1', record.accountnumber);
        form.setFieldValue('Inputvalue2', record.bankofdeposit);
        form.setFieldExtendValue('Inputvalue1', record.accountnumber);
        form.setFieldExtendValue('Inputvalue2', record.bankofdeposit);
        _this.setState(
          {
            Inputvalue: record.accountname,
            isModalVisible: false,
          },
          () => {
            form.setFieldValue('SelectAcc', record.accountname);
            form.setFieldExtendValue('SelectAcc', record.accountname);
          },
        );
      },
    };
  },
  handleOk() {
    const newData = [...this.state.dataSource];
    const selectData = [...this.state.currentSelectData];
    if (selectData.length > 0) {
      selectData.forEach(element => {
        newData.push(element);
      });
    }
    const uniqueData = [...uniqueArrayByKey(newData, ['id'])];
    this.setState({
      dataSource: uniqueData,
      isModalVisible: false,
      selectedRowKeys: [],
    });
  },
  handleCancel() {
    this.setState({ isModalVisible: false, selectedRowKeys: [] });
  },
  asyncSetFieldProps(data: any) {
    const _this = this;
    const bizAlias = 'SelectAcc';
    const promise = asyncSetProps(_this, data, bizAlias);
    promise.then(res => {
      _this.setState({
        listData: [...res.dataArray],
        current_page: res.currentPage,
        total2: res.totalCount,
      });
    });
  },
  fieldRender() {
    const { form, runtimeProps } = this.props;
    const { viewMode } = runtimeProps;
    const field = form.getFieldInstance('SelectAcc');
    const label = form.getFieldProp('SelectAcc', 'label');
    const required = form.getFieldProp('SelectAcc', 'required');
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

    return (
      <div className="SelectAccField_class">
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
              value={this.state.Inputvalue}
              onClick={this.methods().handleAdd}
              placeholder="请选择账户"
              suffix={
                <CloseCircleOutlined
                  onClick={this.methods().iconClick}
                  style={{ color: 'rgba(0,0,0,.45)' }}
                />
              }
            />
          </div>

          <Modal
            title="选择账户"
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
              onSearch={this.methods().handleSearch}
            />
            <Table
              scroll={{ y: '255px' }}
              onRow={record => {
                return {
                  onClick: event => {
                    this.methods().rowClick.bind(this, record);
                  },
                };
              }}
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
        </div>
      </div>
    );
  },
};

export default FormField;
