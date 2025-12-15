import express from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import addressController from "../../controllers/user/address.controller.js";

const userAddressRouter = express.Router();

userAddressRouter.post("/", asyncHandler(addressController.createAddress));
userAddressRouter.get("/", asyncHandler(addressController.getAllAddresses));
userAddressRouter.get("/:id", asyncHandler(addressController.getAddressDetail));
userAddressRouter.patch("/:id", asyncHandler(addressController.updateAddress));
userAddressRouter.delete("/:id", asyncHandler(addressController.deleteAddress));

export default userAddressRouter;
