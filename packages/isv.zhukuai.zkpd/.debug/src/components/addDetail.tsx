import React from 'react';
import { Button, InputItem, List, Picker, Modal, Toast } from 'antd-mobile';
import {
  Modal as PCModal,
  Form as PCForm,
  Button as PCButton,
  Input as PCInput,
  TreeSelect as PCTreeSelect,
} from 'antd';
import { AddOutline } from 'antd-mobile-icons';
const wrapperStyle: React.CSSProperties = {
  justifyContent: 'center',
  display: 'flex',
  WebkitJustifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  position: 'sticky',
  top: 0,
  zIndex: 1500,
  width: '100vw',
};
const mbuttomStyle: React.CSSProperties = {
  height: 35,
  fontSize: 15,
  lineHeight: 2.5,
  width: '98%',
};
import { createPortal } from 'react-dom';

const HandledDetailDialogMobile: React.FC<{
  cascadeData: Array<any>;
  onFinish: (values: any) => void;
  onFinishFailed: (errorInfo: any) => void;
  showElem?: string;
}> = props => {
  const { cascadeData, onFinish, onFinishFailed, showElem } = props;
  const [visible, setVisible] = React.useState(false);
  const [cascadeVisible, setCascadeVisible] = React.useState(false);
  const [cascadeValue, setCascadeValue] = React.useState([]);
  const [formData, setFormData] = React.useState({
    name: '',
    unit: '',
    size: '',
    type: '',
  });
  const renderData = (cascadePickerData: Array<any>) => {
    let string = '请选择';
    if (cascadePickerData.length === 0) {
      return <span>{string}</span>;
    }
    string = cascadePickerData
      .map(item => {
        if (item) {
          const parsedItem = JSON.parse(item.value);
          const title = parsedItem.title;
          return title;
        }
      })
      .join('-');
    return <span>{string}</span>;
  };
  const wrappedFinish = (values: any) => {
    const parsedValues = {
      name: values['name'],
      size: values['size'],
      unit: values['unit'],
      type: '',
    };
    if (values['type']) {
      for (let i = values['type'].length; i > 0; i--) {
        if (values['type'][i - 1]) {
          parsedValues['type'] = JSON.parse(values['type'][i - 1])['key'];
          break;
        }
      }
    }
    console.log('88888', parsedValues);
    if (
      parsedValues.name === '' ||
      parsedValues.unit === '' ||
      parsedValues.size === '' ||
      parsedValues.type === ''
    ) {
      Toast.info('存在未填写', 1);
    } else {
      setVisible(false);
      onFinish(parsedValues);
    }
  };
  const wrappedFinishFailed = (errorInfo: any) => {
    // setVisible(false);
    onFinishFailed(errorInfo);
  };
  const setButtonStyle = () => {
    const style: React.CSSProperties = {
      position: 'fixed',
      bottom: '16px',
      right: '16px',
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      lineHeight: '72px',
      justifyContent: 'center',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      zIndex: 1600,
      boxShadow: '0px 0px 4px rgba(0,0,0,0.2)',
    };
    if (showElem && !visible) {
      style.display = showElem;
    } else {
      style.display = 'none';
    }
    return style;
  };
  return (
    <div style={wrapperStyle}>
      {createPortal(
        <Button
          onClick={() => {
            setVisible(true);
          }}
          type="primary"
          style={setButtonStyle()}
        >
          <AddOutline fontSize={32} />
        </Button>,

        document.getElementById('MF_APP'),
      )}
      <Modal className="isvzhukuaizkpd" 
        visible={visible}
        bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          paddingTop: '16px',
          paddingLeft: '8px',
          paddingRight: '8px',
          minHeight: '60vh',
        }}
      >
        <div style={{ height: '60vh', overflowY: 'scroll' }}>
          <List
            // onFinish={wrappedFinish}
            // onFinishFailed={wrappedFinishFailed}
            renderFooter={
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button
                  style={{ width: '40%' }}
                  type="primary"
                  onClick={() => {
                    wrappedFinish(formData);
                  }}
                >
                  提交
                </Button>
                <Button
                  style={{ width: '40%' }}
                  type="primary"
                  onClick={() => {
                    setVisible(false);
                  }}
                >
                  取消
                </Button>
              </div>
            }
          >
            <InputItem
              placeholder="请填写物品名称"
              onChange={val =>
                setFormData({
                  name: val,
                  unit: formData.unit,
                  size: formData.size,
                  type: formData.type,
                })
              }
            >
              物品名称
            </InputItem>

            <InputItem
              placeholder="请填写单位"
              onChange={val =>
                setFormData({
                  name: formData.name,
                  unit: val,
                  size: formData.size,
                  type: formData.type,
                })
              }
            >
              单位
            </InputItem>

            <InputItem
              placeholder="请填写规格型号"
              onChange={val =>
                setFormData({
                  name: formData.name,
                  unit: formData.unit,
                  size: val,
                  type: formData.type,
                })
              }
            >
              规格型号
            </InputItem>

            <Picker
              data={cascadeData}
              extra="请选择 "
              visible={cascadeVisible}
              onDismiss={() => {
                setCascadeVisible(false);
              }}
              value={cascadeValue}
              onOk={(value: any) => {
                setCascadeValue(value);
                setFormData({
                  name: formData.name,
                  unit: formData.unit,
                  size: formData.size,
                  type: value,
                });
                setCascadeVisible(false);
              }}
            >
              <List.Item
                arrow="horizontal"
                onClick={() => {
                  setCascadeVisible(true);
                  console.log(cascadeData);
                }}
              >
                物资类型
              </List.Item>
            </Picker>
          </List>
        </div>
      </Modal>
    </div>
  );
};

const DetailDialogDesktop: React.FC<{
  treeData: Array<any>;
  onFinish: (values: any) => void;
  onFinishFailed: (values: any) => void;
}> = props => {
  const { treeData, onFinish, onFinishFailed } = props;
  const [visible, setVisible] = React.useState(false);
  const [treeValue, setTreeValue] = React.useState([]);
  const wrappedFinish = (values: any) => {
    onFinish(values);
    setVisible(false);
  };
  return (
    <div>
      <PCButton
        size="large"
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        新增
      </PCButton>
      <PCModal
        onCancel={() => {
          setVisible(false);
        }}
        visible={visible}
        width={750}
        title="新增物资"
        footer={null}
      >
        <PCForm
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={wrappedFinish}
          onFinishFailed={onFinishFailed}
        >
          <PCForm.Item
            label="物品名称"
            name="name"
            rules={[{ required: true, message: '请填写物品名称' }]}
          >
            <PCInput placeholder="填写物品名称" />
          </PCForm.Item>
          <PCForm.Item
            label="单位"
            name="unit"
            rules={[{ required: true, message: '请填写单位' }]}
          >
            <PCInput placeholder="填写单位" />
          </PCForm.Item>
          <PCForm.Item
            label="规格型号"
            name="size"
            rules={[{ required: true, message: '请填写规格型号' }]}
          >
            <PCInput placeholder="填写规格型号" />
          </PCForm.Item>
          <PCForm.Item
            label="物品类型"
            name="type"
            rules={[{ required: true, message: '请填写物品类型' }]}
          >
            <PCTreeSelect
              style={{ width: '100%' }}
              value={treeValue}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={treeData}
              placeholder="请选择"
              treeDefaultExpandAll
              onChange={setTreeValue}
            />
          </PCForm.Item>
          <PCForm.Item className="newForm">
            <PCButton
              type="primary"
              htmlType="submit"
              style={{
                marginRight: '16px',
              }}
            >
              确认
            </PCButton>
            <PCButton
              type="ghost"
              onClick={() => {
                setVisible(false);
              }}
            >
              取消
            </PCButton>
          </PCForm.Item>
        </PCForm>
      </PCModal>
    </div>
  );
};

interface SupplierForm {
  unit_name: string;
  unit_type: string;
  unit_nature: string;
}

const SupplierMobileDialog: React.FC<{
  onFinish: (values: SupplierForm) => void;
  onFinishFailed: (error: any) => void;
  supplierTypes: Array<any>;
  optionNature?: any[];
}> = props => {
  const {
    onFinish,
    onFinishFailed,
    supplierTypes = [],
    optionNature = [],
  } = props;
  const [visible, setVisible] = React.useState(false);
  const [pickerVisible, setPickerVisible] = React.useState(false);
  const [naturePickerVisible, setNaturePickerVisible] = React.useState(false);
  const [pickerValue, setPickerValue] = React.useState([]);
  const [naturePickerValue, setNaturePickerValue] = React.useState([]);
  const [formData, setFormData] = React.useState({
    unit_name: '',
    unit_type: '',
    unit_nature: '',
  });
  const pickerDataRender = (pickerData: Array<any>) => {
    if (pickerData.length === 0) {
      return <span>请选择</span>;
    }
    return <span>{`${pickerData[0].label}`}</span>;
  };
  const Options = [
    [
      ...supplierTypes.map(item => {
        return {
          label: item.title,
          value: item.title,
        };
      }),
    ],
  ];
  const wrappedFinish = (values: {
    unit_name: string;
    unit_type: string;
    unit_nature: string;
  }) => {
    const parsedValues = {
      unit_name: '',
      unit_type: '',
      unit_nature: '',
    };
    if (values['unit_type'].length > 0) {
      parsedValues.unit_type = values['unit_type'][0];
    }
    if (values['unit_nature'].length > 0) {
      parsedValues.unit_nature = values['unit_nature'][0];
    }
    parsedValues.unit_name = values.unit_name;
    console.log('WRAPPED FINISH', values);
    const { unit_name, unit_type, unit_nature } = parsedValues;
    if (unit_name && unit_type && unit_nature) {
      onFinish(parsedValues);
      setVisible(false);
    }
  };
  const wrappedFinishFailed = (error: any) => {
    onFinishFailed(error);
  };
  const natures: Array<any> = [
    [
      { label: '事业', value: '事业' },
      { label: '企业', value: '企业' },
      { label: '社团', value: '社团' },
      { label: '自然人', value: '自然人' },
      { label: '其他', value: '其他' },
    ],
  ];
  return (
    <div style={wrapperStyle}>
      <Button
        onClick={() => {
          setVisible(true);
        }}
        type="primary"
        style={mbuttomStyle}
      >
        新增供应商
      </Button>
      <Modal className="isvzhukuaizkpd" 
        visible={visible}
        bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          paddingTop: '16px',
          paddingLeft: '8px',
          paddingRight: '8px',
          minHeight: '60vh',
        }}
      >
        <div style={{ height: '60vh', overflowY: 'scroll' }}>
          <List
            // onFinish={wrappedFinish}
            // onFinishFailed={wrappedFinishFailed}
            renderFooter={
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button
                  style={{ width: '40%' }}
                  type="primary"
                  onClick={() => {
                    wrappedFinish(formData);
                  }}
                >
                  提交
                </Button>
                <Button
                  style={{ width: '40%' }}
                  type="primary"
                  onClick={() => {
                    setVisible(false);
                  }}
                >
                  取消
                </Button>
              </div>
            }
          >
            <InputItem
              placeholder="请填写单位名称"
              onChange={val =>
                setFormData({
                  unit_name: val,
                  unit_type: formData.unit_type,
                  unit_nature: formData.unit_nature,
                })
              }
            >
              单位名称
            </InputItem>

            <Picker
              data={Options}
              cascade={false}
              extra="请选择 "
              visible={pickerVisible}
              onDismiss={() => {
                console.log('onDismiss');
                setPickerVisible(false);
              }}
              value={pickerValue}
              onChange={v => console.log('onchang', v)}
              onOk={value => {
                setPickerValue(value);
                setFormData({
                  unit_name: formData.unit_name,
                  unit_type: value,
                  unit_nature: formData.unit_nature,
                });
                setPickerVisible(false);
                console.log('onOk', value);
              }}
            >
              <List.Item
                onClick={() => {
                  setPickerVisible(true);
                  console.log(Options);
                }}
              >
                <span>单位类型</span>
              </List.Item>
            </Picker>
            <Picker
              data={optionNature}
              cascade={false}
              extra="请选择 "
              visible={naturePickerVisible}
              onDismiss={() => {
                console.log('onDismiss');
                setNaturePickerVisible(false);
              }}
              value={naturePickerValue}
              onChange={v => console.log('onchang', v)}
              onOk={value => {
                setNaturePickerValue(value);
                setFormData({
                  unit_name: formData.unit_name,
                  unit_nature: value,
                  unit_type: formData.unit_type,
                });
                setNaturePickerVisible(false);
                console.log('onOk', value);
              }}
            >
              <List.Item
                onClick={() => {
                  setNaturePickerVisible(true);
                }}
              >
                <span>单位性质</span>
              </List.Item>
            </Picker>
          </List>
        </div>
      </Modal>
    </div>
  );
};
SupplierMobileDialog.displayName = 'SupplierMobileDialog';

interface StorageForm {
  name: string;
  number: number;
  address: string;
  remarks: string;
}

const StorageMobileDialog: React.FC<{
  onFinish: (values: StorageForm) => void;
  onFinishFailed: (error: any) => void;
}> = props => {
  const { onFinish, onFinishFailed } = props;
  const [visible, setVisible] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    number: 0,
    address: '',
    remarks: '',
  });
  const wrappedFinish = (values: StorageForm) => {
    console.log('WRAPPED FINISH', values);
    onFinish(values);
    setVisible(false);
  };
  const wrappedFinishFailed = (error: any) => {
    onFinishFailed(error);
  };
  return (
    <div style={wrapperStyle}>
      <Button
        onClick={() => {
          setVisible(true);
        }}
        type="primary"
        style={mbuttomStyle}
      >
        新增仓库
      </Button>
      <Modal className="isvzhukuaizkpd" 
        visible={visible}
        bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          paddingTop: '16px',
          paddingLeft: '8px',
          paddingRight: '8px',
          minHeight: '60vh',
        }}
      >
        <div style={{ height: '60vh', overflowY: 'scroll' }}>
          <List
            // onFinish={wrappedFinish}
            // onFinishFailed={wrappedFinishFailed}
            renderFooter={
              <Button
                type="primary"
                onClick={() => {
                  wrappedFinish(formData);
                }}
              >
                提交
              </Button>
            }
          >
            <List.Item>
              <span>仓库名称</span>
              <InputItem
                placeholder="仓库名称"
                onChange={val =>
                  setFormData({
                    name: val,
                    number: formData.number,
                    address: formData.address,
                    remarks: formData.remarks,
                  })
                }
              />
            </List.Item>
            <List.Item>
              <span>仓库编号</span>
              <InputItem
                type="number"
                placeholder="仓库编号"
                onChange={val =>
                  setFormData({
                    name: formData.name,
                    number: Number(val),
                    address: formData.address,
                    remarks: formData.remarks,
                  })
                }
              />
            </List.Item>
            <List.Item>
              <span>仓库地址</span>
              <InputItem
                placeholder="仓库地址"
                onChange={val =>
                  setFormData({
                    name: formData.name,
                    number: formData.number,
                    address: val,
                    remarks: formData.remarks,
                  })
                }
              />
            </List.Item>
            <List.Item>
              <span>备注</span>
              <InputItem
                placeholder="备注"
                onChange={val =>
                  setFormData({
                    name: formData.name,
                    number: formData.number,
                    remarks: val,
                    address: formData.remarks,
                  })
                }
              />
            </List.Item>
          </List>
        </div>
      </Modal>
    </div>
  );
};

const StorageDesktopDialog: React.FC<{
  onFinish: (values: StorageForm) => void;
  onFinishFailed: (error: any) => void;
  visible?: boolean;
}> = props => {
  const { onFinish, onFinishFailed } = props;
  const [visible, setVisible] = React.useState(false);
  const wrappedFinish = (values: StorageForm) => {
    console.log('WRAPPED FINISH', values);
    onFinish(values);
    setVisible(false);
  };
  const wrappedFinishFailed = (error: any) => {
    onFinishFailed(error);
  };
  return (
    <div>
      <PCButton
        onClick={() => {
          setVisible(true);
        }}
        size="large"
        type="primary"
        style={{
          marginLeft: '8px',
        }}
      >
        新增
      </PCButton>
      <PCModal
        onCancel={() => {
          setVisible(false);
        }}
        visible={visible}
        width={750}
        title="新增仓库"
        footer={null}
      >
        <PCForm
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={wrappedFinish}
          onFinishFailed={wrappedFinishFailed}
        >
          <PCForm.Item
            label="仓库名称"
            name="name"
            rules={[{ required: true, message: '请填写仓库名称' }]}
          >
            <PCInput placeholder="仓库名称" />
          </PCForm.Item>
          <PCForm.Item
            label="仓库编号"
            name="number"
            rules={[{ required: true, message: '请填写仓库编号' }]}
          >
            <PCInput type="number" placeholder="仓库编号" />
          </PCForm.Item>
          <PCForm.Item
            label="仓库地址"
            name="address"
            rules={[{ required: true, message: '请填写仓库地址' }]}
          >
            <PCInput placeholder="仓库地址" />
          </PCForm.Item>
          <PCForm.Item label="备注" name="remarks">
            <PCInput.TextArea placeholder="备注" />
          </PCForm.Item>
          <PCForm.Item className="newForm">
            <PCButton
              type="primary"
              htmlType="submit"
              style={{
                marginRight: '16px',
              }}
            >
              确认
            </PCButton>
            <PCButton
              type="ghost"
              onClick={() => {
                setVisible(false);
              }}
            >
              取消
            </PCButton>
          </PCForm.Item>
        </PCForm>
      </PCModal>
    </div>
  );
};

export {
  DetailDialogDesktop,
  HandledDetailDialogMobile,
  SupplierMobileDialog,
  StorageMobileDialog,
  StorageDesktopDialog,
};
