import express from "express";
import {
  addCategory,
  getAllCategory,
} from "../../../controllers/category.controller.js";

export const CategoryRouter = express.Router();

CategoryRouter.post("/category", addCategory);
CategoryRouter.get("/category", getAllCategory);
