import React from 'react';
import { Button } from 'antd';
import { twMerge } from 'tailwind-merge';

const ButtonCommon = ({
  children,
  className = '',
  type = 'primary',
  size = 'large',
  icon,
  iconRight,
  danger = false,
  loading = false,
  ...props
}) => {
  const mergedClass = twMerge(
    'flex items-center justify-center font-medium shadow-none',
    className,
  );

  return (
    <Button
      type={type}
      size={size}
      danger={danger}
      loading={loading}
      icon={icon}
      className={mergedClass}
      {...props}
    >
      {children}
      {!loading && iconRight && (
        <span className={`inline-flex items-center ${children ? 'ml-2' : ''}`}>{iconRight}</span>
      )}
    </Button>
  );
};

export default ButtonCommon;
