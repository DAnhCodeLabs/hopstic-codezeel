import { useState } from 'react';

export const useTable = (defaultParams = {}) => {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    filters: {},
    sort: null,
    keyword: '',
    ...defaultParams,
  });

  // Hàm này sẽ được gắn vào sự kiện onChange của Antd Table
  const handleTableChange = (pagination, filters, sorter) => {
    setParams((prev) => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
      filters: filters,
      sort: sorter.field ? { field: sorter.field, order: sorter.order } : null,
    }));
  };

  const onSearch = (keyword) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      keyword: keyword,
    }));
  };

  const onReset = () => {
    setParams({
      page: 1,
      limit: 10,
      filters: {},
      sort: null,
      keyword: '',
    });
  };

  return {
    params,
    handleTableChange,
    onSearch,
    onReset,
    setParams,
  };
};
