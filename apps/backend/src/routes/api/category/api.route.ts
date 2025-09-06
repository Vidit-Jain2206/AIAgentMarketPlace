import express from "express";
import { addCategory } from "../../../controllers/category.controller.js";

export const CategoryRouter = express.Router();

CategoryRouter.post("/category", addCategory);
