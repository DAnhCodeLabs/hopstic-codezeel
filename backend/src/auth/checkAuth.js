import { findById } from "../services/apikey.service.js";
import { ForbiddenError } from "../core/error.response.js";

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

// --- Check API Key (Giữ nguyên) ---
const apiKey = async (req, res, next) => {
  try {
    // Ưu tiên cho các route public như verify email
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
const permission = (...allowedPermissions) => {
  return (req, res, next) => {
    if (req.originalUrl.includes("/verify")) {
      return next();
    }

    if (!req.objKey.permissions) {
      return next(new ForbiddenError("Permission Denied"));
    }

    // Logic mới: Kiểm tra xem API Key của user có chứa ÍT NHẤT MỘT trong các quyền được phép không
    const validPermission = req.objKey.permissions.some((permission) =>
      allowedPermissions.includes(permission)
    );

    if (!validPermission) {
      return next(new ForbiddenError("Permission Denied"));
    }

    return next();
  };
};

export { apiKey, permission };
