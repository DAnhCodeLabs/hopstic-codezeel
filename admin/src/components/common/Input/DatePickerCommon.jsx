import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YYYY';

const DatePickerCommon = ({
  className = '',
  placeholder = 'Chọn ngày',
  fullWidth = true,
  ...props
}) => {
  return (
    <DatePicker
      {...props}
      format={DATE_FORMAT}
      placeholder={placeholder}
      size="middle"
      className={`${fullWidth ? 'w-full' : ''} ${className}`}
    />
  );
};

export default DatePickerCommon;
