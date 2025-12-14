// router.jsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from '@/components/common/Loader';
import ProtectedRoute from './PrivateRoute';

// ===== Layout =====
const AdminLayout = lazy(() => import('@/components/layout/MainLayout'));

// ===== Pages =====
const AuthPage = lazy(() => import('@/features/auth/pages/AuthPage'));
const HomePage = lazy(() => import('@/features/home/pages/HomePage'));
const ProfilePage = lazy(() => import('@/features/user/pages/ProfilePage'));
const CartPage = lazy(() => import('@/features/cart/pages/CartPage'));
const ShopDashboard = lazy(() => import('@/features/shop/pages/Dashboard'));
const UserListPage = lazy(() => import('@/features/admin/users/pages/UserListPage'));

const withSuspense = (el) => <Suspense fallback={<Loader />}>{el}</Suspense>;

const router = createBrowserRouter([
  // ===== AUTH =====
  {
    path: '/auth/login',
    element: withSuspense(<AuthPage />),
  },

  // ===== ADMIN – FULL SYSTEM =====
  {
    path: '/admin',
    element: <ProtectedRoute allowedRoles={['0000']} />,
    children: [
      {
        element: withSuspense(<AdminLayout />),
        children: [
          { index: true, element: <HomePage /> },
          { path: 'users', element: withSuspense(<UserListPage />) },

          // User feature
          { path: 'profile', element: <ProfilePage /> },
          { path: 'cart', element: <CartPage /> },

          // Shop feature
          { path: 'shop/dashboard', element: <ShopDashboard /> },
        ],
      },
    ],
  },

  // ===== 404 =====
  {
    path: '*',
    element: <Navigate to="/admin" replace />,
  },
]);

export default router;
