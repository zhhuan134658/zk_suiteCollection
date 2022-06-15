import { Button, Modal, Tooltip, Input, Pagination, Table } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { ISwapFormField, SimpleData } from '../../types/runtime';
import { asyncSetProps } from '../../utils/asyncSetProps';
const { Search } = Input;
import { StorageDesktopDialog } from '../../components/addDetail';
import { uniqueArrayByKey } from '../../utils/normalizeUtils';
const mycolumns = [
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

const FormField: ISwapFormField = {
  getInitialState() {
    const { form } = this.props;
    return {
      Inputvalue: '',
      current_page: '', //当前页
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
  asyncSetFieldProps(data: any) {
    const _this = this;
    const promise = asyncSetProps(_this, data, 'CorpHouse');
    promise.then(res => {
      _this.setState({
        listData: [...res.dataArray],
        current_page: res.currentPage,
        total2: res.totalCount,
      });
    });
  },
  methods() {
    const _this = this;
    return {
      onSearch(value: string) {
        const newData = _this.state.allData;
        newData.name = value;
        newData.type = 0;
        newData.page = 1;
        _this.setState({
          allData: newData,
        });
        _this.asyncSetFieldProps(newData);
      },
      onChangePage(page: any) {
        const newPage = _this.state.allData;
        newPage.page = page;
        _this.setState({
          allData: newPage,
        });
        _this.asyncSetFieldProps(newPage);
      },
      handleChange(row: SimpleData) {
        _this.setState({
          currentEditId: row.key,
        });
      },
      handleSave(row: SimpleData) {
        const newData = [..._this.state.dataSource];
        const index = newData.findIndex(item => row.id === item.id);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        if (row.num2) {
          newData[index].num3 = row.num1 * row.num2;
        }
        this.setState({ dataSource: [...newData] });
      },
      rowClick(record: SimpleData) {
        const { form } = _this.props;
        console.log('rowClick');
        _this.setState(
          {
            Inputvalue: record.name,
            isModalVisible: false,
          },
          () => {
            form.setFieldValue('CorpHouse', record.name);
            form.setFieldExtendValue('CorpHouse', record.name);
          },
        );
      },
      iconClick() {
        const { form } = _this.props;
        _this.setState({
          Inputvalue: '',
        });
        form.setFieldValue('CorpHouse', '');
        form.setFieldExtendValue('CorpHouse', '');
      },
      handleAdd() {
        const newData = _this.state.allData;
        _this.asyncSetFieldProps(newData);
        _this.setState({
          isModalVisible: true,
        });
      },
    };
  },
  handleCancel() {
    console.log('handleCancel');
    this.setState({
      isModalVisible: false,
      selectedRowKeys: [],
    });
  },
  handleOk() {
    const newData = [...this.state.dataSource];
    const selectData = [...this.state.currentSelectData];
    if (selectData.length > 0) {
      selectData.forEach(e => {
        newData.push(e);
      });
    }
    console.log('handleOK');
    const uniqueData = [...uniqueArrayByKey(newData, ['id'])];
    this.setState({
      dataSource: uniqueData,
      isModalVisible: false,
      selectedRowKeys: [],
    });
  },
  fieldRender() {
    const { form, runtimeProps } = this.props;
    const { viewMode } = runtimeProps;
    const field = form.getFieldInstance('CorpHouse');
    const label = form.getFieldProp('CorpHouse', 'label');
    const required = form.getFieldProp('CorpHouse', 'required');
    const onFinish = (values: any) => {
      this.setState({
        msgdata: '1',
      });
      console.log('Success:', values);
      //   const [form] = Form.useForm();
      const newdate = this.state.allData;
      newdate['cang_add'] = values;
      this.asyncSetFieldProps(newdate);
      newdate['cang_add'] = '';
    };
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    // 详情页
    if (viewMode) {
      const value = field.getExtendValue() ? field.getExtendValue() : '';
      return (
        <div className="field-wrapper">
          <div className="label" style={{ marginTop: '10px' }}>
            {label}
          </div>
          <div style={{ marginTop: '10px' }}>{value}</div>
        </div>
      );
    }
    return (
      <div className="CorpHouse_class">
        <div className="pc-custom-field-wrap">
          <div className="label" style={{ marginTop: '10px' }}>
            {required ? (
              <span style={{ color: '#ea6d5c' }}>*</span>
            ) : (
              <span style={{ color: '#fff' }}>*</span>
            )}
            {label}
          </div>
          {/* <div
            onClick={() => {
              const { form } = this.props;
              console.log(form.getFieldExtendValue('relation'));
              //   console.log(form.getValue('relation'));
              console.log(form.getFieldProps('relation'));
            }}
            style={{ color: 'red' }}
          >
            123456789
          </div> */}
          <div>
            <Input
              readOnly
              value={this.state.Inputvalue}
              onClick={this.methods().handleAdd}
              placeholder="请选择库房"
              suffix={
                <CloseCircleOutlined
                  onClick={this.methods().iconClick}
                  style={{ color: 'rgba(0,0,0,.45)' }}
                />
              }
            />
          </div>

          <Modal className="isvzhukuaiwarehousing" 
            title="选择库房"
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
            <div className="header_tab_class">
              <Search
                placeholder="请输入"
                allowClear
                enterButton="搜索"
                size="large"
                onSearch={this.methods().onSearch}
              />
              <StorageDesktopDialog
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              />
            </div>
            <Table
              scroll={{ y: '255px' }}
              onRow={record => {
                return {
                  onClick: this.methods().rowClick.bind(this, record),
                };
              }}
              rowSelection={{
                type: 'radio',
              }}
              rowKey={record => record.id}
              columns={mycolumns}
              dataSource={this.state.listData}
              loading={this.state.loading}
              pagination={false}
            ></Table>
            <Pagination
              defaultCurrent={1}
              total={this.state.total2}
              hideOnSinglePage={true}
              className="pagination"
              onChange={this.methods().onChangepage}
            />
          </Modal>
        </div>
      </div>
    );
  },
};

export default FormField;
