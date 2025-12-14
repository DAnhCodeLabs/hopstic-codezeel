import ShopAdminService from "../../services/admin/shop.admin.service.js";
import { OK } from "../../core/success.response.js";

class ShopAdminController {
  // GET /v1/api/admin/shops
  getAllShops = async (req, res, next) => {
    new OK({
      message: "Lấy danh sách cửa hàng thành công",
      metadata: await ShopAdminService.getAllShops(req.query),
    }).send(res);
  };

  // GET /v1/api/admin/shops/:id
  getShopDetail = async (req, res, next) => {
    new OK({
      message: "Lấy thông tin cửa hàng thành công",
      metadata: await ShopAdminService.getShopDetail(req.params.id),
    }).send(res);
  };

  // PATCH /v1/api/admin/shops/:id/status
  updateShopStatus = async (req, res, next) => {
    new OK({
      message: "Cập nhật trạng thái cửa hàng thành công",
      metadata: await ShopAdminService.updateShopStatus({
        shopId: req.params.id,
        status: req.body.status,
      }),
    }).send(res);
  };
}

export default new ShopAdminController();
