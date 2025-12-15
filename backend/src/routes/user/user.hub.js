// src/routes/user/user.hub.js
import express from "express";
import { permission, PERMISSIONS } from "../../auth/checkAuth.js";
import { authentication } from "../../auth/authUtils.js";

import userRouter from "./user.route.js";
import userAddressRouter from "./userAddress.router.js";

const userHub = express.Router();

// Cho phép USER thường, SHOP owner và ADMIN truy cập user routes
userHub.use(permission(PERMISSIONS.USER, PERMISSIONS.SHOP));

userHub.use(authentication);

userHub.use("/", userRouter);
userHub.use("/address", userAddressRouter);

export default userHub;
