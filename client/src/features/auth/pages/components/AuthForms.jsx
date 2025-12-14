import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';

import RHFInput from '@/components/form/RHFInput';
import ButtonCommon from '@/components/common/ButtonCommon';
import useAuthStore from '@/stores/useAuthStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { authApi } from '../../api/authApi';

// --- ZOD SCHEMA Y NHƯ CŨ ---

// Luật Đăng Nhập
const loginSchema = z.object({
  email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});

// Luật Đăng Ký
const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự'),
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu nhập lại không khớp',
    path: ['confirmPassword'],
  });

// --- LOGIN FORM (GIỮ NGUYÊN LAYOUT) ---

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
      const from = location.state?.from?.pathname || '/';
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

      <div className="flex justify-end mb-4">
        <a href="#" className="text-xs text-gray-500 hover:text-red-600 transition-colors">
          Quên mật khẩu?
        </a>
      </div>

      <ButtonCommon
        htmlType="submit"
        loading={loading}
        className="h-10 w-full"
        iconRight={!loading && <ArrowRight size={18} />}
      >
        Đăng Nhập
      </ButtonCommon>
    </form>
  );
};

// --- REGISTER FORM (GIỮ NGUYÊN LAYOUT) ---

export const RegisterForm = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        name: data.fullName,
        email: data.email,
        password: data.password,
      };

      await authApi.register(payload);
      onSuccess();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
      <RHFInput
        name="fullName"
        label="Họ và tên"
        control={control}
        placeholder="Nguyễn Văn A"
        prefix={<User size={16} className="text-gray-400" />}
      />
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
        placeholder="Tạo mật khẩu"
        prefix={<Lock size={16} className="text-gray-400" />}
      />
      <RHFInput
        name="confirmPassword"
        label="Xác nhận mật khẩu"
        control={control}
        variant="password"
        placeholder="Nhập lại mật khẩu"
        prefix={<CheckCircle size={16} className="text-gray-400" />}
      />

      <ButtonCommon htmlType="submit" loading={loading} className="h-10 w-full mt-2">
        Đăng Ký Tài Khoản
      </ButtonCommon>
    </form>
  );
};
