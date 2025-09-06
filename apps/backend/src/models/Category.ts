// models/Category.ts
import { model, Schema } from "mongoose";

export const CategorySchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
});
export const CategoryModel = model("Category", CategorySchema);
