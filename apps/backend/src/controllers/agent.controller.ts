import type { Request, Response } from "express";
import { AgentModel } from "../models/Agent.js";
import { CategoryModel } from "../models/Category.js";
import { sanitizeObject } from "../utils/helper.js";

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
    const sanitisedAgents = agents.map((agent) =>
      sanitizeObject(agent.toObject())
    );
    return res.status(200).json(sanitisedAgents);
  } catch (error) {
    console.error("Error fetching agents:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getAgentByCategory = async (req: Request, res: Response) => {
  try {
    const categoryKey = req.params.category;
    if (!categoryKey || typeof categoryKey !== "string") {
      return res.status(400).json({ message: "Invalid category parameter" });
    }
    const category = await CategoryModel.find({ categoryKey: categoryKey });
    if (category.length === 0) {
      return res.status(400).json({ message: "Category does not exist" });
    }
    const agents = await AgentModel.find({
      category: category[0]?._id,
      isActive: true,
    }).populate("category");
    const sanitisedAgents = agents.map((agent) =>
      sanitizeObject(agent.toObject())
    );
    return res.status(200).json(sanitisedAgents);
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

export const postAgent = async (req: Request, res: Response) => {
  try {
    const {
      id,
      agentName,
      logo,
      category,
      tagline,
      shortDescription,
      affiliatedOrNot,
      agentLink,
      otherLinks,
      subscriptionType,
      openSource,
      overview,
      otherInformation,
      runningCommands,
      installationCommands,
      tags,
    }: {
      id: string;
      agentName: string;
      logo: string;
      category: string;
      tagline: string;
      shortDescription: string;
      affiliatedOrNot: boolean;
      agentLink: string;
      otherLinks: { url: string; title: string }[];
      subscriptionType: string[];
      openSource: boolean;
      overview: string;
      otherInformation: {
        title: string;
        content: { subHeading: string; subDescription: string[] }[];
      }[];
      runningCommands: string[];
      installationCommands: string[];
      tags: string[];
    } = req.body;

    // if (
    //   !id ||
    //   !agentName ||
    //   !logo ||
    //   !category ||
    //   !tagline ||
    //   !shortDescription ||
    //   affiliatedOrNot === undefined ||
    //   !agentLink ||
    //   !subscriptionType ||
    //   openSource === undefined ||
    //   !overview
    // ) {
    //   return res.status(400).json({ message: "Missing required fields" });
    // }
    const agentExists = await AgentModel.findOne({ agentName });
    if (agentExists) {
      return res.status(409).json({ message: "Agent name already exists" });
    }
    const categoryExists = await CategoryModel.findOne({
      categoryKey: category,
    });
    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category" });
    }
    const agentModel = new AgentModel({
      id,
      agentName,
      agentKey: `${agentName.toLowerCase().replace(/\s+/g, "-")}`,
      logo,
      category: categoryExists._id,
      tagline,
      shortDescription,
      affiliatedOrNot,
      agentLink,
      otherLinks: otherLinks || [],
      subscriptionType,
      openSource,
      overview,
      otherInformation: otherInformation || [],
      runningCommands: runningCommands || [],
      installationCommands: installationCommands || [],
      tags: tags || [],
    });
    await agentModel.save();
    return res.status(201).json({ message: "Agent created successfully" });
  } catch (error) {
    console.error("Error creating agent:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAgentByName = async (req: Request, res: Response) => {
  try {
    const agentKey = req.params.agentKey;
    if (!agentKey || typeof agentKey !== "string") {
      return res.status(400).json({ message: "Invalid agent name parameter" });
    }
    console.log("Agent Key:", agentKey);
    const agent = await AgentModel.findOne({ agentKey }).populate("category");
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    return res.status(200).json(sanitizeObject(agent.toObject()));
  } catch (error) {
    console.error("Error fetching agent by name:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
