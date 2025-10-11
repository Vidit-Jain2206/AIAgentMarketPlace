import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/category/category`,
      categoryData
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create category"
    );
  }
};

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/category/category`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch categories"
    );
  }
};
