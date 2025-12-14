
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      // Action 1: Đăng nhập (Lưu toàn bộ thông tin từ Backend trả về)
      login: (payload) => {
        set({
          user: payload.user,
          accessToken: payload.tokens.accessToken,
          refreshToken: payload.tokens.refreshToken,
        });
      },

      // Action 2: Đăng xuất (Xóa sạch)
      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
        });
        localStorage.removeItem('auth-storage');
      },

      // Computed: Lấy trạng thái đăng nhập
      isAuthenticated: () => !!get().accessToken,
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
