import React, { useState } from 'react';
import UserListFilter from '../components/UserListFilter';
import UserListTable from '../components/UserListTable';
import { useTable } from '@/components/common/Table/useTable';
import { useUpdateUserStatus, useUsers } from '../../hooks/useAdminUsers';
import UserDetailDrawer from '../components/UserDetailDrawer';

const UserListPage = () => {
  // 1. Hooks quản lý Logic
  const { params, setParams, onSearch, handleTableChange } = useTable();
  const { data, isLoading } = useUsers(params);
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateUserStatus();
  const [viewUserId, setViewUserId] = useState(null);

  const handleViewDetail = (record) => {
    setViewUserId(record.id); // Set ID -> Drawer sẽ mở
  };

  const handleCloseDrawer = () => {
    setViewUserId(null); // Xóa ID -> Drawer đóng
  };

  // 2. Hàm xử lý nghiệp vụ
  const handleToggleStatus = (record) => {
    const newStatus = record.status === 'active' ? 'blocked' : 'active';
    updateStatus({ id: record.id, status: newStatus });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Phần Bộ lọc */}
      <UserListFilter onSearch={onSearch} setParams={setParams} />

      {/* Phần Bảng dữ liệu */}
      <UserListTable
        dataSource={data?.users || []}
        loading={isLoading}
        total={data?.total || 0}
        params={params}
        onChange={handleTableChange}
        onViewDetail={handleViewDetail}
        onToggleStatus={handleToggleStatus}
        isUpdating={isUpdating}
      />
      <UserDetailDrawer
        open={!!viewUserId} // Có ID thì mở (true), null thì đóng (false)
        userId={viewUserId} // Truyền ID để Drawer gọi API
        onClose={handleCloseDrawer}
      />
    </div>
  );
};

export default UserListPage;
