import express from "express";
import { apiKey } from "../auth/checkAuth.js";

import accessHub from "./access/access.hub.js";
import userHub from "./user/user.hub.js";
import adminHub from "./admin/admin.hub.js";

const apiRouter = express.Router();

apiRouter.use(apiKey);

apiRouter.use("/v1/api/access", accessHub);
apiRouter.use("/v1/api/user", userHub);
apiRouter.use("/v1/api/admin", adminHub);

export default apiRouter;
