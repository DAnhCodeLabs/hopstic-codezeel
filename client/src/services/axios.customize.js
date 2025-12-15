import axios from 'axios';

// 1. Tạo instance axios với cấu hình cơ bản
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Lấy từ biến môi trường
  timeout: 10000, // Timeout sau 10 giây
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Interceptor Request: Gắn Token vào Header trước khi gửi đi
instance.interceptors.request.use(
  (config) => {
    // --- BẮT ĐẦU SỬA LỖI ---
    // Vì useAuthStore dùng persist lưu vào key 'auth-storage' dưới dạng chuỗi JSON
    // Cấu trúc thực tế: {"state":{"accessToken":"...","user":{...}},"version":0}

    let token = null;
    let userId = null;

    const authStorage = localStorage.getItem('auth-storage'); // Lấy chuỗi JSON thô

    if (authStorage) {
      try {
        const parsedStorage = JSON.parse(authStorage); // Parse chuỗi thành Object

        // Trích xuất Token và User ID từ trong state của Zustand
        token = parsedStorage?.state?.accessToken;
        userId = parsedStorage?.state?.user?.id;
      } catch (error) {
        console.error('Lỗi khi parse auth-storage từ LocalStorage:', error);
        // Nếu lỗi parse, token và userId vẫn là null -> an toàn
      }
    }
    // --- KẾT THÚC SỬA LỖI ---

    const apiKey = import.meta.env.VITE_API_KEY;

    // Gắn các header xác thực nếu có dữ liệu
    if (token) {
      config.headers['authorization'] = token;
    }
    if (userId) {
      config.headers['x-client-id'] = userId;
    }
    if (apiKey) {
      config.headers['x-api-key'] = apiKey;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 3. Interceptor Response: Xử lý dữ liệu trả về hoặc lỗi tập trung
instance.interceptors.response.use(
  (response) => {
    // Nếu thành công, trả về phần data bên trong (bỏ qua config, headers của axios)
    // Backend trả về: { message: "...", status: 200, metadata: ... }
    return response.data;
  },
  (error) => {
    // Xử lý thông báo lỗi gọn gàng
    let msg = error.message;
    if (error.response && error.response.data) {
      // Ưu tiên lấy message lỗi từ Backend trả về
      msg = error.response.data.message || error.response.data.msg || 'Đã có lỗi xảy ra';
    }

    // Tự động Logout nếu Token hết hạn (Lỗi 401)
    if (error.response && error.response.status === 401) {
      // window.location.href = '/auth/login';
    }

    // Trả về Promise reject với message lỗi đã xử lý
    return Promise.reject(msg);
  },
);

export default instance;
