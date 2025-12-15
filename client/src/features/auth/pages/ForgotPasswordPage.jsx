import React, { useState } from 'react';
import { Card, Typography } from 'antd';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

import RHFInput from '@/components/form/RHFInput';
import ButtonCommon from '@/components/common/ButtonCommon';
import { authApi } from '../api/authApi';

const { Title, Text } = Typography;

// Schema Validate
const schema = z.object({
  email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
});

const ForgotPasswordPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await authApi.forgotPassword(data);
      setIsSuccess(true); // Chuyển sang giao diện thông báo
    } catch (error) {
      // Lỗi đã được api.js xử lý (hiện message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg border-gray-100 rounded-lg py-4">
        {!isSuccess ? (
          /* --- TRẠNG THÁI 1: FORM NHẬP EMAIL --- */
          <div className="flex flex-col gap-4">
            <div className="text-center">
              <Title level={3} className="mb-2! text-gray-800!">
                Quên mật khẩu?
              </Title>
              <Text type="secondary">
                Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu.
              </Text>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mt-4">
              <RHFInput
                name="email"
                control={control}
                label="Email đăng ký"
                placeholder="name@example.com"
                prefix={<Mail size={18} className="text-gray-400" />}
              />

              <ButtonCommon htmlType="submit" loading={loading} className="w-full mt-2">
                Gửi yêu cầu
              </ButtonCommon>
            </form>

            <div className="text-center mt-4">
              <Link
                to="/auth/login"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 font-medium transition-colors"
              >
                <ArrowLeft size={16} /> Quay lại đăng nhập
              </Link>
            </div>
          </div>
        ) : (
          /* --- TRẠNG THÁI 2: THÔNG BÁO THÀNH CÔNG --- */
          <div className="flex flex-col items-center text-center gap-4 py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
              <CheckCircle size={32} />
            </div>
            <Title level={3} className="m-0!">
              Đã gửi email!
            </Title>
            <Text type="secondary" className="px-4">
              Vui lòng kiểm tra hộp thư đến (và cả mục Spam) để nhận đường dẫn đặt lại mật khẩu.
            </Text>

            <Link to="/auth/login" className="w-full mt-4">
              <ButtonCommon className="w-full" type="default">
                Quay về trang đăng nhập
              </ButtonCommon>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
