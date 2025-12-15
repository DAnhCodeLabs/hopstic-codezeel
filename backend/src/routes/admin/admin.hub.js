// src/routes/admin/admin.hub.js
import express from "express";
import { permission, PERMISSIONS } from "../../auth/checkAuth.js";
import asyncHandler from "../../middlewares/asyncHandler.js";
import adminController from "../../controllers/admin/admin.controller.js";

import adminUserRouter from "./adminUser.router.js";
import adminShopRouter from "./adminShop.router.js";

const adminHub = express.Router();

adminHub.post("/login", asyncHandler(adminController.login));

/* Chỉ ADMIN mới được vào các route quản trị */
adminHub.use(permission(PERMISSIONS.ADMIN));

adminHub.use("/users", adminUserRouter);
adminHub.use("/shops", adminShopRouter);

export default adminHub;
