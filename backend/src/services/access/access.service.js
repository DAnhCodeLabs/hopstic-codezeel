import crypto from "crypto";
import User from "../../models/user.model.js";
import KeyToken from "../../models/keytoken.model.js";
import { createTokenPair } from "../../auth/authUtils.js";
import {
  BadRequestError,
  AuthFailureError,
  ForbiddenError,
} from "../../core/error.response.js";
import { sendEmailLinkVerify, sendEmailTokenResetPassword } from "../email.service.js";

class AccessService {
  // --- 1. ĐĂNG KÝ (SIGN UP) ---
  static signUp = async ({ name, email, password }) => {
    // A. Check Email
    const holderUser = await User.findOne({ where: { email } });
    if (holderUser) throw new BadRequestError("Email đã tồn tại!");

    // C. Tạo Verify Token (Ngẫu nhiên)
    const verifyToken = crypto.randomBytes(32).toString("hex");
    const verifyExpire = Date.now() + 10 * 60 * 1000;

    // D. Tạo User (Status: Pending, Role: USER)
    const newUser = await User.create({
      name,
      email,
      password: password,
      roles: ["USER"],
      status: "pending",
      verify_token: verifyToken,
      verify_expire: verifyExpire,
    });

    if (newUser) {
      console.log("👉 Bắt đầu gửi email...");
      const linkVerify = `http://localhost:3055/v1/api/access/verify?token=${verifyToken}&email=${email}`;

      await sendEmailLinkVerify({
        toEmail: email,
        userName: name,
        linkVerify: linkVerify,
      });
      console.log("👉 Đã gửi xong!");

      return {
        code: 201,
        message: "Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt.",
      };
    }
    return null;
  };

  // --- 2. XÁC THỰC EMAIL (VERIFY) ---
  static verifyEmail = async ({ token, email }) => {
    // A. Tìm user có email và token này
    const user = await User.findOne({ where: { email, verify_token: token } });

    if (!user)
      throw new BadRequestError("Token không hợp lệ hoặc không tìm thấy user!");

    // B. Check hết hạn
    if (user.verify_expire < Date.now()) {
      throw new BadRequestError("Token đã hết hạn! Vui lòng đăng ký lại.");
    }

    // C. Kích hoạt
    user.status = "active";
    user.verify_token = null;
    user.verify_expire = null;
    await user.save();

    return {
      code: 200,
      message: "Kích hoạt tài khoản thành công! Bạn có thể đăng nhập ngay.",
    };
  };

  // --- 3. ĐĂNG NHẬP (LOGIN) ---
  static login = async ({ email, password }) => {
    // A. Check User tồn tại
    const foundUser = await User.findOne({ where: { email } });
    if (!foundUser) throw new AuthFailureError("Email chưa được đăng ký!");

    // B. Check Trạng thái
    if (foundUser.status === "pending")
      throw new AuthFailureError(
        "Tài khoản chưa kích hoạt. Vui lòng check email!"
      );
    if (foundUser.status === "blocked")
      throw new ForbiddenError("Tài khoản đã bị khóa bởi Admin!");

    // C. Check Password
    const match = await foundUser.correctPassword(password);
    if (!match) throw new AuthFailureError("Mật khẩu không đúng!");

    // D. Tạo Token
    const { accessToken, refreshToken } = await createTokenPair(
      { userId: foundUser.id, email: foundUser.email, roles: foundUser.roles },
      process.env.JWT_ACCESS_SECRET,
      process.env.JWT_REFRESH_SECRET
    );

    // E. Lưu Refresh Token vào DB (KeyToken)
    // Dùng upsert: Nếu có rồi thì update, chưa có thì insert
    const [keyToken, created] = await KeyToken.upsert(
      {
        user_id: foundUser.id,
        refresh_token: refreshToken,
        refresh_tokens_used: [],
      },
      {
        where: { user_id: foundUser.id },
      }
    );

    return {
      user: {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        roles: foundUser.roles,
      },
      tokens: { accessToken, refreshToken },
    };
  };

  static forgotPassword = async ({ email }) => {
    // A. Check email
    const user = await User.findOne({ where: { email } });
    if (!user) throw new NotFoundError("Email không tồn tại trong hệ thống!");

    // B. Tạo Token reset (Ngẫu nhiên)
    const resetToken = crypto.randomBytes(32).toString("hex");
    const passwordResetExpires = Date.now() + 15 * 60 * 1000; // 15 phút

    // C. Lưu vào DB (Tái sử dụng cột verify_token)
    user.verify_token = resetToken;
    user.verify_expire = passwordResetExpires;
    await user.save();

    // D. Gửi Email (Frontend URL: /auth/reset-password)
    // Lưu ý: Port 3000 là của Frontend User
    const resetLink = `http://localhost:3000/auth/reset-password?token=${resetToken}&email=${email}`;

    await sendEmailTokenResetPassword({
      toEmail: email,
      linkVerify: resetLink,
    });

    return {
      message: "Vui lòng kiểm tra email để đặt lại mật khẩu!",
    };
  };

  // --- 5. ĐẶT LẠI MẬT KHẨU (Reset) ---
  static resetPassword = async ({ email, token, newPassword }) => {
    // A. Tìm User theo Email và Token
    const user = await User.findOne({
      where: { email, verify_token: token },
    });

    if (!user) throw new BadRequestError("Token không hợp lệ hoặc sai Email!");

    // B. Check hết hạn
    if (user.verify_expire < Date.now()) {
      throw new BadRequestError("Token đã hết hạn! Vui lòng thử lại.");
    }

    // C. Cập nhật mật khẩu mới (Hooks trong Model sẽ tự hash)
    user.password = newPassword;
    user.verify_token = null; // Xóa token đã dùng
    user.verify_expire = null;
    await user.save();

    return {
      message: "Đặt lại mật khẩu thành công! Bạn có thể đăng nhập ngay.",
    };
  };
}

export default AccessService;
