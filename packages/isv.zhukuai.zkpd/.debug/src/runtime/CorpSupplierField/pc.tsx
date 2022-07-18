import {
  Button,
  Modal,
  Tooltip,
  Input,
  Pagination,
  Table,
  notification,
  Layout,
  Form,
  Select,
  Tree,
} from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { ISwapFormField, SimpleData } from '../../types/runtime';
import { asyncSetProps } from '../../utils/asyncSetProps';
const { Search } = Input;
const { Sider, Content } = Layout;
const { Option } = Select;
import { uniqueArrayByKey } from '../../utils/normalizeUtils';
const mycolumns = [
  {
    title: '单位名称',
    dataIndex: 'name',
    render: (_, record: any) => (
      <Tooltip placement="topLeft" title={record.name}>
        <span>{record.name}</span>
      </Tooltip>
    ),
  },
  {
    title: '单位编号',
    dataIndex: 'number',
  },
  {
    title: '分管人',
    dataIndex: 'charge_person:',
  },
  {
    title: '单位类型',
    dataIndex: 'supplier_type_name',
  },
  {
    title: '单位性质',
    dataIndex: 'unit_nature',
  },
];

const FormField: ISwapFormField = {
  getInitialState() {
    const { form } = this.props;
    return {
      msgdata: '',
      newOptine: [],
      Inputvalue: '',
      current_page: '', //当前页
      total2: '',
      allData: {
        type: '0',
        number: '10',
        page: '1',
        name: '',
        supplier_type: '0',
      },
      isModalVisible: false,
      visibleModal: false,
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
    const promise = asyncSetProps(_this, data, 'CorpSupplier');
    promise.then(res => {
      const dropDownData = [...res.extendArray.data];
      dropDownData.splice(0, 1);
      _this.setState({
        listData: [...res.dataArray],
        current_page: res.currentPage,
        total2: res.totalCount,
        treeData: [...res.extendArray.data],
        newOptine: [...dropDownData],
      });
      if (_this.state.msgdata === '1') {
        notification.open({
          message: res.message,
        });
        _this.setState({
          msgdata: '0',
        });
      }
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
        _this.setState(
          {
            Inputvalue: record.name,
            isModalVisible: false,
          },
          () => {
            form.setFieldValue('CorpSupplier', record.name);
            form.setFieldExtendValue('CorpSupplier', record.name);
          },
        );
      },
      iconClick() {
        const { form } = _this.props;

        _this.setState({
          Inputvalue: '',
        });
        form.setFieldValue('CorpSupplier', '');
        form.setFieldExtendValue('CorpSupplier', '');
      },
      handleAdd() {
        const newData = _this.state.allData;
        _this.asyncSetFieldProps(newData);
        _this.setState({
          isModalVisible: true,
        });
      },
      hideModal() {
        _this.setState({
          visibleModal: false,
        });
      },
      showModal() {
        _this.setState({
          visibleModal: true,
        });
      },
    };
  },
  handleCancel() {
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
    const field = form.getFieldInstance('CorpSupplier');
    const label = form.getFieldProp('CorpSupplier', 'label');
    const required = form.getFieldProp('CorpSupplier', 'required');
    const onSelect = (keys: React.Key[], info: any) => {
      console.log(info.node.key);
      let treedata = {
        supplier_type: '',
        name: '',
        number: '10',
        page: '1',
      };

      treedata = {
        supplier_type: info.node.key,
        name: '',
        number: '10',
        page: '1',
      };

      this.setState({
        allData: treedata,
      });
      this.asyncSetFieldProps(treedata);
    };
    form.onFieldExtendValueChange('CorpSupplier', (value: string) => {
      if (this.state.Inputvalue !== value) {
        this.setState({
          Inputvalue: value,
        });
      }
    });
    const onExpand = () => {
      console.log('Trigger Expand');
    };
    const Options = this.state.newOptine.map(station => (
      <Option key={station.key} value={station.title}>
        {station.title}
      </Option>
    ));
    const onFinish = (values: any) => {
      this.setState({
        msgdata: '1',
      });
      console.log('Success:', values);
      //   const [form] = Form.useForm();
      const newdate = this.state.allData;
      newdate.supplier_add = values;
      this.asyncSetFieldProps(newdate);
      this.setState({
        visibleModal: false,
      });
      newdate.supplier_add = '';

      //   form.resetFields();
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
          {/* {data} */}

          <div style={{ marginTop: '10px' }}> {value}</div>
        </div>
      );
    }
    return (
      <div className="CorpSupplier_class">
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
            title="选择供应商"
            width={1000}
            visible={this.state.isModalVisible}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                返回
              </Button>,
              <Button
                type="primary"
                loading={this.state.loading}
                onClick={this.handleOk}
                key="ok"
              >
                确定
              </Button>,
            ]}
            onCancel={this.handleCancel}
          >
            <Layout>
              <Sider className="newside_new">
                <Tree
                  blockNode
                  defaultExpandAll
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
                    onSearch={this.methods().onSearch}
                  />
                  <Button
                    onClick={this.methods().showModal}
                    size="large"
                    type="primary"
                  >
                    新增
                  </Button>
                </div>

                <Table
                  scroll={{ y: '255px' }}
                  onRow={record => {
                    return {
                      onClick: this.methods().rowClick.bind(this, record),
                    };
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
                  onChange={this.methods().onChangePage}
                />
              </Content>
            </Layout>
          </Modal>
          {/* 新增个 */}
          <Modal className="isvzhukuaiwarehousing" 
            onCancel={this.methods().hideModal}
            visible={this.state.visibleModal}
            width={1000}
            title="新增"
            footer={null}
          >
            <Form
              initialValues={{ remember: true }}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="单位名称"
                name="name"
                rules={[{ required: true, message: '请填写单位名称' }]}
              >
                <Input placeholder="请填写单位名称" />
              </Form.Item>
              <Form.Item
                label="单位类型"
                name="supplier_type"
                rules={[{ required: true, message: '请填写单位类型' }]}
              >
                <Select placeholder="请填写单位类型" allowClear>
                  {Options}
                </Select>
              </Form.Item>
              <Form.Item
                label="单位性质"
                name="unit_nature"
                rules={[{ required: true, message: '请填写单位性质' }]}
              >
                <Select placeholder="请填写单位性质" allowClear>
                  <Option value="事业">事业</Option>
                  <Option value="企业">企业</Option>
                  <Option value="社团">社团</Option>
                  <Option value="自然人">自然人</Option>
                  <Option value="其他">其他</Option>
                </Select>
              </Form.Item>
              <Form.Item className="newForm">
                <Button type="primary" htmlType="submit">
                  确认
                </Button>
                <Button type="primary" onClick={this.methods().hideModal}>
                  取消
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    );
  },
};

export default FormField;
