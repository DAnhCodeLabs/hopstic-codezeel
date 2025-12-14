import express from "express";
import userAdminRoute from "./user.admin.route.js";
import shopAdminRoute from "./shop.admin.route.js";

const router = express.Router();

// Định tuyến cho phần quản lý User
router.use("/users", userAdminRoute);
// Route quản lý Shop (Đã kích hoạt)
router.use("/shops", shopAdminRoute);


export default router;
