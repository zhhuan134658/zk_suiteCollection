import { Drawer, InputItem, List, SearchBar, Tabs } from 'antd-mobile';
import React from 'react';
import { createPortal } from 'react-dom';
import { FancyList } from '../../components/fancyLists';
import { ISwapFormField } from '../../types/runtime';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { parseListData } from '../../utils/normalizeUtils';
import { searchBarChange } from '../../utils/searchUtils';

const FormField: ISwapFormField = {
  getInitialState() {
    const { form } = this.props;
    return {
      detdate: 'a1',
      SearchBarvalue: '',
      showElem: 'none',
      inputvalue: '',
      allData: { type: '0', number: '99999', page: '1', name: '' },
      listData: [],
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
      onOpenChange() {
        const newData = _this.state.allData;
        newData.name = '';
        newData.type = 0;
        newData.page = 1;
        newData.rk_id = [_this.state.detdate[0]];
        newData.project_name = '';
        _this.asyncSetFieldProps(newData);
        _this.setState({
          showElem: 'inherit',
        });
      },
      handleClick(item: any) {
        const { form } = _this.props;
        let dtar = '';
        if (_this.state.detdate === 'a1') {
          dtar = '收入合同-' + item.name;
        } else if (_this.state.detdate === 'b1') {
          dtar = '进度款结算-' + item.name;
        } else if (_this.state.detdate === 'c1') {
          dtar = '完工结算-' + item.name;
        } else if (_this.state.detdate === 'd1') {
          dtar = '质保金结算-' + item.name;
        }
        _this.setState({ inputvalue: dtar, showElem: 'none' }, () => {
          form.setFieldValue('SelectHeshou', dtar);
          form.setFieldExtendValue('SelectHeshou', dtar);
        });
      },
      onSubmit(value: any) {
        const data = _this.state.allData;
        data.name = value;
        _this.asyncSetFieldProps(data);
      },
      onSearchBarChange(value: any) {
        searchBarChange(_this, value, '');
      },
    };
  },
  asyncSetFieldProps(data: any) {
    const _this = this;
    const promise = asyncSetProps(_this, data, 'SelectHeshou');
    promise.then(res => {
      const listData = [...res.dataArray];
      console.log('LIST DATA', listData);
      _this.setState({
        listData: [...res.dataArray],
      });
    });
  },
  fieldDidUpdate() {
    return null;
  },

  fieldRender() {
    // fix in codepen
    const { form } = this.props;
    const field = form.getFieldInstance('SelectHeshou');
    const label = form.getFieldProp('SelectHeshou', 'label');
    const required = form.getFieldProp('SelectHeshou', 'required');
    const tabs = [
      { title: '收入合同1', key: '0' },
      { title: '收入进度款结算', key: '1' },
      { title: '收入完工结算', key: '2' },
      { title: '收入质保金结算', key: '3' },
    ];
    const parser = [
      {
        key: 'name',
        label: '合同名称',
        index: 1,
        title: true,
      },
      {
        key: 'party_a',
        label: '甲方',
        index: 2,
      },
      {
        key: 'money',
        label: '金额',
        icon: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pYTtdmPkiF1637911760715.png',
        index: 3,
      },
    ];
    const secondaryParser = [
      {
        key: 'name',
        label: '合同名称',
        index: 1,
        title: true,
      },
      {
        key: 'reply_money',
        label: '金额',
        icon: 'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//pYTtdmPkiF1637911760715.png',
        index: 3,
      },
    ];

    const sidebar = (
      <div style={{ width: '100vw' }}>
        <SearchBar
          value={this.state.SearchBarvalue}
          placeholder="请输入名称"
          onSubmit={this.methods().onSubmit}
          onChange={this.methods().onSearchBarChange}
          onCancel={this.handleCancel}
          showCancelButton
        />

        <Tabs
          tabs={tabs}
          initialPage={0}
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
            } else if (index === 2) {
              this.setState({ detdate: 'c1' });
              newpage.rk_id = ['c'];
            } else if (index === 3) {
              this.setState({ detdate: 'd1' });
              newpage.rk_id = ['d'];
            }
            this.setState({
              allData: newpage,
            });
            this.asyncSetFieldProps(newpage);
          }}
          renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
        >
          {/* <div>
         
            <FancyList
              data={parseListData(this.state.listData, parser)}
              itemClick={this.methods().handleClick}
            />
          </div>
          <div>
            <FancyList
              data={parseListData(this.state.listData, secondaryParser)}
              itemClick={this.methods().handleClick}
            />
          </div>
          <div>
            <FancyList
              data={parseListData(this.state.listData, secondaryParser)}
              itemClick={this.methods().handleClick}
            />
          </div>
          <div>
            <FancyList
              data={parseListData(this.state.listData, secondaryParser)}
              itemClick={this.methods().handleClick}
            />
          </div> */}
        </Tabs>
        <List>
          {this.state.listData.length === 0 ? (
            <div
              className="fancy-list-empty"
              style={{
                maxWidth: '100vw',
                maxHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px,0',
              }}
            >
              <img
                src={
                  'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//8SyQKD2DCh1638868050008.png'
                }
                style={{
                  maxWidth: '75%',
                  maxHeight: '75%',
                }}
              />
            </div>
          ) : (
            this.state.listData.map((item, index) => {
              const text = item.xuan === 1 ? '#000000' : '#000000';
              const style = {
                color: text,
              };
              return (
                <List.Item
                  onClick={this.methods().handleClick.bind(this, item)}
                  key={index}
                  multipleLine
                >
                  <span style={style}> {item.name}</span>
                </List.Item>
              );
            })
          )}
        </List>
      </div>
    );
    //详情
    if (this.props.runtimeProps.viewMode) {
      const value = field.getExtendValue() ? field.getExtendValue() : '';
      return (
        <div className="field-wrapper">
          <div className="m-field-view">
            <label className="m-field-view-label">{label}</label>
            <div className="m-field-view-value"> {value}</div>
          </div>
        </div>
      );
    }
    return (
      <div className="CorpHouse_class_m">
        <div className="field-wrapper">
          <div className="m-group m-group-mobile">
            <div className="m-field-wrapper">
              <div className="m-field m-field-mobile m-mobile-input vertical">
                <div className="m-field-head" style={{ marginLeft: '-5px' }}>
                  <label className="m-field-label">
                    <span>
                      {required ? (
                        <span style={{ color: '#ea6d5c' }}>*</span>
                      ) : (
                        <span style={{ color: '#fff' }}>*</span>
                      )}
                      {label}
                    </span>
                  </label>
                </div>
                <div className="m-field-box">
                  <div className="m-field-content left">
                    <div className="input-wrapper">
                      <InputItem
                        editable={false}
                        className="ant-input m-mobile-inner-input"
                        type="text"
                        placeholder="请选择"
                        value={this.state.inputvalue}
                        onClick={this.methods().onOpenChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {createPortal(
              <Drawer className="isvzhukuaizkoatiaoshi" 
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
          </div>
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
