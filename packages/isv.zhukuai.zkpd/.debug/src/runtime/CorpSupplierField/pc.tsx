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
import { SelectBtn } from '../../components/selectBtn/index';
import { uniqueArrayByKey } from '../../utils/normalizeUtils';
import { SelectSupplier } from '../../components/selectSupplier';

const { Search } = Input;
const { Sider, Content } = Layout;
const { Option } = Select;

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
      current_page: '',
      total: '',
      allData: {
        type: '',
        pageSize: 10,
        page: 1,
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

      visible: false,
      selectType: '',
      companyName: '',
      unitName: '',
    };
  },
  asyncSetFieldProps() {
    const _this = this;
    const { msgdata, allData } = this.state;
    const promise = asyncSetProps(_this, allData, 'CorpSupplier');
    promise.then(res => {
      const {
        extendArray: { data },
        page,
        count,
        message,
        dataArray,
      } = res;
      const dropDownData = [...data];
      dropDownData.splice(0, 1);
      _this.setState({
        listData: [...dataArray],
        current_page: page,
        total: count,
        treeData: [...data],
        newOptine: [...dropDownData],
      });
      if (msgdata === '1') {
        notification.open({
          message,
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
      addNewProject: (type: string): void => {
        this.setState({
          visible: true,
          selectType: type,
        });
      },
      deleteProject: (type: string): void => {
        const newName = type + 'Name';
        this.setState(
          {
            [newName]: '',
          },
          () => {
            this.methods().saveResult();
          },
        );
      },
      callBackHandleOk: (rows): void => {
        const { selectType } = this.state;
        const newName = selectType + 'Name';

        console.log(rows, 'rows');
      },
      callBackHandleCancel: (flag): void => {
        this.setState({
          visible: false,
        });
      },
      callBackTreeSelect: (obj): void => {
        this.setState(
          {
            allData: obj,
          },
          () => {
            this.asyncSetFieldProps();
          },
        );
      },
      callBackChangePage: (obj): void => {
        const { allData } = _this.state;
        Object.assign(allData, obj);

        this.setState(
          {
            allData,
          },
          () => {
            this.asyncSetFieldProps();
          },
        );
      },
      onSearch(value: string) {
        const { allData: newData } = _this.state;
        // const newData = _this.state.allData;
        newData.name = value;
        newData.type = 0;
        newData.page = 1;
        _this.setState(
          {
            allData: newData,
          },
          () => {
            _this.asyncSetFieldProps();
          },
        );
      },
      onChangePage(page: any) {
        const { allData: newPage } = _this.state;
        newPage.page = page;
        _this.setState(
          {
            allData: newPage,
          },
          () => {
            _this.asyncSetFieldProps();
          },
        );
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
      saveResult() {
        const { form } = _this.props;
        const { companyName, unitName } = _this.state;
        const obj = {
          companyName,
          unitName,
        };
        form.setFieldValue('CorpSupplier', obj);
        form.setFieldExtendValue('CorpSupplier', obj);
      },
      handleAdd() {
        //   const newData = _this.state.allData;
        _this.asyncSetFieldProps();
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
  fieldDidMount() {
    const { form } = this.props;
    form.onFieldExtendValueChange('CorpSupplier', (value: string) => {
      if (this.state.Inputvalue !== value) {
        this.setState({
          Inputvalue: value,
        });
      }
    });
  },
  // 详情页
  renderDetail(field, label) {
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
  },
  fieldRender() {
    const {
      form,
      runtimeProps: { viewMode },
    } = this.props;
    const field = form.getFieldInstance('CorpSupplier');
    const label = form.getFieldProp('CorpSupplier', 'label');
    const required = form.getFieldProp('CorpSupplier', 'required');
    const onSelect = (keys: React.Key[], info: any) => {
      console.log(info.node.key);
      //   let treedata = {
      //     supplier_type: '',
      //     name: '',
      //     pageSize: 10,
      //     page: 1,
      //   };
      const treedata = {
        supplier_type: info.node.key || '',
        name: '',
        pageSize: 10,
        page: 1,
      };

      this.setState(
        {
          allData: treedata,
        },
        () => {
          this.asyncSetFieldProps(treedata);
        },
      );
    };
    // form.onFieldExtendValueChange('CorpSupplier', (value: string) => {
    //   if (this.state.Inputvalue !== value) {
    //     this.setState({
    //       Inputvalue: value,
    //     });
    //   }
    // });
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
      const newdate = this.state.allData;
      newdate.supplier_add = values;
      //   this.asyncSetFieldProps(newdate);
      this.setState(
        {
          allData: newdate,
          visibleModal: false,
        },
        () => {
          this.asyncSetFieldProps();
        },
      );
      newdate.supplier_add = '';

      //   form.resetFields();
    };
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    return !viewMode ? (
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

          {/* <div style={{ marginTop: '10px' }}>所属分公司</div> */}
          <SelectBtn
            key="company"
            title={this.state.companyName}
            initSelect={this.methods().addNewProject.bind(this, 'company')}
            resetSelect={this.methods().addNewProject.bind(this, 'company')}
            deleteSelect={this.methods().deleteProject.bind(this, 'company')}
          />

          {/* <div style={{ marginTop: '10px' }}>建设单位</div>
          <SelectBtn
            key="unit"
            title={this.state.unitName}
            initSelect={this.methods().addNewProject.bind(this, 'unit')}
            resetSelect={this.methods().addNewProject.bind(this, 'unit')}
            deleteSelect={this.methods().deleteProject.bind(this, 'unit')}
          /> */}

          {/* 所属分公司 & 建设单位 */}
          <SelectSupplier
            visible={this.state.visible}
            callBackHandleOk={this.methods().callBackHandleOk}
            callBackHandleCancel={this.methods().callBackHandleCancel}
            callBackTreeSelect={this.methods().callBackTreeSelect}
            callBackChangePage={this.methods().callBackChangePage}
          />
        </div>
      </div>
    ) : (
      <>{this.renderDetail(field, label)}</>
    );
  },
};

export default FormField;
