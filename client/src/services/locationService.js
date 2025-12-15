import axios from 'axios';

// API mở miễn phí của Việt Nam (ESGOO)
const BASE_URL = 'https://esgoo.net/api-tinhthanh';

export const locationService = {
  // 1. Lấy danh sách Tỉnh/Thành
  getProvinces: async () => {
    const res = await axios.get(`${BASE_URL}/1/0.htm`);
    if (res.data.error === 0) return res.data.data;
    return [];
  },

  // 2. Lấy Quận/Huyện theo ID Tỉnh
  getDistricts: async (provinceId) => {
    if (!provinceId) return [];
    const res = await axios.get(`${BASE_URL}/2/${provinceId}.htm`);
    if (res.data.error === 0) return res.data.data;
    return [];
  },

  // 3. Lấy Phường/Xã theo ID Huyện
  getWards: async (districtId) => {
    if (!districtId) return [];
    const res = await axios.get(`${BASE_URL}/3/${districtId}.htm`);
    if (res.data.error === 0) return res.data.data;
    return [];
  },
};
