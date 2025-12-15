import { Divider, Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar';
import profileHeaderMap from '../constants/profileHeaderMap';
import ProfileHeader from './ProfileHeader';

const { Sider, Content } = Layout;

const ProfileLayout = () => {
  const location = useLocation();

  const headerConfig = profileHeaderMap[location.pathname] || profileHeaderMap['/profile/info'];
  return (
    <div className="w-full bg-gray-50/60">
      <div className="max-w-[1400px] mx-auto py-16">
        <Layout className="bg-gray-50/50! rounded-xl min-h-[calc(100vh-400px)]!">
          <Sider width={300} className="bg-white! shadow-lg rounded-xl">
            <ProfileSidebar />
          </Sider>

          <Layout className="bg-white! ml-4! shadow-lg rounded-xl">
            <Content className="p-6">
              <ProfileHeader title={headerConfig.title} description={headerConfig.description} />
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </div>
    </div>
  );
};

export default ProfileLayout;
