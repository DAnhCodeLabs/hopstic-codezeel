import User from "./user.model.js";
import Shop from "./shop.model.js";
import Address from "./address.model.js";

// --- 1. USER & SHOP (1-1) ---
// Một User chỉ có thể mở 1 Shop
User.hasOne(Shop, {
  foreignKey: "user_id",
  as: "shop", // Alias: Khi query User, dùng tên 'shop' để lấy data Shop
});

Shop.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// --- 2. USER & ADDRESS (1-N) ---
// Một User có nhiều Địa chỉ
User.hasMany(Address, {
  foreignKey: "user_id",
  as: "addresses", // Alias: Khi query User, dùng tên 'addresses' (số nhiều)
});

Address.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// Xuất các Model đã được liên kết
export { User, Shop, Address };
