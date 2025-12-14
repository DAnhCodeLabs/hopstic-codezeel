import React from 'react';
import { Table } from 'antd';

const AppTable = ({
  columns, 
  dataSource,
  loading = false,
  total = 0,
  params,
  onChange,
  rowKey = 'id',
  ...props
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <Table
        {...props}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={rowKey}
        scroll={{ x: 1000 }}
        onChange={onChange}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          showTotal: (total, range) => (
            <span className="text-gray-500 font-medium">
              Hiển thị {range[0]}-{range[1]} trên {total} bản ghi
            </span>
          ),
          position: ['bottomRight'],
          className: 'px-4 pb-4',
        }}
        className="app-table-custom"
      />
    </div>
  );
};

export default AppTable;
