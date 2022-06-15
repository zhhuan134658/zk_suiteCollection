//重构完成
//import { Tree } from 'antd';
import { Drawer, InputItem, SearchBar, DatePicker, Toast } from 'antd-mobile';
import React from 'react';
import { createPortal } from 'react-dom';
import { handleTaxTableStatistics } from '../../components/handleTables';
import { ISwapFormField } from '../../types/runtime';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { searchBarChange, searchBarSubmit } from '../../utils/searchUtils';
// import { Button } from 'antd-mobile';
import { HandledDetailDialogMobile } from '../../components/addDetail';
import {
  parseListData,
  traverseAndParseTreeData,
  uniqueArrayByKey,
} from '../../utils/normalizeUtils';
import { DetailList } from '../../components/listDetail';
import { fpAdd } from '../../utils/fpOperations';
import { FancyList } from '../../components/fancyLists';
const now = new Date();

const FormField: ISwapFormField = {
  getInitialState() {
    return {
      updateTreeDate: '1', //1 更新
      activeKey: '',
      datadate: '',
      leftTreeDate: [],
      stateData: [],
      stateKey: [],
      datenum: 0,
      deColumns: [
        {
          title: '物资名称',
          dataIndex: 'name',
        },
        {
          title: '单位',
          dataIndex: 'unit',
        },
        {
          title: '规格型号',
          dataIndex: 'size',
        },
        {
          title: '结算周期（始）',
          dataIndex: 'plan_in_riqi',
        },
        {
          title: '结算周期（终）',
          dataIndex: 'plan_out_riqi',
        },
        {
          title: '数量',
          dataIndex: 'zl_number',
        },
        {
          title: '单价(元)',
          dataIndex: 'price',
        },

        {
          title: '小计(元)',
          dataIndex: 'subtotal',
        },
      ],
      Inputmoney1: '',
      checkData: [],
      chenkdata: '',
      treevalue: undefined,
      treeData: [],
      cascadeValue: [],
      cascadeData: [],
      showTypes: true,
      popUpVisible: false,
      popUpCascadeVisible: false,
      detdate: 'a1',
      date: now,
      checkindex: '',
      SearchBarvalue: '',
      showElem: 'none',
      showElem2: 'none',
      showElem3: 'none',
      inputvalue: '',
      allData: { type: '0', number: '99999', page: '1', name: '' },
      listData: [],
      fixedColumn: '',
      materialList: [
        {
          id: '',
          typename: '',
          name: '',
          size: '',
          unit: '',
          zl_number: '',
          purchase_unit: '',
          purchase_riqi: '',
          purchase_address: '',
          candidate_list: '',
        },
      ],
    };
  },
  handleOk: function (): void {
    throw new Error('Function not implemented.');
  },
  handleCancel() {
    this.setState({
      showElem: 'none',
    });
  },
  methods() {
    const _this = this;

    return {
      onExtraClick(index, typename) {
        const arr = _this.state.materialList;
        arr[index][typename] = '';
        _this.setState({ materialList: [...arr] });
      },

      checkClick(item: any) {
        console.log('0000005');
        const cDataid = [item.id];
        const newdate = _this.state.allData;
        newdate.ck_name = item.name;
        newdate.type = 0;
        newdate.page = 1;
        newdate.isHouse = '2';
        const dtar = item.name;

        console.log(cDataid);
        newdate.rk_id = [_this.state.detdate, ...cDataid];
        _this.asyncSetFieldProps(newdate, 1);
        _this.setState({
          chenkdata: dtar,
          showElem3: 'none',
        });
      },
      iconClick() {
        _this.setState({
          chenkdata: '',
          materialList: [],
          Inputmoney1: 0,
        });
      },
      ResetClick() {
        _this.setState({
          Inputmoney1: 0,
          materialList: [
            {
              id: '',
              typename: '',
              name: '',
              size: '',
              unit: '',
              zl_number: '',
              purchase_unit: '',
              purchase_riqi: '',
              purchase_address: '',
              candidate_list: '',
            },
          ],
        });
      },
      getCheckData() {
        _this.setState({
          dstatus: '1',
        });
        const newPage = {
          rk_id: _this.state.detdate ? _this.state.detdate[0] : ['a'],
          number: '10',
          page: 1,
          name: '',
        };
        _this.setState({
          allData: newPage,
        });
        _this.asyncSetFieldProps(newPage, 2);
        _this.setState({
          showElem3: 'inherit',
        });
      },
      onOpenChange(index: any) {
        console.log('0000001');
        const newData = _this.state.allData;
        newData.rk_id = ['-1'];
        _this.asyncSetFieldProps(newData);
        _this.setState({
          showElem: 'inherit',
          checkindex: index,
          updateTreeDate: '1',
        });
      },
      onOpenChange2(index: any) {
        console.log('0000002');
        const newData = _this.state.allData;
        _this.asyncSetFieldProps(newData);
        _this.setState({
          showElem2: 'inherit',
          checkindex: index,
        });
      },
      handleClick(item: any) {
        console.log('0000003');
        const arr = _this.state.materialList;
        const arrindex = _this.state.checkindex;
        if (arr[arrindex]) {
          arr[arrindex].name = item.name;
          arr[arrindex].size = item.size;
          arr[arrindex].unit = item.unit;
        }
        let lData = [];
        lData = [...uniqueArrayByKey(arr, ['name', 'size', 'unit'])];
        _this.setState({
          showElem: 'none',
          materialList: lData,
        });
      },
      upperLevel() {
        const stateData = _this.state.stateData;
        const stateKey = _this.state.stateKey;

        if (stateData.length > 1) {
          stateData.pop();
          _this.setState(
            {
              leftTreeDate: stateData[stateData.length - 1],
              activeKey: stateKey[stateKey.length - 1],
              stateData: stateData,
            },
            () => {
              const treedata = {
                type: stateKey[stateKey.length - 1],
                number: '999',
                page: '1',
                rk_id: ['-1'],
              };
              _this.asyncSetFieldProps(treedata);
              stateKey.pop();
              _this.setState({
                stateKey,
              });
            },
          );
        }

        console.log(stateData);
      },
      sideChange(key: any) {
        _this.setState({
          updateTreeDate: '2',
        });
        const treedata = {
          type: key,
          number: '999',
          page: '1',
          rk_id: ['-1'],
        };
        _this.asyncSetFieldProps(treedata, 0, false);
      },
      onSubmit(value: any) {
        console.log('0000006');
        const data = _this.state.allData;
        data.name = value;
        _this.asyncSetFieldProps(data);
      },
      onSearchBarChange(value: any) {
        console.log('0000007');
        _this.setState({
          SearchBarvalue: value,
        });
        if (!value) {
          const newData = _this.state.allData;
          newData.name = value;
          _this.asyncSetFieldProps(newData);
        }
      },
      addDetail() {
        const detailRow = {
          id: '',
          typename: '',
          name: '',
          size: '',
          unit: '',
          zl_number: '',
          purchase_unit: '',
          purchase_riqi: '',
          purchase_address: '',
          candidate_list: '',
        };
        _this.setState({
          materialList: [..._this.state.materialList, detailRow],
        });
      },
      deleteItem(index: number) {
        const list = _this.state.materialList;
        if (list.length === 1) {
          return _this.setState({
            Inputmoney1: 0,
            materialList: [
              {
                id: '',
                typename: '',
                name: '',
                size: '',
                unit: '',
                det_quantity: '',
                no_unit_price: '',
                tax_rate: '',
                tax_amount: '',
                amount_tax: '',
                no_amount_tax: '',
              },
            ],
          });
        }
        list.splice(index, 1);
        _this.setState({
          materialList: list,
        });
        console.log('list', list);
        if (list.length > 0) {
          let newarr2 = [];
          newarr2 = list.filter(item => {
            if (item.subtotal) {
              return item;
            }
          });
          newarr2 = newarr2.map(item => {
            return item.subtotal;
          });
          _this.setState({
            Inputmoney1: newarr2.reduce(fpAdd, 0).toFixed(2),
          });
        } else {
          _this.setState({
            Inputmoney1: 0,
          });
        }
      },
      onInputchange(types: any, index: number, e: any) {
        const datenum = _this.state.datenum;
        console.log(types, index, e, _this);
        const arr = _this.state.materialList;
        console.log('120', _this.state.materialList);
        const arrindex = e;
        const newindex = index;
        const newtype = types;
        if (types === 'zl_number' || types === 'price') {
          arr[newindex][newtype] = Number(arrindex);
        } else {
          arr[newindex][newtype] = arrindex;
        }

        if (arr[newindex].zl_number && arr[newindex].price) {
          arr[newindex].subtotal = (
            arr[newindex].zl_number *
            arr[newindex].price *
            Number(datenum)
          ).toFixed(2);
        } else {
          arr[newindex].subtotal = 0;
        }
        //   合计
        let newarr2 = [];

        newarr2 = arr.filter(item => {
          if (item.subtotal) {
            return item;
          }
        });
        newarr2 = newarr2.map(item => {
          return item.subtotal;
        });
        let total = newarr2.reduce(fpAdd, 0);
        if (total) {
          total = total.toFixed(2);
        }
        _this.setState({
          materialList: [...arr],
          Inputmoney1: total,
        });
        console.log('12', arr);
      },
      //   计算日期的时间差（含当天）
      getDaysBetween(dateString1, dateString2) {
        const startDate = Date.parse(dateString1);
        const endDate = Date.parse(dateString2);
        if (startDate > endDate) {
          return 0;
        }
        if (startDate === endDate) {
          return 1;
        }
        const days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
        return days + 1;
      },
      onChangedata1(data, index, typename) {
        const newdata = new Date(data);
        const newindex = index;
        const datetime =
          newdata.getFullYear() +
          '-' +
          (newdata.getMonth() + 1) +
          '-' +
          newdata.getDate();
        const arr = _this.state.materialList;
        arr[index][typename] = datetime;

        if (arr[index].plan_in_riqi && arr[index].plan_out_riqi) {
          const timenum = _this
            .methods()
            .getDaysBetween(arr[index].plan_in_riqi, arr[index].plan_out_riqi);
          if (timenum === 0) {
            return Toast.info('请先选择正确的日期', 1);
            _this.setState({ datenum: timenum });
          } else {
            if (arr[newindex].zl_number && arr[newindex].price) {
              arr[newindex].subtotal = (
                arr[newindex].zl_number *
                arr[newindex].price *
                Number(timenum)
              ).toFixed(2);
            } else {
              arr[newindex].subtotal = 0;
            }
            _this.setState({ datenum: timenum, materialList: [...arr] });
          }
        }
        _this.setState({ materialList: [...arr] });
        console.log(datetime, index);
      },
      //   onChangedata2(data, index) {
      //     const newdata = new Date(data);

      //     const datetime =
      //       newdata.getFullYear() +
      //       '-' +
      //       (newdata.getMonth() + 1) +
      //       '-' +
      //       newdata.getDate();
      //     const arr = _this.state.materialList;
      //     arr[index].typename = datetime;

      //     _this.setState({ materialList: [...arr] });
      //     console.log(datetime, index);
      //   },
      handleAddVisible(visible: boolean) {
        _this.setState({
          popUpVisible: visible,
        });
      },
      handleCascadeVisible(visible: boolean) {
        _this.setState({
          popUpCascadeVisible: visible,
        });
      },
    };
  },
  asyncSetFieldProps(data: any, type = 0, updateCascade = true) {
    const _this = this;
    const promise = asyncSetProps(_this, data, 'TestLecon');
    promise.then(res => {
      console.log('1234543=======', res);
      _this.setState({
        listData: [...res.dataArray],
      });
      const treeArray = [
        {
          title: '物资类型',
          key: '0',
          children: [...res.extendArray],
        },
      ];
      if (updateCascade && res.extendArray.length > 0) {
        const cascadeArray = [traverseAndParseTreeData(treeArray[0])];
        _this.setState({
          cascadeData: cascadeArray,
        });
      }
      if (_this.state.updateTreeDate === '1') {
        _this.setState({
          leftTreeDate: [...treeArray],
          treeData: [...treeArray],
          stateData: [[...treeArray]],
        });
      }
      switch (type) {
        case 1:
          _this.setState({
            materialList: res.dataArray,
          });
          handleTaxTableStatistics(_this, res.dataArray);
          break;
        case 2:
          _this.setState({
            checkData: res.dataArray,
          });
          break;
        default:
          break;
      }
      if (res.message) {
        Toast.info(res.message, 1);
      }
    });
  },
  fieldDidUpdate() {
    if (!this.props.runtimeProps.viewMode) {
      console.log('发起页：fieldDidUpdate');
      const { form } = this.props;
      const editData = {
        hanmoney: 0,
        detailedData: [], //物资明细
      };
      if (this.state.Inputmoney1) {
        editData.hanmoney = Number(this.state.Inputmoney1);
        console.log('Inputmoney2', this.state.Inputmoney1);
        form.setFieldValue('ZucMoney', Number(this.state.Inputmoney1));
        form.setFieldExtendValue('ZucMoney', Number(this.state.Inputmoney1));
        form.setFieldValue('ZuJieMoney', Number(this.state.Inputmoney1));
        form.setFieldExtendValue('ZuJieMoney', Number(this.state.Inputmoney1));
      }
      editData.detailedData = this.state.materialList;
      // 打印数据
      const newlistdata = this.state.materialList;
      const str2 = '';
      let str0 =
        '\n' +
        '设备名称 单位 规格型号 结算周期（始） 结算周期（终） 数量 单价 小计';
      const str1 = '\n' + '合计：' + this.state.Inputmoney1;
      for (let i = 0; i < newlistdata.length; i++) {
        str0 +=
          '\n' +
          newlistdata[i].name +
          ' ' +
          newlistdata[i].unit +
          ' ' +
          newlistdata[i].size +
          ' ' +
          newlistdata[i].plan_in_riqi +
          ' ' +
          newlistdata[i].plan_out_riqi +
          ' ' +
          newlistdata[i].zl_number +
          ' ' +
          newlistdata[i].price +
          ' ' +
          newlistdata[i].subtotal;
      }
      const str = str2 + str0 + str1;
      console.log(str);

      form.setFieldValue('TestLecon', str);
      form.setFieldExtendValue('TestLecon', editData);
    }
  },
  fieldRender() {
    const { form } = this.props;
    const field = form.getFieldInstance('TestLecon');
    const label = form.getFieldProp('TestLecon', 'label');
    const parsers = {
      materialParser: [
        {
          key: 'name',
          label: '物资名称',
          index: 1,
          title: true,
        },
        {
          key: 'unit',
          label: '单位',
          index: 2,
        },
        {
          key: 'size',
          label: '规格型号',
          index: 3,
        },
      ],
      contractParser: [
        {
          key: 'name',
          label: '合同名称',
          index: 1,
          title: true,
        },
        {
          key: 'supplier',
          label: '供应商',
          index: 2,
        },
        {
          key: 'contract_money',
          label: '合同金额',
          index: 3,
        },
      ],
    };
    const onSelect = (selectedKeys: React.Key[], info: any) => {
      const arr = this.state.materialList;
      const newindex = this.state.checkindex;
      arr[newindex].typename = info.node.title;
      this.setState({ showElem2: 'none', materialList: [...arr] });
      const treedata = { type: selectedKeys[0], number: '10', page: '1' };
      this.setState({
        allData: treedata,
      });
      this.asyncSetFieldProps(treedata, 2);
      console.log('selected', selectedKeys, info.node.title);
    };
    const onFinish = (values: any) => {
      console.log('Success:', values);
      //   const [form] = Form.useForm();
      const newdate = this.state.allData;
      newdate.wz_add = values;
      this.asyncSetFieldProps(newdate);
      this.setState({
        popUpVisible: false,
      });
    };
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
    const sidebar = (
      <div style={{ width: '100vw' }}>
        <SearchBar
          value={this.state.SearchBarvalue}
          placeholder="请输入"
          onSubmit={val => {
            const _this = this;
            _this.setState({
              showTypes: false,
            });
            searchBarSubmit(_this, val, 0);
          }}
          onChange={val => {
            const _this = this;
            searchBarChange(_this, val, 0);
            if (!val) {
              _this.setState({
                showTypes: true,
              });
            }
          }}
          showCancelButton
          onCancel={() =>
            this.setState({ showElem: 'none', SearchBarvalue: '' })
          }
        />
        <HandledDetailDialogMobile
          cascadeData={this.state.cascadeData}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          showElem={this.state.showElem}
        />
        <DetailList
          cascadeData={this.state.cascadeData}
          rightListData={this.state.listData}
          showTypes={this.state.showTypes}
          sideChange={this.methods().sideChange}
          itemClick={this.methods().handleClick.bind(this)}
        />
      </div>
    );
    const checkdebar = (
      <div style={{ width: '100vw' }}>
        <SearchBar
          value={this.state.SearchBarvalue}
          placeholder="请输入"
          onSubmit={val => {
            const _this = this;
            searchBarSubmit(_this, val, 2);
          }}
          onChange={val => {
            const _this = this;
            searchBarChange(_this, val, 2);
          }}
          showCancelButton
          onCancel={() =>
            this.setState({ showElem3: 'none', SearchBarvalue: '' })
          }
        />

        <div>
          <FancyList
            data={parseListData(this.state.checkData, parsers.contractParser)}
            itemClick={this.methods().checkClick}
          />
        </div>
      </div>
    );
    const treesidebar = (
      <div style={{ width: '100vw' }}>
        <SearchBar
          value={this.state.SearchBarvalue}
          placeholder="请输入"
          onSubmit={this.methods().onSubmit}
          onChange={this.methods().onSearchBarChange}
          onCancel={() =>
            this.setState({ showElem2: 'none', SearchBarvalue: '' })
          }
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
      const { hanmoney = 0, detailedData = [] } = value ? value : {};
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
          <div>
            <div className="field-wrapper">
              <div className="m-field-view">
                <label className="m-field-view-label">合计(元)</label>
                <div className="m-field-view-value">
                  <span>{hanmoney ? Number(hanmoney).toFixed(2) : ''}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="CorpHouse_class_m">
        <div className="field-wrapper">
          <div className="field-wrapper">
            <div className="m-group m-group-mobile">
              <div className="m-field-wrapper">
                <div className="m-field m-field-mobile m-select-field">
                  <div className="m-field-head">
                    <div className="m-field-label">
                      <span>{label}</span>
                    </div>
                  </div>
                  <div className="m-field-box">
                    <div className="m-field-content left">
                      <div className="input-wrapper">
                        <InputItem
                          editable={false}
                          value={this.state.chenkdata}
                          onClick={this.methods().getCheckData}
                          placeholder="请选择"
                          extra="x"
                          onExtraClick={this.methods().iconClick}
                        ></InputItem>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tablefield-mobile">
            <div
              className="custom-list-title"
              style={{
                width: '100%',
                paddingLeft: '15px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div>{label}</div>

              <div
                onClick={this.methods().ResetClick}
                style={{ color: '#409EFF' }}
              >
                重置明细
              </div>
            </div>
            <div className="table-body  tbody  ">
              {this.state.materialList.map((item, index) => {
                return (
                  <div key={item.id}>
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
                              onClick={this.methods().deleteItem.bind(
                                this,
                                index,
                              )}
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
                                        <span>物资名称</span>
                                      </div>
                                    </div>
                                    <div className="m-field-box">
                                      <div className="m-field-content left">
                                        <div className="input-wrapper">
                                          <InputItem
                                            editable={false}
                                            type="text"
                                            className="ant-input m-mobile-inner-input"
                                            value={item.name}
                                            placeholder="请选择"
                                            onFocus={this.methods().onOpenChange.bind(
                                              this,
                                              index,
                                            )}
                                            onChange={e =>
                                              this.methods().onInputchange(
                                                'name',
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
                                        <span>规格型号</span>
                                      </div>
                                    </div>
                                    <div className="m-field-box">
                                      <div className="m-field-content left">
                                        <div className="input-wrapper">
                                          <InputItem
                                            editable={false}
                                            type="text"
                                            className="ant-input m-mobile-inner-input"
                                            value={item.size}
                                            placeholder="自动获取"
                                            readOnly
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
                                        <span>单位</span>
                                      </div>
                                    </div>
                                    <div className="m-field-box">
                                      <div className="m-field-content left">
                                        <div className="input-wrapper">
                                          <InputItem
                                            editable={false}
                                            type="text"
                                            readOnly
                                            className="ant-input m-mobile-inner-input"
                                            value={item.unit}
                                            placeholder="自动获取"
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
                            <DatePicker
                              mode="date"
                              title="选择时间"
                              extra="Optional"
                              value={this.state.datadate1}
                              onChange={date =>
                                this.methods().onChangedata1(
                                  date,
                                  index,
                                  'plan_in_riqi',
                                )
                              }
                            >
                              <div className="field-wrapper">
                                <div className="m-group m-group-mobile">
                                  <div className="m-field-wrapper">
                                    <div className="m-field m-field-mobile m-select-field">
                                      <div className="m-field-head">
                                        <div className="m-field-label">
                                          <span>结算周期（始）</span>
                                        </div>
                                      </div>

                                      <div className="m-field-box">
                                        <div className="m-field-content left">
                                          <div className="input-wrapper">
                                            <InputItem
                                              editable={false}
                                              extra="x"
                                              onExtraClick={this.methods().onExtraClick.bind(
                                                this,
                                                index,
                                                'plan_in_riqi',
                                              )}
                                              value={item.plan_in_riqi}
                                              placeholder="请选择"
                                            ></InputItem>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </DatePicker>
                          </div>
                          <div>
                            <DatePicker
                              mode="date"
                              title="选择时间"
                              extra="Optional"
                              value={this.state.datadate2}
                              onChange={date =>
                                this.methods().onChangedata1(
                                  date,
                                  index,
                                  'plan_out_riqi',
                                )
                              }
                            >
                              <div className="field-wrapper">
                                <div className="m-group m-group-mobile">
                                  <div className="m-field-wrapper">
                                    <div className="m-field m-field-mobile m-select-field">
                                      <div className="m-field-head">
                                        <div className="m-field-label">
                                          <span>结算周期（终）</span>
                                        </div>
                                      </div>

                                      <div className="m-field-box">
                                        <div className="m-field-content left">
                                          <div className="input-wrapper">
                                            <InputItem
                                              editable={false}
                                              extra="x"
                                              onExtraClick={this.methods().onExtraClick.bind(
                                                this,
                                                index,
                                                'plan_out_riqi',
                                              )}
                                              value={item.plan_out_riqi}
                                              placeholder="请选择"
                                            ></InputItem>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </DatePicker>
                          </div>
                          <div>
                            <div className="field-wrapper">
                              <div className="m-group m-group-mobile">
                                <div className="m-field-wrapper">
                                  <div className="m-field m-field-mobile m-select-field">
                                    <div className="m-field-head">
                                      <div className="m-field-label">
                                        <span>数量</span>
                                      </div>
                                    </div>
                                    <div className="m-field-box">
                                      <div className="m-field-content left">
                                        <div className="input-wrapper">
                                          <InputItem
                                            className="ant-input m-mobile-inner-input"
                                            value={item.zl_number}
                                            placeholder="请输入"
                                            onChange={e =>
                                              this.methods().onInputchange(
                                                'zl_number',
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
                                        <span>单价(元)</span>
                                      </div>
                                    </div>
                                    <div className="m-field-box">
                                      <div className="m-field-content left">
                                        <div className="input-wrapper">
                                          <InputItem
                                            className="ant-input m-mobile-inner-input"
                                            value={item.price}
                                            placeholder="请输入"
                                            onChange={e =>
                                              this.methods().onInputchange(
                                                'price',
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
                                        <span>小计</span>
                                      </div>
                                    </div>
                                    <div className="m-field-box">
                                      <div className="m-field-content left">
                                        <div className="input-wrapper">
                                          <InputItem
                                            editable={false}
                                            clear
                                            value={item.subtotal}
                                            placeholder="自动计算"
                                          ></InputItem>
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
                                            clear
                                            value={item.remarks}
                                            placeholder="请输入"
                                            onChange={e =>
                                              this.methods().onInputchange(
                                                'remarks',
                                                index,
                                                e,
                                              )
                                            }
                                          ></InputItem>
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
                <div
                  className="tbody-add-button tTap"
                  onClick={this.methods().addDetail}
                >
                  <img
                    style={{ width: '20px' }}
                    src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//Em46p8naW61629791119284.png"
                    alt=""
                  />
                  &nbsp;
                  <span className="add-button-text">增加明细</span>
                </div>
              </div>
            </div>
          </div>
          {/*  */}

          {/* 合计 */}
          <div className="field-wrapper">
            <div className="m-group m-group-mobile">
              <div className="m-field-wrapper">
                <div className="m-field m-field-mobile m-select-field">
                  <div className="m-field-head">
                    <div className="m-field-label">
                      <span>合计(元)</span>
                    </div>
                  </div>
                  <div className="m-field-box">
                    <div className="m-field-content left">
                      <div className="input-wrapper">
                        <InputItem
                          value={this.state.Inputmoney1}
                          placeholder="自动计算可修改"
                        ></InputItem>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 物资明细 */}
          {createPortal(
            <Drawer className="isvzhukuaiwarehousing" 
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
              onOpenChange={this.methods().onOpenChange}
            ></Drawer>,
            document.getElementById('MF_APP'),
          )}
          {createPortal(
            <Drawer className="isvzhukuaiwarehousing" 
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
              onOpenChange={this.methods().onOpenChange2}
            ></Drawer>,
            document.getElementById('MF_APP'),
          )}
          {createPortal(
            <Drawer className="isvzhukuaiwarehousing" 
              open={true}
              style={{
                minHeight: document.documentElement.clientHeight,
                display: this.state.showElem3,
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
              sidebar={checkdebar}
            ></Drawer>,
            document.getElementById('MF_APP'),
          )}
        </div>
      </div>
    );
  },
};

export default FormField;
