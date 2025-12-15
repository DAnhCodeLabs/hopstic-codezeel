import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import NotFoundPage from '@/features/misc/NotFoundPage';
import Loader from '@/components/common/Loader';
import ProtectedRoute from './PrivateRoute';
import profileRoutes from './profile.routes';

// Lazy Load
const MainLayout = lazy(() => import('@/components/layout/MainLayout')); // Tạo file này sau
const AuthPage = lazy(() => import('@/features/auth/pages/AuthPage')); // Tạo file này sau
const HomePage = lazy(() => import('@/features/home/pages/HomePage')); // Tạo file này sau
const ForgotPasswordPage = lazy(() => import('@/features/auth/pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('@/features/auth/pages/ResetPasswordPage'));

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

  {
    path: '/auth/forgot-password',
    element: (
      <Suspense fallback={<Loader />}>
        <ForgotPasswordPage />
      </Suspense>
    ),
  },
  {
    path: '/auth/reset-password',
    element: (
      <Suspense fallback={<Loader />}>
        <ResetPasswordPage />
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
        element: <ProtectedRoute allowedRoles={['USER', 'SHOP']} />,
        children: [profileRoutes],
      },

      // --- NHÓM 4: SHOP PROTECTED (Dành cho người bán/quản trị) ---
      {
        element: <ProtectedRoute allowedRoles={['SHOP']} />,
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
