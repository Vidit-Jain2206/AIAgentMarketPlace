"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import type { Agent } from "@repo/types";
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiTrendingUp } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";

interface FeaturedAgentsProps {
  agents: Agent[];
}

const FeaturedAgents = ({ agents }: FeaturedAgentsProps) => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (agents.length === 0) return null;

  return (
    <section className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="p-3 bg-fuchsia-400/10 border border-fuchsia-400/30">
              <FiTrendingUp className="text-2xl text-fuchsia-400" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-white tracking-wide">
                TRENDING <span className="text-fuchsia-400">AGENTS</span>
              </h2>
              <p className="text-gray-500 font-space-mono text-xs mt-1">
                Most popular picks this week
              </p>
            </div>
          </motion.div>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll("left")}
              className="p-3 bg-black border border-gray-800 hover:border-fuchsia-400 text-gray-500 hover:text-fuchsia-400 transition"
            >
              <FiChevronLeft className="text-xl" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll("right")}
              className="p-3 bg-black border border-gray-800 hover:border-fuchsia-400 text-gray-500 hover:text-fuchsia-400 transition"
            >
              <FiChevronRight className="text-xl" />
            </motion.button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {agents.map((agent, index) => (
            <motion.div
              key={agent.agentKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => router.push(`/agent/${agent.agentKey}`)}
              className="relative bg-black/60 backdrop-blur-xl border border-gray-800 p-6 min-w-[320px] cursor-pointer group hover:border-fuchsia-400/50 transition-all duration-500 flex-shrink-0"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              }}
            >
              {/* Rank Badge */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-fuchsia-400 text-black font-orbitron font-bold text-sm flex items-center justify-center">
                #{index + 1}
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                {/* Logo */}
                <div className="w-14 h-14 bg-black border border-gray-800 group-hover:border-fuchsia-400/50 rounded-lg flex items-center justify-center mb-4 transition-colors">
                  <BsRobot className="text-2xl text-gray-600 group-hover:text-fuchsia-400 transition" />
                </div>

                {/* Agent Name */}
                <h3 className="text-xl font-orbitron font-bold text-white group-hover:text-fuchsia-400 transition mb-2">
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
                  <FiArrowRight className="text-gray-700 group-hover:text-fuchsia-400 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedAgents;

