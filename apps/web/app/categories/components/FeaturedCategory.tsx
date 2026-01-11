"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { Agent, Category } from "@repo/types";
import { FiTrendingUp, FiArrowRight, FiZap } from "react-icons/fi";
import { BsRobot, BsFire } from "react-icons/bs";

interface FeaturedCategoryProps {
  category: Category;
  agentCount: number;
  topAgents: Agent[];
}

const FeaturedCategory = ({
  category,
  agentCount,
  topAgents,
}: FeaturedCategoryProps) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-16"
    >
      {/* Section Label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-3 mb-6"
      >
        <BsFire className="text-2xl text-orange-500 animate-pulse" />
        <span className="text-orange-400 font-space-mono text-sm tracking-widest uppercase">
          Trending This Week
        </span>
      </motion.div>

      {/* Featured Card */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        onClick={() => router.push(`/categories/${category.categoryKey}`)}
        className="relative bg-black/60 backdrop-blur-xl border border-orange-500/30 p-6 sm:p-8 overflow-hidden group cursor-pointer hover:border-orange-400/60 transition-all duration-500"
        style={{
          clipPath:
            "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
        }}
      >
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-orange-400" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-400" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-400" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-orange-400" />

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Animated Fire Particles */}
        <div className="absolute top-4 right-4 flex gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 bg-orange-400 rounded-full blur-sm"
            />
          ))}
        </div>

        <div className="relative flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Content */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-orange-400/10 border border-orange-400/30">
                <FiTrendingUp className="text-3xl text-orange-400" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-white group-hover:text-orange-400 transition">
                  {category.categoryName.toUpperCase()}
                </h2>
                <p className="text-gray-500 font-space-mono text-sm">
                  Most explored this week
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <span className="px-4 py-2 bg-orange-500/10 border border-orange-400/30 text-orange-400 font-space-mono text-sm">
                {agentCount} AGENTS
              </span>
              <span className="px-4 py-2 bg-lime-500/10 border border-lime-400/30 text-lime-400 font-space-mono text-sm flex items-center gap-2">
                <FiZap className="text-lime-400" />
                +5 NEW
              </span>
            </div>

            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-orange-400 hover:text-white font-orbitron text-sm transition group/btn"
            >
              EXPLORE CATEGORY
              <FiArrowRight className="group-hover/btn:translate-x-2 transition" />
            </motion.button>
          </div>

          {/* Right - Top Agents Preview */}
          <div className="flex gap-4 flex-wrap lg:flex-nowrap">
            {topAgents.slice(0, 3).map((agent, index) => (
              <motion.div
                key={agent.agentKey}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-black/80 border border-gray-800 p-4 min-w-[140px] hover:border-orange-400/50 transition group/agent"
              >
                <div className="w-10 h-10 bg-gray-900 border border-gray-700 rounded-lg flex items-center justify-center mb-3 group-hover/agent:border-orange-400/50 transition">
                  <BsRobot className="text-gray-600 group-hover/agent:text-orange-400 transition" />
                </div>
                <p className="text-white font-rajdhani font-semibold text-sm truncate group-hover/agent:text-orange-400 transition">
                  {agent.agentName}
                </p>
                <p className="text-gray-600 text-xs font-space-mono truncate">
                  {agent.subscriptionType}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FeaturedCategory;

