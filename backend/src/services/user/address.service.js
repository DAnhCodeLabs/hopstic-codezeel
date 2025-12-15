import { BadRequestError, NotFoundError } from "../../core/error.response.js";
import Address from "../../models/address.model.js";

class AddressService {
  // 1. Tạo địa chỉ mới
  static createAddress = async (userId, payload) => {
    // Logic: Nếu là địa chỉ đầu tiên -> Mặc định là true
    const count = await Address.count({ where: { user_id: userId } });
    if (count === 0) {
      payload.is_default = true;
    }

    // Logic: Nếu user set địa chỉ này là mặc định -> Bỏ mặc định các cái cũ
    if (payload.is_default) {
      await Address.update(
        { is_default: false },
        { where: { user_id: userId } }
      );
    }

    const newAddress = await Address.create({
      ...payload,
      user_id: userId,
    });

    return newAddress;
  };

  // 2. Lấy danh sách (Mặc định lên đầu)
  static getAllAddresses = async (userId) => {
    return await Address.findAll({
      where: { user_id: userId },
      order: [
        ["is_default", "DESC"], // True lên trước
        ["createdAt", "DESC"], // Mới nhất lên trước
      ],
    });
  };

  // 3. Lấy chi tiết
  static getAddressDetail = async (userId, addressId) => {
    const address = await Address.findOne({
      where: { id: addressId, user_id: userId },
    });
    if (!address) throw new NotFoundError("Không tìm thấy địa chỉ!");
    return address;
  };

  // 4. Cập nhật địa chỉ
  static updateAddress = async (userId, addressId, payload) => {
    const address = await Address.findOne({
      where: { id: addressId, user_id: userId },
    });
    if (!address) throw new NotFoundError("Không tìm thấy địa chỉ!");

    // Nếu muốn set làm mặc định
    if (payload.is_default) {
      // Reset tất cả cái khác thành false
      await Address.update(
        { is_default: false },
        { where: { user_id: userId } }
      );
    }

    return await address.update(payload);
  };

  // 5. Xóa địa chỉ
  static deleteAddress = async (userId, addressId) => {
    const address = await Address.findOne({
      where: { id: addressId, user_id: userId },
    });
    if (!address) throw new NotFoundError("Không tìm thấy địa chỉ!");

    // Logic: Không được xóa địa chỉ mặc định
    if (address.is_default) {
      throw new BadRequestError(
        "Không thể xóa địa chỉ mặc định. Vui lòng chọn địa chỉ khác làm mặc định trước!"
      );
    }

    await address.destroy();
    return { msg: "Xóa địa chỉ thành công!" };
  };
}

export default AddressService;
