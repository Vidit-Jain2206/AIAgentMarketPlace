import { Router } from "express";
import {
  getAgentByCategory,
  getAgentById,
  getAllAgents,
  getAgentsByTag,
  getAgentsBySubscriptionType,
  postAgent,
  getAgentByName,
} from "../../../controllers/agent.controller.js";

export const agentRoutes = Router();
agentRoutes.get("/category/:category", getAgentByCategory); // Assuming this is for getting agents by category
agentRoutes.get("/tag", getAgentsByTag); // Assuming this is for getting agents by tag
agentRoutes.get("/tag/:tag", getAgentsByTag); // Assuming this is for getting agents by tag with a specific tag parameter
agentRoutes.get("/category/:category", getAgentByCategory); // Assuming this is for getting agents by category
agentRoutes.get("/id/:id", getAgentById); // Assuming this is for getting an agent by ID
agentRoutes.get("/all", getAllAgents); // Assuming this is for getting all agents
agentRoutes.get("/", getAgentsBySubscriptionType); // Assuming this is for getting all agents
agentRoutes.post("/add", postAgent); // Assuming this is for adding a new agent
agentRoutes.get("/:agentKey", getAgentByName); // Assuming this is for adding a new agent
