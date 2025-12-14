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

};
