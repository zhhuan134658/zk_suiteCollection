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
import { CloseCircleOutlined } from '@ant-design/icons';
import { DataType, ISwapFormField, SimpleData } from '../../types/runtime';
import { changePage } from '../../utils/pageUtils';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { uniqueArrayByKey } from '../../utils/normalizeUtils';
const { Search } = Input;

const myColumns = [
  {
    title: '合同名称',
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
    title: '甲方',
    dataIndex: 'party_a',
  },
  {
    title: '合同金额',
    dataIndex: 'money',
  },
];

const FormField: ISwapFormField = {
  getInitialState() {
    const { form } = this.props;

    return {
      Inputvalue: '',
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
        _this.setState({ Inputvalue: '' });
        form.setFieldValue('Selectjia', '');
        form.setFieldExtendValue('Selectjia', '');
        form.setFieldValue('Conmoney', '');
        form.setFieldExtendValue('Conmoney', '');
        form.setFieldValue('SelectCon', '');
        form.setFieldExtendValue('SelectCon', '');
      },
      handleAdd() {
        const { form } = _this.props;
        const value = form.getFieldValue('Autopro');
        if (value) {
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
        } else {
          notification.open({
            duration: 2,
            message: '请先选择项目',
          });
        }
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
        _this.setState(
          {
            Inputvalue: record.name,
            isModalVisible: false,
          },
          () => {
            form.setFieldValue('Conmoney', record.money);
            form.setFieldExtendValue('Conmoney', record.money);
            //   form.setFieldProp('Selectjia', 'value', record.party_a);
            form.setFieldValue('Selectjia', record.party_a);
            form.setFieldExtendValue('Selectjia', record.party_a);
            form.setFieldValue('SelectCon', record.name);
            form.setFieldExtendValue('SelectCon', record.name);
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
    const bizAlias = 'SelectCon';
    const promise = asyncSetProps(
      _this,
      data,
      bizAlias,
      'lease_completion_settlement',
    );
    promise.then(res => {
      console.log('SelectCon', res);
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
    const field = form.getFieldInstance('SelectCon');
    const label = form.getFieldProp('SelectCon', 'label');
    const required = form.getFieldProp('SelectCon', 'required');
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
      <div className="SelectConField_class">
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

          <Modal className="isvzhukuaizkpd" 
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
              onSearch={this.methods().handleSearch}
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
