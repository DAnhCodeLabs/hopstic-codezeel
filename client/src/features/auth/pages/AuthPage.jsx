import React, { useState } from 'react';
import { Card, Divider, Typography } from 'antd';
import ButtonCommon from '@/components/common/ButtonCommon';
import { LoginForm, RegisterForm } from './components/AuthForms';

const { Title, Text } = Typography;

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="flex flex-col items-start justify-center min-w-xl shadow-lg border-gray-100 rounded-lg">
        <div className="w-full">
          <div className="text-left mb-8">
            <Title level={3} className="mb-2! text-gray-800!">
              {isLogin ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}
            </Title>
            <Text type="secondary">
              {isLogin
                ? 'Vui lòng nhập thông tin để đăng nhập'
                : 'Khám phá hàng ngàn sản phẩm tuyệt vời ngay hôm nay'}
            </Text>
          </div>

          <div className="flex items-center justify-center gap-4">
            <ButtonCommon
              className="bg-white! border! border-gray-200! text-gray-800! px-6! py-3! rounded-lg! shadow-sm! hover:bg-gray-50!
          hover:shadow! transition-all!
        "
              icon={
                <img
                  src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
                  className="w-5 h-5"
                />
              }
            >
              Continue with Google
            </ButtonCommon>

            <ButtonCommon
              className="bg-white! border! border-gray-200! text-gray-800! px-6! py-3! rounded-lg! shadow-sm! hover:bg-gray-50!
          hover:shadow! transition-all!"
              icon={
                <img
                  src="https://cdn-icons-png.flaticon.com/128/831/831276.png"
                  className="w-5 h-5"
                />
              }
            >
              Continue with Apple
            </ButtonCommon>
          </div>

          <Divider className="my-4!">OR</Divider>

          {/* Form Content */}
          {isLogin ? <LoginForm /> : <RegisterForm onSuccess={() => setIsLogin(true)} />}

          {/* Footer chuyển đổi */}
          <div className="mt-6 text-center">
            <Divider plain className="ext-gray-400! ext-xs! my-4!">
              HOẶC
            </Divider>

            <Text className="text-gray-600">
              {isLogin ? 'Bạn chưa có tài khoản? ' : 'Bạn đã có tài khoản? '}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-red-600 font-bold cursor-pointer hover:underline select-none transition-all"
              >
                {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
              </span>
            </Text>
          </div>
        </div>
        {/* Header của Card */}
      </Card>
    </div>
  );
};

export default AuthPage;
