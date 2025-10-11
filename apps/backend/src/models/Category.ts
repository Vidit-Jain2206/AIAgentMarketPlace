// models/Category.ts
import { model, Schema } from "mongoose";

export const CategorySchema = new Schema({
  id: { type: String, required: true },
  categoryName: { type: String, required: true, unique: true },
  categoryKey: { type: String, required: true, unique: true },
});
export const CategoryModel = model("Category", CategorySchema);
