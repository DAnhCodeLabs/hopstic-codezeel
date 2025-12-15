import User from "./user.model.js";
import Shop from "./shop.model.js";
import Address from "./address.model.js";
import KeyToken from "./keytoken.model.js";

// --- 1. USER & SHOP (1-1) ---
// Một User sở hữu tối đa 1 Shop
User.hasOne(Shop, {
  foreignKey: "user_id",
  as: "shop", // Alias dùng khi query: User.findOne({ include: 'shop' })
  onDelete: "CASCADE", // Xóa User -> Xóa Shop
});

Shop.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// --- 2. USER & ADDRESS (1-N) ---
// Một User có nhiều Địa chỉ giao hàng
User.hasMany(Address, {
  foreignKey: "user_id",
  as: "addresses", // Alias số nhiều
  onDelete: "CASCADE",
});

Address.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// --- 3. USER & KEYTOKEN (1-1) ---
// Một User có 1 KeyStore lưu token đăng nhập (Đơn giản hóa)
User.hasOne(KeyToken, {
  foreignKey: "user_id",
  as: "keyToken",
  onDelete: "CASCADE",
});

KeyToken.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// Xuất các Model đã được liên kết để sử dụng ở nơi khác
export { User, Shop, Address, KeyToken };
