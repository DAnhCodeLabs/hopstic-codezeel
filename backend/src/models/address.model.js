import { DataTypes } from "sequelize";
import sequelize from "../dbs/init.mysql.js";

const Address = sequelize.define(
  "Address",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Tên người nhận (có thể khác tên chủ tài khoản)
    contact_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // SĐT người nhận
    contact_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Địa chỉ chi tiết (Số nhà, đường...)
    address_detail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Đơn vị hành chính (Phục vụ tính phí ship sau này)
    province: {
      type: DataTypes.STRING, // Tỉnh/Thành phố
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING, // Quận/Huyện
      allowNull: false,
    },
    ward: {
      type: DataTypes.STRING, // Phường/Xã
      allowNull: false,
    },
    // Đánh dấu địa chỉ mặc định
    is_default: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // Loại địa chỉ: 'home' (Nhà riêng), 'office' (Văn phòng)
    type: {
      type: DataTypes.ENUM("home", "office"),
      defaultValue: "home",
    },
  },
  {
    tableName: "Addresses",
    timestamps: true,
  }
);

export default Address;
