import express from "express";
import accessController from "../../controllers/access/access.controller.js";
import asyncHandler from "../../middlewares/asyncHandler.js";

const router = express.Router();

// 1. Đăng ký (Public)
router.post("/signup", asyncHandler(accessController.signUp));

// 2. Xác thực Email (Public - User click từ mail)
router.get("/verify", asyncHandler(accessController.verifyEmail));

// 3. Đăng nhập (Public)
router.post("/login", asyncHandler(accessController.login));

export default router; 
