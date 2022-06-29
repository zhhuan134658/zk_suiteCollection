import React from 'react';
import {
  Table,
  Tooltip,
  Modal,
  Input,
  Button,
  Pagination,
  notification,
} from 'antd';
import { CloseCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { DataType, ISwapFormField, SimpleData } from '../../types/runtime';
import { changePage } from '../../utils/pageUtils';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { uniqueArrayByKey } from '../../utils/normalizeUtils';
const { Search } = Input;
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
    title: '劳务单位/班组',
    dataIndex: 'team',
  },
  {
    title: '合同金额',
    dataIndex: 'contract_money',
  },
];
const FormField: ISwapFormField = {
  getInitialState() {
    const { form } = this.props;
    return {
      Inputvalue: '',
      //   Inputvalue: '123',
      current_page: '', //当前页
      total2: '',
      allData: {
        type: '0',
        number: '10',
        page: '1',
        name: '',
        project_name: '',
      },
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
        const newData = _this.state.allData;
        newData.name = value;
        newData.type = 0;
        newData.page = 1;
        _this.setState({ allData: newData });
        _this.asyncSetFieldProps(newData);
      },
      handleNewCancel() {
        _this.setState({
          visibleModal: false,
        });
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
        _this.setState({
          dataSource: dataSource.filter(item => item.id !== row.id),
        });
      },
      iconClick() {
        const { form } = _this.props;
        _this.setState({ Inputvalue: '' });
        form.setFieldValue('Selectjia', '');
        form.setFieldExtendValue('Selectjia', '');
        form.setFieldValue('ConLaomoney', '');
        form.setFieldExtendValue('ConLaomoney', '');
        form.setFieldValue('SelectLao', '');
        form.setFieldExtendValue('SelectLao', '');
      },
      handleAddNew() {
        _this.setState({
          visibleModal: true,
        });
      },
      handleAdd() {
        const { form } = _this.props;
        const value = form.getFieldValue('Autopro');
        if (!value) {
          return notification.open({
            message: '请先选择项目',
          });
        }
        const newvalue = _this.state.allData;
        newvalue.name = '';
        newvalue.type = 0;
        newvalue.page = 1;
        newvalue.project_name = value;
        _this.setState({
          allData: newvalue,
          isModalVisible: true,
        });
        _this.asyncSetFieldProps(newvalue);
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
        if (row.num2) {
          newData[index].num3 = row.num1 * row.num2;
        }
        _this.setState({ dataSource: newData });
      },
      rowClick(record: any) {
        const { form } = _this.props;
        _this.setState(
          { Inputvalue: record.name, isModalVisible: false },
          () => {
            form.setFieldValue('Selectjia', record.team);
            form.setFieldExtendValue('Selectjia', record.team);
            form.setFieldValue('ConLaomoney', record.contract_money);
            form.setFieldExtendValue('ConLaomoney', record.contract_money);
            form.setFieldValue('SelectLao', record.name);
            form.setFieldExtendValue('SelectLao', record.name);
          },
        );
      },
    };
  },
  handleOk() {
    const newData = [...this.state.dataSource];
    const cData = [...this.state.currentSelectData];
    let lData = [];
    if (cData.length > 0) {
      cData.forEach(element => {
        newData.push(element);
      });
    }
    lData = uniqueArrayByKey(newData, ['id']);
    console.log('pp+' + JSON.stringify(lData));
    this.setState({
      dataSource: lData,
      isModalVisible: false,
      selectedRowKeys: [],
    });
  },
  handleCancel() {
    this.setState({ isModalVisible: false, selectedRowKeys: [] });
  },
  asyncSetFieldProps(data: any) {
    const _this = this;
    const bizAlias = 'SelectLao';
    const promise = asyncSetProps(
      _this,
      data,
      bizAlias,
      'service_progresspay_declaration',
    );
    promise.then(res => {
      const dataArray = res.dataArray;
      if (dataArray.length === 0) {
        _this.setState({ Inputvalue: '暂无合同' });
        _this.props.form.setFieldValue('SelectLao', '暂无合同');
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
    return null;
  },

  fieldRender() {
    const { form, runtimeProps } = this.props;
    const { viewMode } = runtimeProps;
    const field = form.getFieldInstance('SelectLao');
    const label = form.getFieldProp('SelectLao', 'label');
    const required = form.getFieldProp('SelectLao', 'required');
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
      <div className="SelectLaoField_class">
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
              placeholder="请选择合同"
              suffix={
                <CloseCircleOutlined
                  onClick={this.methods().iconClick}
                  style={{ color: 'rgba(0,0,0,.45)' }}
                />
              }
            />
          </div>

          <Modal className="isvzhukuaizkoatiaoshi" 
            title="选择合同"
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
                this.methods().handleSearch(val);
              }}
              onChange={e => {
                if (e.target.value === '') {
                  this.methods().handleSearch('');
                }
              }}
            />
            <Table
              scroll={{ y: '255px' }}
              onRow={record => {
                return {
                  onClick: this.methods().rowClick.bind(this, record),
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
