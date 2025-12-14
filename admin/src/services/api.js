import axiosClient from './axios.customize';
import { message } from 'antd';

const request = async (method, url, data, options = {}) => {
  const defaultOptions = {
    showSuccess: method !== 'get',
    showError: true,
    ...options,
  };

  try {
    // Gọi axios
    const response = await (method === 'get' || method === 'delete'
      ? axiosClient[method](url, { params: data })
      : axiosClient[method](url, data));

    // --- XỬ LÝ THÔNG BÁO THÀNH CÔNG ---
    if (defaultOptions.showSuccess) {
      // Lấy message từ Backend trả về
      const successMsg = response.message;
      message.success(successMsg);
    }

    return response.metadata || response;
  } catch (error) {
    // --- XỬ LÝ THÔNG BÁO LỖI ---
    if (defaultOptions.showError) {
      message.error(error);
    }
    throw error;
  }
};

// --- CÁC HÀM PUBLIC ĐỂ COMPONENT GỌI ---

export const getData = (url, params, options) => request('get', url, params, options);

export const postData = (url, data, options) => request('post', url, data, options);

export const putData = (url, data, options) => request('put', url, data, options);

export const patchData = (url, data, options) => request('patch', url, data, options);

export const deleteData = (url, options) => request('delete', url, {}, options);
