import React, { FC, useState, useEffect } from 'react';

import { List, Button, InputItem, Picker } from 'antd-mobile';

const AddSupplier: FC<{
  onSubmit?: (obj: { [key: string]: any }) => void;
  onCancel?: () => void;
  supplierTypes?: any;
  optionNature?: [{ [key: string]: any }];
}> = props => {
  const {
    onSubmit,
    onCancel,
    supplierTypes,
    optionNature: optionNatures,
  } = props;

  const [unitName, setUnitName] = useState('');
  const [unitType, setUnitType] = useState([]);
  const [unitNature, setUnitNature] = useState([]);
  const [Options, setOptions] = useState([]);

  const [optionNature, setOptionNature] = useState([]);

  useEffect(() => {
    setOptions(supplierTypes);
  }, [supplierTypes]);

  useEffect(() => {
    setOptionNature(optionNatures);
  }, [optionNatures]);

  const renderBtn = () => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          minHeight: '60vh',
        }}
      >
        <Button
          style={{ width: '40%' }}
          type="primary"
          onClick={() => {
            setUnitName('');
            setUnitType([]);
            setUnitNature([]);
            if (onCancel) {
              onCancel();
            }
          }}
        >
          取消
        </Button>
        <Button
          style={{ width: '40%' }}
          type="primary"
          onClick={() => {
            if (
              onSubmit &&
              unitName &&
              unitType.length > 0 &&
              unitNature.length > 0
            ) {
              onSubmit({
                unit_name: unitName,
                unit_type: unitType[0],
                unit_nature: unitNature[0],
              });
            }
          }}
        >
          提交
        </Button>
      </div>
    );
  };

  return (
    <List renderFooter={renderBtn()}>
      <InputItem
        value={unitName}
        placeholder="请填写单位名称"
        onChange={value => {
          setUnitName(value);
        }}
      >
        单位名称
      </InputItem>

      <Picker
        extra="请选择 "
        value={unitType}
        cols={1}
        data={Options}
        onOk={value => {
          setUnitType(value);
        }}
      >
        <List.Item>
          <span>单位类型</span>
        </List.Item>
      </Picker>

      <Picker
        extra="请选择 "
        value={unitNature}
        cols={1}
        data={optionNature}
        onOk={value => {
          setUnitNature(value);
        }}
      >
        <List.Item>
          <span>单位性质</span>
        </List.Item>
      </Picker>
    </List>
  );
};

export default AddSupplier;
