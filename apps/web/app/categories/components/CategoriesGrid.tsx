"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { Agent, Category } from "@repo/types";
import { FiArrowRight } from "react-icons/fi";
import {
  BsCode,
  BsPencil,
  BsGraphUp,
  BsPalette,
  BsSearch,
  BsEnvelope,
  BsRobot,
  BsPhone,
  BsMusicNote,
  BsCamera,
  BsShield,
  BsGear,
} from "react-icons/bs";

interface CategoryWithAgents extends Category {
  agents: Agent[];
}

interface CategoriesGridProps {
  categories: CategoryWithAgents[];
}

// Map category keys to icons
const getCategoryIcon = (categoryKey: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    coding: <BsCode className="text-2xl" />,
    writing: <BsPencil className="text-2xl" />,
    marketing: <BsGraphUp className="text-2xl" />,
    design: <BsPalette className="text-2xl" />,
    seo: <BsSearch className="text-2xl" />,
    email: <BsEnvelope className="text-2xl" />,
    chatbot: <BsRobot className="text-2xl" />,
    social: <BsPhone className="text-2xl" />,
    audio: <BsMusicNote className="text-2xl" />,
    image: <BsCamera className="text-2xl" />,
    security: <BsShield className="text-2xl" />,
    automation: <BsGear className="text-2xl" />,
  };
  return iconMap[categoryKey.toLowerCase()] || <BsRobot className="text-2xl" />;
};

// Get color scheme for category
const getCategoryColor = (index: number) => {
  const colors = [
    {
      border: "border-cyan-500/30",
      hoverBorder: "hover:border-cyan-400",
      text: "text-cyan-400",
      bg: "bg-cyan-400/10",
    },
    {
      border: "border-fuchsia-500/30",
      hoverBorder: "hover:border-fuchsia-400",
      text: "text-fuchsia-400",
      bg: "bg-fuchsia-400/10",
    },
    {
      border: "border-lime-500/30",
      hoverBorder: "hover:border-lime-400",
      text: "text-lime-400",
      bg: "bg-lime-400/10",
    },
    {
      border: "border-yellow-500/30",
      hoverBorder: "hover:border-yellow-400",
      text: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
    {
      border: "border-orange-500/30",
      hoverBorder: "hover:border-orange-400",
      text: "text-orange-400",
      bg: "bg-orange-400/10",
    },
    {
      border: "border-pink-500/30",
      hoverBorder: "hover:border-pink-400",
      text: "text-pink-400",
      bg: "bg-pink-400/10",
    },
  ];
  return colors[index % colors.length];
};

const CategoriesGrid = ({ categories }: CategoriesGridProps) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mb-16"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="w-1 h-10 bg-gradient-to-b from-cyan-400 to-fuchsia-400" />
        <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-white tracking-wide">
          ALL{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
            CATEGORIES
          </span>
        </h2>
      </motion.div>

      {/* Grid - 3 columns, fixed height showing ~9 at a time with hidden scrollbar */}
      <div className="max-h-[750px] overflow-y-auto overflow-x-hidden scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category, index) => {
          const color = getCategoryColor(index);
          const topAgents = category.agents.slice(0, 6);

          return (
            <motion.div
              key={category.categoryKey}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className={`relative bg-black/60 backdrop-blur-xl border ${color.border} ${color.hoverBorder} p-4 sm:p-6 group transition-all duration-500 overflow-hidden`}
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              }}
            >
              {/* Corner Accents */}
              <div
                className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${color.border}`}
              />
              <div
                className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${color.border}`}
              />
              <div
                className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${color.border}`}
              />
              <div
                className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${color.border}`}
              />

              {/* Hover Glow */}
              <div
                className={`absolute inset-0 ${color.bg} opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
              />

              <div className="relative">
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 ${color.bg} border ${color.border} flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}
                    >
                      <span className={`${color.text}`}>
                        {getCategoryIcon(category.categoryKey)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-xl font-orbitron font-bold text-white truncate">
                        {category.categoryName.toUpperCase()}
                      </h3>
                      <p className="text-gray-600 font-space-mono text-xs">
                        {category.agents.length}{" "}
                        {category.agents.length === 1 ? "agent" : "agents"}
                      </p>
                    </div>
                  </div>

                  {/* View All Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      router.push(`/categories/${category.categoryKey}`)
                    }
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 border ${color.border} ${color.text} font-space-mono text-xs ${color.hoverBorder} transition-all flex items-center gap-2 self-start sm:self-auto flex-shrink-0`}
                  >
                    VIEW ALL
                    <FiArrowRight />
                  </motion.button>
                </div>

                {/* Agent Names List */}
                {topAgents.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {topAgents.map((agent, agentIndex) => (
                      <motion.span
                        key={agent.agentKey}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.8 + index * 0.1 + agentIndex * 0.05,
                        }}
                        whileHover={{ scale: 1.05 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/agent/${agent.agentKey}`);
                        }}
                        className={`px-3 py-1.5 bg-black/50 border border-gray-800 text-gray-300 text-sm font-rajdhani cursor-pointer hover:border-current ${color.hoverBorder} hover:${color.text} transition-all duration-300`}
                      >
                        {agent.agentName}
                      </motion.span>
                    ))}
                    {category.agents.length > 6 && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        onClick={() =>
                          router.push(`/categories/${category.categoryKey}`)
                        }
                        className={`px-3 py-1.5 border border-dashed ${color.border} ${color.text} text-sm font-space-mono cursor-pointer hover:bg-current/10 transition-all`}
                      >
                        +{category.agents.length - 6} more
                      </motion.span>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-600 font-space-mono text-xs">
                      No agents yet
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
            
          );
        })}
       
        </div>
      </div>
    </motion.div>
  );
};

export default CategoriesGrid;
