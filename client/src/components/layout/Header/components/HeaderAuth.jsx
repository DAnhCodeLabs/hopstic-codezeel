import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, Avatar, Space, message } from 'antd';
import { User, LogOut, ChevronDown } from 'lucide-react'; // Icon
import useAuthStore from '@/stores/useAuthStore'; // Import Store

export default function HeaderAuth() {
  const navigate = useNavigate();
  const { user, accessToken, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    message.success('Đăng xuất thành công!');
    navigate('/');
  };

  const items = [
    {
      key: 'profile',
      label: <Link to="/profile">Thông tin tài khoản</Link>,
      icon: <User size={16} />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: <LogOut size={16} />,
      danger: true,
      onClick: handleLogout,
    },
  ];


  if (accessToken && user) {
    return (
      <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 py-1 px-2 rounded-md transition-all select-none">
          <Avatar src={user.avatar} className="bg-red-600" size="small">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </Avatar>

          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-gray-700 max-w-[150px] truncate">
              {user.name}
            </span>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        </div>
      </Dropdown>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
      <Link to="/auth/login" className="hover:text-red-600 transition-colors">
        Log in
      </Link>
      <span className="text-gray-300">/</span>
      <Link to="/auth/login" className="hover:text-red-600 transition-colors">
        Register
      </Link>
    </div>
  );
}
