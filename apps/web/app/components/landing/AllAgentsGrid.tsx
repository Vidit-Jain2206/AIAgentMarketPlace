"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Agent } from "@repo/types";
import { FiExternalLink, FiArrowRight, FiGrid, FiFilter } from "react-icons/fi";
import { BsRobot, BsLightning } from "react-icons/bs";
import Link from "next/link";

interface AllAgentsGridProps {
  agents: Agent[];
}

const AllAgentsGrid = ({ agents }: AllAgentsGridProps) => {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "free" | "paid">("all");
  const [showAll, setShowAll] = useState(false);

  const filteredAgents = agents.filter((agent) => {
    if (filter === "all") return true;
    return agent.subscriptionType === filter;
  });

  const displayedAgents = showAll ? filteredAgents : filteredAgents.slice(0, 9);

  return (
    <section id="agents-section" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10"
        >
          <div className="mb-6 lg:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <FiGrid className="text-2xl text-lime-400" />
              <span className="font-space-mono text-lime-400 text-sm tracking-wider">
                COMPLETE DIRECTORY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-white tracking-wide">
              ALL <span className="text-lime-400">AI AGENTS</span>
            </h2>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-500" />
            {(["all", "free", "paid"] as const).map((type) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 font-orbitron text-sm font-bold tracking-wider transition-all ${
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
        </motion.div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedAgents.map((agent, index) => (
            <motion.div
              key={agent.agentKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
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
                    {agent.category.categoryName}
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

        {/* Show More Button */}
        {filteredAgents.length > 9 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            {!showAll ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-lime-400 text-black font-orbitron font-bold tracking-wider hover:shadow-[0_0_30px_rgba(163,230,53,0.5)] transition-all"
              >
                <BsLightning />
                LOAD MORE AGENTS ({filteredAgents.length - 9} remaining)
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAll(false)}
                className="inline-flex items-center gap-2 px-8 py-4 border border-gray-800 text-gray-500 font-orbitron font-bold tracking-wider hover:border-gray-600 transition-all"
              >
                SHOW LESS
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AllAgentsGrid;

