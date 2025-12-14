import jwt from "jsonwebtoken";
import { AuthFailureError, NotFoundError } from "../core/error.response.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
};

// 1. Hàm tạo cặp Token (Dùng khi Login/Signup)
const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    // Access Token
    const accessToken = await jwt.sign(payload, publicKey, {
      expiresIn: "2 days",
    });

    // Refresh Token
    const refreshToken = await jwt.sign(payload, privateKey, {
      expiresIn: "7 days",
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

// 2. Middleware xác thực User (Dùng để bảo vệ Routes)
const authentication = asyncHandler(async (req, res, next) => {
  /*
        1. Check userId missing?
        2. Check AccessToken missing?
        3. Verify Token
        4. Check User in DBS?
        5. OK => return next()
    */

  // 1. Lấy User ID
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new AuthFailureError("Invalid Request: Missing User ID");

  // 2. Lấy Token
  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken)
    throw new AuthFailureError("Invalid Request: Missing Token");

  try {
    // 3. Verify Token
   const decodeUser = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);

    // 4. Check khớp User
    if (userId !== decodeUser.userId.toString()) {
      throw new AuthFailureError("Invalid User ID");
    }

    req.user = decodeUser;
    return next();
  } catch (error) {
    throw new AuthFailureError("Invalid Token");
  }
});

const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roles) {
      throw new ForbiddenError("User roles not found");
    }

    // req.user.roles lấy từ JWT payload (được decode trong middleware authentication)
    const hasRole = req.user.roles.some((role) => allowedRoles.includes(role));

    if (!hasRole) {
      throw new ForbiddenError("Access denied: Insufficient user role");
    }
    return next();
  };
};

export { createTokenPair, authentication, checkRole };