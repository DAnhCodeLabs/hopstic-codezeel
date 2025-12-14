import UserAdminService from "../../services/admin/user.admin.service.js";
import { OK } from "../../core/success.response.js";

class UserAdminController {
  // GET /v1/api/admin/users
  getAllUsers = async (req, res, next) => {
    new OK({
      message: "Lấy danh sách người dùng thành công",
      metadata: await UserAdminService.getAllUsers(req.query),
    }).send(res);
  };

  // PATCH /v1/api/admin/users/:id/status
  updateUserStatus = async (req, res, next) => {
    new OK({
      message: "Cập nhật trạng thái người dùng thành công",
      metadata: await UserAdminService.updateUserStatus({
        userId: req.params.id,
        status: req.body.status,
      }),
    }).send(res);
  };

  // GET /v1/api/admin/users/:id
  getUserDetail = async (req, res, next) => {
    new OK({
      message: "Lấy thông tin chi tiết người dùng thành công",
      metadata: await UserAdminService.getUserDetail(req.params.id),
    }).send(res);
  };
}

export default new UserAdminController();
