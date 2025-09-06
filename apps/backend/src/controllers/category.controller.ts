import { Request, Response } from "express";
import { CategoryModel } from "../models/Category.js";

export const addCategory = async (req: Request, res: Response) => {
  // Logic to add a new category
  try {
    const { id, name }: { id: string; name: string } = req.body;
    if (!id || !name) {
      return res.status(400).json({ message: "ID and name are required" });
    }
    const nameExists = await CategoryModel.findOne({ name });
    if (nameExists) {
      return res.status(409).json({ message: "Category name already exists" });
    }
    const newCategory = new CategoryModel({ id, name });
    await newCategory.save();

    res.status(201).json({ message: "Category added successfully" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
