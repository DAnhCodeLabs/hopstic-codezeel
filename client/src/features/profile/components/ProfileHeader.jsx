import { Typography } from 'antd';

const { Title, Text } = Typography;

const ProfileHeader = ({ title, description }) => {
  return (
    <div className="pb-4 mb-6 border-b border-gray-200">
      <Title level={4} className="mb-1!">
        {title}
      </Title>
      <Text type="secondary">{description}</Text>
    </div>
  );
};

export default ProfileHeader;
