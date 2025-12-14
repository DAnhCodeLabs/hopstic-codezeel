import { Card, Divider, Typography } from 'antd';
import { LoginForm } from './components/AuthForms';

const { Title, Text } = Typography;

const AuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card
        className="w-full max-w-md shadow-lg border-gray-100 rounded-xl"
      >
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="text-center">
            <Title level={3} className="mb-1! text-gray-800!">
              Chào mừng trở lại
            </Title>
            <Text type="secondary" className="text-sm">
              Vui lòng nhập thông tin để đăng nhập
            </Text>
          </div>

          <Divider className="my-2! text-xs">OR</Divider>

          {/* Login Form */}
          <LoginForm />
        </div>
      </Card>
    </div>
  );
};

export default AuthPage;
