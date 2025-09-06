import express from "express";
import { apiRoutes } from "./api/index.js";

export const v1Router = express.Router();
v1Router.use("/v1", apiRoutes);
