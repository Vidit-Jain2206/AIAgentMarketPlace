"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Agent, Category } from "@repo/types";
import { fetchAllCategories } from "@/app/api/category";
import { getAgentsByCategory } from "@/app/api/agent";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiArrowLeft,
  FiArrowRight,
  FiGrid,
  FiSearch,
  FiFilter,
} from "react-icons/fi";
import { BsRobot } from "react-icons/bs";

const CategoryDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const categoryKey = params.categoryKey as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "free" | "paid">("all");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch category info and agents
        const [categoriesData, agentsData] = await Promise.all([
          fetchAllCategories(),
          getAgentsByCategory(categoryKey),
        ]);

        const foundCategory = categoriesData.find(
          (c: Category) => c.categoryKey === categoryKey
        );
        setCategory(foundCategory || null);
        setAgents(agentsData);
        setFilteredAgents(agentsData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    if (categoryKey) {
      fetchData();
    }
  }, [categoryKey]);

  // Filter agents based on search and filter type
  useEffect(() => {
    let result = agents;

    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter(
        (agent) =>
          agent.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          agent.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType !== "all") {
      result = result.filter((agent) => agent.subscriptionType === filterType);
    }

    setFilteredAgents(result);
  }, [searchQuery, filterType, agents]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
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
            Loading agents...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!loading && !category) {
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
            CATEGORY NOT FOUND
          </h2>
          <p className="text-gray-500 mb-6 font-rajdhani">
            The category you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/categories"
            className="px-6 py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 font-orbitron font-medium transition hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]"
          >
            BACK TO CATEGORIES
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-rajdhani">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, 50, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500 rounded-full blur-[150px]"
        />
      </div>

      <div className="fixed inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 z-10">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-space-mono"
        >
          <Link href="/" className="hover:text-cyan-400 transition">
            ~/home
          </Link>
          <span className="text-cyan-400">/</span>
          <Link href="/categories" className="hover:text-cyan-400 transition">
            categories
          </Link>
          <span className="text-cyan-400">/</span>
          <span className="text-cyan-400">{category?.categoryName}</span>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition font-space-mono text-sm mb-4"
              >
                <FiArrowLeft />
                Back to Categories
              </Link>
              <h1 className="text-4xl sm:text-5xl font-orbitron font-black tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
                  {category?.categoryName.toUpperCase()}
                </span>
              </h1>
              <p className="text-gray-400 font-rajdhani text-lg mt-2">
                {agents.length} {agents.length === 1 ? "agent" : "agents"}{" "}
                available in this category
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-cyan-400/10 border border-cyan-400/30">
                <FiGrid className="text-2xl text-cyan-400" />
              </div>
              <div>
                <p className="text-3xl font-orbitron font-bold text-white">
                  {agents.length}
                </p>
                <p className="text-gray-500 text-sm font-space-mono">AGENTS</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1 group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search agents..."
              className="w-full bg-black border border-gray-800 group-hover:border-cyan-400/50 pl-12 pr-4 py-3 text-white font-rajdhani placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType("all")}
              className={`px-4 py-3 font-space-mono text-sm transition ${
                filterType === "all"
                  ? "bg-cyan-400 text-black"
                  : "bg-black border border-gray-800 text-gray-500 hover:border-cyan-400/50 hover:text-cyan-400"
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setFilterType("free")}
              className={`px-4 py-3 font-space-mono text-sm transition ${
                filterType === "free"
                  ? "bg-lime-400 text-black"
                  : "bg-black border border-gray-800 text-gray-500 hover:border-lime-400/50 hover:text-lime-400"
              }`}
            >
              FREE
            </button>
            <button
              onClick={() => setFilterType("paid")}
              className={`px-4 py-3 font-space-mono text-sm transition ${
                filterType === "paid"
                  ? "bg-fuchsia-400 text-black"
                  : "bg-black border border-gray-800 text-gray-500 hover:border-fuchsia-400/50 hover:text-fuchsia-400"
              }`}
            >
              PAID
            </button>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 mb-6 text-gray-500 font-space-mono text-sm"
        >
          <FiFilter className="text-cyan-400" />
          <span>
            Showing {filteredAgents.length} of {agents.length} agents
          </span>
        </motion.div>

        {/* Agents Grid */}
        {filteredAgents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent, index) => (
              <motion.div
                key={agent.agentKey}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => router.push(`/agent/${agent.agentKey}`)}
                className="relative bg-black/60 backdrop-blur-xl border border-gray-800 p-6 cursor-pointer group hover:border-cyan-400/50 transition-all duration-500"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                }}
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gray-700 group-hover:border-cyan-400 transition-colors" />

                <div className="relative">
                  {/* Logo */}
                  <div className="w-14 h-14 bg-black border border-gray-800 group-hover:border-cyan-400/50 rounded-lg flex items-center justify-center mb-4 transition-colors">
                    <BsRobot className="text-2xl text-gray-600 group-hover:text-cyan-400 transition" />
                  </div>

                  {/* Agent Name */}
                  <h3 className="text-xl font-orbitron font-bold text-white group-hover:text-cyan-400 transition mb-2">
                    {agent.agentName}
                  </h3>

                  {/* Tagline */}
                  <p className="text-gray-500 text-sm font-rajdhani line-clamp-2 mb-4 h-10">
                    {agent.tagline}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className={`px-2 py-1 text-xs font-space-mono ${
                        agent.subscriptionType === "free"
                          ? "bg-lime-500/10 text-lime-400 border border-lime-500/30"
                          : "bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/30"
                      }`}
                    >
                      {agent.subscriptionType?.toUpperCase()}
                    </span>
                    {agent.openSource && (
                      <span className="px-2 py-1 bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/30 text-xs font-space-mono">
                        OSS
                      </span>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-gray-700 group-hover:text-cyan-400 transition font-space-mono text-xs">
                    <span>VIEW DETAILS</span>
                    <FiArrowRight className="group-hover:translate-x-2 transition" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <BsRobot className="text-5xl text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-orbitron text-gray-500 mb-2">
              NO AGENTS FOUND
            </h3>
            <p className="text-gray-600 font-rajdhani">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetailPage;

