import express from "express";
import userAdminController from "../../controllers/admin/user.admin.controller.js";
import asyncHandler from "../../middlewares/asyncHandler.js";

const router = express.Router();

// 1. Lấy danh sách (Có lọc & phân trang)
router.get("/", asyncHandler(userAdminController.getAllUsers));

// 2. Xem chi tiết
router.get("/:id", asyncHandler(userAdminController.getUserDetail));

// 3. Khóa / Mở khóa (Dùng PATCH vì chỉ sửa 1 phần dữ liệu)
router.patch("/:id/status", asyncHandler(userAdminController.updateUserStatus));

export default router;
