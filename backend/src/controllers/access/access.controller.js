import { Created, OK } from "../../core/success.response.js";
import AccessService from "../../services/access/access.service.js";


class AccessController {
  signUp = async (req, res, next) => {
    new Created({
      message: "Đăng ký thành công",
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  };

  verifyEmail = async (req, res, next) => {
    // Lấy token và email từ Query String (URL)
    new OK({
      message: "Verify Success",
      metadata: await AccessService.verifyEmail(req.query),
    }).send(res);
  };

  login = async (req, res, next) => {
    new OK({
      message: "Login Success",
      metadata: await AccessService.login(req.body),
    }).send(res);
  };
}

export default new AccessController();
