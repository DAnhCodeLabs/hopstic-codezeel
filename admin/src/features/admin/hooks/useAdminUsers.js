import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../api/admin.api';
import { message } from 'antd'; // Dùng để hiện thông báo nhỏ góc màn hình

// Key định danh cho cache
const USER_KEYS = {
  lists: () => ['admin-users'],
  list: (params) => ['admin-users', params],
  details: () => ['admin-users', 'detail'],
  detail: (id) => ['admin-users', 'detail', id],
};

// --- 1. Hook lấy danh sách User ---
export const useUsers = (params) => {
  return useQuery({
    queryKey: USER_KEYS.list(params),
    queryFn: () => adminApi.getUsers(params),
    keepPreviousData: true, // Giữ dữ liệu cũ khi chuyển trang để đỡ giật
  });
};

// --- 2. Hook lấy chi tiết User ---
export const useUserDetail = (id) => {
  return useQuery({
    queryKey: USER_KEYS.detail(id),
    queryFn: () => adminApi.getUserDetail(id),
    enabled: !!id, // Chỉ chạy khi có ID
  });
};

// --- 3. Hook cập nhật trạng thái (Khóa/Mở) ---
export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => adminApi.updateUserStatus(id, status),
    onSuccess: (data) => {
      // 1. Hiện thông báo thành công (Tiếng Việt từ Backend trả về)
      message.success(data.msg || 'Cập nhật thành công');

      // 2. Làm mới danh sách User ngay lập tức
      queryClient.invalidateQueries(USER_KEYS.lists());

      // 3. Làm mới chi tiết User đó (nếu đang mở xem)
      queryClient.invalidateQueries(USER_KEYS.detail(data.id));
    },
    onError: (error) => {
      message.error(error.message || 'Có lỗi xảy ra');
    },
  });
};
