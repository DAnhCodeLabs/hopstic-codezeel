import ApiKey from "../models/apikey.model.js";
import crypto from "crypto";
import sequelize from "../dbs/init.mysql.js"; // Import kết nối DB

// e72c3db4289a42530144f174c68347220a0ebc7f4cb5367eff7fba71c065509b
const seedApiKey = async () => {
  try {
    // --- BƯỚC QUAN TRỌNG VỪA THÊM ---
    // Lệnh này buộc Sequelize kiểm tra và tạo bảng nếu chưa có
    await sequelize.sync();
    console.log("✅ Database synced successfully!");
    // --------------------------------

    // Tạo 1 key ngẫu nhiên
    const key = crypto.randomBytes(32).toString("hex");

    await ApiKey.create({
      key: key,
      permissions: ["0000"], // Full quyền
    });

    console.log("✅ Generated API Key:", key);
    console.log('👉 Hãy copy Key này dán vào Header "x-api-key" của Postman');
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding API Key:", error);
    process.exit(1);
  }
};

seedApiKey();
