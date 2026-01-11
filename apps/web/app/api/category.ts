import axios from "axios";
const BASE_URL: string =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9999/api/v1";

export const fetchAllCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/category`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
