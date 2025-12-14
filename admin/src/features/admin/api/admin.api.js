import { getData, patchData } from "@/services/api";


export const adminApi = {
  // ================= QUẢN LÝ USER =================

  // 1. Lấy danh sách User
  getUsers: (params) => {
    // --- BƯỚC MAPPING (PHIÊN DỊCH) ---
    // Chuyển đổi từ format của useTable sang format Backend cần
    const queryParams = {
      page: params.page,
      limit: params.limit,
      // Frontend gọi là keyword -> Backend gọi là search
      search: params.keyword || '',
      // Frontend để trong filters.status -> Backend cần status ra ngoài
      status: params.filters?.status || 'all',
      role: params.filters?.role || 'all',
      // Xử lý Sắp xếp (Nếu Frontend có chọn sort)
      sort: params.sort
        ? mapSortToBackend(params.sort) // Hàm map ở dưới
        : 'ctime_desc', // Mặc định mới nhất trước
    };

    return getData('/admin/users', queryParams);
  },

  // 2. Lấy chi tiết User
  getUserDetail: (id) => {
    return getData(`/admin/users/${id}`);
  },

  // 3. Cập nhật trạng thái User
  updateUserStatus: (id, status) => {
    return patchData(`/admin/users/${id}/status`, { status });
  },

  // ================= QUẢN LÝ SHOP =================
  // (Giữ nguyên logic mapping tương tự nếu cần cho Shop sau này)
  getShops: (params) => {
    const queryParams = {
      page: params.page,
      limit: params.limit,
      search: params.keyword || '',
      status: params.filters?.status || 'all',
      sort: params.sort ? mapSortToBackend(params.sort) : 'ctime_desc',
    };
    return getData('/admin/shops', queryParams);
  },

  getShopDetail: (id) => {
    return getData(`/admin/shops/${id}`);
  },

  updateShopStatus: (id, status) => {
    return patchData(`/admin/shops/${id}/status`, { status });
  },
};

// --- HÀM PHỤ TRỢ: Chuyển đổi Sort Antd sang Backend ---
// Antd trả về: { field: 'createdAt', order: 'ascend' }
// Backend cần: 'ctime_asc'
const mapSortToBackend = (sortObj) => {
  if (!sortObj || !sortObj.order) return 'ctime_desc';

  const direction = sortObj.order === 'ascend' ? 'asc' : 'desc';

  // Map tên cột Frontend sang tên Backend quy ước
  switch (sortObj.field) {
    case 'createdAt':
      return `ctime_${direction}`;
    case 'name':
      return `name_${direction}`;
    default:
      return `ctime_${direction}`;
  }
};
