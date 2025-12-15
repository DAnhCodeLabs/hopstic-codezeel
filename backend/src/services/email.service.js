import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// 1. Cấu hình Transporter (Người vận chuyển)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// --- BASE FUNCTION: Hàm gửi mail cơ bản (Private) ---
const sendMailBase = async ({ to, subject, htmlContent }) => {
  try {
    const mailOptions = {
      from: `"My Shop Official" <${process.env.EMAIL_USER}>`, // Tên hiển thị chuyên nghiệp
      to: to,
      subject: subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`❌ Error sending email to ${to}:`, error);
    return false;
  }
};

// --- TEMPLATE GENERATOR: Tạo giao diện HTML đẹp ---
const getHtmlTemplate = ({ title, name, mainContent, buttonLabel, link }) => {
  // Màu chủ đạo (Cam Shopee)
  const BRAND_COLOR = "#ee4d2d";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 20px; margin-bottom: 20px; }
        .header { background-color: ${BRAND_COLOR}; padding: 20px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 1px; }
        .content { padding: 30px 25px; color: #333333; line-height: 1.6; }
        .greeting { font-size: 18px; font-weight: bold; margin-bottom: 15px; color: #333; }
        .btn-container { text-align: center; margin: 30px 0; }
        .btn { background-color: ${BRAND_COLOR}; color: #ffffff !important; padding: 14px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px; display: inline-block; transition: background-color 0.3s; }
        .btn:hover { background-color: #d73211; }
        .footer { background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #eeeeee; }
        .link-text { font-size: 12px; color: #999; word-break: break-all; margin-top: 10px; }
        a { color: ${BRAND_COLOR}; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>MY SHOP</h1>
        </div>

        <div class="content">
          <div class="greeting">Xin chào ${name || "Quý khách"},</div>
          <p>${mainContent}</p>

          <div class="btn-container">
            <a href="${link}" class="btn" target="_blank">${buttonLabel}</a>
          </div>

          <p style="font-size: 14px; color: #666;">
            Nếu nút bấm không hoạt động, vui lòng sao chép đường dẫn sau vào trình duyệt:
          </p>
          <div class="link-text">${link}</div>

          <hr style="border: 0; border-top: 1px solid #eee; margin: 25px 0;">
          <p style="font-size: 13px; color: #666; font-style: italic;">
            Lưu ý: Link xác thực này chỉ có hiệu lực trong thời gian giới hạn vì lý do bảo mật.
          </p>
        </div>

        <div class="footer">
          <p>Đây là email tự động, vui lòng không trả lời email này.</p>
          <p>&copy; ${new Date().getFullYear()} My Shop E-commerce. All rights reserved.</p>
          <p>Địa chỉ: TP. Hồ Chí Minh, Việt Nam</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// --- MAIN SERVICES ---

/**
 * 2. Gửi Email Kích hoạt tài khoản (Verify Email)
 */
const sendEmailLinkVerify = async ({ toEmail, userName, linkVerify }) => {
  const htmlContent = getHtmlTemplate({
    title: "Xác thực tài khoản",
    name: userName,
    mainContent: `Cảm ơn bạn đã đăng ký tài khoản tại <b>My Shop</b>. Để bắt đầu trải nghiệm mua sắm tuyệt vời, vui lòng xác thực địa chỉ email của bạn bằng cách bấm vào nút bên dưới.`,
    buttonLabel: "KÍCH HOẠT TÀI KHOẢN",
    link: linkVerify,
  });

  return await sendMailBase({
    to: toEmail,
    subject: "✨ Xác thực tài khoản My Shop của bạn",
    htmlContent: htmlContent,
  });
};

/**
 * 3. Gửi Email Quên mật khẩu (Reset Password)
 */
const sendEmailTokenResetPassword = async ({ toEmail, linkVerify }) => {
  const htmlContent = getHtmlTemplate({
    title: "Đặt lại mật khẩu",
    name: "bạn", // Vì quên pass đôi khi không lấy được tên ngay, gọi chung là bạn
    mainContent: `Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản liên kết với email <b>${toEmail}</b>.<br>Nếu bạn thực hiện yêu cầu này, hãy bấm nút bên dưới để tạo mật khẩu mới.`,
    buttonLabel: "ĐẶT LẠI MẬT KHẨU",
    link: linkVerify,
  });

  return await sendMailBase({
    to: toEmail,
    subject: "🔒 Yêu cầu đặt lại mật khẩu - My Shop",
    htmlContent: htmlContent,
  });
};

export { sendEmailLinkVerify, sendEmailTokenResetPassword };
