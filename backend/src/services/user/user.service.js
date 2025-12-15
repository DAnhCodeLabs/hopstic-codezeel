import bcrypt from "bcrypt";
import User from "../../models/user.model.js";
import KeyToken from "../../models/keytoken.model.js";
import { BadRequestError, NotFoundError } from "../../core/error.response.js";

class UserService {
  // 1. Đổi mật khẩu
  static changePassword = async ({ userId, oldPassword, newPassword }) => {
    // A. Lấy User
    const user = await User.findByPk(userId);
    if (!user) throw new NotFoundError("Người dùng không tồn tại!");

    // B. Check mật khẩu cũ
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new BadRequestError("Mật khẩu hiện tại không đúng!");
    }

    // C. Cập nhật mật khẩu mới
    // (Lưu ý: Model User đã có hooks beforeUpdate để tự hash password khi field 'password' thay đổi)
    user.password = newPassword;
    await user.save();

    // D. Quan trọng: Xóa Refresh Token để đăng xuất các thiết bị khác (Bảo mật)
    await KeyToken.destroy({ where: { user_id: userId } });

    return {
      message: "Đổi mật khẩu thành công! Vui lòng đăng nhập lại.",
    };
  };
}

export default UserService;
