import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from '@/stores/useAuthStore';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { accessToken, user } = useAuthStore();
  const location = useLocation();

  // 1. Kiểm tra Đăng nhập: Nếu không có token -> Về trang Login
  if (!accessToken) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // 2. Kiểm tra Quyền (Authorization): Nếu route yêu cầu quyền cụ thể
  if (allowedRoles.length > 0) {
    const hasPermission = user?.roles?.some((role) => allowedRoles.includes(role));

    if (!hasPermission) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
