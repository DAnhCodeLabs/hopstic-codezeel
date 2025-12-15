
import express from "express";
import accessRouter from "./access.routes.js";

const accessHub = express.Router();


accessHub.use("/", accessRouter);

export default accessHub;
