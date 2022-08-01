import React, { FC, useState } from 'react';
import { Modal } from 'antd-mobile';
import './mobile.less';

const SupplierDialog: FC<{
  onPress?: () => void;
  children?: any;
  visible?: boolean;
}> = props => {
  const { onPress, visible, children } = props;

  const onPressClick = (): void => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <>
      <div className="addBox" onClick={onPressClick}>
        <img
          src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//5ZBmNkFcNP1659003507646.png"
          alt="zk"
        />
      </div>

      <Modal
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
        {children && children}
      </Modal>
    </>
  );
};

export default SupplierDialog;
