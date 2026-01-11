import axios from "axios";
const BASE_URL: string =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9999/api/v1";

export const getAgentDetails = async (agentName: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/agents/${agentName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching agent details:", error);
    return null;
  }
};

export const getAllAgents = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/agents/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching agents:", error);
    return [];
  }
};

export const getAgentsByCategory = async (category: string) => {
  try {
    if (category === "") {
      const response = await getAllAgents();
      return response;
    }
    const response = await axios.get(`${BASE_URL}/agents/category/${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching agents by category:", error);
    return [];
  }
};
