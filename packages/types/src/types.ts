export enum SubscriptionType {
  FREE = "free",
  PAID = "paid",
}

export type Category = {
  id: string;
  name: string;
};

export type Link = {
  url: string;
  title: string;
};

export type Agent = {
  id: string;
  agentName: string;
  logo: string;
  category: Category;
  tagline: string;
  shortDescription: string; // 150-200 characters
  affiliatedOrNot: boolean;
  agentLink: string; // Affiliate link or actual website link
  otherLinks: Link[];
  subscriptionType: SubscriptionType[]; // Free, Paid, Free+paid
  openSource: boolean;
  overview: string; // 400 characters
  otherInformation: {
    title: string;
    description: {
      subHeading: string;
      subDescription: string; // 100 characters
    }[];
  }[];
  runningCommands: string[];
  installationCommands: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean; // Indicates if the agent is currently active
};
