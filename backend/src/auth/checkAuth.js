import { findById } from "../services/apikey.service.js";
import { ForbiddenError } from "../core/error.response.js";

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

// --- Check API Key ---
const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (req.originalUrl.includes("/verify")) {
      return next();
    }
    if (!key) {
      return next(new ForbiddenError("Forbidden Error: Missing API Key"));
    }

    // Check DB
    const objKey = await findById(key);
    if (!objKey) {
      return next(new ForbiddenError("Forbidden Error: Invalid API Key"));
    }

    req.objKey = objKey;
    return next();
  } catch (error) {
    // Chú ý: Ở đây không dùng next(error) mà trả lỗi luôn để chặn ngay lập tức
    return next(error);
  }
};

// --- Check Quyền (Permissions) của Key ---
const permission = (permission) => {
  return (req, res, next) => {
    if (req.originalUrl.includes("/verify")) {
      return next();
    }
    if (!req.objKey.permissions) {
      return next(new ForbiddenError("Permission Denied"));
    }

    const validPermission = req.objKey.permissions.includes(permission);
    if (!validPermission) {
      return next(new ForbiddenError("Permission Denied"));
    }

    return next();
  };
};

export { apiKey, permission };
