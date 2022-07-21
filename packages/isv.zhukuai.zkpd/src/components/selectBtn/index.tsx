import React, { useState, useEffect } from 'react';
import { Popconfirm } from 'antd';
import './index.less';

const SelectBtn: React.FC<{
  title?: String;
  initSelect?: () => void;
  resetSelect?: () => void;
  deleteSelect?: () => void;
  isPopconfirm?: Boolean;
  popconfirmTitle?: String;
  okText?: String;
  cancelText?: String;
}> = props => {
  const {
    title: titles,
    initSelect,
    resetSelect,
    deleteSelect,
    isPopconfirm = true,
    popconfirmTitle,
    okText,
    cancelText,
  } = props;
  const [title, setTitle] = useState(titles);

  useEffect(() => {
    setTitle(titles);
  }, [titles]);

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

  return (
    <div className="selectBtn">
      {title ? (
        <>
          <div>{title}</div>
          <div className="primaryFont marginLeft" onClick={resetSelects}>
            重新选择
          </div>
          {isPopconfirm ? (
            <Popconfirm
              title={popconfirmTitle || '是否删除？'}
              onConfirm={deleteSelects}
              okText={okText || '是'}
              cancelText={cancelText || '否'}
            >
              <span className="primaryFont marginLeft">删除</span>
            </Popconfirm>
          ) : (
            <div className="primaryFont marginLeft" onClick={deleteSelects}>
              删除
            </div>
          )}
        </>
      ) : (
        <div className="primaryFont" onClick={initSelects}>
          请选择
        </div>
      )}
    </div>
  );
};

export { SelectBtn };
