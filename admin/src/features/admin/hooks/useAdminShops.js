import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../api/admin.api';
import { message } from 'antd';

// Key định danh cho cache
const SHOP_KEYS = {
  lists: () => ['admin-shops'],
  list: (params) => ['admin-shops', params],
  details: () => ['admin-shops', 'detail'],
  detail: (id) => ['admin-shops', 'detail', id],
};

// --- 1. Hook lấy danh sách Shop ---
export const useShops = (params) => {
  return useQuery({
    queryKey: SHOP_KEYS.list(params),
    queryFn: () => adminApi.getShops(params),
    keepPreviousData: true,
  });
};

// --- 2. Hook lấy chi tiết Shop ---
export const useShopDetail = (id) => {
  return useQuery({
    queryKey: SHOP_KEYS.detail(id),
    queryFn: () => adminApi.getShopDetail(id),
    enabled: !!id,
  });
};

// --- 3. Hook cập nhật trạng thái (Duyệt/Khóa) ---
export const useUpdateShopStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => adminApi.updateShopStatus(id, status),
    onSuccess: (data) => {
      // Thông báo Tiếng Việt
      message.success(data.msg || 'Cập nhật trạng thái shop thành công');

      // Làm mới dữ liệu danh sách và chi tiết
      queryClient.invalidateQueries(SHOP_KEYS.lists());
      queryClient.invalidateQueries(SHOP_KEYS.detail(data.id));
    },
    onError: (error) => {
      message.error(error.message || 'Lỗi cập nhật trạng thái shop');
    },
  });
};
