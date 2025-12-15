import React from 'react';
import { Space, Tag, Tooltip, Button, Avatar } from 'antd';
import { Eye, Store, CheckCircle, Ban } from 'lucide-react';
import dayjs from 'dayjs';
import AppTable from '@/components/common/Table/AppTable';

const ShopListTable = ({ dataSource, loading, total, params, onChange, onViewDetail }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60,
      align: 'center',
    },
    {
      title: 'Cửa hàng',
      key: 'shop_info',
      width: 250,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          {/* Nếu không có ảnh thì hiện icon Shop mặc định */}
          <Avatar shape="square" size={48} src={record.thumb} icon={<Store size={24} />} />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">{record.name}</span>
            <span className="text-xs text-gray-500">Chủ shop: {record.user?.name || '---'}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating_average',
      width: 120,
      align: 'center',
      render: (rating) => (
        <span className="text-yellow-600 font-medium">
          {rating > 0 ? `${rating} ⭐` : 'Chưa có'}
        </span>
      ),
    },
    {
      title: 'Ngày đăng ký',
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
        let color = 'default';
        let label = 'Không rõ';

        switch (status) {
          case 'active':
            color = 'success';
            label = 'Hoạt động';
            break;
          case 'pending':
            color = 'warning';
            label = 'Chờ duyệt';
            break;
          case 'banned':
            color = 'error';
            label = 'Vi phạm';
            break;
          case 'inactive':
            color = 'default';
            label = 'Tạm nghỉ';
            break;
        }
        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          {/* Nút Xem chi tiết (Quan trọng nhất) */}
          {/* Admin sẽ bấm vào đây để xem kỹ thông tin rồi mới Duyệt/Khóa trong Drawer */}
          <Tooltip title="Xem xét duyệt & Chi tiết">
            <Button
              type="primary"
              ghost
              size="small"
              icon={<Eye size={16} />}
              onClick={() => onViewDetail(record)}
            >
              Xử lý
            </Button>
          </Tooltip>
        </Space>
      ),
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

export default ShopListTable;
