import express from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import accessController from "../../controllers/access/access.controller.js";

const accessRouter = express.Router();

accessRouter.post("/signup", asyncHandler(accessController.signUp));
accessRouter.post("/login", asyncHandler(accessController.login));
accessRouter.post("/verify", asyncHandler(accessController.verifyEmail));
accessRouter.post("/forgot-password", asyncHandler(accessController.forgotPassword));
accessRouter.post("/reset-password", asyncHandler(accessController.resetPassword));

export default accessRouter;
