import React, { FC } from 'react';
import './index.less';

const PaginationBox: FC<{
  children: any;
  style: any;
}> = props => {
  const { children, style } = props;
  return (
    <div className="paginationBox" style={style ? style : null}>
      {children && children}
    </div>
  );
};

export { PaginationBox };
