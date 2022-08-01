import React, { FC } from 'react';
import { PcLabel } from '../label';

const CustomField: FC<{
  label?: string;
  required?: boolean;
  children?: any;
  className?: string;
  showLabel?: boolean;
  labelStyle?: { [key: string]: any };
  style?: { [key: string]: any };
}> = props => {
  const {
    label = '',
    required = false,
    className,
    children,
    showLabel = true,
    labelStyle = {},
    style = {},
  } = props;
  return (
    <div className={className} style={{ ...style }}>
      <div className="pc-custom-field-wrap">
        {showLabel && (
          <PcLabel label={label} required={required} style={labelStyle} />
        )}

        {children && children}
      </div>
    </div>
  );
};

export default CustomField;
