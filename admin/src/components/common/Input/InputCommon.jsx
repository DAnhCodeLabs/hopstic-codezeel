import React from 'react';
import { Input } from 'antd';

const InputCommon = ({ className = '', variant = 'default', ...props }) => {
  const commonProps = {
    size: 'middle',
    autoComplete: 'off',
    className: `${className}`,
    ...props, // props này chứa cả rows, maxLength v.v..
  };

  // 1. Xử lý Password
  if (variant === 'password') {
    return <Input.Password {...commonProps} />;
  }

  // 2. Xử lý Search
  if (variant === 'search') {
    return <Input.Search {...commonProps} enterButton={props.enterButton} />;
  }

  // 3. MỚI: Xử lý Textarea (Sửa lỗi undefined)
  if (variant === 'textarea') {
    return <Input.TextArea {...commonProps} />;
  }

  // 4. Mặc định là Input thường
  return <Input {...commonProps} />;
};

export default InputCommon;
