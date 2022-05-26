//重构完成
import React from 'react';
import {
  notification,
  Table,
  Tooltip,
  Button,
  Popconfirm,
  Select,
  InputNumber,
  Cascader,
} from 'antd';
import { ColumnTypes, DataType, ISwapFormField } from '../../types/runtime';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { EditableRow } from '../../components/editableRow';
import { EditableCell } from '../../components/editableCell';
import { fpAdd } from '../../utils/fpOperations';
import _ from 'lodash';
import { parsePrintString } from '../../utils/printStringParser';
import { expeColumns } from '../../printColumns/TestExpeField';
import { uniqueArrayByKey } from '../../utils/normalizeUtils';
const throttled = _.throttle(notification.open, 5000);

const FormField: ISwapFormField = {
  getInitialState() {
    return {
      newopin: [],
      maxnum: 0,
      Optionlist: [],
      petty_sele: '否',
      Numbervalue1: 0,
      Numbervalue2: 0,
      Numbervalue3: 0,
      Numbervalue4: 0,
      Numbervalue5: 0,
      isShow: false,
      value: undefined,
      msgdata: '',
      newOptine: [],
      visibleModal: false,
      Inputmoney2: '',
      Inputmoney1: '',
      current_page: '', //当前页
      total2: '',
      allData: {
        type: '0',
        number: '10',
        page: '1',
        name: '',
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
      count: 0,
      currentEditId: 0,
      currentSelectData: [],
      selectedRowKeys: [],
    };
  },
  methods() {
    const _this = this;
    return {
      SelectChange(value, record) {
        console.log('select value', value);
        // const values = value.split(',');
        // record.ke_name = values[values.length - 1] || '';
        record.ke_name = value;
        const newData = [..._this.state.dataSource];
        const index = newData.findIndex(item => record.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...record });
        _this.setState({
          dataSource: newData,
        });
        console.log(value, record);
      },
      onMouseEnter() {
        const { form } = _this.props;
        const Pro_name = form.getFieldValue('Autopro');
        if (!Pro_name) {
          return notification.open({
            duration: 2,
            message: '请先选择项目',
          });
        }
        const newopin = [
          { name: '是', id: '1' },
          { name: '否', id: '2' },
        ];
        _this.setState({
          newopin: newopin,
        });
      },
      handleChange(value) {
        console.log(`selected ${value}`);
        if (value === '1') {
          _this.setState({
            isShow: true,
            petty_sele: '是',
          });
          const newdate = _this.state.allData;
          newdate.rk_id = ['是'];

          _this.asyncSetFieldProps(newdate, '11');
        } else {
          _this.setState({
            isShow: false,
            petty_sele: '否',
          });
        }
      },
      handleDelete(row) {
        const dataSource = [..._this.state.dataSource];
        console.log(row);

        _this.setState({
          dataSource: dataSource.filter(item => item.key !== row.key),
        });

        if (row.money) {
          const newvalue = _this.state.Inputmoney1;
          _this.setState({
            Inputmoney1: (newvalue - row.money).toFixed(2),
          });
        }
      },
      handleAdd() {
        const newdate = _this.state.allData;
        newdate.rk_id = ['a'];
        _this.asyncSetFieldProps(newdate, '12');
        const { count, dataSource } = _this.state;
        const newData = {
          key: count,
          ke_name: '',
          money: '',
          remarks: '',
        };
        _this.setState({
          dataSource: [...dataSource, newData],
          count: count + 1,
        });
      },
      handleSave(row: DataType) {
        console.log('表格数据：', row);
        const newData = [..._this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        _this.setState({
          dataSource: newData,
        });
        console.log(newData);
        const newarr1 = [..._this.state.dataSource];
        let newarr2 = [];
        newarr2 = newarr1.filter(item => {
          if (item.money) {
            return item;
          }
        });
        newarr2 = newarr2.map(item => {
          return item.money;
        });
        const joindata = newarr2.reduce(fpAdd, 0).toFixed(2);
        _this.setState({
          Inputmoney1: joindata,
        });
      },
      ResetClick() {
        _this.setState({
          dataSource: [],
        });
      },
      onNumbervalue2Change(val) {
        console.log(val);
        const number1 = _this.state.maxnum;
        const number2 = _this.state.Inputmoney1; // 报销费用合计
        if (number2 <= 0) {
          _this.setState({
            Numbervalue2: 0,
            Numbervalue5: 0,
          });
          return 0;
        }
        if (number1 > number2) {
          if (val > _this.state.Inputmoney1) {
            const aa = _this.state.Inputmoney1;
            const bb = Number(aa) - Number(_this.state.maxnum);

            _this.setState({
              Numbervalue2: _this.state.Inputmoney1,
              Numbervalue5:
                Number(bb.toFixed(2)) > 0 ? Number(bb.toFixed(2)) : 0,
            });
          } else {
            const aa = _this.state.Inputmoney1;
            const bb = aa - val;
            _this.setState({
              Numbervalue2: val.toFixed(2),
              Numbervalue5:
                Number(bb.toFixed(2)) > 0 ? Number(bb.toFixed(2)) : 0,
            });
          }
        } else {
          if (val > _this.state.maxnum) {
            const aa = _this.state.Inputmoney1;
            const bb = Number(aa) - Number(_this.state.maxnum);
            throttled({
              duration: 2,
              message: '超过最大抵扣限额！',
            });
            _this.setState({
              Numbervalue2: _this.state.maxnum.toFixed(2),
              Numbervalue5:
                Number(bb.toFixed(2)) > 0 ? Number(bb.toFixed(2)) : 0,
            });
          } else {
            const aa = _this.state.Inputmoney1;
            const bb = Number(aa) - Number(val);
            _this.setState({
              Numbervalue2: val.toFixed(2),
              Numbervalue5:
                Number(bb.toFixed(2)) > 0 ? Number(bb.toFixed(2)) : 0,
            });
          }
        }
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
    lData = [...uniqueArrayByKey(newData, ['id'])];
    console.log('pp+' + JSON.stringify(lData));
    this.setState({ dataSource: lData });
    this.setState({ isModalVisible: false });
    this.setState({ selectedRowKeys: [] });
  },
  handleCancel() {
    this.setState({ isModalVisible: false, selectedRowKeys: [] });
  },
  asyncSetFieldProps(data: any, type: string) {
    const _this = this;
    const bizAlias = 'TestExpe';
    const promise = asyncSetProps(_this, data, bizAlias);
    promise
      .then(res => {
        switch (type) {
          case '11':
            _this.setState({
              Numbervalue1: Number(res.dataArray.sy),
              Numbervalue3: Number(res.dataArray.fybx_dk_spz),
              Numbervalue4: Number(res.dataArray.re_money_spz),
              maxnum:
                Number(res.dataArray.sy) -
                Number(res.dataArray.fybx_dk_spz) -
                Number(res.dataArray.re_money_spz),
            });
            break;
          case '12':
            _this.setState({
              Optionlist: res.dataArray,
            });
            break;
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
        nomoney: 0,
        detailedData: [], //物资明细
        petty_sele: '', //备用金抵扣
        Numbervalue1: '', //备用金余额
        Numbervalue2: '', //本次抵扣金额
        Numbervalue3: '', //审批中的费用报销抵扣
        Numbervalue4: '', //审批中的归还
        Numbervalue5: '', //财务应支付金额
      };
      if (this.state.Inputmoney1) {
        editData.hanmoney = Number(
          this.state.Inputmoney1 ? this.state.Inputmoney1 : 0,
        );
      }
      if (this.state.Inputmoney2) {
        editData.nomoney = Number(
          this.state.Inputmoney2 ? this.state.Inputmoney2 : 0,
        );
      }

      editData.detailedData = this.state.dataSource;
      editData.petty_sele = this.state.petty_sele;
      console.log('12122121212', editData);
      if (editData.petty_sele === '是') {
        editData.Numbervalue1 = this.state.Numbervalue1
          ? this.state.Numbervalue1
          : 0;
        editData.Numbervalue2 = this.state.Numbervalue2
          ? this.state.Numbervalue2
          : 0;

        editData.Numbervalue3 = this.state.Numbervalue3
          ? this.state.Numbervalue3
          : 0;
        editData.Numbervalue4 = this.state.Numbervalue4
          ? this.state.Numbervalue4
          : 0;
        editData.Numbervalue5 = this.state.Numbervalue5
          ? this.state.Numbervalue5
          : 0;
      } else {
        editData.Numbervalue1 = '';
        editData.Numbervalue2 = '';

        editData.Numbervalue3 = '';
        editData.Numbervalue4 = '';
        editData.Numbervalue5 = '';
      }
      // 打印数据
      const newlistdata = this.state.dataSource;
      const str1 = `报销合计：${editData.hanmoney} \n 备用金余额：${editData.Numbervalue1} \n 审批中的费用报销抵扣：${editData.Numbervalue3} \n 审批中的归还：${editData.Numbervalue4} \n 本次抵扣金额：${editData.Numbervalue4} \n 财务应支付金额：${editData.Numbervalue5} \n`;
      const str = parsePrintString(newlistdata, expeColumns, str1);
      console.log(str);
      const { form } = this.props;
      form.setFieldValue('TestExpe', str);
      form.setFieldExtendValue('TestExpe', editData);
    }
  },
  fieldRender() {
    const { form } = this.props;
    const field = form.getFieldInstance('TestExpe');
    const label = form.getFieldProp('TestExpe', 'label');
    const required = form.getFieldProp('TestExpe', 'required');
    const { dataSource } = this.state;
    const deColumns = [
      {
        title: '费用科目',
        dataIndex: 'ke_name',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.ke_name}>
            <span>{record.ke_name}</span>
          </Tooltip>
        ),
      },
      {
        title: '金额',
        dataIndex: 'money',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.money}>
            <span>{record.money}</span>
          </Tooltip>
        ),
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.remarks}>
            <span>{record.remarks}</span>
          </Tooltip>
        ),
      },
    ];
    const etColumns = [
      {
        title: '费用科目',
        dataIndex: 'ke_name',
        render: (text, record) => (
          <Cascader
            options={this.state.Optionlist}
            onChange={value => this.methods().SelectChange(value, record)}
            placeholder="请选择"
            className="fullLength"
          />
        ),
      },
      {
        title: '金额',
        dataIndex: 'money',
        editable: true,
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.money}>
            <span>{record.money}</span>
          </Tooltip>
        ),
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        editable: true,
        isNumber: false,
        render: (remark, record) => {
          return (
            // <Input
            //   value={record.remarks}
            //   placeholder="请输入"
            //   onChange={e => {
            //     console.log('INPUT VALUE', e.target.value);
            //     const startTime = performance.now();
            //     record.remarks = e.target.value;
            //     const endTime = performance.now();
            //     console.log('TIME TO SET STATE', endTime - startTime);
            //   }}
            // />
            <Tooltip placement="topLeft" title={record.remarks}>
              <span>{record.remarks}</span>
            </Tooltip>
          );
        },
      },

      {
        title: '操作',
        dataIndex: 'operation',
        render: (_, record: { key: React.Key }) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="确定删除?"
              cancelText="取消"
              okText="确定"
              onConfirm={() => this.methods().handleDelete(record)}
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
          isNumber: col.isNumber,
          title: col.title,
          handleSave: this.methods().handleSave,
          handleChange: this.methods().handleChange,
        }),
      };
    });
    //详情
    if (this.props.runtimeProps.viewMode) {
      let value = field.getExtendValue();
      // if (!value.detailedData) {
      //   value = field.getValue();
      // }
      const {
        hanmoney = 0,
        detailedData = [],
        petty_sele = '',
        Numbervalue1 = '',
        Numbervalue2 = '',
        Numbervalue3 = '',
        Numbervalue4 = '',
        Numbervalue5 = '', //财务应支付金额
      } = value ? value : {};
      return (
        <div className="field-wrapper">
          <div className="label" style={{ marginTop: '10px' }}>
            报销合计
          </div>
          <div style={{ marginTop: '10px' }}>
            {hanmoney ? Number(hanmoney).toFixed(2) : 0}
          </div>
          <div style={{ marginTop: '10px' }} className="label">
            报销明细
          </div>
          {/* <div>
            {detailedData.map(item => {
              return <div>{item.toString()}</div>;
            })}
          </div> */}
          <div>
            <Table
              scroll={{ x: '1000px' }}
              components={components}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={value instanceof Array ? value : detailedData}
              columns={deColumns}
              pagination={false}
            />
          </div>
          <div style={{ marginTop: '10px' }} className="label">
            备用金抵扣
          </div>
          <div style={{ marginTop: '10px' }}>{petty_sele}</div>
          <div style={{ marginTop: '10px' }} className="label">
            备用金余额
          </div>
          <div style={{ marginTop: '10px' }}>{Numbervalue1}</div>
          <div style={{ marginTop: '10px' }} className="label">
            本次抵扣金额
          </div>
          <div style={{ marginTop: '10px' }}>{Numbervalue2}</div>
          <div style={{ marginTop: '10px' }} className="label">
            审批中的费用报销抵扣
          </div>
          <div style={{ marginTop: '10px' }}>{Numbervalue3}</div>
          <div style={{ marginTop: '10px' }} className="label">
            审批中的归还
          </div>
          <div style={{ marginTop: '10px' }}>{Numbervalue4}</div>
          <div style={{ marginTop: '10px' }} className="label">
            财务应支付金额
          </div>
          <div style={{ marginTop: '10px' }}>{Numbervalue5}</div>
        </div>
      );
    }
    return (
      <div className="TestExpeField_class">
        <div className="pc-custom-field-wrap">
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
                onConfirm={this.ResetClick}
                okText="是"
                cancelText="否"
              >
                <span>重置明细</span>
              </Popconfirm>
            </div>
          </div>

          <div>
            <Table
              scroll={{ x: '1000px' }}
              components={components}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={dataSource}
              columns={columns as ColumnTypes}
              pagination={false}
            />
            <Button
              onClick={this.methods().handleAdd}
              type="primary"
              style={{ marginBottom: 16, marginTop: 16 }}
            >
              添加明细
            </Button>

            <div className="label" style={{ marginTop: '10px' }}>
              报销合计
            </div>
            <div>
              <InputNumber
                readOnly
                value={this.state.Inputmoney1}
                placeholder="报销合计"
              />
            </div>
            <div>
              {/* {Pro_name ? ( */}
              <div>
                <div className="label" style={{ marginTop: '10px' }}>
                  备用金抵扣
                </div>
                <Select
                  defaultValue="否"
                  style={{ width: 200 }}
                  onFocus={this.methods().onMouseEnter}
                  onChange={this.methods().handleChange}
                >
                  {this.state.newopin.map(item => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                  {/* <Option value="1">是</Option>
                <Option value="2">否</Option> */}
                </Select>
              </div>
              {/* ) : null} */}
            </div>
            <div>
              {this.state.isShow ? (
                <div>
                  <div style={{ marginTop: '10px' }} className="label">
                    备用金余额
                  </div>
                  <InputNumber
                    readOnly
                    style={{ width: 200 }}
                    min={0}
                    value={this.state.Numbervalue1}
                  />
                  <div style={{ marginTop: '10px' }} className="label">
                    审批中的费用报销抵扣
                  </div>
                  <InputNumber
                    readOnly
                    style={{ width: 200 }}
                    min={0}
                    value={this.state.Numbervalue3}
                  />
                  <div style={{ marginTop: '10px' }} className="label">
                    审批中的归还
                  </div>
                  <InputNumber
                    readOnly
                    style={{ width: 200 }}
                    min={0}
                    value={this.state.Numbervalue4}
                  />
                  <div style={{ marginTop: '10px' }} className="label">
                    本次抵扣金额
                  </div>
                  <InputNumber
                    //   max={this.state.maxnum}
                    placeholder="请输入"
                    style={{ width: 200 }}
                    value={this.state.Numbervalue2}
                    onChange={this.methods().onNumbervalue2Change}
                  />
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'rgb(193,193,193)',
                      marginTop: '5px',
                    }}
                  >
                    本次抵扣金额，不大于报销合计，且不大于备用金余额-审批中的费用报销抵扣-审批中的归还
                  </div>
                  <div style={{ marginTop: '10px' }} className="label">
                    财务应支付金额
                  </div>
                  <InputNumber
                    readOnly
                    placeholder="自动计算"
                    style={{ width: 200 }}
                    value={this.state.Numbervalue5}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export default FormField;
