import express from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import adminShopController from "../../controllers/admin/shop.admin.controller.js";

const adminShopRouter = express.Router();

adminShopRouter.get("/", asyncHandler(adminShopController.getAllShops));
adminShopRouter.get("/:id", asyncHandler(adminShopController.getShopDetail));
adminShopRouter.patch(
  "/:id/status",
  asyncHandler(adminShopController.updateShopStatus)
);

export default adminShopRouter;
