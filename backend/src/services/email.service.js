import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// 1. Cấu hình Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 2. Hàm gửi Email Kích hoạt
const sendEmailLinkVerify = async ({
  toEmail,
  subject = "Xác thực tài khoản",
  linkVerify,
  userName,
}) => {
  try {
    // Tạo giao diện HTML cho email
    const htmlContent = getHtmlTemplate(userName, linkVerify);

    const mailOptions = {
      from: `"My Shop" <${process.env.EMAIL_USER}>`, // Tên người gửi hiển thị
      to: toEmail,
      subject: subject,
      html: htmlContent, // Gửi nội dung HTML
    };

    // Gửi ngay
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent: ", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Lỗi gửi email:", error);
    return false;
  }
};

// 3. Template HTML (Nút bấm đẹp)
const getHtmlTemplate = (name, link) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #333; text-align: center;">Chào mừng ${name} đến với My Shop!</h2>
        <p style="font-size: 16px; color: #555;">Bạn vừa đăng ký tài khoản. Vui lòng bấm vào nút bên dưới để kích hoạt tài khoản của bạn (Link có hiệu lực trong 10 phút).</p>

        <div style="text-align: center; margin: 30px 0;">
            <a href="${link}" style="background-color: #4CAF50; color: white; padding: 14px 25px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; border-radius: 5px; font-weight: bold;">
                KÍCH HOẠT TÀI KHOẢN NGAY
            </a>
        </div>

        <p style="font-size: 14px; color: #999; text-align: center;">Nếu nút bấm không hoạt động, hãy copy đường dẫn sau vào trình duyệt:</p>
        <p style="font-size: 12px; color: #555; text-align: center; word-break: break-all;">${link}</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #aaa; text-align: center;">Đây là email tự động, vui lòng không trả lời.</p>
    </div>
    `;
};

export { sendEmailLinkVerify };
