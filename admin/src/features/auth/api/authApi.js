import { postData } from "@/services/api";


export const authApi = {
  // Gọi API Đăng nhập
  login: (data) => {
    return postData('/admin/login', data);
  },

};
