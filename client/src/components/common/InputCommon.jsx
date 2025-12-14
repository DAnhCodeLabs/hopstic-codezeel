import React from 'react';
import { Input } from 'antd';

const InputCommon = ({ className = '', variant = 'default', ...props }) => {
  const commonProps = {
    size: 'large',
    autoComplete: 'off',
    className: `${className}`,
    ...props,
  };

  if (variant === 'password') {
    return <Input.Password {...commonProps} />;
  }

  if (variant === 'search') {
    return (
      <Input.Search
        {...commonProps}
        enterButton={props.enterButton}
      />
    );
  }

  return <Input {...commonProps} />;
};

export default InputCommon;
