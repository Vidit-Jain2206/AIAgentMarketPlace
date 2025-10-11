import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

export const submitAgent = async (agentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/agents/add`, agentData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to submit agent");
  }
};
