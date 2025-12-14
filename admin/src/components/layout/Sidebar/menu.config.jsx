import { LayoutDashboard, Users, Store, User } from 'lucide-react';

export const adminMenu = [
  // ===== DASHBOARD =====
  {
    type: 'group',
    label: 'Tổng quan',
  },
  {
    key: '/admin',
    icon: <LayoutDashboard size={18} />,
    label: 'Bảng điều khiển',
  },

  // ===== USER MANAGEMENT (Người dùng) =====
  {
    type: 'group',
    label: 'Quản lý Người dùng',
  },
  {
    key: '/admin/users',
    icon: <Users size={18} />,
    label: 'Danh sách người dùng',
  },
  // Giữ lại Profile cá nhân admin
  {
    key: '/admin/profile',
    icon: <User size={18} />,
    label: 'Tài khoản của tôi',
  },

  // ===== SHOP MANAGEMENT (Cửa hàng - Mới thêm) =====
  {
    type: 'group',
    label: 'Quản lý Cửa hàng',
  },
  {
    key: '/admin/shops', // Route này sẽ map với trang ShopListPage sắp tạo
    icon: <Store size={18} />,
    label: 'Danh sách cửa hàng',
  },
];
