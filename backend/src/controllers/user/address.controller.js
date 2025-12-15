import { Created, OK } from "../../core/success.response.js";
import AddressService from "../../services/user/address.service.js";


class AddressController {
  createAddress = async (req, res, next) => {
    new Created({
      message: "Thêm địa chỉ thành công",
      metadata: await AddressService.createAddress(req.user.userId, req.body),
    }).send(res);
  };

  getAllAddresses = async (req, res, next) => {
    new OK({
      message: "Lấy danh sách địa chỉ thành công",
      metadata: await AddressService.getAllAddresses(req.user.userId),
    }).send(res);
  };

  getAddressDetail = async (req, res, next) => {
    new OK({
      message: "Lấy chi tiết địa chỉ thành công",
      metadata: await AddressService.getAddressDetail(
        req.user.userId,
        req.params.id
      ),
    }).send(res);
  };

  updateAddress = async (req, res, next) => {
    new OK({
      message: "Cập nhật địa chỉ thành công",
      metadata: await AddressService.updateAddress(
        req.user.userId,
        req.params.id,
        req.body
      ),
    }).send(res);
  };

  deleteAddress = async (req, res, next) => {
    new OK({
      message: "Xóa địa chỉ thành công",
      metadata: await AddressService.deleteAddress(
        req.user.userId,
        req.params.id
      ),
    }).send(res);
  };
}

export default new AddressController();
