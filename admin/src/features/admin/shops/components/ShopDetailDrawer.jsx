import React from 'react';
import {
  Drawer,
  Descriptions,
  Button,
  Avatar,
  Tag,
  Divider,
  Spin,
  Empty,
  Popconfirm,
  Space,
} from 'antd';
import { Store, CheckCircle, Ban, Unlock, User } from 'lucide-react';
import dayjs from 'dayjs';
import { useShopDetail, useUpdateShopStatus } from '../../hooks/useAdminShops';

const ShopDetailDrawer = ({ shopId, onClose, open }) => {
  // 1. Hook lấy chi tiết Shop
  const { data: shop, isLoading } = useShopDetail(shopId);

  // 2. Hook cập nhật trạng thái (Duyệt/Khóa)
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateShopStatus();

  // Hàm xử lý chung
  const handleUpdateStatus = (newStatus) => {
    updateStatus(
      { id: shopId, status: newStatus },
      {
        onSuccess: () => {
          onClose(); // Đóng Drawer sau khi xử lý xong
        },
      },
    );
  };

  // Render Footer (Các nút hành động)
  const renderFooter = () => {
    if (!shop) return null;

    // CASE 1: Shop đang chờ duyệt (Pending) -> Hiện nút Duyệt & Từ chối
    if (shop.status === 'pending') {
      return (
        <Space className="w-full justify-end">
          <Popconfirm
            title="Từ chối cửa hàng?"
            description="Cửa hàng sẽ bị khóa và không thể hoạt động."
            onConfirm={() => handleUpdateStatus('banned')}
            okText="Từ chối"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button danger disabled={isUpdating}>
              Từ chối
            </Button>
          </Popconfirm>

          <Popconfirm
            title="Duyệt cửa hàng này?"
            description="Cửa hàng sẽ chuyển sang trạng thái hoạt động và được phép bán hàng."
            onConfirm={() => handleUpdateStatus('active')}
            okText="Duyệt ngay"
            cancelText="Hủy"
          >
            <Button type="primary" loading={isUpdating} icon={<CheckCircle size={16} />}>
              Duyệt cửa hàng
            </Button>
          </Popconfirm>
        </Space>
      );
    }

    // CASE 2: Shop đang hoạt động (Active) -> Hiện nút Khóa
    if (shop.status === 'active') {
      return (
        <Space className="w-full justify-end">
          <Popconfirm
            title="Khóa cửa hàng?"
            description="Tất cả sản phẩm của cửa hàng sẽ bị ẩn."
            onConfirm={() => handleUpdateStatus('banned')}
            okText="Khóa ngay"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button type="primary" danger loading={isUpdating} icon={<Ban size={16} />}>
              Khóa cửa hàng
            </Button>
          </Popconfirm>
        </Space>
      );
    }

    // CASE 3: Shop bị khóa (Banned) -> Hiện nút Mở khóa
    if (shop.status === 'banned') {
      return (
        <Space className="w-full justify-end">
          <Popconfirm
            title="Mở khóa cửa hàng?"
            description="Cửa hàng sẽ hoạt động trở lại."
            onConfirm={() => handleUpdateStatus('active')}
            okText="Mở khóa"
            cancelText="Hủy"
          >
            <Button
              type="primary"
              className="bg-green-600"
              loading={isUpdating}
              icon={<Unlock size={16} />}
            >
              Mở khóa hoạt động
            </Button>
          </Popconfirm>
        </Space>
      );
    }

    return null;
  };

  return (
    <Drawer
      title="Chi tiết Cửa hàng & Xét duyệt"
      placement="right"
      onClose={onClose}
      open={open}
      width={720}
      footer={renderFooter()} // Gắn các nút vào chân Drawer
    >
      {isLoading ? (
        <div className="flex justify-center mt-10">
          <Spin size="default" />
        </div>
      ) : !shop ? (
        <Empty description="Không tìm thấy dữ liệu" />
      ) : (
        <div className="flex flex-col gap-6">
          {/* A. HEADER SHOP */}
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <Avatar shape="square" size={80} src={shop.thumb} icon={<Store size={40} />} />
            <div className="flex-1">
              <h3 className="text-xl font-bold m-0 text-blue-900">{shop.name}</h3>
              <div className="mt-2 flex gap-2">
                {shop.status === 'pending' && <Tag color="warning">Đang chờ duyệt</Tag>}
                {shop.status === 'active' && <Tag color="success">Đang hoạt động</Tag>}
                {shop.status === 'banned' && <Tag color="error">Đã bị khóa</Tag>}

                <Tag color="geekblue">{shop.follower_count} người theo dõi</Tag>
                <Tag color="gold">{shop.rating_average}/5 ⭐</Tag>
              </div>
            </div>
          </div>

          {/* B. THÔNG TIN CHỦ SỞ HỮU */}
          <Divider orientation="left" className="m-0!">
            <div className="flex items-center gap-2 text-gray-600">
              <User size={18} /> Chủ sở hữu
            </div>
          </Divider>
          <Descriptions column={2} size="small" bordered>
            <Descriptions.Item label="Họ tên">{shop.user?.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{shop.user?.email}</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{shop.user?.phone || '---'}</Descriptions.Item>
            <Descriptions.Item label="ID Tài khoản">#{shop.user?.id}</Descriptions.Item>
          </Descriptions>

          {/* C. CHI TIẾT CỬA HÀNG */}
          <Divider orientation="left" className="m-0!">
            <div className="flex items-center gap-2 text-gray-600">
              <Store size={18} /> Thông tin vận hành
            </div>
          </Divider>
          <Descriptions column={1} size="small" bordered>
            <Descriptions.Item label="Mô tả shop">
              <span className="whitespace-pre-wrap">{shop.description || 'Không có mô tả'}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ kho (Lấy hàng)">
              {/* Ghép địa chỉ từ các trường */}
              {shop.pickup_address ? (
                `${shop.pickup_address}, ${shop.pickup_ward}, ${shop.pickup_district}, ${shop.pickup_province}`
              ) : (
                <span className="text-gray-400 italic">Chưa cập nhật địa chỉ kho</span>
              )}
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </Drawer>
  );
};

export default ShopDetailDrawer;
