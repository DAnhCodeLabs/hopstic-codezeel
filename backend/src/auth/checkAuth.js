// src/auth/checkAuth.js
import { findById } from "../services/apikey.service.js";
import { ForbiddenError } from "../core/error.response.js";

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const PERMISSIONS = {
  ADMIN: "ADMIN",
  SHOP: "SHOP",
  USER: "USER",
  PUBLIC: "PUBLIC",
};

// --- Check API Key (Giữ nguyên) ---
const apiKey = async (req, res, next) => {
  try {
    if (req.originalUrl.includes("/verify")) {
      return next();
    }

    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return next(new ForbiddenError("Forbidden Error: Missing API Key"));
    }

    const objKey = await findById(key);
    if (!objKey) {
      return next(new ForbiddenError("Forbidden Error: Invalid API Key"));
    }

    req.objKey = objKey;
    return next();
  } catch (error) {
    return next(error);
  }
};

// --- Check Quyền (Permissions) ---
// Giờ nhận vào các constant thay vì string số
const permission = (...allowedPermissions) => {
  return (req, res, next) => {
    if (req.originalUrl.includes("/verify")) {
      return next();
    }

    if (!req.objKey?.permissions || !Array.isArray(req.objKey.permissions)) {
      return next(new ForbiddenError("Permission Denied"));
    }

    const validPermission = req.objKey.permissions.some((perm) =>
      allowedPermissions.includes(perm)
    );

    if (!validPermission) {
      return next(new ForbiddenError("Permission Denied"));
    }

    return next();
  };
};

// Export cả constant để dùng ở router nếu cần
export { apiKey, permission, PERMISSIONS };
