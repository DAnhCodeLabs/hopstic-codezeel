// src/seed/apikeys.seed.js (đổi tên file cho chuyên nghiệp hơn)
import crypto from "crypto";
import ApiKey from "../models/apikey.model.js";
import sequelize from "../dbs/init.mysql.js";

const PERMISSIONS = {
  ADMIN: "ADMIN",
  SHOP: "SHOP",
  USER: "USER",
  PUBLIC: "PUBLIC",
};

const SEED_API_KEYS = [
  {
    name: "ADMIN_KEY",
    description:
      "Full quyền - Dùng cho Admin Panel, internal script, testing admin routes",
    permissions: [PERMISSIONS.ADMIN],
    enabled: true,
  },
  {
    name: "SHOP_KEY",
    description: "Quyền shop owner - Có quyền user + shop features",
    permissions: [PERMISSIONS.SHOP, PERMISSIONS.USER],
    enabled: true,
  },
];

const seedApiKeys = async () => {
  try {
    // Đồng bộ bảng (alter nếu có thay đổi cấu trúc, an toàn cho dev)
    await sequelize.sync({ alter: true });
    console.log("✅ Database synced successfully!\n");

    console.log("🌱 Bắt đầu seed ApiKeys...\n");

    let createdCount = 0;

    for (const item of SEED_API_KEYS) {
      if (!item.enabled) {
        console.log(`⏭️  Bỏ qua (disabled): ${item.name}`);
        continue;
      }

      const key = crypto.randomBytes(64).toString("hex"); // 64 bytes → 128 hex chars, cực an toàn

      // Upsert: Nếu key với permissions này đã tồn tại thì skip, không thì tạo mới
      const [apiKeyInstance, created] = await ApiKey.findOrCreate({
        where: { permissions: item.permissions }, // Unique theo permissions (có thể thêm name sau)
        defaults: {
          key: key,
          permissions: item.permissions,
          // Nếu model có thêm field (khuyến nghị thêm sau này)
          // name: item.name,
          // description: item.description,
          // status: true,
        },
      });

      if (created) {
        createdCount++;
        console.log(`✅ Đã tạo: ${item.name}`);
        console.log(`   Description: ${item.description}`);
        console.log(`   Permissions: ${JSON.stringify(item.permissions)}`);
        console.log(`   Key: ${key}`);
        console.log(
          `   → Copy key này dán vào .env (VITE_API_KEY) hoặc Postman header x-api-key\n`
        );
      } else {
        console.log(
          `⚠️  Đã tồn tại (bỏ qua): ${
            item.name
          } với permissions ${JSON.stringify(item.permissions)}\n`
        );
      }
    }

    console.log(`🎉 Seed hoàn tất! Đã tạo mới ${createdCount} ApiKey.`);
    console.log(
      `👉 Lưu ý: Không bao giờ commit key thật vào code. Production nên tạo key thủ công qua admin panel.`
    );
    process.exit(0);
  } catch (error) {
    console.error("❌ Lỗi khi seed ApiKeys:", error);
    process.exit(1);
  }
};

// Chạy seed
seedApiKeys();
