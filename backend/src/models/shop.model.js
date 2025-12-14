import { DataTypes } from "sequelize";
import sequelize from "../dbs/init.mysql.js";

const Shop = sequelize.define(
  "Shop",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // 1 User chỉ 1 Shop
    },
    // --- THÔNG TIN CƠ BẢN ---
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    thumb: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    cover_image: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    // --- TRẠNG THÁI HOẠT ĐỘNG ---
    status: {
      // pending: Chờ Admin duyệt
      // active: Đang hoạt động
      // inactive: Tạm nghỉ (Chủ shop tự tắt)
      // banned: Bị khóa (Do vi phạm)
      type: DataTypes.ENUM("pending", "active", "inactive", "banned"),
      defaultValue: "pending", // Mặc định chờ duyệt
    },

    // --- CHỈ SỐ UY TÍN ---
    rating_average: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    response_rate: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
    },
    follower_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    // --- ĐỊA CHỈ KHO (Lấy hàng) ---
    pickup_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pickup_province: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pickup_district: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pickup_ward: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Shops",
    timestamps: true,
  }
);

export default Shop;
