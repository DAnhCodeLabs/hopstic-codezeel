import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import "./dbs/init.mysql.js"; // Khởi động DB
import "./models/associations.js";
import apiRouter from "./routes/api.routes.js";

const app = express();

const whitelist = [
  "http://localhost:4000",
  "http://localhost:3000",
];

// --- 1. Init Middlewares ---
app.use(helmet());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- 2. Init Routes ---
app.use("/", apiRouter);

// --- 3. Error Handling (QUAN TRỌNG) ---

// 3.1. Xử lý lỗi 404 (Route không tồn tại)
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// 3.2. Xử lý lỗi tập trung (Global Error Handler)
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "dev" ? error.stack : undefined,
  });
});

export default app;
