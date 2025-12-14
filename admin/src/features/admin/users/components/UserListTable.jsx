import React from 'react';
import { Space, Tag, Tooltip, Popconfirm, Button } from 'antd';
import { Eye, Lock, Unlock } from 'lucide-react';
import dayjs from 'dayjs';
import AppTable from '@/components/common/table/AppTable';

const UserListTable = ({
  dataSource,
  loading,
  total,
  params,
  onChange,
  onToggleStatus, // Hàm xử lý khóa truyền từ cha xuống
  isUpdating, // Trạng thái loading của nút khóa
  onViewDetail,
}) => {
  // --- ĐỊNH NGHĨA CỘT ---
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 70,
      align: 'center',
    },
    {
      title: 'Thông tin người dùng',
      key: 'info',
      dataIndex: 'name',
      sorter: true, // Cho phép sort
      render: (_, record) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">{record.name}</span>
          <span className="text-sm text-gray-500">{record.email}</span>
          <span className="text-xs text-gray-400">{record.phone || 'Chưa cập nhật SĐT'}</span>
        </div>
      ),
    },
    {
      title: 'Vai trò',
      key: 'role',
      render: (_, record) =>
        record.shop ? <Tag color="purple">Người bán</Tag> : <Tag color="default">Người mua</Tag>,
    },
    {
      title: 'Ngày tham gia',
      dataIndex: 'createdAt',
      width: 150,
      sorter: true,
      render: (date) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 120,
      align: 'center',
      render: (status) => {
        const color = status === 'active' ? 'success' : status === 'blocked' ? 'error' : 'warning';
        const label =
          status === 'active' ? 'Hoạt động' : status === 'blocked' ? 'Đã khóa' : 'Chờ duyệt';
        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      width: 120,
      render: (_, record) => {
        const isBlocked = record.status === 'blocked';
        return (
          <Space>
            {/* Nút Xem chi tiết */}
            <Tooltip title="Xem chi tiết">
              <Button
                type="text"
                onClick={() => onViewDetail(record)}
                icon={<Eye size={18} className="text-blue-500" />}
              />
            </Tooltip>

            {/* Nút Khóa/Mở khóa */}
            <Tooltip title={isBlocked ? 'Mở khóa' : 'Khóa tài khoản'}>
              <Popconfirm
                title="Xác nhận thay đổi?"
                description={`Bạn có chắc muốn ${isBlocked ? 'mở lại' : 'khóa'} tài khoản này?`}
                onConfirm={() => onToggleStatus(record)}
                okText="Đồng ý"
                cancelText="Hủy"
              >
                <Button
                  type="text"
                  loading={isUpdating}
                  icon={
                    isBlocked ? (
                      <Unlock size={18} className="text-green-600" />
                    ) : (
                      <Lock size={18} className="text-red-500" />
                    )
                  }
                />
              </Popconfirm>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  return (
    <AppTable
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      total={total}
      params={params}
      onChange={onChange}
      rowKey="id"
    />
  );
};

export default UserListTable;
