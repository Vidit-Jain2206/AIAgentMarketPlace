export enum SubscriptionType {
  FREE = "free",
  PAID = "paid",
}

export type Category = {
  id: string;
  categoryName: string;
  categoryKey: string;
};

export type Link = {
  url: string;
  title: string;
};

export type Agent = {
  id: string;
  agentName: string;
  agentKey: string;
  logo: string;
  category: Category;
  tagline: string;
  shortDescription: string;
  affiliatedOrNot: boolean;
  agentLink: string;
  otherLinks: Link[];
  subscriptionType: SubscriptionType[];
  openSource: boolean;
  overview: string;
  otherInformation: {
    title: string;
    content: {
      subHeading: string;
      subDescription: string[];
    }[];
  }[];
  runningCommands: string[];
  installationCommands: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};
