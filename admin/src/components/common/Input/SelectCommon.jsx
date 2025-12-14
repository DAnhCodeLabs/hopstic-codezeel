import React from 'react';
import { Select } from 'antd';

const SelectCommon = ({
  options = [],
  placeholder = 'Vui lòng chọn',
  className = '',
  loading = false,
  mode,
  ...props
}) => {
  return (
    <Select
      {...props}
      mode={mode}
      loading={loading}
      showSearch
      allowClear
      placeholder={placeholder}
      optionFilterProp="label"
      className={`w-full ${className}`}
      size="middle"
      options={options}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
    />
  );
};

export default SelectCommon;
