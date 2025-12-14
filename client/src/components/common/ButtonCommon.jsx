import React from 'react';
import { Button } from 'antd';
const ButtonCommon = ({
  children,
  className = '',
  type = 'primary',
  icon,
  iconRight,
  size = "large",
  ...props
}) => {
  return (
    <Button
      type={type}
      icon={icon}
      className={`flex! items-center! justify-center! ${className}`}
      {...props}
      size='large'
    >
      {children}
      {iconRight && (
        <span className={`flex items-center ${children ? 'ml-2' : ''}`}>{iconRight}</span>
      )}
    </Button>
  );
};

export default ButtonCommon;
