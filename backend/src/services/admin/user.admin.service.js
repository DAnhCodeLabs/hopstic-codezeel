import { Op } from "sequelize";
import User from "../../models/user.model.js";
import Shop from "../../models/shop.model.js";
import Address from "../../models/address.model.js";
import { BadRequestError, NotFoundError } from "../../core/error.response.js";

class UserAdminService {
  /**
   * 1. Lấy danh sách User (Có Filter, Sort, Pagination)
   */
  static getAllUsers = async ({
    page = 1,
    limit = 10,
    search = "",
    status = "all", // all, active, blocked, pending
    role = "all", // all, seller, user
    sort = "ctime_desc",
  }) => {
    const offset = (page - 1) * limit;

    // A. Xây dựng điều kiện lọc
    const whereCondition = {};

    // 1. Tìm theo tên hoặc email
    if (search) {
      whereCondition[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }

    // 2. Lọc theo trạng thái
    if (status !== "all") {
      whereCondition.status = status;
    }

    // B. Xử lý logic lọc Seller/User (Có Shop hay không)
    const includeOption = [];
    if (role === "seller") {
      includeOption.push({ model: Shop, as: "shop", required: true }); // Bắt buộc phải có Shop
    } else if (role === "user") {
      includeOption.push({ model: Shop, as: "shop", required: false });
    } else {
      includeOption.push({ model: Shop, as: "shop" });
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
      case "name_desc":
        orderCondition = [["name", "DESC"]];
        break;
    }

    // D. Thực thi Query
    const { count, rows } = await User.findAndCountAll({
      where: whereCondition,
      include: includeOption,
      limit: +limit,
      offset: offset,
      order: orderCondition,
      attributes: { exclude: ["password"] }, // Ẩn mật khẩu
      distinct: true,
    });

    return {
      total: count,
      page: +page,
      totalPages: Math.ceil(count / limit),
      users: rows,
    };
  };

  /**
   * 2. Khóa / Mở khóa User
   */
  static updateUserStatus = async ({ userId, status }) => {
    const user = await User.findByPk(userId);
    if (!user) throw new NotFoundError("Người dùng không tồn tại!");

    // Validate trạng thái
    const validStatus = ["active", "blocked", "pending"];
    if (!validStatus.includes(status)) {
      throw new BadRequestError("Trạng thái không hợp lệ!");
    }

    user.status = status;
    await user.save();

    return {
      id: user.id,
      name: user.name,
      status: user.status,
      msg: `Đã cập nhật trạng thái người dùng thành: ${status}`,
    };
  };

  /**
   * 3. Xem chi tiết User
   */
  static getUserDetail = async (userId) => {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
      include: [
        { model: Shop, as: "shop" },
        { model: Address, as: "addresses" },
      ],
    });

    if (!user) throw new NotFoundError("Người dùng không tồn tại!");
    return user;
  };
}

export default UserAdminService;
