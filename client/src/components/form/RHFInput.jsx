import React from 'react';
import { Controller } from 'react-hook-form';
import { Form } from 'antd';
// Import component InputCommon "đa năng" chúng ta đã tạo
import InputCommon from '@/components/common/InputCommon';

const RHFInput = ({
  control,
  name,
  label,
  variant = 'default',
  ...otherProps
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? 'error' : ''}
          help={error?.message}
          className="mb-4 font-normal"
          layout="vertical"
        >
          <InputCommon
            {...field}
            variant={variant}
            status={error ? 'error' : ''}
            {...otherProps}
          />
        </Form.Item>
      )}
    />
  );
};

export default RHFInput;
