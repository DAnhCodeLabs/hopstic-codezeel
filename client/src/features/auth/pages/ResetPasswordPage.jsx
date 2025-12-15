import React, { useEffect, useState } from 'react';
import { Card, Typography } from 'antd';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Lock, CheckCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import RHFInput from '@/components/form/RHFInput';
import ButtonCommon from '@/components/common/ButtonCommon';
import { authApi } from '../api/authApi';

const { Title, Text } = Typography;

// Schema: Mật khẩu khớp nhau
const schema = z
  .object({
    password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu nhập lại không khớp',
    path: ['confirmPassword'],
  });

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Lấy params từ URL
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  // Nếu link hỏng (thiếu token/email) -> Về login
  useEffect(() => {
    if (!token || !email) {
      navigate('/auth/login', { replace: true });
    }
  }, [token, email, navigate]);

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await authApi.resetPassword({
        email,
        token,
        newPassword: data.password,
      });
      // Thành công -> Về trang login
      navigate('/auth/login');
    } catch (error) {
      // Lỗi api.js tự hiện
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg border-gray-100 rounded-lg py-4">
        <div className="text-center mb-6">
          <Title level={3} className="mb-2! text-gray-800!">
            Đặt lại mật khẩu
          </Title>
          <Text type="secondary">Tạo mật khẩu mới cho tài khoản {email}</Text>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <RHFInput
            name="password"
            control={control}
            label="Mật khẩu mới"
            variant="password"
            placeholder="Tối thiểu 6 ký tự"
            prefix={<Lock size={18} className="text-gray-400" />}
          />

          <RHFInput
            name="confirmPassword"
            control={control}
            label="Xác nhận mật khẩu"
            variant="password"
            placeholder="Nhập lại mật khẩu mới"
            prefix={<CheckCircle size={18} className="text-gray-400" />}
          />

          <ButtonCommon htmlType="submit" loading={loading} className="w-full mt-4">
            Xác nhận thay đổi
          </ButtonCommon>
        </form>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
