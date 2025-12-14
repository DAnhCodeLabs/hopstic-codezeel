import React from 'react';
import { Controller } from 'react-hook-form';
import { Form } from 'antd';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import SelectCommon from '../Input/SelectCommon';
import DatePickerCommon from '../Input/DatePickerCommon';
import InputCommon from '../Input/InputCommon';

// Mapping cho Column Span (Chiếm bao nhiêu cột)
const colSpans = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  6: 'col-span-6',
  12: 'col-span-12',
  full: 'col-span-full',
};

const mdColSpans = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  6: 'md:col-span-6',
  full: 'md:col-span-full',
};

const RHFInput = ({
  control,
  name,
  label,
  inputType = 'input',
  rootClassName = '',
  span,
  mdSpan,

  ...otherProps
}) => {
  const wrapperClass = twMerge(
    'mb-2 font-medium',
    span && (colSpans[span] || `col-span-${span}`),
    mdSpan && (mdColSpans[mdSpan] || `md:col-span-${mdSpan}`),

    rootClassName,
  );

  const renderInputComponent = (fieldProps, errorStatus) => {
    const commonProps = { ...fieldProps, ...otherProps, status: errorStatus };

    switch (inputType) {
      case 'select':
        return <SelectCommon {...commonProps} />;
      case 'date':
        return <DatePickerCommon {...commonProps} />;
      case 'password':
        return <InputCommon {...commonProps} variant="password" />;
      case 'textarea':
        return <InputCommon {...commonProps} variant="textarea" rows={4} />;
      default:
        return <InputCommon {...commonProps} />;
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? 'error' : ''}
          help={error?.message}
          className={wrapperClass}
          layout="vertical"
        >
          {renderInputComponent(field, error ? 'error' : '')}
        </Form.Item>
      )}
    />
  );
};

export default RHFInput;
