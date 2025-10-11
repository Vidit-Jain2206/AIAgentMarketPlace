import { Request, Response } from "express";
import { CategoryModel } from "../models/Category.js";
import { v4 as uuidv4 } from "uuid";

export const addCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName }: { categoryName: string } = req.body;
    if (!categoryName) {
      return res.status(400).json({ message: "ID and name are required" });
    }
    const categoryKey = categoryName.toLowerCase().replace(/\s+/g, "-");
    const categoryExists = await CategoryModel.findOne({ categoryKey });
    if (categoryExists) {
      return res.status(409).json({ message: "Category name already exists" });
    }
    const id = uuidv4();
    const newCategory = new CategoryModel({ id, categoryName, categoryKey });
    await newCategory.save();

    res.status(201).json({ message: "Category added successfully" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find();
    const sanitisedCategories = categories.map((cat) => ({
      categoryName: cat.categoryName,
      categoryKey: cat.categoryKey,
    }));
    res.status(200).json(sanitisedCategories);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
