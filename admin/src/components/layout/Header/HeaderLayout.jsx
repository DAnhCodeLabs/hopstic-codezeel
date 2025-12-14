import React from 'react';
import {
  Layout,
  Breadcrumb,
  Typography,
  Input,
  Space,
  Button,
  Avatar,
  Badge,
  Dropdown,
} from 'antd';
import { Search, Bell, Settings, User, LogOut } from 'lucide-react';
import { useBreadcrumb } from '@/components/common/breadcrumb/useBreadcrumb';
import useAuthStore from '@/stores/useAuthStore';

const { Header } = Layout;
const { Title } = Typography;

const HeaderLayout = () => {
  const breadcrumbItems = useBreadcrumb();

  const { user, isAuthenticated, logout } = useAuthStore();
  const loggedIn = isAuthenticated();

  const menuItems = [
    {
      key: 'logout',
      label: (
        <div className="flex items-center gap-2 text-red-500">
          <LogOut size={16} />
          <span>Logout</span>
        </div>
      ),
      onClick: logout,
    },
  ];

  return (
    <Header className="flex items-center justify-between px-6! shadow bg-white! w-full! h-full!">
      <div>
        <Breadcrumb
          items={breadcrumbItems.map((label) => ({
            title: label,
          }))}
        />
        <Title level={4} style={{ margin: 0 }}>
          {breadcrumbItems[breadcrumbItems.length - 1]}
        </Title>
      </div>

      <Space>
        <Input placeholder="Search" prefix={<Search size={16} />} style={{ width: 220 }} />

        {loggedIn ? (
          <Dropdown menu={{ items: menuItems }} trigger={['hover']} placement="bottomRight">
            <div className="flex items-center gap-2 cursor-pointer select-none px-2 py-1 rounded-lg hover:bg-gray-100 transition">
              <Avatar src={user?.avatar} icon={!user?.avatar && <User size={16} />} />
              <span className="font-medium">{ 'admin'}</span>
            </div>
          </Dropdown>
        ) : (
          <Button type="text" icon={<User size={16} />}>
            Sign In
          </Button>
        )}

        <Badge dot>
          <Button type="text" icon={<Bell size={18} />} />
        </Badge>

        <Button type="text" icon={<Settings size={18} />} />
      </Space>
    </Header>
  );
};

export default HeaderLayout;
