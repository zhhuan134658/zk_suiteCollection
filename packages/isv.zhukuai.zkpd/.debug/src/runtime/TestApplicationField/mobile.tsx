//import { Tree } from 'antd';
import 'dingtalk-jsapi/entry/union';
import * as dd from 'dingtalk-jsapi';
import { Drawer, InputItem, SearchBar, Toast } from 'antd-mobile';
import React from 'react';
import { createPortal } from 'react-dom';
import { handleTaxTableStatistics } from '../../components/handleTables';
import { ISwapFormField } from '../../types/runtime';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { searchBarChange, searchBarSubmit } from '../../utils/searchUtils';
import { fpAdd, toFixed } from '../../utils/fpOperations';
// import { Button } from 'antd-mobile';
import { HandledDetailDialogMobile } from '../../components/addDetail';
import {
  parseListData,
  traverseAndParseTreeData,
  uniqueArrayByKey,
} from '../../utils/normalizeUtils';
import { FancyList } from '../../components/fancyLists';
import { DetailList } from '../../components/listDetail';
import { parsePrintString } from '../../utils/printStringParser';
import { applicationColumns } from '../../printColumns/TestApplicationField';
const now = new Date();

const FormField: ISwapFormField = {
  getInitialState() {
    return {
      infourl: '',
      updateTreeDate: '1',
      activeKey: '',
      datadate: '',
      leftTreeDate: [],
      stateData: [],
      stateKey: [],
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
          title: '总计划量',
          dataIndex: 'quantity_zong',
        },
        {
          title: '累计申请量',
          dataIndex: 'quantity_sq',
        },
        {
          title: '需用数量',
          dataIndex: 'need_quantity',
          editable: true,
        },
        {
          title: '参考价格',
          dataIndex: 'refer_price',
          editable: true,
        },

        {
          title: '小计',
          dataIndex: 'subtotal',
        },
        {
          title: '备注',
          dataIndex: 'remarks',
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
      detdate: 'a1',
      date: now,
      checkindex: '',
      SearchBarvalue: '',
      popUpVisible: false,
      popUpCascaderVisible: false,
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
          need_quantity: '',
          quantity_sq: '',
          quantity_zong: '',
          refer_price: '',
          subtotal: '',
          remarks: '',
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
      ResetClick() {
        _this.setState({
          chenkdata: '',
          Inputmoney2: 0,
          Inputmoney1: 0,
          materialList: [
            {
              id: '',
              typename: '',
              name: '',
              size: '',
              unit: '',
              need_quantity: '',
              quantity_sq: '',
              quantity_zong: '',
              refer_price: '',
              subtotal: '',
              remarks: '',
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
      checkClick(item: any) {
        console.log('0000005');
        const cDataid = [item.id];
        const newdate = _this.state.allData;
        let dtar = '';

        dtar = item.name;

        console.log(cDataid);
        newdate.rk_id = [_this.state.detdate, ...cDataid];
        _this.asyncSetFieldProps(newdate, 1);
        _this.setState({
          chenkdata: dtar,
          infourl: item.url,
          showElem3: 'none',
        });
      },
      iconClick() {
        _this.setState({
          chenkdata: '',
          materialList: [],
          Inputmoney1: 0,
          Inputmoney2: 0,
        });
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
          need_quantity: '',
          quantity_sq: '',
          quantity_zong: '',
          refer_price: '',
          subtotal: '',
          remarks: '',
        };
        _this.setState({
          materialList: [..._this.state.materialList, detailRow],
        });
      },
      deleteItem(index: number) {
        console.log('0000008');
        const list = _this.state.materialList;
        if (list.length === 1) {
          return _this.setState({
            chenkdata: '',
            Inputmoney2: 0,
            Inputmoney1: 0,
            materialList: [
              {
                type: '',
                name: '',
                size: '',
                unit: '',
                unit_price: 0,
                id: '',
                det_quantity: 0,
                no_unit_price: 0,
                tax_rate: 0,
                amount_tax: 0,
                tax_amount: 0,
                key: '',
                no_amount_tax: 0,
              },
            ],
          });
        }
        list.splice(index, 1);
        _this.setState({
          materialList: list,
        });
        console.log('_this', list);
        handleTaxTableStatistics(_this, list);
      },
      onInputchange(types, index, e) {
        console.log(types, index, e, _this);
        const arr = _this.state.materialList;
        console.log('120', _this.state.materialList);

        const arrindex = e ? e : '';
        const newindex = index;
        const newtype = types;

        arr[newindex][newtype] = arrindex;

        arr[newindex].subtotal =
          arr[newindex].need_quantity && arr[newindex].refer_price
            ? toFixed(
                arr[newindex].need_quantity * arr[newindex].refer_price,
                2,
              )
            : '';

        //   含税金额
        let newarr2 = [];

        newarr2 = [
          ...arr.filter(item => {
            if (item.subtotal) {
              return item;
            }
          }),
        ];
        newarr2 = [
          ...newarr2.map(item => {
            return item.subtotal;
          }),
        ];
        const totalMoney = newarr2.reduce(fpAdd, 0);
        _this.setState({
          materialList: [...arr],
          Inputmoney1:
            totalMoney.toFixed(2) <= 0.005 ? '' : totalMoney.toFixed(2),
        });
        console.log('12', arr);
      },
      handleAddVisible(visible: boolean) {
        _this.setState({
          popUpVisible: visible,
        });
      },
      handleCascadeVisible(visible: boolean) {
        _this.setState({
          popUpCascaderVisible: visible,
        });
      },
    };
  },
  asyncSetFieldProps(data: any, type = 0, updateCascade = true) {
    const _this = this;
    const promise = asyncSetProps(
      _this,
      data,
      'TestApplication',
      'material_requirement_plan',
    );
    promise.then(res => {
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
      console.log(
        'uihsiuahfiausfaihiu',
        this.state.Inputmoney1,
        this.state.Inputmoney2,
      );

      const editData = {
        hanmoney: null,
        nomoney: null,
        detailname: '',
        infourl: '',
        detailedData: [], //物资明细
      };
      if (this.state.Inputmoney1) {
        editData.hanmoney = Number(this.state.Inputmoney1);
      }
      if (this.state.infourl) {
        editData.infourl = this.state.infourl;
      }
      if (this.state.Inputmoney2) {
        editData.nomoney = Number(this.state.Inputmoney2);
      }
      editData.detailname = this.state.chenkdata;
      editData.detailedData = this.state.materialList;
      // 打印数据
      const newlistdata = this.state.materialList;
      const str2 = this.state.chenkdata;
      const str1 = ' 合计(元):' + this.state.Inputmoney1;
      const str =
        str2 + parsePrintString(newlistdata, applicationColumns, str1);
      console.log(str);
      const { form } = this.props;
      form.setFieldValue('TestApplication', str);
      form.setFieldExtendValue('TestApplication', editData);
    }
  },
  fieldRender() {
    const { form } = this.props;
    const field = form.getFieldInstance('TestApplication');
    const label = form.getFieldProp('TestApplication', 'label');
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
      projectParser: [
        {
          key: 'name',
          label: '名称',
          index: 1,
          title: true,
        },
        {
          key: 'project_name',
          label: '项目名称',
          index: 2,
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
    // const onChangetree = value => {
    //   console.log(value);
    //   this.setState({ cascadeValue: value });
    // };
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
            data={parseListData(this.state.checkData, parsers.projectParser)}
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
      //   if (!value.detailedData) {
      //     value = field.getValue();
      //   }
      const {
        infourl = '',
        detailname = '',
        hanmoney = 0,
        detailedData = [],
      } = value ? value : {};
      return (
        <div className="field-wrapper">
          <div className="field-wrapper">
            <div className="m-field-view">
              <label className="m-field-view-label">
                <span
                  style={{ color: '#409eff' }}
                  onClick={() =>
                    dd.ready(() => {
                      dd.biz.util.openLink({
                        url: infourl, //打开侧边栏的url
                      });
                    })
                  }
                >
                  {label}
                </span>
              </label>
              <div className="m-field-view-value">
                <span>{detailname}</span>
              </div>
            </div>
          </div>
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
                            <div className="field-wrapper">
                              <div className="m-group m-group-mobile">
                                <div className="m-field-wrapper">
                                  <div className="m-field m-field-mobile m-select-field">
                                    <div className="m-field-head">
                                      <div className="m-field-label">
                                        <span>总计划量</span>
                                      </div>
                                    </div>
                                    <div className="m-field-box">
                                      <div className="m-field-content left">
                                        <div className="input-wrapper">
                                          <InputItem
                                            editable={false}
                                            value={item.quantity_zong}
                                            placeholder="自动获取"
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
                                        <span>累计申请量</span>
                                      </div>
                                    </div>
                                    <div className="m-field-box">
                                      <div className="m-field-content left">
                                        <div className="input-wrapper">
                                          <InputItem
                                            editable={false}
                                            value={item.quantity_sq}
                                            placeholder="自动获取"
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
                                        <span>需用数量</span>
                                      </div>
                                    </div>
                                    <div className="m-field-box">
                                      <div className="m-field-content left">
                                        <div className="input-wrapper">
                                          <InputItem
                                            clear
                                            value={item.need_quantity}
                                            placeholder="请输入"
                                            onChange={e =>
                                              this.methods().onInputchange(
                                                'need_quantity',
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
                          <div>
                            <div className="field-wrapper">
                              <div className="m-group m-group-mobile">
                                <div className="m-field-wrapper">
                                  <div className="m-field m-field-mobile m-select-field">
                                    <div className="m-field-head">
                                      <div className="m-field-label">
                                        <span>参考价格</span>
                                      </div>
                                    </div>
                                    <div className="m-field-box">
                                      <div className="m-field-content left">
                                        <div className="input-wrapper">
                                          <InputItem
                                            clear
                                            value={item.refer_price}
                                            placeholder="请输入"
                                            onChange={e =>
                                              this.methods().onInputchange(
                                                'refer_price',
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
          {/* <div className="field-wrapper">
            <div className="m-group m-group-mobile">
              <div className="m-field-wrapper">
                <div className="m-field m-field-mobile m-select-field">
                  <div className="m-field-head">
                    <div className="m-field-label">
                      <span>不含税金额合计(元)</span>
                    </div>
                  </div>
                  <div className="m-field-box">
                    <div className="m-field-content left">
                      <div className="input-wrapper">
                        <InputItem
                          editable={false}
                          value={this.state.Inputmoney2}
                          placeholder="自动计算"
                        ></InputItem>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
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
                          editable={false}
                          value={this.state.Inputmoney1}
                          placeholder="自动计算"
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
            <Drawer className="isvzhukuaizkpd" 
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
            <Drawer className="isvzhukuaizkpd" 
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
            <Drawer className="isvzhukuaizkpd" 
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
  onExtraClick: function (): void {
    throw new Error('Function not implemented.');
  },
  onOpenChange: function (): void {
    throw new Error('Function not implemented.');
  },
  onCancel: function (): void {
    throw new Error('Function not implemented.');
  },
  onSearchBarChange: function (value: any): void {
    throw new Error('Function not implemented.');
  },
  onSubmit: function (value: any): void {
    throw new Error('Function not implemented.');
  },
  habdlClick: function (item: any): void {
    throw new Error('Function not implemented.');
  },
};

export default FormField;
