import { postData } from "@/services/api";


export const authApi = {
  // Gọi API Đăng ký
  register: (data) => {
    return postData('/access/signup', data);
  },

  // Gọi API Đăng nhập
  login: (data) => {
    return postData('/access/login', data);
  },

  // 3. Gửi yêu cầu quên mật khẩu (Gửi email)
  forgotPassword: (data) => {
    return postData('/access/forgot-password', data);
  },

  // 4. Đặt lại mật khẩu (Từ token trong email)
  resetPassword: (data) => {
    return postData('/access/reset-password', data);
  },
};
