import axios from 'axios';

// 1. Tạo instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    // Lấy token và key từ localStorage (Nơi bạn lưu khi login)
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    const apiKey = import.meta.env.VITE_API_KEY;

    if (token) config.headers['authorization'] = token;
    if (userId) config.headers['x-client-id'] = userId;
    if (apiKey) config.headers['x-api-key'] = apiKey;

    return config;
  },
  (error) => Promise.reject(error),
);

// 3. Interceptor Response (Xử lý kết quả thô)
instance.interceptors.response.use(
  (response) => {
    // Backend trả về: { message: "...", status: 200, metadata: ... }
    return response.data;
  },
  (error) => {
    // Xử lý lỗi tập trung
    let msg = error.message;
    if (error.response && error.response.data) {
      msg = error.response.data.message || 'Lỗi hệ thống';
    }

    // Nếu lỗi 401 (Hết hạn token) -> Tự động logout (Code sau)
    if (error.response && error.response.status === 401) {
      // window.location.href = '/login'; // Ví dụ
    }

    // Trả về Promise reject chứa message lỗi sạch
    return Promise.reject(msg);
  },
);

export default instance;
