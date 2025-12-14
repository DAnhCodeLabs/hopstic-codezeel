import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
const gridCols = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  8: 'grid-cols-8',
  10: 'grid-cols-10',
  12: 'grid-cols-12',
};

const smGridCols = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  6: 'sm:grid-cols-6',
};
const mdGridCols = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  6: 'md:grid-cols-6',
};
const lgGridCols = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  6: 'lg:grid-cols-6',
  8: 'lg:grid-cols-8',
};
const xlGridCols = {
  1: 'xl:grid-cols-1',
  2: 'xl:grid-cols-2',
  3: 'xl:grid-cols-3',
  4: 'xl:grid-cols-4',
  6: 'xl:grid-cols-6',
  8: 'xl:grid-cols-8',
};

const FormGrid = ({
  children,
  className = '',
  cols = 1, // Mặc định mobile 1 cột
  sm, // Tablet nhỏ
  md, // Tablet vừa
  lg, // PC/Laptop
  xl, // Màn hình lớn
  gap = 4, // Khoảng cách default (gap-4 = 1rem)
}) => {
  const classes = twMerge(
    'grid',
    `gap-${gap}`,
    gridCols[cols],

    sm && smGridCols[sm],
    md && mdGridCols[md],
    lg && lgGridCols[lg],
    xl && xlGridCols[xl],

    className,
  );

  return <div className={classes}>{children}</div>;
};

export default FormGrid;
