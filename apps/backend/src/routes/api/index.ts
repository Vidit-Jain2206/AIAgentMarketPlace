import { Router } from "express";
import { agentRoutes } from "./agents/api.route.js";
import { CategoryRouter } from "./category/api.route.js";
export const apiRoutes = Router();
apiRoutes.use("/agents", agentRoutes);
apiRoutes.use("/category", CategoryRouter);
