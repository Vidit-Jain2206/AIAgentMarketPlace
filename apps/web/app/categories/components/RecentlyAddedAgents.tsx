"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { Agent } from "@repo/types";
import { FiArrowRight, FiClock, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BsRobot, BsStars } from "react-icons/bs";
import { useRef } from "react";

interface RecentlyAddedAgentsProps {
  agents: Agent[];
}

const RecentlyAddedAgents = ({ agents }: RecentlyAddedAgentsProps) => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (agents.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="mb-16"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
          className="flex items-center gap-4"
        >
          <div className="p-2 bg-cyan-400/10 border border-cyan-400/30">
            <BsStars className="text-2xl text-cyan-400" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-white tracking-wide">
              RECENTLY <span className="text-cyan-400">ADDED</span>
            </h2>
            <p className="text-gray-500 font-space-mono text-xs flex items-center gap-2 mt-1">
              <FiClock className="text-cyan-400" />
              Latest agents across all categories
            </p>
          </div>
        </motion.div>

        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll("left")}
            className="p-3 bg-black border border-gray-800 hover:border-cyan-400 text-gray-500 hover:text-cyan-400 transition"
          >
            <FiChevronLeft className="text-xl" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll("right")}
            className="p-3 bg-black border border-gray-800 hover:border-cyan-400 text-gray-500 hover:text-cyan-400 transition"
          >
            <FiChevronRight className="text-xl" />
          </motion.button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {agents.map((agent, index) => (
            <motion.div
              key={agent.agentKey}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => router.push(`/agent/${agent.agentKey}`)}
              className="relative bg-black/60 backdrop-blur-xl border border-gray-800 p-4 sm:p-6 w-[85vw] sm:w-[calc((100vw-4rem)/2)] lg:w-[calc((100vw-8rem)/3)] max-w-[380px] cursor-pointer group hover:border-cyan-400/50 transition-all duration-500 flex-shrink-0"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              }}
            >
              {/* New Badge */}
              <div className="absolute top-3 right-3 px-2 py-1 bg-lime-400 text-black text-xs font-space-mono font-bold">
                NEW
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                {/* Logo */}
                <div className="w-12 h-12 bg-black border border-gray-800 group-hover:border-cyan-400/50 rounded-lg flex items-center justify-center mb-4 transition-colors">
                  <BsRobot className="text-xl text-gray-600 group-hover:text-cyan-400 transition" />
                </div>

                {/* Agent Name */}
                <h3 className="text-lg font-orbitron font-bold text-white group-hover:text-cyan-400 transition mb-2 truncate">
                  {agent.agentName}
                </h3>

                {/* Tagline */}
                <p className="text-gray-500 text-sm font-rajdhani line-clamp-2 mb-4 h-10">
                  {agent.tagline}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-gray-900 border border-gray-800 text-gray-500 text-xs font-space-mono">
                      {agent.category.categoryName}
                    </span>
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
                  <FiArrowRight className="text-gray-700 group-hover:text-cyan-400 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RecentlyAddedAgents;
