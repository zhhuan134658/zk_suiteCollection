//重构完成
//import { Tree } from 'antd';
import { Drawer, InputItem, SearchBar, DatePicker, Toast } from 'antd-mobile';
import React from 'react';
import { createPortal } from 'react-dom';
import {
  handleSaveTaxTable,
  handleTaxTableStatistics,
} from '../../components/handleTables';
import { ISwapFormField } from '../../types/runtime';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { searchBarChange, searchBarSubmit } from '../../utils/searchUtils';
import { HandledDetailDialogMobile } from '../../components/addDetail';
import { DetailList } from '../../components/listDetail';
// import { Button } from 'antd-mobile';
import {
  traverseAndParseTreeData,
  uniqueArrayByKey,
} from '../../utils/normalizeUtils';
import { parsePrintString } from '../../utils/printStringParser';
import { biddingColumns } from '../../printColumns/TestBiddingField';
const now = new Date();

const FormField: ISwapFormField = {
  getInitialState() {
    return {
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
          title: '规格型号',
          dataIndex: 'size',
        },
        {
          title: '单位',
          dataIndex: 'unit',
        },
        {
          title: '估算数量',
          dataIndex: 'number',
        },
        {
          title: '物资采购部门',
          dataIndex: 'purchase_unit',
        },
        {
          title: '采购日期',
          dataIndex: 'purchase_riqi',
        },
        {
          title: '采购地点',
          dataIndex: 'purchase_address',
        },
        {
          title: '候选供应商名单',
          dataIndex: 'candidate_list',
        },
      ],

      checkData: [],

      treevalue: undefined,
      treeData: [],
      detdate: 'a1',
      date: now,
      checkindex: '',
      SearchBarvalue: '',
      showElem: 'none',
      showElem2: 'none',
      cascadeValue: [],
      cascadeData: [],
      showTypes: true,

      popUpVisible: false,
      popUpCascadeVisible: false,

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
          number: '',
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
      ResetClick() {
        _this.setState({
          materialList: [
            {
              id: '',
              typename: '',
              name: '',
              size: '',
              unit: '',
              number: '',
              purchase_unit: '',
              purchase_riqi: '',
              purchase_address: '',
              candidate_list: '',
            },
          ],
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
      iconClick() {
        _this.setState({
          materialList: [],
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
          number: '',
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
        console.log('0000008');
        const list = _this.state.materialList;
        if (list.length === 1) {
          return _this.setState({
            materialList: [
              {
                id: '',
                typename: '',
                name: '',
                size: '',
                unit: '',
                number: '',
                purchase_unit: '',
                purchase_riqi: '',
                purchase_address: '',
                candidate_list: '',
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
        const dataArray = _this.state.materialList;
        dataArray[index][types] = e;
        const row = dataArray[index];
        const key = types;
        const data = handleSaveTaxTable(_this, dataArray, row, key);
        _this.setState({
          materialList: [...data],
        });
        handleTaxTableStatistics(_this, data);
      },
      onChangedata(data, index) {
        const newdata = new Date(data);

        const datetime =
          newdata.getFullYear() +
          '-' +
          (newdata.getMonth() + 1) +
          '-' +
          newdata.getDate();
        const arr = _this.state.materialList;
        arr[index].purchase_riqi = datetime;
        _this.setState({ materialList: [...arr] });
        console.log(datetime, index);
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
    const promise = asyncSetProps(_this, data, 'TestBidding');
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
      console.log('发起页1：fieldDidUpdate');
      const editData = {
        detailedData: [], //物资明细
      };
      editData.detailedData = this.state.materialList;
      const newlistdata = this.state.materialList;
      const str = parsePrintString(newlistdata, biddingColumns);
      const { form } = this.props;
      form.setFieldValue('TestBidding', str);
      form.setFieldExtendValue('TestBidding', editData);
    }
  },
  fieldRender() {
    const { form } = this.props;
    const field = form.getFieldInstance('TestBidding');
    const label = form.getFieldProp('TestBidding', 'label');
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
      const { detailedData = [] } = value ? value : {};
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
        </div>
      );
    }
    return (
      <div className="CorpHouse_class_m">
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
                                      <span>估算数量</span>
                                    </div>
                                  </div>
                                  <div className="m-field-box">
                                    <div className="m-field-content left">
                                      <div className="input-wrapper">
                                        <InputItem
                                          value={item.number}
                                          placeholder="请输入"
                                          onChange={e =>
                                            this.methods().onInputchange(
                                              'number',
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
                                      <span>物资采购部门</span>
                                    </div>
                                  </div>
                                  <div className="m-field-box">
                                    <div className="m-field-content left">
                                      <div className="input-wrapper">
                                        <InputItem
                                          clear
                                          value={item.purchase_unit}
                                          placeholder="请输入"
                                          onChange={e =>
                                            this.methods().onInputchange(
                                              'purchase_unit',
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
                          <DatePicker
                            mode="date"
                            title="选择时间"
                            extra="Optional"
                            value={this.state.datadate}
                            onChange={date =>
                              this.methods().onChangedata(date, index)
                            }
                          >
                            <div className="field-wrapper">
                              <div className="m-group m-group-mobile">
                                <div className="m-field-wrapper">
                                  <div className="m-field m-field-mobile m-select-field">
                                    <div className="m-field-head">
                                      <div className="m-field-label">
                                        <span>采购日期</span>
                                      </div>
                                    </div>

                                    <div className="m-field-box">
                                      <div className="m-field-content left">
                                        <div className="input-wrapper">
                                          <InputItem
                                            editable={false}
                                            clear
                                            value={item.purchase_riqi}
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
                                      <span>采购地点</span>
                                    </div>
                                  </div>
                                  <div className="m-field-box">
                                    <div className="m-field-content left">
                                      <div className="input-wrapper">
                                        <InputItem
                                          clear
                                          value={item.purchase_address}
                                          placeholder="请输入"
                                          onChange={e =>
                                            this.methods().onInputchange(
                                              'purchase_address',
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
                                      <span>候选供应商名单</span>
                                    </div>
                                  </div>
                                  <div className="m-field-box">
                                    <div className="m-field-content left">
                                      <div className="input-wrapper">
                                        <InputItem
                                          clear
                                          value={item.candidate_list}
                                          placeholder="请输入"
                                          onChange={e =>
                                            this.methods().onInputchange(
                                              'candidate_list',
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
            onOpenChange={this.methods().onOpenChange}
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
            onOpenChange={this.methods().onOpenChange2}
          ></Drawer>,
          document.getElementById('MF_APP'),
        )}
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
