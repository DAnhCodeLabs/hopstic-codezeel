import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, ArrowRight } from 'lucide-react';

import RHFInput from '@/components/common/Form/RHFInput';
import ButtonCommon from '@/components/common/ButtonCommon';
import useAuthStore from '@/stores/useAuthStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { authApi } from '../../api/authApi';

// ===== ZOD SCHEMA LOGIN =====
const loginSchema = z.object({
  email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});

// ===== LOGIN FORM =====
export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const setAuth = useAuthStore((state) => state.login);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await authApi.login(data);
      setAuth(result);

      const from = location.state?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login Failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1 w-full">
      <RHFInput
        name="email"
        label="Email"
        control={control}
        placeholder="name@example.com"
        prefix={<Mail size={16} className="text-gray-400" />}
      />

      <RHFInput
        name="password"
        label="Mật khẩu"
        control={control}
        variant="password"
        placeholder="Nhập mật khẩu"
        prefix={<Lock size={16} className="text-gray-400" />}
      />

      <ButtonCommon
        htmlType="submit"
        loading={loading}
        className="h-10 w-full"
        iconRight={!loading && <ArrowRight size={18} />}
      >
        Đăng nhập
      </ButtonCommon>
    </form>
  );
};
