import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import { Drawer } from 'antd-mobile';

const CreateDrawer: FC<{
  display?: string;
  renderSidebar?: Function;
  onOpenChange?: () => void;
}> = props => {
  const { display = 'none', renderSidebar, onOpenChange } = props;

  const onOpenChanges = () => {
    if (onOpenChange) {
      onOpenChange();
    }
  };
  return (
    <>
      {createPortal(
        <Drawer className="isvzhukuaizkpd" 
          open={true}
          style={{
            minHeight: document.documentElement.clientHeight,
            display,
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
          sidebar={renderSidebar && renderSidebar()}
          onOpenChange={onOpenChanges}
        ></Drawer>,
        document.getElementById('MF_APP'),
      )}
    </>
  );
};

export default CreateDrawer;
