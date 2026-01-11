"use client";
import { useEffect, useState } from "react";
import type { Agent, Category } from "@repo/types";
import { fetchAllCategories } from "@/app/api/category";
import { getAllAgents } from "@/app/api/agent";
import { motion } from "framer-motion";
import { BsRobot } from "react-icons/bs";

import {
  BackgroundEffects,
  HeroSection,
  CategoriesGrid,
  RecentlyAddedAgents,
} from "./components";

interface CategoryWithAgents extends Category {
  agents: Agent[];
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<CategoryWithAgents[]>([]);
  const [recentAgents, setRecentAgents] = useState<Agent[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<CategoryWithAgents[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch all categories and agents
        const [categoriesData, agentsData] = await Promise.all([
          fetchAllCategories(),
          getAllAgents(),
        ]);

        // Map agents to each category
        const categoriesWithAgents: CategoryWithAgents[] = categoriesData.map(
          (category: Category) => ({
            ...category,
            agents: agentsData.filter(
              (agent: Agent) => agent.category.categoryKey === category.categoryKey
            ),
          })
        );

        // Sort by agent count (most agents first)
        const sortedCategories = [...categoriesWithAgents].sort(
          (a, b) => b.agents.length - a.agents.length
        );

        setCategories(sortedCategories);
        setFilteredCategories(sortedCategories);

        // Set recent agents (sorted by createdAt, newest first)
        const sortedByDate = [...agentsData].sort(
          (a: Agent, b: Agent) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setRecentAgents(sortedByDate.slice(0, 8));

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredCategories(categories);
      return;
    }
    const filtered = categories.filter((category) =>
      category.categoryName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4 relative z-10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full shadow-[0_0_30px_rgba(0,255,255,0.5)]"
          />
          <p className="text-cyan-400 text-lg font-orbitron tracking-wider uppercase">
            Loading categories...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!loading && categories.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative z-10"
        >
          <BsRobot className="text-6xl text-cyan-400 mx-auto mb-4 drop-shadow-[0_0_20px_rgba(0,255,255,0.7)]" />
          <h2 className="text-2xl text-white font-orbitron font-bold mb-2 tracking-wider">
            NO CATEGORIES FOUND
          </h2>
          <p className="text-gray-500 font-rajdhani">
            Check back later for new categories.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-rajdhani">
      <BackgroundEffects />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 z-10">
        {/* Hero Section */}
        <HeroSection onSearch={handleSearch} />

        {/* Categories Grid */}
        <CategoriesGrid categories={filteredCategories} />

        {/* Recently Added Agents */}
        <RecentlyAddedAgents agents={recentAgents} />
      </div>
    </div>
  );
};

export default CategoriesPage;
