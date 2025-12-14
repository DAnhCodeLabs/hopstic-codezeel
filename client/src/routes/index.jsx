import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import NotFoundPage from '@/features/misc/NotFoundPage';
import Loader from '@/components/common/Loader';
import ProtectedRoute from './PrivateRoute';

// Lazy Load
const MainLayout = lazy(() => import('@/components/layout/MainLayout')); // Tạo file này sau
const AuthPage = lazy(() => import('@/features/auth/pages/AuthPage')); // Tạo file này sau
const HomePage = lazy(() => import('@/features/home/pages/HomePage')); // Tạo file này sau

const router = createBrowserRouter([
  // --- NHÓM 1: PUBLIC ROUTES (Không cần đăng nhập) ---
  {
    path: '/auth/login',
    element: (
      <Suspense fallback={<Loader />}>
        <AuthPage />
      </Suspense>
    ),
  },

  // --- NHÓM 2: CÁC ROUTE CÓ LAYOUT CHÍNH ---
  {
    path: '/',
    element: (
      <Suspense fallback={<Loader />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      { index: true, element: <HomePage /> }, // Trang chủ (Ai cũng xem được)

      // --- NHÓM 3: USER PROTECTED (Phải đăng nhập mới vào được) ---
      {
        element: <ProtectedRoute allowedRoles={['USER', 'SHOP', 'ADMIN']} />,
        children: [
          {
            path: 'profile',
            element: <div>Trang cá nhân (Đang phát triển)</div>,
          },
          {
            path: 'cart',
            element: <div>Giỏ hàng (Đang phát triển)</div>,
          },
        ],
      },

      // --- NHÓM 4: SHOP/ADMIN PROTECTED (Dành cho người bán/quản trị) ---
      {
        element: <ProtectedRoute allowedRoles={['SHOP', 'ADMIN']} />,
        children: [
          {
            path: 'shop/dashboard',
            element: <div>Kênh người bán (Chỉ Shop mới thấy)</div>,
          },
        ],
      },
    ],
  },

  // --- NHÓM 5: CATCH ALL (404) ---
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
