import { getData, postData, putData, deleteData } from '@/services/api';

export const addressApi = {
  // 1. Lấy danh sách
  getList: () => getData('/user/address'),

  // 2. Thêm mới
  create: (data) => postData('/user/address', data),

  // 3. Cập nhật
  update: (id, data) => putData(`/user/address/${id}`, data),

  // 4. Xóa
  delete: (id) => deleteData(`/user/address/${id}`),
};
