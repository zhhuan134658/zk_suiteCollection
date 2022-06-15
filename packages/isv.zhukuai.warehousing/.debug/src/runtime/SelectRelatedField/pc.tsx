import React from 'react';
import { Table, Tooltip, Modal, Input, Button, Pagination } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { DataType, ISwapFormField, SimpleData } from '../../types/runtime';
import { changePage } from '../../utils/pageUtils';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { uniqueArrayByKey } from '../../utils/normalizeUtils';
const { Search } = Input;
const FormField: ISwapFormField = {
  getInitialState() {
    const { form } = this.props;
    return {
      Inputvalue: '',
      myColumns: [],
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
        form.setFieldValue('SelectRelated', '');
        form.setFieldExtendValue('SelectRelated', '');
        form.setFieldValue('Moneytest', '');
        form.setFieldExtendValue('Moneytest', '');
      },
      handleAddNew() {
        _this.setState({
          visibleModal: true,
        });
      },
      handleAdd() {
        const { form } = _this.props;
        const typeName = form.getFieldValue('RadioField');
        let myColumns: Array<any>;
        switch (typeName as string) {
          case '投标保证金支出':
            myColumns = [
              {
                title: '主题',
                dataIndex: 'extend_five',
                render: (_, record: any) => (
                  <Tooltip placement="topLeft" title={record.extend_five}>
                    <span>{record.extend_five}</span>
                  </Tooltip>
                ),
              },
              {
                title: '收取单位',
                dataIndex: 't1',
              },
              {
                title: '保证金金额',
                dataIndex: 'bond_money',
              },
            ];
            break;
          case '履约保证金支出':
            myColumns = [
              {
                title: '主题',
                dataIndex: 'extend_two',
                render: (_, record: any) => (
                  <Tooltip placement="topLeft" title={record.extend_two}>
                    <span>{record.extend_two}</span>
                  </Tooltip>
                ),
              },
              {
                title: '甲方单位',
                dataIndex: 'party_a',
              },
              {
                title: '保证金金额',
                dataIndex: 'bond_money',
              },
            ];
            break;
          case '劳务分包保证金退回':
            myColumns = [
              {
                title: '主题',
                dataIndex: 'extend_five',
                render: (_, record: any) => (
                  <Tooltip placement="topLeft" title={record.extend_five}>
                    <span>{record.extend_five}</span>
                  </Tooltip>
                ),
              },
              {
                title: '劳务分包单位',
                dataIndex: 't1',
              },
              {
                title: '退回金额',
                dataIndex: 'return_money',
              },
            ];
            break;
          case '专业分包保证金退回':
            myColumns = [
              {
                title: '主题',
                dataIndex: 'extend_five',
                render: (_, record: any) => (
                  <Tooltip placement="topLeft" title={record.extend_five}>
                    <span>{record.extend_five}</span>
                  </Tooltip>
                ),
              },
              {
                title: '分包单位',
                dataIndex: 't1',
              },
              {
                title: '退回金额',
                dataIndex: 'return_money',
              },
            ];
            break;
          case '投标保证金退回':
            myColumns = [
              {
                title: '主题',
                dataIndex: 'extend_five',
                render: (_, record: any) => (
                  <Tooltip placement="topLeft" title={record.extend_five}>
                    <span>{record.extend_five}</span>
                  </Tooltip>
                ),
              },

              {
                title: '保证金金额',
                dataIndex: 'bond_money',
              },
            ];
            break;
          case '履约保证金退回':
            myColumns = [
              {
                title: '主题',
                dataIndex: 'extend_two',
                render: (_, record: any) => (
                  <Tooltip placement="topLeft" title={record.extend_two}>
                    <span>{record.extend_two}</span>
                  </Tooltip>
                ),
              },
              {
                title: '甲方单位',
                dataIndex: 'party_a',
              },
              {
                title: '退回金额',
                dataIndex: 'return_money',
              },
            ];
            break;
          case '劳务分包保证金收入':
            myColumns = [
              {
                title: '主题',
                dataIndex: 'extend_five',
                render: (_, record: any) => (
                  <Tooltip placement="topLeft" title={record.extend_five}>
                    <span>{record.extend_five}</span>
                  </Tooltip>
                ),
              },

              {
                title: '劳务分包单位',
                dataIndex: 'unit',
              },
              {
                title: '保证金金额',
                dataIndex: 'bond_money',
              },
            ];
            break;
          case '专业分包保证金收入':
            myColumns = [
              {
                title: '主题',
                dataIndex: 'extend_five',
                render: (_, record: any) => (
                  <Tooltip placement="topLeft" title={record.extend_five}>
                    <span>{record.extend_five}</span>
                  </Tooltip>
                ),
              },

              {
                title: '分包单位',
                dataIndex: 't1',
              },
              {
                title: '保证金金额',
                dataIndex: 'bond_money',
              },
            ];
            break;
          default:
            myColumns = [];
            break;
        }
        const newData = _this.state.allData;
        newData.name = '';
        newData.type = 0;
        newData.page = 1;
        _this.setState({
          myColumns,
          allData: newData,
          isModalVisible: true,
        });
        _this.asyncSetFieldProps(newData);
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

        _this.setState({ Inputvalue: record.title });

        form.setFieldValue('SelectRelated', record.title);
        form.setFieldExtendValue('SelectRelated', record.title);
        form.setFieldValue('Moneytest', record.money);
        form.setFieldExtendValue('Moneytest', record.money);
        console.log('record', record);
        _this.setState({ isModalVisible: false });
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
    const { form } = _this.props;
    const bizAlias = 'SelectRelated';
    const projectName = form.getFieldValue('Selectbaopro');
    const bondType = form.getFieldValue('RadioField');
    const contractName = form.getFieldValue('SelectHe');
    data['project_name'] = projectName;
    data['bond_type'] = bondType;
    data['contract_name'] = contractName;
    const promise = asyncSetProps(_this, data, bizAlias, '', projectName);
    promise.then(res => {
      const dataArray = res.dataArray;
      if (dataArray.length === 0) {
        _this.setState({ Inputvalue: '暂无合同' });
        _this.props.form.setFieldValue('SelectRelated', '暂无合同');
        _this.props.form.setFieldExtendValue('SelectRelated', '暂无合同');
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
    const field = form.getFieldInstance('SelectRelated');
    const label = form.getFieldProp('SelectRelated', 'label');
    const required = form.getFieldProp('SelectRelated', 'required');
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
      <div className="SelectRelatedField_class">
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
              columns={this.state.myColumns}
              dataSource={this.state.listData}
              loading={this.state.loading}
              pagination={false}
            ></Table>
            <Pagination
              defaultCurrent={1}
              total={this.state.total2}
              hideOnSinglePage={true}
              className="pagination"
              onChange={this.methods().handlePageChange}
            />
          </Modal>
        </div>
      </div>
    );
  },
};

export default FormField;
