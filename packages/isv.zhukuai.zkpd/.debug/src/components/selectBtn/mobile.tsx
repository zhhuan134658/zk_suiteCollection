import React from 'react';
import { Modal } from 'antd-mobile';
import './index.less';

const SelectBtnMobile: React.FC<{
  title?: String;
  initSelect?: () => void;
  resetSelect?: () => void;
  deleteSelect?: () => void;
  isPopconfirm?: Boolean;
  popconfirmTitle?: String;
  okText?: String;
  cancelText?: String;
  required?: Boolean;
  showTitle?: Boolean;
}> = props => {
  const {
    title,
    initSelect,
    resetSelect,
    deleteSelect,
    isPopconfirm = true,
    required = false,
    showTitle = false,
  } = props;

  // 请选择
  const initSelects = (): void => {
    if (initSelect) {
      initSelect();
    }
  };

  // 重新选择
  const resetSelects = (): void => {
    if (resetSelect) {
      resetSelect();
    }
  };

  // 删除选项
  const deleteSelects = (): void => {
    if (deleteSelect) {
      deleteSelect();
    }
  };

  const deleteConfig = (): void => {
    Modal.alert('删除', '确认删除', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定',
        onPress: () => {
          deleteSelects();
        },
      },
    ]);
  };

  return (
    <div className="selectBtn">
      {title ? (
        <>
          {showTitle && <div>{title || ''}</div>}
          <div className="primaryFont marginLeft" onClick={resetSelects}>
            重新选择
          </div>
          <div
            className="primaryFont marginLeft"
            onClick={isPopconfirm ? deleteConfig : deleteSelects}
          >
            删除
          </div>
        </>
      ) : (
        <div className="primaryFont" onClick={initSelects}>
          {required && <span className="required">*</span>}请选择
        </div>
      )}
    </div>
  );
};

export { SelectBtnMobile };
