import React from 'react';
import { createPortal } from 'react-dom';

import { InputItem, Drawer, List, Switch, SearchBar } from 'antd-mobile';
//import { Tree } from 'antd';
import './mobile.less';
import { fpAdd } from '../../utils/fpOperations';
import _ from 'lodash';
import { ISwapFormField } from '../../types/runtime';

/**
 * 自定义控件运行态 Mobile 视图
 */
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const FormField: ISwapFormField = {
  getInitialState() {
    return {
      Inputmoney1: '',
      checked: false,
      treevalue: undefined,
      deColumns: [
        {
          title: '费用科目',
          dataIndex: 'ke_name',
        },
        {
          title: '金额',
          dataIndex: 'money',
        },
        {
          title: '备注',
          dataIndex: 'remarks',
        },
      ],
      treeData: [],
      maxnum: '',
      date: now,
      checkindex: '',
      SearchBarvalue: '',
      showElem: 'none',
      showElem2: 'none',
      inputvalue: '',
      Numbervalue1: '',
      Numbervalue2: '',
      Numbervalue3: '',
      Numbervalue4: '',
      Numbervalue5: '',
      allData: { type: '0', number: '99999', page: '1', name: '' },
      listData: [],
      petty_sele: '否',
      materialList: [
        {
          ke_name: '',
          money: '',
          remarks: '',
        },
      ],
    };
  },
  asyncSetFieldProps(vlauedata, type) {
    const { form, spi } = this.props;
    const Pro_name = form.getFieldValue('Autopro');
    vlauedata.project_name = Pro_name;
    vlauedata.petty_sele = this.state.petty_sele;
    // vlauedata.petty_yu = this.state.Numbervalue1;
    // vlauedata.project_name = this.state.Numbervalue2;
    const TestExpeField = form.getFieldInstance('TestExpe');
    const key = TestExpeField.getProp('id');
    const value = '1';
    const bizAsyncData = [
      {
        key,
        bizAlias: 'TestExpe',
        extendValue: vlauedata,
        value,
      },
    ];

    // 入参和返回参考套件数据刷新集成接口文档

    spi
      .refreshData({
        modifiedBizAlias: ['TestExpe'], // spi接口要改动的是leaveReason的属性值
        bizAsyncData,
      })
      .then(res => {
        console.log(JSON.parse(res.dataList[0].value));
        //   表格数据
        let newarr;
        //   表格数据
        try {
          newarr = JSON.parse(res.dataList[0].value).data;
        } catch (e) {}

        if (type === '12') {
          const menuId = [];
          let len = newarr.length;
          for (let i = 0; i < len; i++) {
            const item = newarr[i];
            if (item.children && item.children.length !== 0) {
              const children = item.children;
              for (let j = 0; j < children.length; j++) {
                newarr[len + j] = children[j];
              }
              len = newarr.length;
            }
            menuId.push(item);
          }
          const add = menuId.filter(item => {
            if (!item.children) {
              return item;
            }
          });
          this.setState({
            listData: add,
          });
          console.log('2222222', add);
        } else if (type === '11') {
          this.setState({
            Numbervalue1: Number(newarr.sy),
            Numbervalue3: Number(newarr.fybx_dk_spz),
            Numbervalue4: Number(newarr.re_money_spz),
            maxnum:
              Number(newarr.sy) -
              Number(newarr.fybx_dk_spz) -
              Number(newarr.re_money_spz),
          });
        }

        //   树状图数据
        // const newtarr = JSON.parse(res.dataList[0].extendValue);
        // const newtarr1 = [
        //   {
        //     title: '物资类型',
        //     key: '0',
        //     children: newtarr,
        //   },
        // ];
        // this.setState({
        //   treeData: [...newtarr1],
        // });
      });
  },
  onOpenChange(index: any, ...args: any[]) {
    console.log('sss');
    console.log(args);
    const newdate = this.state.allData;
    newdate.rk_id = ['a'];
    this.asyncSetFieldProps(newdate, '12');
    this.setState({ showElem: 'inherit', checkindex: index });
  },
  onOpenChange2(index: any, ...args: any[]) {
    console.log('sss');
    console.log(args);
    const newdate = this.state.allData;

    this.asyncSetFieldProps(newdate);
    this.setState({ showElem2: 'inherit', checkindex: index });
  },
  habdlClick(item: { value: any }) {
    const { form } = this.props;
    console.log(item);
    const arr = this.state.materialList;
    const arrindex = this.state.checkindex;

    arr[arrindex].ke_name = item.value;

    this.setState(
      { inputvalue: item.value, showElem: 'none', materialList: arr },
      () => {
        form.setFieldValue('TestExpe', item.value);
        form.setFieldExtendValue('TestExpe', item.value);
      },
    );
  },
  onChangeDeduction(e: React.ChangeEvent<HTMLInputElement>) {
    console.log('CHANGE DEDUCTION');
    const _this = this;
    const calcDeduction = (_this, e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('CALC DEDUCTION');
      const number1 = _this.state.maxnum;
      const number2 = _this.state.Inputmoney1;
      const val = Number(e.target.value);
      if (val <= 0.01) {
        _this.setState({
          Numbervalue2: '',
        });
        return 0;
      }
      if (number1 > number2) {
        if (val > _this.state.Inputmoney1) {
          const aa = _this.state.Inputmoney1;
          const bb = Number(aa) - Number(_this.state.maxnum);
          _this.setState({
            Numbervalue5: bb.toFixed(2),
          });
        } else {
          const aa = _this.state.Inputmoney1;
          const bb = aa - val;
          _this.setState({
            Numbervalue5: bb.toFixed(2),
          });
        }
      } else {
        if (val > _this.state.maxnum) {
          const aa = _this.state.Inputmoney1;
          const bb = aa - _this.state.maxnum;
          _this.setState({
            Numbervalue2: _this.state.maxnum.toFixed(2),
            Numbervalue5: bb.toFixed(2),
          });
        } else {
          const aa = _this.state.Inputmoney1;
          const bb = aa - val;
          _this.setState({
            Numbervalue5: bb.toFixed(2),
          });
        }
      }
    };
    console.log(e.target.value);
    calcDeduction(_this, e);
  },
  onCancel() {
    this.setState({ showElem: 'none' });
  },

  onSubmit(value) {
    const newdate = this.state.allData;
    newdate.name = value;

    this.asyncSetFieldProps(newdate);
  },
  onSearchBarChange(value) {
    if (!value) {
      const newData = this.state.allData;
      newData.name = value;
      this.asyncSetFieldProps(newData);
    }

    this.setState({ SearchBarvalue: value });
  },
  //增加明细
  addSon() {
    const sonData = {
      ke_name: '',
      money: '',
      remarks: '',
    };
    this.setState({
      materialList: [...this.state.materialList, sonData],
    });
  },
  //删除明细
  deleteItem(index) {
    const list = this.state.materialList;
    list.splice(index, 1);
    this.setState({
      materialList: list,
    });
  },
  //更新数据
  onInputchange(types, index, e) {
    console.log(types, index, e, this);
    const arr = this.state.materialList;
    console.log(this.state.materialList);
    // let arrindex = e.target.value;
    const arrindex = e ? e : '';
    const newindex = index;
    const newtype = types;
    // arr[newindex] = {};
    arr[newindex][newtype] = arrindex;
    let newarr2 = [];
    newarr2 = [
      ...arr.filter(item => {
        if (item.money) {
          return item;
        }
      }),
    ];
    newarr2 = [
      ...newarr2.map(item => {
        return item.money;
      }),
    ];
    const totalMoney = newarr2.reduce(fpAdd, 0);
    this.setState({
      materialList: [...arr],
      Inputmoney1: totalMoney.toFixed(2) <= 0.005 ? '' : totalMoney.toFixed(2),
    });
    console.log(arr);
  },
  onDatechange() {
    // let arr = this.state.materialList;
    // let purchase_riqi = 'purchase_riqi';
    // arr[index][purchase_riqi] = dateString;
    // this.setState({ materialList: [...arr] });
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
        editData.hanmoney = Number(this.state.Inputmoney1);
      }
      if (this.state.Inputmoney2) {
        editData.nomoney = Number(this.state.Inputmoney2);
      }

      editData.detailedData = this.state.materialList;
      editData.petty_sele = this.state.petty_sele;
      editData.Numbervalue1 = this.state.Numbervalue1;
      editData.Numbervalue2 = this.state.Numbervalue2;

      editData.Numbervalue3 = this.state.Numbervalue3;
      editData.Numbervalue4 = this.state.Numbervalue4;
      editData.Numbervalue5 = this.state.Numbervalue5;
      // 打印数据
      const newlistdata = this.state.materialList;
      const str2 = '';
      let str0 = '\n' + '费用科目 金额 备注';
      const str1 =
        '\n' +
        '报销合计:' +
        this.state.Inputmoney1 +
        '\n' +
        '备用金余额:' +
        this.state.Numbervalue1 +
        '\n' +
        '审批中的费用报销抵扣:' +
        this.state.Numbervalue3 +
        '\n' +
        '审批中的归还:' +
        this.state.Numbervalue4 +
        '\n' +
        '本次抵扣金额:' +
        this.state.Numbervalue4 +
        '\n' +
        '财务应支付金额:' +
        this.state.Numbervalue5;
      for (let i = 0; i < newlistdata.length; i++) {
        str0 +=
          '\n' +
          newlistdata[i].ke_name +
          ' ' +
          newlistdata[i].money +
          ' ' +
          newlistdata[i].remarks;
      }
      const str = str2 + str0 + str1;
      console.log(str);
      const { form } = this.props;
      form.setFieldValue('TestExpe', str);
      form.setFieldExtendValue('TestExpe', editData);
    }

    // this.state.dataSource;
    // this.state.Inputmoney1;
    // this.state.Inputmoney2;
  },
  fieldRender() {
    // fix in codepen
    const { form } = this.props;
    const field = form.getFieldInstance('TestExpe');
    const label = form.getFieldProp('TestExpe', 'label');
    const onSelect = (selectedKeys: React.Key[], info: any) => {
      const arr = this.state.materialList;
      const newindex = this.state.checkindex;
      arr[newindex].ke_name = info.node.title;
      this.setState({ showElem2: 'none', materialList: [...arr] });
      const treedata = { type: selectedKeys[0], number: '10', page: '1' };
      this.setState({
        allData: treedata,
      });
      this.asyncSetFieldProps(treedata);
      console.log('selected', selectedKeys, info.node.title);
    };

    const sidebar = (
      <div style={{ width: '100vw' }}>
        <SearchBar
          value={this.state.SearchBarvalue}
          placeholder="请输入"
          onSubmit={this.onSubmit}
          onChange={this.onSearchBarChange}
          showCancelButton
          onCancel={() => this.setState({ showElem: 'none' })}
        />

        <List>
          {this.state.listData.map((item, index) => {
            return (
              <List.Item
                onClick={this.habdlClick.bind(this, item)}
                key={index}
                multipleLine
              >
                {item.value}
              </List.Item>
            );
          })}
        </List>
      </div>
    );
    const treesidebar = (
      <div style={{ width: '100vw' }}>
        <SearchBar
          value={this.state.SearchBarvalue}
          placeholder="请输入"
          onSubmit={this.onSubmit}
          onChange={this.onSearchBarChange}
          onCancel={() => this.setState({ showElem2: 'none' })}
          showCancelButton
        />

        {/* <Tree onSelect={onSelect} treeData={this.state.treeData} /> */}
      </div>
    );
    //详情
    if (this.props.runtimeProps.viewMode) {
      let value = field.getExtendValue();
      // if (!value.detailedData) {
      //   value = field.getValue();
      // }
      const {
        detailedData = [],
        petty_sele = '',
        Numbervalue1 = '',
        Numbervalue2 = '',
        Numbervalue3 = '',
        Numbervalue4 = '',
        hanmoney = '',
      } = value ? value : {};
      return (
        <div className="field-wrapper">
          <div className="tablefield-mobile">
            <div className="tbody-row-wrap">
              {detailedData.map((item, index) => {
                return (
                  <div key={index} className="row">
                    <label className="label row-label-title">
                      {label}明细({index + 1})
                    </label>
                    {this.state.deColumns.map(itemname => {
                      if (!item[itemname.dataIndex]) {
                        return null;
                      }
                      return (
                        <div key={itemname.dataIndex}>
                          <div className="field-wrapper">
                            <div className="m-field-view">
                              <label className="m-field-view-label">
                                {itemname.title}
                              </label>
                              <div className="m-field-view-value">
                                <span>{item[itemname.dataIndex]}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="m-field-view">
            <label className="m-field-view-label">报销合计</label>
            <div className="m-field-view-value"> {hanmoney}</div>
          </div>
          <div className="m-field-view">
            <label className="m-field-view-label">备用金抵扣</label>
            <div className="m-field-view-value"> {petty_sele}</div>
          </div>
          <div className="m-field-view">
            <label className="m-field-view-label">备用金余额</label>
            <div className="m-field-view-value"> {Numbervalue1}</div>
          </div>
          <div className="m-field-view">
            <label className="m-field-view-label">本次抵扣金额</label>
            <div className="m-field-view-value"> {Numbervalue2}</div>
          </div>
          <div className="m-field-view">
            <label className="m-field-view-label">审批中的费用报销抵扣</label>
            <div className="m-field-view-value"> {Numbervalue3}</div>
          </div>
          <div className="m-field-view">
            <label className="m-field-view-label">审批中的归还</label>
            <div className="m-field-view-value"> {Numbervalue4}</div>
          </div>
        </div>
      );
    }
    return (
      <div className="CorpHouse_class_m">
        <div className="field-wrapper">
          <div className="tablefield-mobile">
            <div className="table-body  tbody  ">
              {this.state.materialList.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="tbody-row-wrap">
                      <div className="tbody-row-pannel">
                        <div
                          className="custom-list-title"
                          style={{
                            width: '100%',
                            paddingLeft: '15px',
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div>
                            {label}-明细({index + 1})
                          </div>
                          {this.state.materialList.length > 0 ? (
                            <div
                              className="dele_item"
                              onClick={this.deleteItem.bind(this, index)}
                            >
                              删除
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                        <div className="row">
                          <div>
                            <div className="field-wrapper">
                              <div className="m-group m-group-mobile">
                                <div className="m-field-wrapper">
                                  <div className="m-field m-field-mobile m-select-field">
                                    <div className="m-field-head">
                                      <div className="m-field-label">
                                        <span>费用科目</span>
                                      </div>
                                    </div>
                                    <div className="m-field-box">
                                      <div className="m-field-content left">
                                        <div className="input-wrapper">
                                          <InputItem
                                            editable={false}
                                            type="text"
                                            className="ant-input m-mobile-inner-input"
                                            value={item.ke_name}
                                            placeholder="请选择"
                                            onClick={this.onOpenChange.bind(
                                              this,
                                              index,
                                            )}
                                            onChange={e =>
                                              this.onInputchange(
                                                'ke_name',
                                                index,
                                                e,
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="field-wrapper">
                              <div className="m-group m-group-mobile">
                                <div className="m-field-wrapper">
                                  <div className="m-field m-field-mobile m-select-field">
                                    <div className="m-field-head">
                                      <div className="m-field-label">
                                        <span>金额</span>
                                      </div>
                                    </div>
                                    <div className="m-field-box">
                                      <div className="m-field-content left">
                                        <div className="input-wrapper">
                                          <InputItem
                                            type="text"
                                            className="ant-input m-mobile-inner-input"
                                            value={item.money}
                                            placeholder="请输入"
                                            onChange={e =>
                                              this.onInputchange(
                                                'money',
                                                index,
                                                e,
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="field-wrapper">
                              <div className="m-group m-group-mobile">
                                <div className="m-field-wrapper">
                                  <div className="m-field m-field-mobile m-select-field">
                                    <div className="m-field-head">
                                      <div className="m-field-label">
                                        <span>备注</span>
                                      </div>
                                    </div>
                                    <div className="m-field-box">
                                      <div className="m-field-content left">
                                        <div className="input-wrapper">
                                          <InputItem
                                            type="text"
                                            className="ant-input m-mobile-inner-input"
                                            value={item.remarks}
                                            placeholder="请输入"
                                            onChange={e =>
                                              this.onInputchange(
                                                'remarks',
                                                index,
                                                e,
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="table-actions">
                <div className="tbody-add-button tTap" onClick={this.addSon}>
                  <img
                    style={{ width: '20px' }}
                    src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//Em46p8naW61629791119284.png"
                    alt=""
                  />
                  &nbsp;
                  <span className="add-button-text">增加1明细</span>
                </div>
              </div>
              <div className="field-wrapper">
                <div className="m-group m-group-mobile">
                  <div className="m-field-wrapper">
                    <div className="m-field m-field-mobile m-select-field">
                      <div className="m-field-head">
                        <div className="m-field-label">
                          <span>报销合计</span>
                        </div>
                      </div>
                      <div className="m-field-box">
                        <div className="m-field-content left">
                          <div className="input-wrapper">
                            <InputItem
                              type="text"
                              className="ant-input m-mobile-inner-input"
                              value={this.state.Inputmoney1}
                              placeholder="自动获取"
                              editable={false}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="field-wrapper">
                  <div className="m-group m-group-mobile">
                    <div className="m-field-wrapper">
                      <div className="m-field m-field-mobile m-select-field">
                        <div className="m-field-head">
                          <div className="m-field-label">
                            <span>备用金抵扣</span>
                          </div>
                        </div>
                        <div className="m-field-box">
                          <div className="m-field-content left">
                            <div className="input-wrapper">
                              <Switch
                                checked={this.state.checked}
                                onChange={checked => {
                                  console.log(checked);
                                  if (checked === false) {
                                    this.setState({
                                      petty_sele: '否',
                                    });
                                  } else {
                                    this.setState({
                                      petty_sele: '是',
                                    });
                                    const newdate = this.state.allData;
                                    newdate.rk_id = ['是'];
                                    this.asyncSetFieldProps(newdate, '11');
                                  }

                                  this.setState({
                                    checked: !this.state.checked,
                                  });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {this.state.checked ? (
                  <div>
                    <div className="field-wrapper">
                      <div className="m-group m-group-mobile">
                        <div className="m-field-wrapper">
                          <div className="m-field m-field-mobile m-select-field">
                            <div className="m-field-head">
                              <div className="m-field-label">
                                <span>备用金余额</span>
                              </div>
                            </div>
                            <div className="m-field-box">
                              <div className="m-field-content left">
                                <div className="input-wrapper">
                                  <InputItem
                                    type="text"
                                    className="ant-input m-mobile-inner-input"
                                    value={this.state.Numbervalue1}
                                    placeholder="自动获取"
                                    editable={false}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="field-wrapper">
                      <div className="m-group m-group-mobile">
                        <div className="m-field-wrapper">
                          <div className="m-field m-field-mobile m-select-field">
                            <div className="m-field-head">
                              <div className="m-field-label">
                                <span>审批中的费用报销抵扣</span>
                              </div>
                            </div>
                            <div className="m-field-box">
                              <div className="m-field-content left">
                                <div className="input-wrapper">
                                  <InputItem
                                    type="text"
                                    className="ant-input m-mobile-inner-input"
                                    value={this.state.Numbervalue3}
                                    placeholder="自动获取"
                                    editable={false}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="field-wrapper">
                      <div className="m-group m-group-mobile">
                        <div className="m-field-wrapper">
                          <div className="m-field m-field-mobile m-select-field">
                            <div className="m-field-head">
                              <div className="m-field-label">
                                <span>审批中的归还</span>
                              </div>
                            </div>
                            <div className="m-field-box">
                              <div className="m-field-content left">
                                <div className="input-wrapper">
                                  <InputItem
                                    type="text"
                                    className="ant-input m-mobile-inner-input"
                                    value={this.state.Numbervalue4}
                                    placeholder="自动获取"
                                    editable={false}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="field-wrapper">
                      <div className="m-group m-group-mobile">
                        <div className="m-field-wrapper">
                          <div className="m-field m-field-mobile m-select-field">
                            <div className="m-field-head">
                              <div className="m-field-label">
                                <span>本次抵扣金额</span>
                              </div>
                            </div>
                            <div className="m-field-box">
                              <div className="m-field-content left">
                                <div className="input-wrapper">
                                  <input
                                    type="number"
                                    max={this.state.maxnum}
                                    className="ant-input m-mobile-inner-input"
                                    value={this.state.Numbervalue2}
                                    placeholder="请输入"
                                    onChange={e => {
                                      this.setState({
                                        Numbervalue2: e.target.value,
                                      });
                                      e.persist();
                                      const debouncedCalc = _.debounce(
                                        this.onChangeDeduction,
                                        1000,
                                      );
                                      debouncedCalc(e);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="field-wrapper">
                      <div className="m-group m-group-mobile">
                        <div className="m-field-wrapper">
                          <div className="m-field m-field-mobile m-select-field">
                            <div className="m-field-head">
                              <div className="m-field-label">
                                <span>财务应支付金额</span>
                              </div>
                            </div>
                            <div className="m-field-box">
                              <div className="m-field-content left">
                                <div className="input-wrapper">
                                  <InputItem
                                    editable={false}
                                    type="number"
                                    className="ant-input m-mobile-inner-input"
                                    value={this.state.Numbervalue5}
                                    placeholder="请输入"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {/* 合计 */}
          {/* 物资明细 */}
          {createPortal(
            <Drawer
              open={true}
              style={{
                minHeight: document.documentElement.clientHeight,
                display: this.state.showElem,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgb(255, 255, 255)',
                position: 'fixed',
                zIndex: 100,
              }}
              enableDragHandle
              contentStyle={{
                color: '#A6A6A6',
                textAlign: 'center',
                paddingTop: 42,
              }}
              sidebar={sidebar}
              onOpenChange={this.onOpenChange}
            ></Drawer>,
            document.getElementById('MF_APP'),
          )}
          {createPortal(
            <Drawer
              open={true}
              style={{
                minHeight: document.documentElement.clientHeight,
                display: this.state.showElem2,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgb(255, 255, 255)',
                position: 'fixed',
                zIndex: 100,
              }}
              enableDragHandle
              contentStyle={{
                color: '#A6A6A6',
                textAlign: 'center',
                paddingTop: 42,
              }}
              sidebar={treesidebar}
              onOpenChange={this.onOpenChange2}
            ></Drawer>,
            document.getElementById('MF_APP'),
          )}
        </div>
      </div>
    );
  },
};

export default FormField;
