import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addressApi } from '../api/addressApi';
import { message } from 'antd';

// Key định danh cho Cache
const QUERY_KEY = ['addresses'];

export const useAddress = () => {
  const queryClient = useQueryClient();

  // A. Lấy danh sách
  const { data: addresses, isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: addressApi.getList,
  });

  // B. Thêm mới
  const createMutation = useMutation({
    mutationFn: addressApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY); // Làm mới danh sách
    },
    onError: (err) => message.error(err.message || 'Lỗi thêm địa chỉ'),
  });

  // C. Cập nhật (Sửa thông tin hoặc Set mặc định)
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => addressApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
    },
    onError: (err) => message.error(err.message || 'Lỗi cập nhật'),
  });

  // D. Xóa
  const deleteMutation = useMutation({
    mutationFn: addressApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
    },
    onError: (err) => message.error(err.message || 'Lỗi xóa địa chỉ'),
  });

  return {
    addresses: addresses || [], // Trả về mảng rỗng nếu chưa có data
    isLoading,
    createAddress: createMutation.mutateAsync,
    updateAddress: updateMutation.mutateAsync,
    deleteAddress: deleteMutation.mutateAsync,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
  };
};
