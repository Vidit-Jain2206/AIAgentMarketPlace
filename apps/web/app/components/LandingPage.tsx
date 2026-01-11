"use client";
import React, { useEffect, useState } from "react";
import type { Agent, Category } from "@repo/types";
import { getAllAgents } from "../api/agent";
import { fetchAllCategories } from "../api/category";
import {
  BackgroundEffects,
  HeroSection,
  FeaturedAgents,
  CategoriesShowcase,
  AllAgentsGrid,
  WhyAIAgents,
  NewsletterCTA,
} from "./landing";

interface CategoryWithCount extends Category {
  agentCount: number;
}

const LandingPage = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agentsData, categoriesData] = await Promise.all([
          getAllAgents(),
          fetchAllCategories(),
        ]);

        setAgents(agentsData || []);

        // Process categories with agent counts
        const categoriesWithCounts = (categoriesData || []).map((cat: Category) => ({
          ...cat,
          agentCount: (agentsData || []).filter(
            (agent: Agent) => agent.category?.categoryKey === cat.categoryKey
          ).length,
        }));

        setCategories(categoriesWithCounts);
      } catch (error) {
        console.error("Error fetching landing page data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get featured/trending agents (first 8 for carousel)
  const featuredAgents = agents.slice(0, 8);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-fuchsia-400/20 border-b-fuchsia-400 rounded-full animate-spin animate-reverse" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* Background Effects */}
      <BackgroundEffects />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <HeroSection
          totalAgents={agents.length}
          totalCategories={categories.length}
        />

        {/* Featured Agents Carousel */}
        <FeaturedAgents agents={featuredAgents} />

        {/* Categories Showcase */}
        <CategoriesShowcase categories={categories} />

        {/* All Agents Grid */}
        <AllAgentsGrid agents={agents} />

        {/* Why AI Agents */}
        <WhyAIAgents />

        {/* Newsletter CTA */}
        <NewsletterCTA />
      </div>
    </div>
  );
};

export default LandingPage;
