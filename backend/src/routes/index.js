import express from "express";
import { apiKey, permission } from "../auth/checkAuth.js";
import accessRouter from "./access/access.js";
// Sửa dòng này: Import từ router hub của admin
import adminHubRouter from "./admin/index.js";

import adminController from "../controllers/admin/admin.controller.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

// --- 1. CHECK API KEY (Bắt buộc cho mọi request) ---
router.use(apiKey);

// --- 2. ĐỊNH TUYẾN THEO PHÂN QUYỀN ---
// A. Nhóm Public/Access
router.use("/v1/api/access", permission("0000", "1111", "2222"), accessRouter);

// B. Nhóm Admin Login (Giữ lại để Admin đăng nhập lấy token)
router.post("/v1/api/admin/login", asyncHandler(adminController.login));

// C. Nhóm Admin Management (MỚI - Protected)
// Chỉ role '0000' mới được vào các route quản lý này
router.use("/v1/api/admin", permission("0000"), adminHubRouter);

export default router;
