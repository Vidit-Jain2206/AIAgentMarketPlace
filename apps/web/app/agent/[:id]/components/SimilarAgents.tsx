"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Agent } from "@repo/types";
import { BsRobot } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";

interface SimilarAgentsProps {
  agents: Agent[];
}

const SimilarAgents = ({ agents }: SimilarAgentsProps) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      className="mt-16"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-1 h-10 bg-gradient-to-b from-cyan-400 to-fuchsia-400" />
          <h2 className="text-3xl font-orbitron font-bold text-white tracking-wide">
            SIMILAR{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
              AGENTS
            </span>
          </h2>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 text-cyan-400 hover:text-white transition font-space-mono text-sm group"
        >
          View All
          <FiArrowRight className="group-hover:translate-x-1 transition" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.agentKey}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 + index * 0.1 }}
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
              <div className="w-12 h-12 bg-black border border-gray-800 group-hover:border-cyan-400/50 rounded-lg flex items-center justify-center mb-4 transition-colors">
                <BsRobot className="text-xl text-gray-600 group-hover:text-cyan-400 transition" />
              </div>

              {/* Agent Name */}
              <h3 className="text-lg font-orbitron font-bold text-white group-hover:text-cyan-400 transition mb-2">
                {agent.agentName}
              </h3>

              {/* Tagline */}
              <p className="text-gray-500 text-sm font-rajdhani line-clamp-2 mb-4">
                {agent.tagline}
              </p>

              {/* Tags */}
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 text-xs font-space-mono ${
                    agent.subscriptionType === "free"
                      ? "bg-lime-500/10 text-lime-400 border border-lime-500/30"
                      : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                  }`}
                >
                  {agent.subscriptionType?.toUpperCase()}
                </span>
              </div>

              {/* Arrow Indicator */}
              <div className="absolute bottom-0 right-0 text-gray-700 group-hover:text-cyan-400 transition">
                <FiArrowRight className="text-lg group-hover:translate-x-1 transition" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SimilarAgents;

