import React, { FC } from 'react';

const PcLabel: FC<{
  label?: string;
  required?: boolean;
  style?: { [key: string]: any };
}> = props => {
  const { label = '', required = false, style = {} } = props;
  return (
    <div className="label" style={{ ...style, marginTop: '10px' }}>
      <span style={required ? { color: '#ea6d5c' } : { color: '#fff' }}>*</span>
      {label}
    </div>
  );
};

export default PcLabel;
