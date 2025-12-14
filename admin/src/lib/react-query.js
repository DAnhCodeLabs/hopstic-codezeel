import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 1. Data được coi là "tươi" trong 5 phút.
      // Trong 5p này, nếu gọi lại API đó, nó sẽ lấy từ Cache chứ không gọi Server.
      staleTime: 1000 * 60 * 5,

      // 2. Data không dùng nữa sẽ bị xóa khỏi bộ nhớ sau 10 phút (Dọn rác).
      // (Lưu ý: v5 đổi tên cacheTime thành gcTime - Garbage Collection Time)
      gcTime: 1000 * 60 * 10,

      // 3. Tắt tính năng tự động fetch lại khi user bấm sang tab khác rồi quay lại.
      // (Mặc định là true, rất phiền khi dev hoặc user đang điền form)
      refetchOnWindowFocus: false,

      // 4. Nếu API lỗi, chỉ thử lại 1 lần (Mặc định là 3 lần -> chờ lâu).
      retry: 1,
    },
  },
});
