import { patchData } from "@/services/api";


export const userApi = {
  changePassword: (data) => {
    return patchData('/user/change-password', data);
  },
};
