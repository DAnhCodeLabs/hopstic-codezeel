import { Op } from "sequelize";
import Shop from "../../models/shop.model.js";
import User from "../../models/user.model.js";
import { BadRequestError, NotFoundError } from "../../core/error.response.js";

class ShopAdminService {
  /**
   * 1. Lấy danh sách Shop (Có Filter, Sort, Pagination)
   */
  static getAllShops = async ({
    page = 1,
    limit = 10,
    search = "",
    status = "all", // all, pending (chờ duyệt), active, banned
    sort = "ctime_desc",
  }) => {
    const offset = (page - 1) * limit;
    const whereCondition = {};

    // A. Tìm kiếm theo tên Shop
    if (search) {
      whereCondition.name = { [Op.like]: `%${search}%` };
    }

    // B. Lọc theo trạng thái
    if (status !== "all") {
      whereCondition.status = status;
    }

    // C. Sắp xếp
    let orderCondition = [["createdAt", "DESC"]];
    switch (sort) {
      case "ctime_asc":
        orderCondition = [["createdAt", "ASC"]];
        break;
      case "name_asc":
        orderCondition = [["name", "ASC"]];
        break;
      case "rating_desc":
        orderCondition = [["rating_average", "DESC"]];
        break;
    }

    // D. Truy vấn
    const { count, rows } = await Shop.findAndCountAll({
      where: whereCondition,
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email", "phone"], // Lấy thông tin chủ shop
        },
      ],
      limit: +limit,
      offset: offset,
      order: orderCondition,
    });

    return {
      total: count,
      page: +page,
      totalPages: Math.ceil(count / limit),
      shops: rows,
    };
  };

  /**
   * 2. Duyệt Shop hoặc Khóa Shop (Thay đổi trạng thái)
   */
  static updateShopStatus = async ({ shopId, status }) => {
    // Check shop tồn tại
    const shop = await Shop.findByPk(shopId);
    if (!shop) throw new NotFoundError("Cửa hàng không tồn tại!");

    // Validate trạng thái hợp lệ
    const validStatus = ["pending", "active", "inactive", "banned"];
    if (!validStatus.includes(status)) {
      throw new BadRequestError("Trạng thái không hợp lệ!");
    }

    // Cập nhật
    shop.status = status;
    await shop.save();

    return {
      id: shop.id,
      name: shop.name,
      status: shop.status,
      msg: `Đã cập nhật trạng thái cửa hàng thành: ${status}`,
    };
  };

  /**
   * 3. Xem chi tiết Shop
   */
  static getShopDetail = async (shopId) => {
    const shop = await Shop.findByPk(shopId, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email", "phone", "avatar"],
        },
      ],
    });

    if (!shop) throw new NotFoundError("Cửa hàng không tìm thấy!");
    return shop;
  };
}

export default ShopAdminService;
