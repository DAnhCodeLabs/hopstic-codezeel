import express from "express";
import { apiKey, permission } from "../auth/checkAuth.js";
import accessRouter from "./access/index.js";
import adminRouter from "./admin/index.js";
const router = express.Router();

// --- BƯỚC 1: CHECK API KEY (Bảo vệ toàn hệ thống) ---
router.use(apiKey);

// --- BƯỚC 2: CHECK PERMISSION (Optional) ---
router.use(permission("0000"));

// --- BƯỚC 3: ĐỊNH TUYẾN THEO CHỨC NĂNG ---
router.use("/v1/api/access", accessRouter);
router.use("/v1/api/admin", adminRouter);

export default router;
