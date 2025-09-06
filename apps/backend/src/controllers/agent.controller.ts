import type { Request, Response } from "express";
import { AgentModel } from "../models/Agent.js";
import { CategoryModel } from "../models/Category.js";

export const getAgentById = async (req: Request, res: Response) => {
  try {
    const agentId = req.params.id;
    const agent = await AgentModel.findOne({ id: agentId }).populate(
      "category"
    );
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    return res.status(200).json(agent);
  } catch (error) {
    console.error("Error fetching agent:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllAgents = async (req: Request, res: Response) => {
  try {
    const { category, tag, subscriptionType } = req.query;
    let filter: any = { isActive: true };
    if (category || tag || subscriptionType) {
      if (category) {
        const categoryDoc = await CategoryModel.find({ name: category });
        if (categoryDoc.length > 0) {
          filter.category = categoryDoc[0]?._id;
        } else {
          return res.status(404).json({ message: "Category not found" });
        }
      }
      if (tag) {
        filter.tags = { $in: [tag] };
      }
      if (subscriptionType) {
        filter.subscriptionType = { $in: [subscriptionType] };
      }
    }
    // Fetch agents based on the constructed filter
    // and populate their category information
    const agents = await AgentModel.find(filter).populate("category");
    return res.status(200).json(agents);
  } catch (error) {
    console.error("Error fetching agents:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getAgentByCategory = async (req: Request, res: Response) => {
  try {
    const categoryName = req.params.category;
    if (!categoryName || typeof categoryName !== "string") {
      return res.status(400).json({ message: "Invalid category parameter" });
    }
    const category = await CategoryModel.find({ name: categoryName });
    const agents = await AgentModel.find({
      category: { id: category[0]?.id },
      isActive: true,
    }).populate("category");
    if (agents.length === 0) {
      return res
        .status(404)
        .json({ message: "No agents found in this category" });
    }
    return res.status(200).json(agents);
  } catch (error) {
    console.error("Error fetching agents by category:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getAgentsByTag = async (req: Request, res: Response) => {
  try {
    const tag = req.query.tag;
    const agents = await AgentModel.find({ tags: tag }, { isActive: true });
    if (agents.length === 0) {
      return res.status(404).json({ message: "No agents found with this tag" });
    }
    return res.status(200).json(agents);
  } catch (error) {
    console.error("Error fetching agents by tag:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getAgentsBySubscriptionType = async (
  req: Request,
  res: Response
) => {
  try {
    const subscriptionType = req.query.subscriptionType;
    const agents = await AgentModel.find({
      subscriptionType: { $in: [subscriptionType] },
      isActive: true,
    }).populate("category");
    if (agents.length === 0) {
      return res
        .status(404)
        .json({ message: "No agents found with this subscription type" });
    }
    return res.status(200).json(agents);
  } catch (error) {
    console.error("Error fetching agents by subscription type:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getActiveAgents = async (req: Request, res: Response) => {
  try {
    const agents = await AgentModel.find({ isActive: true });
    return res.status(200).json(agents);
  } catch (error) {
    console.error("Error fetching active agents:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAgentsSearch = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.q as string;
    if (!searchQuery) {
      return res.status(400).json({ message: "Search query is required" });
    }
    const agents = await AgentModel.find({
      agentName: { $regex: searchQuery, $options: "i" },
      isActive: true,
    }).populate("category");
    return res.status(200).json(agents);
  } catch (error) {
    console.error("Error searching agents:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
