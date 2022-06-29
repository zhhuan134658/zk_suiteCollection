import 'dingtalk-jsapi/entry/union';
import * as dd from 'dingtalk-jsapi'; // 此方式为整体加载，也可按需进行加载
import { Drawer, InputItem, SearchBar, Tabs, Toast } from 'antd-mobile';
import React from 'react';
import { createPortal } from 'react-dom';
import {
  handleSaveTaxTable,
  handleTaxTableStatistics,
} from '../../components/handleTables';
import { DataType, ISwapFormField } from '../../types/runtime';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { searchBarChange, searchBarSubmit } from '../../utils/searchUtils';
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
import { purColumns } from '../../printColumns/TestPurField';
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
          title: '需用数量',
          dataIndex: 'det_quantity',
        },
        {
          title: '不含税单价(元)',
          dataIndex: 'no_unit_price',
        },
        {
          title: '含税单价(元)',
          dataIndex: 'unit_price',
        },
        {
          title: '税率(%)',
          dataIndex: 'tax_rate',
        },

        {
          title: '税额(元)',
          dataIndex: 'tax_amount',
        },
        {
          title: '不含税金额(元)',
          dataIndex: 'no_amount_tax',
        },
        {
          title: '含税金额(元)',
          dataIndex: 'amount_tax',
        },
        {
          title: '已入库量',
          dataIndex: 'quantity_rk',
        },
        {
          title: '总计划量',
          dataIndex: 'quantity_zong',
        },
      ],
      Inputmoney1: '',
      Inputmoney2: '',
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
          det_quantity: '',
          no_unit_price: '',
          tax_rate: '',
          tax_amount: '',
          amount_tax: '',
          no_amount_tax: '',
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
          detailname: '',
          Inputmoney2: 0,
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
        if (_this.state.detdate === 'a1') {
          dtar = '采购申请-' + item.name;
        } else if (_this.state.detdate === 'b1') {
          dtar = '材料总计划-' + item.name;
        }
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
        const detailRow: DataType = {
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
            detailname: '',
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
      onInputchange(types: any, index: number, e: any) {
        console.log('0000009', e);
        const dataArray = _this.state.materialList;
        dataArray[index][types] = e;
        const row = dataArray[index];
        const key = types;
        const data = handleSaveTaxTable(_this, dataArray, row, key);
        _this.setState({
          materialList: [...data],
        });
        console.log('0000009', [...data]);
        handleTaxTableStatistics(_this, data);
      },
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
    const promise = asyncSetProps(_this, data, 'TestPur', 'material_contract');
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
            materialList: [...res.dataArray],
          });
          handleTaxTableStatistics(_this, res.dataArray);
          break;
        case 2:
          _this.setState({
            checkData: [...res.dataArray],
          });
          console.log('CHECK DATA', res.dataArray);
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
      console.log('发起页1：fieldDidUpdate');
      const { form } = this.props;
      const editData = {
        hanmoney: 0,
        nomoney: 0,
        detailname: '',
        infourl: '',
        detailedData: [], //物资明细
      };
      if (this.state.Inputmoney1) {
        editData.hanmoney = Number(this.state.Inputmoney1);
        console.log('Inputmoney2', this.state.Inputmoney1);
        form.setFieldValue('CaiConMoney', Number(this.state.Inputmoney1));
        form.setFieldExtendValue('CaiConMoney', Number(this.state.Inputmoney1));
      }
      if (this.state.infourl) {
        editData.infourl = this.state.infourl;
      }
      if (this.state.Inputmoney2) {
        editData.nomoney = Number(this.state.Inputmoney2);
      }
      editData.detailname = this.state.chenkdata;
      editData.detailedData = this.state.materialList;
      const newlistdata = this.state.materialList;
      const str2 = this.state.chenkdata;
      const str1 = `不含税金额合计(元)：${this.state.Inputmoney2}\n 含税金额合计(元)：${this.state.Inputmoney1}`;
      const str = str2 + parsePrintString(newlistdata, purColumns, str1);
      console.log(str);

      form.setFieldValue('TestPur', str);
      form.setFieldExtendValue('TestPur', editData);
    }
  },
  fieldRender() {
    const { form } = this.props;
    const field = form.getFieldInstance('TestPur');
    const label = form.getFieldProp('TestPur', 'label');
    const tabs = [{ title: '采购申请' }, { title: '材料总计划' }];
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
    const applicationParser = [
      {
        key: 'name',
        label: '计划名称',
        index: 1,
        title: true,
      },
      {
        key: 'detailed_money',
        label: '详细金额',
        icon: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pYTtdmPkiF1637911760715.png',
        index: 2,
      },
    ];
    const planParser = [
      {
        key: 'name',
        label: '计划名称',
        index: 1,
        title: true,
      },
      {
        key: 'project_name',
        label: '项目名称',
        index: 2,
      },
    ];
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
        <Tabs
          tabs={tabs}
          initialPage={0}
          renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
          onChange={(tab, index) => {
            console.log('onChange', index, tab);
            this.setState({ detdate: 'a1' });
            const newpage = {
              detailPage: 1,
              defaultActiveKey: 'a',
              rk_id: ['a'],
              number: '1000',
              page: 1,
              name: '',
            };
            if (index === 0) {
              this.setState({ detdate: 'a1' });
              newpage.rk_id = ['a'];
            } else if (index === 1) {
              this.setState({ detdate: 'b1' });
              newpage.rk_id = ['b'];
            }
            this.setState({
              allData: newpage,
            });
            this.asyncSetFieldProps(newpage, 2);
          }}
        >
          <div>
            <FancyList
              data={parseListData(this.state.checkData, applicationParser)}
              itemClick={this.methods().checkClick}
            />
          </div>

          <div>
            <FancyList
              data={parseListData(this.state.checkData, planParser)}
              itemClick={this.methods().checkClick}
            />
          </div>
        </Tabs>
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
      const {
        infourl = '',
        detailname = '',
        hanmoney = 0,
        nomoney = 0,
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
                <label className="m-field-view-label">含税金额合计(元)</label>
                <div className="m-field-view-value">
                  <span>{hanmoney ? Number(hanmoney).toFixed(2) : ''}</span>
                </div>
              </div>
            </div>
            <div className="field-wrapper">
              <div className="m-field-view">
                <label className="m-field-view-label">不含税金额合计(元)</label>
                <div className="m-field-view-value">
                  <span>{nomoney ? Number(nomoney).toFixed(2) : ''}</span>
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
                                        <span>数量</span>
                                      </div>
                                    </div>
                                    <div className="m-field-box">
                                      <div className="m-field-content left">
                                        <div className="input-wrapper">
                                          <InputItem
                                            value={item.det_quantity}
                                            placeholder="请输入"
                                            onChange={e =>
                                              this.methods().onInputchange(
                                                'det_quantity',
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
                                        <span>不含税单价(元)</span>
                                      </div>
                                    </div>
                                    <div className="m-field-box">
                                      <div className="m-field-content left">
                                        <div className="input-wrapper">
                                          <InputItem
                                            clear
                                            value={item.no_unit_price}
                                            placeholder="请输入"
                                            onChange={e =>
                                              this.methods().onInputchange(
                                                'no_unit_price',
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
                                        <span>含税单价(元)</span>
                                      </div>
                                    </div>
                                    <div className="m-field-box">
                                      <div className="m-field-content left">
                                        <div className="input-wrapper">
                                          <InputItem
                                            clear
                                            value={item.unit_price}
                                            placeholder="请输入"
                                            onChange={e =>
                                              this.methods().onInputchange(
                                                'unit_price',
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
                                        <span>税率(%)</span>
                                      </div>
                                    </div>
                                    <div className="m-field-box">
                                      <div className="m-field-content left">
                                        <div className="input-wrapper">
                                          <InputItem
                                            clear
                                            value={item.tax_rate}
                                            placeholder="请输入"
                                            onChange={e =>
                                              this.methods().onInputchange(
                                                'tax_rate',
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
                                        <span>税额(元)</span>
                                      </div>
                                    </div>
                                    <div className="m-field-box">
                                      <div className="m-field-content left">
                                        <div className="input-wrapper">
                                          <InputItem
                                            editable={false}
                                            clear
                                            value={item.tax_amount}
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
                                        <span>不含税金额(元)</span>
                                      </div>
                                    </div>
                                    <div className="m-field-box">
                                      <div className="m-field-content left">
                                        <div className="input-wrapper">
                                          <InputItem
                                            editable={false}
                                            clear
                                            value={item.no_amount_tax}
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
                                        <span>含税金额(元)</span>
                                      </div>
                                    </div>
                                    <div className="m-field-box">
                                      <div className="m-field-content left">
                                        <div className="input-wrapper">
                                          <InputItem
                                            editable={false}
                                            clear
                                            value={item.amount_tax}
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
                                        <span>已入库量</span>
                                      </div>
                                    </div>
                                    <div className="m-field-box">
                                      <div className="m-field-content left">
                                        <div className="input-wrapper">
                                          <InputItem
                                            editable={false}
                                            clear
                                            value={item.quantity_rk}
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
                                        <span>总计划量</span>
                                      </div>
                                    </div>
                                    <div className="m-field-box">
                                      <div className="m-field-content left">
                                        <div className="input-wrapper">
                                          <InputItem
                                            editable={false}
                                            clear
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
          </div>
          <div className="field-wrapper">
            <div className="m-group m-group-mobile">
              <div className="m-field-wrapper">
                <div className="m-field m-field-mobile m-select-field">
                  <div className="m-field-head">
                    <div className="m-field-label">
                      <span>含税金额合计(元)</span>
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
            <Drawer className="isvzhukuaizkgl" 
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
            <Drawer className="isvzhukuaizkgl" 
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
            <Drawer className="isvzhukuaizkgl" 
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
