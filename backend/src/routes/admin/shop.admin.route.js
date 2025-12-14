import express from "express";
import shopAdminController from "../../controllers/admin/shop.admin.controller.js";
import asyncHandler from "../../middlewares/asyncHandler.js";

const router = express.Router();

// 1. Lấy danh sách (Lọc, Tìm kiếm)
router.get("/", asyncHandler(shopAdminController.getAllShops));

// 2. Xem chi tiết
router.get("/:id", asyncHandler(shopAdminController.getShopDetail));

// 3. Duyệt / Khóa Shop
router.patch("/:id/status", asyncHandler(shopAdminController.updateShopStatus));

export default router;
