import sequelize from "../dbs/init.mysql.js";

// --- QUAN TRỌNG: Phải import tất cả Model vào đây thì Sequelize mới biết để tạo ---
import User from "../models/user.model.js";
import KeyToken from "../models/keytoken.model.js";
import ApiKey from "../models/apikey.model.js";

const initDatabase = async () => {
  try {
    // authenticate: Kiểm tra kết nối
    await sequelize.authenticate();
    console.log("✅ Kết nối MySQL thành công!");

    await sequelize.sync({ alter: true });

    console.log(
      "✅ Đã đồng bộ toàn bộ Tables (User, KeyToken, ApiKey) vào Database!"
    );
    process.exit();
  } catch (error) {
    console.error("❌ Lỗi khởi tạo Database:", error);
    process.exit(1);
  }
};

initDatabase();
