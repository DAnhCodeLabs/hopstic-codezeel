// menu.config.jsx
import { LayoutDashboard, User, Users, ShoppingCart, Store } from 'lucide-react';

export const adminMenu = [
  // ===== DASHBOARD =====
  {
    type: 'group',
    label: 'Dashboard',
  },
  {
    key: '/admin',
    icon: <LayoutDashboard size={18} />,
    label: 'Dashboard',
  },

  // ===== USER MANAGEMENT =====
  {
    type: 'group',
    label: 'User Management',
  },
  {
    key: '/admin/users',
    icon: <Users size={18} />,
    label: 'Users',
  },
  {
    key: '/admin/profile',
    icon: <User size={18} />,
    label: 'My Profile',
  },

  // ===== CART / ORDER =====
  {
    type: 'group',
    label: 'Cart Management',
  },
  {
    key: '/admin/cart',
    icon: <ShoppingCart size={18} />,
    label: 'Carts',
  },

  // ===== SHOP =====
  {
    type: 'group',
    label: 'Shop',
  },
  {
    key: '/admin/shop/dashboard',
    icon: <Store size={18} />,
    label: 'Shop Dashboard',
  },
];
