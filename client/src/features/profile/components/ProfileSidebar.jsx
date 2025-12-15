import useAuthStore from '@/stores/useAuthStore';
import { Menu, Avatar, Typography, Divider } from 'antd';
import { User, ShoppingBag, MapPin, Lock, Pencil } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
const { Text } = Typography;

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
   const { user } = useAuthStore();

  const items = [
    {
      key: '/profile/info',
      icon: <User size={18} />,
      label: 'Thông tin cá nhân',
    },
    {
      key: '/profile/orders',
      icon: <ShoppingBag size={18} />,
      label: 'Đơn hàng',
    },
    {
      key: '/profile/addresses',
      icon: <MapPin size={18} />,
      label: 'Địa chỉ',
    },
    {
      key: '/profile/security',
      icon: <Lock size={18} />,
      label: 'Bảo mật',
    },
  ];

  return (
    <div className="h-full bg-white">
      <div className="flex items-center gap-3 px-4 py-4">
        <Avatar size={48} icon={<User size={20} />} />

        <div className="flex flex-col leading-tight">
          <Text strong>{user.name}</Text>

          <div className="flex items-center gap-1 text-gray-500 text-sm cursor-pointer">
            <Pencil size={14} />
            <span>Sửa hồ sơ</span>
          </div>
        </div>
      </div>

      <Divider className="mb-4! mt-0!" />

      {/* Menu */}
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
        onClick={({ key }) => navigate(key)}
        style={{ borderRight: 0 }}
      />
    </div>
  );
};

export default ProfileSidebar;
