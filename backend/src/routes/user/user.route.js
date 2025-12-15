import express from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import userController from "../../controllers/user/user.controller.js";

const userRouter = express.Router();

userRouter.patch(
  "/change-password",
  asyncHandler(userController.changePassword)
);

export default userRouter;
