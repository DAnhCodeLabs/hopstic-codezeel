import AdminService from "../../services/admin/admin.service.js";
import { OK } from "../../core/success.response.js";

class AdminController {
  login = async (req, res, next) => {
    new OK({
      message: "Root Admin Login Success!",
      metadata: await AdminService.login(req.body),
    }).send(res);
  };
}
export default new AdminController();
