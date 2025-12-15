import React from 'react';
import { Drawer, Descriptions, Avatar, Tag, Divider, Spin, Empty } from 'antd';
import { User, Store, MapPin } from 'lucide-react';
import dayjs from 'dayjs';
import { useUserDetail } from '../../hooks/useAdminUsers';

const UserDetailDrawer = ({ userId, onClose, open }) => {
  // 1. Gọi API lấy chi tiết (Chỉ chạy khi có userId)
  const { data: user, isLoading } = useUserDetail(userId);

  return (
    <Drawer
      title="Thông tin chi tiết người dùng"
      placement="right"
      onClose={onClose}
      open={open}
      width={900} // Rộng hơn chút để hiển thị đẹp
    >
      {isLoading ? (
        <div className="flex justify-center mt-10">
          <Spin size="default" />
        </div>
      ) : !user ? (
        <Empty description="Không tìm thấy dữ liệu" />
      ) : (
        <div className="flex flex-col gap-6">
          {/* A. THÔNG TIN CÁ NHÂN */}
          <div className="flex items-center gap-4">
            <Avatar
              size={64}
              src={user.avatar}
              icon={<User size={32} />}
              className="bg-blue-100 text-blue-600"
            />
            <div>
              <h3 className="text-lg font-bold m-0">{user.name}</h3>
              <p className="text-gray-500 m-0">{user.email}</p>
              <div className="mt-1">
                {/* Logic hiển thị trạng thái */}
                {user.status === 'active' ? (
                  <Tag color="success">Đang hoạt động</Tag>
                ) : (
                  <Tag color="error">Đã khóa</Tag>
                )}
                <Tag color="blue">Điểm thưởng: {user.points || 0}</Tag>
              </div>
            </div>
          </div>

          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label="Số điện thoại">
              {user.phone || 'Chưa cập nhật'}
            </Descriptions.Item>
            <Descriptions.Item label="Giới tính">
              {user.gender === 'male' ? 'Nam' : user.gender === 'female' ? 'Nữ' : 'Khác'}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày sinh">
              {user.date_of_birth ? dayjs(user.date_of_birth).format('DD/MM/YYYY') : '---'}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tham gia">
              {dayjs(user.createdAt).format('DD/MM/YYYY HH:mm')}
            </Descriptions.Item>
          </Descriptions>

          {/* B. THÔNG TIN CỬA HÀNG (Nếu có) */}
          <Divider orientation="left" className="m-0!">
            <div className="flex items-center gap-2 text-blue-600">
              <Store size={18} /> Thông tin Cửa hàng
            </div>
          </Divider>

          {user.shop ? (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Tên Shop">
                  <span className="font-semibold">{user.shop.name}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                  {user.shop.status === 'active' && <Tag color="success">Đang bán</Tag>}
                  {user.shop.status === 'pending' && <Tag color="warning">Chờ duyệt</Tag>}
                  {user.shop.status === 'banned' && <Tag color="error">Bị khóa</Tag>}
                </Descriptions.Item>
                <Descriptions.Item label="Đánh giá">
                  {user.shop.rating_average}/5 ⭐ ({user.shop.follower_count} người theo dõi)
                </Descriptions.Item>
              </Descriptions>
            </div>
          ) : (
            <p className="text-gray-400 italic">Người dùng này chưa đăng ký cửa hàng.</p>
          )}

          {/* C. DANH SÁCH ĐỊA CHỈ */}
          <Divider orientation="left" className="m-0!">
            <div className="flex items-center gap-2 text-green-600">
              <MapPin size={18} /> Sổ địa chỉ ({user.addresses?.length || 0})
            </div>
          </Divider>

          <div className="flex flex-col gap-3">
            {user.addresses?.length > 0 ? (
              user.addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="border border-gray-200 p-3 rounded-md text-sm relative"
                >
                  {addr.is_default && (
                    <Tag color="cyan" className="absolute right-2 top-2 mb-5!">
                      Mặc định
                    </Tag>
                  )}
                  <p className="font-semibold m-0">
                    {addr.contact_name} - {addr.contact_phone}
                  </p>
                  <p className="text-gray-600 m-0 mt-1">
                    {addr.address_detail}, {addr.ward}, {addr.district}, {addr.province}
                  </p>
                  <Tag className="mt-2">{addr.type === 'home' ? 'Nhà riêng' : 'Văn phòng'}</Tag>
                </div>
              ))
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có địa chỉ nào" />
            )}
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default UserDetailDrawer;
