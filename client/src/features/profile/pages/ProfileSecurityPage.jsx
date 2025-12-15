import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Lock, Save } from 'lucide-react';
import { Divider, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import RHFInput from '@/components/form/RHFInput';
import ButtonCommon from '@/components/common/ButtonCommon';
import useAuthStore from '@/stores/useAuthStore';
import { userApi } from '../api/userApi';

// Schema
const schema = z
  .object({
    oldPassword: z.string().min(1, 'Vui lòng nhập mật khẩu hiện tại'),
    newPassword: z.string().min(6, 'Mật khẩu mới tối thiểu 6 ký tự'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu nhập lại không khớp',
    path: ['confirmPassword'],
  });

const ProfileSecurityPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout); // Lấy hàm logout từ store

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // 1. Gọi API đổi pass
      const res = await userApi.changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      logout(); // Xóa token
      navigate('/auth/login'); // Chuyển trang
    } catch (error) {
      // Nếu lỗi (vd: Sai pass cũ) -> Reset lại field pass cũ để nhập lại
      reset({ oldPassword: '' }, { keepValues: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      {/* Form đổi mật khẩu */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Mật khẩu cũ */}
        <div className="bg-orange-50 p-4 rounded-lg mb-2 border border-orange-100">
          <RHFInput
            name="oldPassword"
            control={control}
            label="Mật khẩu hiện tại"
            variant="password"
            placeholder="Nhập mật khẩu đang dùng"
            prefix={<Lock size={18} className="text-gray-400" />}
          />
        </div>

        <Divider className="my-1 text-gray-400 text-xs">MẬT KHẨU MỚI</Divider>

        {/* Mật khẩu mới */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RHFInput
            name="newPassword"
            control={control}
            label="Mật khẩu mới"
            variant="password"
            placeholder="Tối thiểu 6 ký tự"
            prefix={<Lock size={18} className="text-gray-400" />}
          />

          <RHFInput
            name="confirmPassword"
            control={control}
            label="Nhập lại mật khẩu mới"
            variant="password"
            placeholder="Xác nhận lại"
            prefix={<Lock size={18} className="text-gray-400" />}
          />
        </div>

        {/* Nút Submit */}
        <div className="flex justify-end mt-4">
          <ButtonCommon
            htmlType="submit"
            loading={loading}
            icon={<Save size={18} />}
            className="w-full md:w-auto px-8"
          >
            Lưu thay đổi
          </ButtonCommon>
        </div>
      </form>
    </div>
  );
};

export default ProfileSecurityPage;
