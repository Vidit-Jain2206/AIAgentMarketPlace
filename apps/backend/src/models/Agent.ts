// models/Agent.ts
import mongoose, { Schema, model } from "mongoose";
import { SubscriptionType } from "@repo/types";

const LinkSchema = new Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
});

const OtherInformationDescriptionSchema = new Schema({
  subHeading: { type: String, required: true },
  subDescription: { type: String, required: true },
});

const OtherInformationSchema = new Schema({
  title: { type: String, required: true },
  description: { type: [OtherInformationDescriptionSchema], required: true },
});

const AgentSchema = new Schema(
  {
    id: { type: String, required: true },
    agentName: { type: String, required: true },
    logo: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    tagline: { type: String, required: true },
    shortDescription: { type: String, required: true },
    affiliatedOrNot: { type: Boolean, required: true },
    agentLink: { type: String, required: true },
    otherLinks: { type: [LinkSchema], default: [] },
    subscriptionType: {
      type: [String],
      enum: Object.values(SubscriptionType),
      required: true,
    },
    openSource: { type: Boolean, required: true },
    overview: { type: String, required: true },
    otherInformation: { type: [OtherInformationSchema], default: [] },
    runningCommands: { type: [String], default: [] },
    installationCommands: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true, // automatically manages createdAt and updatedAt
  }
);

export const AgentModel = model("Agent", AgentSchema);
