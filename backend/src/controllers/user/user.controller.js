
import { OK } from "../../core/success.response.js";
import UserService from "../../services/user/user.service.js";

class UserController {
  changePassword = async (req, res, next) => {
    new OK({
      message: "Đổi mật khẩu thành công",
      metadata: await UserService.changePassword({
        userId: req.user.userId, // Lấy từ Token
        ...req.body,
      }),
    }).send(res);
  };
}

export default new UserController();
