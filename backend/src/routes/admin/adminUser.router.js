import express from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import adminUserController from "../../controllers/admin/user.admin.controller.js";

const adminUserRouter = express.Router();

adminUserRouter.get("/", asyncHandler(adminUserController.getAllUsers));
adminUserRouter.get("/:id", asyncHandler(adminUserController.getUserDetail));
adminUserRouter.patch(
  "/:id/status",
  asyncHandler(adminUserController.updateUserStatus)
);

export default adminUserRouter;
