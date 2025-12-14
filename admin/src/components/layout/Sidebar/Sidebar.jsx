// Sidebar.jsx
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { adminMenu } from './menu.config';

export default function Sidebar({ collapsed = false }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="h-full flex flex-col">
      <div className="h-16 flex items-center justify-center font-bold text-lg border-b border-b-gray-300">
        {collapsed ? 'A' : 'Admin'}
      </div>

      <Menu
        mode="inline"
        items={adminMenu}
        selectedKeys={[pathname]}
        inlineCollapsed={collapsed}
        onClick={({ key }) => navigate(key)}
        className="flex-1 border-r-0"
      />
    </div>
  );
}
