"use client";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import type { Agent } from "@repo/types";
import { getAllAgents } from "../api/agent";
import { FiSearch, FiFilter, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { BsRobot, BsLightning } from "react-icons/bs";
import Link from "next/link";

// Background Effects Component
const BackgroundEffects = () => (
  <>
    <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -30, 0], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500 rounded-full blur-[200px]"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 30, 0], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-fuchsia-500 rounded-full blur-[200px]"
      />
    </div>
    <div className="fixed inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]" />
  </>
);

// Main content component that uses useSearchParams
const AgentsContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [filter, setFilter] = useState<"all" | "free" | "paid">("all");

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const data = await getAllAgents();
        setAgents(data || []);
      } catch (error) {
        console.error("Error fetching agents:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAgents();
  }, []);

  // Filter agents based on search and subscription type
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      !searchQuery ||
      agent.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.category?.categoryName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter =
      filter === "all" || agent.subscriptionType === filter;
    
    return matchesSearch && matchesFilter;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search query
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    router.push(`/agents${params.toString() ? `?${params.toString()}` : ""}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-cyan-400 font-space-mono text-sm transition-colors"
          >
            <FiArrowLeft />
            BACK TO HOME
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-lime-400/10 border border-lime-400/30">
              <BsLightning className="text-2xl text-lime-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-orbitron font-bold text-white tracking-wide">
                ALL <span className="text-lime-400">AI AGENTS</span>
              </h1>
              <p className="text-gray-500 font-space-mono text-xs mt-1">
                {filteredAgents.length} agents found
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded blur opacity-20 group-hover:opacity-40 transition" />
                <div className="relative flex items-center bg-black border border-gray-800 group-hover:border-cyan-400/50 transition-colors">
                  <FiSearch className="text-gray-500 text-xl ml-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search agents by name, description, or category..."
                    className="flex-1 bg-transparent px-4 py-4 text-white font-rajdhani placeholder-gray-600 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-6 py-4 bg-cyan-400/10 text-cyan-400 font-orbitron font-bold text-sm hover:bg-cyan-400 hover:text-black transition-all"
                  >
                    SEARCH
                  </button>
                </div>
              </div>
            </form>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <FiFilter className="text-gray-500" />
              {(["all", "free", "paid"] as const).map((type) => (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-3 font-orbitron text-sm font-bold tracking-wider transition-all ${
                    filter === type
                      ? type === "free"
                        ? "bg-lime-400 text-black"
                        : type === "paid"
                        ? "bg-fuchsia-400 text-black"
                        : "bg-cyan-400 text-black"
                      : "bg-black border border-gray-800 text-gray-500 hover:border-gray-600"
                  }`}
                >
                  {type.toUpperCase()}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results */}
        {filteredAgents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <BsRobot className="text-6xl text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-orbitron text-gray-500 mb-2">NO AGENTS FOUND</h3>
            <p className="text-gray-600 font-rajdhani">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent, index) => (
              <motion.div
                key={agent.agentKey}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => router.push(`/agent/${agent.agentKey}`)}
                className="relative bg-black/60 backdrop-blur-xl border border-gray-800 hover:border-cyan-400/50 p-6 cursor-pointer group transition-all duration-500"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                }}
              >
                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-3 h-3 bg-cyan-400/50 group-hover:bg-cyan-400 transition" />

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-lime-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-black border border-gray-800 group-hover:border-cyan-400/50 rounded-lg flex items-center justify-center transition-colors">
                      <BsRobot className="text-xl text-gray-600 group-hover:text-cyan-400 transition" />
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-space-mono ${
                        agent.subscriptionType === "free"
                          ? "bg-lime-500/10 text-lime-400 border border-lime-500/30"
                          : "bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/30"
                      }`}
                    >
                      {agent.subscriptionType?.toUpperCase()}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-orbitron font-bold text-white group-hover:text-cyan-400 transition mb-2">
                    {agent.agentName}
                  </h3>
                  <p className="text-gray-500 text-sm font-rajdhani line-clamp-2 mb-4 h-10">
                    {agent.tagline}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
                    <span className="px-2 py-1 bg-gray-900/50 text-gray-500 text-xs font-space-mono">
                      {agent.category?.categoryName}
                    </span>
                    <div className="flex items-center gap-2 text-gray-600 group-hover:text-cyan-400 transition">
                      <span className="text-xs font-space-mono">VIEW</span>
                      <FiArrowRight className="group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Main page component with Suspense wrapper
const AgentsPage = () => {
  return (
    <div className="relative min-h-screen bg-black">
      <BackgroundEffects />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
        </div>
      }>
        <AgentsContent />
      </Suspense>
    </div>
  );
};

export default AgentsPage;

