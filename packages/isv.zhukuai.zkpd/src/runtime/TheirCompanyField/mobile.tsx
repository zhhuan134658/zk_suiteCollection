import React from 'react';
import { List, SearchBar, Toast } from 'antd-mobile';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { SelectBtnMobile } from '../../components/selectBtn/mobile';
import { CreateDrawer } from '../../components/createDrawer';
import { MoblieLabel } from '../../components/label';
import { SupplierDialog, AddSupplier } from '../../components/supplierDialog';
import { NewPage, Keys } from '../../types/runtime';
import './mobile.less';

interface IState {
  showElem: string;
  theirName: string;
  allData: NewPage;
  listData: Keys[];
  supplierTypes: Keys[];
  optionNature: Keys[];
  listH: number;
  modalVisible: boolean;
}

const FormField = {
  getInitialState(): IState {
    return {
      showElem: 'none',
      theirName: '',
      allData: {
        type: 'bType',
        pageSize: 99999,
        page: 1,
        name: '', // 搜索value
        supplier_type: '', // 树结构type
      },
      listData: [],
      supplierTypes: [],
      optionNature: [],
      listH: 0,
      modalVisible: false,
    };
  },
  fieldDidMount() {
    const _this = this;
    const { form } = this.props;
    const { theirName } = this.state;
    const windowH: number = window.innerHeight;
    const value = form.getFieldValue('company');
    form.onFieldExtendValueChange('company', value => {
      if (value === null) {
        this.setState({
          theirName: '',
        });
      } else {
        const { label } = value;
        if (label !== undefined && label !== theirName) {
          _this.setState({
            theirName: label,
          });
        }
      }
    });
    this.setState({
      theirName: value,
      listH: windowH - 47,
    });
  },
  asyncSetFieldProps() {
    const _this = this;
    const {
      allData,
      allData: { unit_name, unit_type, unit_nature },
    } = this.state;
    const promise = asyncSetProps(_this, allData, 'theirCompany');
    promise.then(res => {
      const { list, typeList, message, success, optionNature } = res;
      typeList &&
        typeList.forEach(item => {
          const { id, unit_type } = item;
          item.key = id;
          item.title = unit_type;
          item.value = unit_type;
          item.label = unit_type;
        });
      optionNature &&
        optionNature.forEach(item => {
          const { value } = item;
          item.label = value;
        });

      /* 新增单位成功后需要删除参数，防止重复添加 START */
      if (unit_name && unit_type && unit_nature) {
        delete allData.unit_name;
        delete allData.unit_type;
        delete allData.unit_nature;
        Toast.info(message, 1);
        this.setState({
          modalVisible: false,
        });
      }
      /* 新增单位成功后需要删除参数，防止重复添加 END */

      _this.setState({
        listData: list,
        supplierTypes: typeList,
        optionNature,
      });
    });
  },
  setFieldValues(value = '') {
    const { form } = this.props;
    form.setFieldValue('company', value);
    form.setFieldExtendValue('company', value);
  },
  methods() {
    return {
      onOpenChange: (): void => {
        this.setState(
          {
            showElem: 'inherit',
          },
          () => {
            this.asyncSetFieldProps();
          },
        );
      },
      deleteProject: (): void => {
        this.setFieldValues('');
        this.setState({
          theirName: '',
        });
      },
      handleClick: (item: any): void => {
        const { unit_name } = item;
        this.setFieldValues(unit_name);
        this.setState({
          theirName: unit_name,
          showElem: 'none',
        });
      },
      onSubmit: (value: string): void => {
        this.asyncSetFieldProps();
      },
      onSearchBarChange: (value: string) => {
        const { allData } = this.state;
        Object.assign(allData, { name: value });
        this.setState({
          allData,
        });
      },
    };
  },
  handleCancel() {
    this.setState({
      showElem: 'none',
    });
  },
  renderDetail(field, label) {
    const value = field.getExtendValue() ? field.getExtendValue() : '';
    return (
      <div className="field-wrapper">
        <div className="m-field-view">
          <label className="m-field-view-label">{label}</label>
          <div className="m-field-view-value"> {value}</div>
        </div>
      </div>
    );
  },
  renderSidebar() {
    const {
      listData,
      supplierTypes,
      optionNature,
      allData,
      allData: { name },
      listH,
      modalVisible,
    } = this.state;
    const { onSubmit, onSearchBarChange } = this.methods();
    return (
      <div style={{ width: '100vw', background: '#F2F1F6 ' }}>
        <SearchBar
          value={name}
          placeholder="请输入"
          onSubmit={onSubmit}
          onChange={onSearchBarChange}
          onCancel={this.handleCancel}
          showCancelButton
          onClear={() => {
            Object.assign(allData, { name: '' });
            this.setState(
              {
                allData,
              },
              () => {
                this.asyncSetFieldProps();
              },
            );
          }}
        />
        <SupplierDialog
          visible={modalVisible}
          onPress={() => {
            this.setState({
              modalVisible: true,
            });
          }}
        >
          <AddSupplier
            supplierTypes={supplierTypes}
            optionNature={optionNature}
            onSubmit={obj => {
              Object.assign(allData, obj);
              this.setState(
                {
                  allData,
                },
                () => {
                  this.asyncSetFieldProps();
                },
              );
            }}
            onCancel={() => {
              this.setState({
                modalVisible: false,
              });
            }}
          />
        </SupplierDialog>
        <List
          className="listBox"
          style={{
            height: listH ? listH - 5 : 0,
            marginTop: '5px',
          }}
        >
          {listData.map((item, index) => {
            const { unit_name } = item;
            return (
              <List.Item
                onClick={this.methods().handleClick.bind(this, item)}
                key={index}
                multipleLine
              >
                {unit_name}
              </List.Item>
            );
          })}
        </List>
      </div>
    );
  },
  fieldRender() {
    const {
      form,
      runtimeProps: { viewMode },
    } = this.props;
    const field = form.getFieldInstance('theirCompany');
    const label = form.getFieldProp('theirCompany', 'label');
    const required = form.getFieldProp('theirCompany', 'required');
    const { theirName, showElem } = this.state;
    const { onOpenChange, deleteProject } = this.methods();

    return !viewMode ? (
      <div className="CorpSupplier_class_m">
        <div className="displayFlex" style={{ display: 'flex' }}>
          <MoblieLabel
            required={required}
            label={label}
            style={{ marginRight: '10px', marginBottom: 0 }}
          />

          <SelectBtnMobile
            title={theirName}
            showTitle={false}
            initSelect={onOpenChange}
            resetSelect={onOpenChange}
            deleteSelect={deleteProject}
          />
        </div>

        <CreateDrawer
          display={showElem}
          renderSidebar={this.renderSidebar}
          onOpenChange={onOpenChange}
        />
      </div>
    ) : (
      <>{this.renderDetail(field, label)}</>
    );
  },
};

export default FormField;
