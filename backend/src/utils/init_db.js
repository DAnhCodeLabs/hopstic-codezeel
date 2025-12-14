import sequelize from "../dbs/init.mysql.js";

// --- QUAN TRỌNG: Phải import tất cả Model vào đây thì Sequelize mới biết để tạo ---
import User from "../models/user.model.js";
import KeyToken from "../models/keytoken.model.js";
import ApiKey from "../models/apikey.model.js";
import Address from "../models/address.model.js";
import Shop from "../models/shop.model.js";
import "../models/associations.js";

const initDatabase = async () => {
  try {
    // authenticate: Kiểm tra kết nối
    await sequelize.authenticate();
    console.log("✅ Kết nối MySQL thành công!");

    // alter: true - Cập nhật bảng mà không mất dữ liệu cũ
    // Nếu có field mới → thêm vào
    // Nếu bảng cũ không thay đổi → giữ nguyên
    // Không xóa dữ liệu cũ
    await sequelize.sync({ alter: true });

    console.log(
      "✅ Đã đồng bộ toàn bộ Tables vào Database!"
    );
    process.exit(0);
  } catch (error) {
    console.error("❌ Lỗi khởi tạo Database:", error);
    process.exit(1);
  }
};

initDatabase();
