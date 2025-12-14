import express from "express";
import adminController from "../../controllers/admin/admin.controller.js";
import asyncHandler from "../../middlewares/asyncHandler.js";

const router = express.Router();

// POST /v1/api/admin/login
router.post("/login", asyncHandler(adminController.login));

export default router; 
