import React, { FC, useState, useEffect } from 'react';

import {
  Button,
  Modal,
  Tooltip,
  Input,
  Pagination,
  Table,
  Layout,
  Form,
  Select,
  Tree,
} from 'antd';

import { PaginationBox } from '../paginationBox/index';
import './index.less';

const { Search } = Input;
const { Sider, Content } = Layout;
const { Option } = Select;

const mycolumns = [
  {
    title: '单位名称',
    dataIndex: 'unit_name',
    ellipsis: true,
    render: (_, record: any) => {
      const { unit_name } = record;
      return (
        <Tooltip placement="topLeft" title={unit_name}>
          <span>{unit_name}</span>
        </Tooltip>
      );
    },
  },
  {
    title: '统一社会信用代码',
    dataIndex: 'code',
    ellipsis: true,
  },
  {
    title: '分管人',
    dataIndex: 'in_charge:',
    ellipsis: true,
  },
  {
    title: '单位类型',
    dataIndex: 'unit_type',
    ellipsis: true,
    width: 100,
  },
  {
    title: '单位性质',
    dataIndex: 'unit_nature',
    ellipsis: true,
    width: 100,
  },
];

interface ChangeValue {
  page: number;
  pageSize: number;
}

const SelectSupplier: FC<{
  title?: string;
  visible?: boolean;
  loading?: boolean;
  width?: number;
  treeData?: any[];
  dataSource?: any[];
  total?: number;
  searchValue?: string;
  optionsArr?: any[];
  optionNature?: any[];
  callBackSearch?: (obj: any) => void;
  callBackRows?: (row: any) => void;
  callBackChangePage?: (obj: ChangeValue) => void;
  callBackFinish?: (value: any) => void;
  callBackHandleOk?: Function;
  callBackHandleCancel?: (flag: boolean) => void;
  callBackTreeSelect?: Function;
  callBackSearchValue?: (value: string) => void;
}> = props => {
  const formRef = React.createRef();
  const {
    title,
    treeData,
    width = 1000,
    visible = false,
    loading: loadings = false,
    dataSource = [],
    total = 0,
    searchValue,
    optionsArr = [],
    optionNature = [],
    callBackSearch,
    callBackRows,
    callBackChangePage,
    callBackFinish,
    callBackHandleOk,
    callBackHandleCancel,
    callBackTreeSelect,
    callBackSearchValue,
  } = props;

  const [loading, setLoading] = useState(loadings);
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    setLoading(false);
  }, [dataSource]);

  useEffect(() => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  }, [dataSource, visible]);

  const handleOk = (): void => {
    if (callBackHandleOk) {
      callBackHandleOk(selectedRows);
    }
  };

  const handleCancel = (): void => {
    if (callBackHandleCancel) {
      callBackHandleCancel(false);
    }
  };

  const onSelect = (keys: React.Key[], info: any): void => {
    const { node } = info;
    if (callBackTreeSelect) {
      callBackTreeSelect(node);
    }
  };

  const searchChange = e => {
    const { value } = e.target;
    if (callBackSearchValue) {
      callBackSearchValue(value);
    }
  };

  const onSearch = (value: string): void => {
    const obj = {
      name: value,
      page: 1,
      pageSize: 10,
    };
    if (callBackSearch) {
      callBackSearch(obj);
    }
  };

  const showModal = (): void => {
    setVisibleModal(true);
  };

  const onChangePage = (page: number, pageSize: number): void => {
    if (callBackChangePage) {
      callBackChangePage({ page, pageSize });
    }
  };

  /**
   * 新增单条数据操作
   */

  const hideModal = (): void => {
    setVisibleModal(false);
    // @ts-ignore
    formRef.current.resetFields();
  };

  const onFinish = (values: any) => {
    setVisibleModal(false);
    if (callBackFinish) {
      callBackFinish(values);
    }
    // @ts-ignore
    formRef.current.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const rowClick = (rows): void => {
    const { id } = rows;
    setSelectedRowKeys([id]);
    setSelectedRows([rows]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRowKeys, selectedRows, 'selectedRows');
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRows(selectedRows);
    },
  };

  const addNewUnit = () => {
    // @ts-ignore
    formRef.current.submit();
  };

  return (
    <>
      <Modal
        title={title || '选择供应商'}
        width={width}
        visible={visible}
        footer={[
          <Button key="back" onClick={handleCancel}>
            返回
          </Button>,
          <Button type="primary" loading={loading} onClick={handleOk} key="ok">
            确定
          </Button>,
        ]}
        onCancel={handleCancel}
      >
        <Layout className="modalbodyBox">
          <Sider className="newside_new">
            <Tree
              defaultSelectedKeys={['1234567890']}
              blockNode
              defaultExpandAll
              onSelect={onSelect}
              onExpand={() => {}}
              treeData={treeData}
            />
          </Sider>
          <Content className="content">
            <div className="header_tab_class">
              <Search
                placeholder="请输入"
                allowClear
                enterButton="搜索"
                size="large"
                onSearch={onSearch}
                value={searchValue}
                onChange={searchChange}
              />
              <Button onClick={showModal} size="large" type="primary">
                新增
              </Button>
            </div>

            {dataSource.length > 0 ? (
              <>
                <Table
                  onRow={record => {
                    return {
                      onClick: () => {
                        rowClick(record);
                      },
                    };
                  }}
                  rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                  }}
                  rowKey={record => record.id}
                  columns={mycolumns}
                  dataSource={dataSource}
                  loading={loading}
                  pagination={false}
                />
                <PaginationBox
                  style={{ position: 'absolute', bottom: '0', left: '0' }}
                >
                  <Pagination
                    defaultCurrent={1}
                    total={total}
                    className="pagination"
                    onChange={onChangePage}
                  />
                </PaginationBox>
              </>
            ) : (
              <div className="empty">暂无数据</div>
            )}
          </Content>
        </Layout>
      </Modal>

      {/* 新增单个 */}
      <Modal
        onCancel={hideModal}
        visible={visibleModal}
        width={1000}
        title="新增"
        footer={[
          <Button type="default" onClick={hideModal}>
            取消
          </Button>,
          <Button type="primary" onClick={addNewUnit}>
            确认
          </Button>,
        ]}
      >
        <Form
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          //@ts-ignore
          ref={formRef}
        >
          <Form.Item
            label="单位名称"
            name="unit_name"
            rules={[
              { required: true, message: '请填写单位名称' },
              { max: 100, message: '单位名称最大字符不能超过100个' },
            ]}
          >
            <Input placeholder="请填写单位名称" />
          </Form.Item>
          <Form.Item
            label="单位类型"
            name="unit_type"
            rules={[{ required: true, message: '请填写单位类型' }]}
          >
            <Select placeholder="请填写单位类型" allowClear>
              {optionsArr.length > 0 &&
                optionsArr.map(item => {
                  const { key, title } = item;
                  return (
                    <Option key={key} value={title}>
                      {title}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item
            label="单位性质"
            name="unit_nature"
            rules={[{ required: true, message: '请填写单位性质' }]}
          >
            <Select placeholder="请填写单位性质" allowClear>
              {optionNature.length &&
                optionNature.map(item => {
                  const { id, value } = item;
                  return (
                    <Option key={id} value={value}>
                      {value}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export { SelectSupplier };
