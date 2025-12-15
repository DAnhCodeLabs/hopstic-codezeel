import { Navigate } from 'react-router-dom';
import ProfileLayout from '@/features/profile/components/ProfileLayout';

import ProfileInfoPage from '@/features/profile/pages/ProfileInfoPage';
import ProfileOrdersPage from '@/features/profile/pages/ProfileOrdersPage';
import ProfileAddressesPage from '@/features/profile/pages/ProfileAddressesPage';
import ProfileSecurityPage from '@/features/profile/pages/ProfileSecurityPage';

const profileRoutes = {
  path: 'profile',
  element: <ProfileLayout />,
  children: [
    { index: true, element: <Navigate to="info" replace /> },
    { path: 'info', element: <ProfileInfoPage /> },
    { path: 'orders', element: <ProfileOrdersPage /> },
    { path: 'addresses', element: <ProfileAddressesPage /> },
    { path: 'security', element: <ProfileSecurityPage /> },
  ],
};

export default profileRoutes;
