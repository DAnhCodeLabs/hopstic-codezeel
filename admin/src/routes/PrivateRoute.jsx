import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from '@/stores/useAuthStore';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { accessToken, user } = useAuthStore();
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length && !user?.roles?.some((r) => allowedRoles.includes(r))) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
