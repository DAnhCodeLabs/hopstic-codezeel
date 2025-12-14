import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
// Khởi tạo kết nối Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false, // Tắt log query cho gọn
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Hàm kiểm tra kết nối
const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to MySQL successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to MySQL:", error);
  }
};

checkConnection();

export default sequelize;
