import React, { FC } from 'react';

const MoblieLabel: FC<{
  label?: string;
  required?: boolean;
  style?: { [key: string]: any };
}> = props => {
  const { label = '', required = false, style = {} } = props;

  return (
    <div className="m-field-head" style={{ ...style, marginLeft: '-7px' }}>
      <label className="m-field-label">
        <span>
          <span style={required ? { color: '#ea6d5c' } : { color: '#fff' }}>
            *
          </span>
          {label}
        </span>
      </label>
    </div>
  );
};

export default MoblieLabel;
