import React from 'react';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { SelectBtn } from '../../components/selectBtn';
import { SelectSupplier } from '../../components/selectSupplier';
import { CustomField } from '../../components/customField';
import { PcLabel } from '../../components/label';
import { NewPage, Keys, ISwapFormField } from '../../types/runtime';
import { notification } from 'antd';
import './pc.less';

interface IState {
  visible: boolean;
  theirName: string;
  treeData: Keys[];
  dataSource: Keys[];
  newOptine: Keys[];
  total: number;
  optionNature: Keys[];
  allData: NewPage;
}

const FormField: ISwapFormField = {
  getInitialState(): IState {
    return {
      visible: false, // modal toggle
      theirName: '', // 单位名称
      treeData: [], // 类型树结构
      dataSource: [], // 选择单位表格数据
      newOptine: [], // 新增 选择单位类型
      total: 0, // 单位表格数据总数
      optionNature: [], // 单位性质
      allData: {
        type: 'bType',
        pageSize: 10,
        page: 1,
        name: '', // 搜索value
        supplier_type: '', // 树结构type
      },
    };
  },
  fieldDidMount() {
    const _this = this;
    const { form } = this.props;
    const { theirName } = this.state;
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
    });
  },
  asyncSetFieldProps() {
    const {
      allData,
      allData: { unit_name, unit_type, unit_nature },
    } = this.state;
    const promise = asyncSetProps(this, allData, 'theirCompany');
    promise.then(res => {
      const { list, typeList, optionNature, count, message, success } = res;
      typeList &&
        typeList.forEach(item => {
          const { id, unit_type } = item;
          item.key = id;
          item.title = unit_type;
        });

      /* 新增单位成功后需要删除参数，防止重复添加 START */
      if (unit_name && unit_type && unit_nature) {
        delete allData.unit_name;
        delete allData.unit_type;
        delete allData.unit_nature;
        const msg = success
          ? message + "，请前往'" + unit_type + "'类型查看"
          : message;
        notification.open({
          message: msg,
        });
      }
      /* 新增单位成功后需要删除参数，防止重复添加 END */

      const treeData: Keys[] = [
        { title: '全部', unit_type: '', key: '1234567890' },
        ...typeList,
      ];

      this.setState({
        treeData,
        newOptine: typeList,
        dataSource: list,
        total: count,
        allData,
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
      addNewProject: (type: string): void => {
        this.setState(
          {
            visible: true,
            selectType: type,
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
      callBackHandleOk: (rows): void => {
        const { unit_name } = rows[0];
        this.setState({
          theirName: unit_name,
          visible: false,
        });
        this.setFieldValues(unit_name);
      },
      callBackHandleCancel: (flag): void => {
        this.setState({
          visible: false,
        });
      },
      callBackTreeSelect: (info): void => {
        const { allData } = this.state;
        const { unit_type } = info;
        Object.assign(allData, {
          supplier_type: unit_type,
          page: 1,
          pageSize: 10,
          name: '',
        });
        this.setState(
          {
            allData,
          },
          () => {
            this.asyncSetFieldProps();
          },
        );
      },
      callBackChangePage: (obj): void => {
        const { allData } = this.state;
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
      callBackSearchValue: (value): void => {
        const { allData } = this.state;
        Object.assign(allData, { name: value });
        this.setState({
          allData,
        });
      },
      callBackSearch: (): void => {
        const { allData } = this.state;
        Object.assign(allData, { page: 1, pageSize: 10 });
        this.setState(
          {
            allData,
          },
          () => {
            this.asyncSetFieldProps();
          },
        );
      },
      callBackFinish: (values): void => {
        const { allData } = this.state;
        Object.assign(allData, values);
        this.setState(
          {
            allData,
          },
          () => {
            this.asyncSetFieldProps();
          },
        );
      },
    };
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
    const field = form.getFieldInstance('theirCompany');
    const label = form.getFieldProp('theirCompany', 'label');
    const required = form.getFieldProp('theirCompany', 'required');
    const {
      visible,
      treeData,
      newOptine,
      optionNature,
      dataSource,
      total,
      theirName,
      allData: { name },
    } = this.state;
    const {
      addNewProject,
      deleteProject,
      callBackHandleOk,
      callBackHandleCancel,
      callBackTreeSelect,
      callBackChangePage,
      callBackSearchValue,
      callBackSearch,
      callBackFinish,
    } = this.methods();

    return !viewMode ? (
      <CustomField className={'TheirCompany_class'} showLabel={false}>
        <div className="laberBox">
          <PcLabel label={label} required={required} />
          <SelectBtn
            title={theirName}
            showTitle={false}
            initSelect={addNewProject}
            resetSelect={addNewProject}
            deleteSelect={deleteProject}
          />
        </div>
        {/* 所属分公司 & 建设单位 & 供应商 */}
        <SelectSupplier
          visible={visible}
          treeData={treeData}
          dataSource={dataSource}
          total={total}
          optionsArr={newOptine}
          searchValue={name}
          callBackHandleOk={callBackHandleOk}
          callBackHandleCancel={callBackHandleCancel}
          callBackTreeSelect={callBackTreeSelect}
          callBackChangePage={callBackChangePage}
          callBackSearchValue={callBackSearchValue}
          callBackSearch={callBackSearch}
          callBackFinish={callBackFinish}
          optionNature={optionNature}
        />
      </CustomField>
    ) : (
      <>{this.renderDetail(field, label)}</>
    );
  },
};

export default FormField;
