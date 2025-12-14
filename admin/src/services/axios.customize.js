import axios from 'axios';
import useAuthStore from '@/stores/useAuthStore'; // 1. Import Store để lấy state chuẩn

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- REQUEST INTERCEPTOR ---
instance.interceptors.request.use(
  (config) => {
    // 2. Lấy dữ liệu trực tiếp từ Store của Zustand
    // (Lưu ý: Không dùng localStorage.getItem vì dữ liệu bị gói trong JSON string của persist)
    const authState = useAuthStore.getState();
    const token = authState.accessToken;
    const user = authState.user;
    const apiKey = import.meta.env.VITE_API_KEY;

    // 3. Đính kèm Headers chuẩn theo yêu cầu Backend
    if (token) {
      config.headers['authorization'] = token;
    }
    if (user?.id) {
      config.headers['x-client-id'] = user.id; 
    }
    if (apiKey) {
      config.headers['x-api-key'] = apiKey;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// --- RESPONSE INTERCEPTOR ---
instance.interceptors.response.use(
  (response) => {
    // Trả về data raw từ Backend (để api.js xử lý tiếp metadata)
    return response.data;
  },
  (error) => {
    let msg = error.message;
    if (error.response && error.response.data) {
      msg = error.response.data.message || 'Lỗi hệ thống';
    }

    // 4. Xử lý Auto Logout khi Token hết hạn hoặc không hợp lệ (Lỗi 401)
    if (error.response && error.response.status === 401) {
      // Gọi hàm logout của Store để xóa state và redirect về login
      useAuthStore.getState().logout();
      // window.location.href = '/auth/login';
    }

    return Promise.reject(msg);
  },
);

export default instance;
