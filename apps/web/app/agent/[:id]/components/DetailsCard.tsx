"use client";
import { motion } from "framer-motion";
import { FiZap } from "react-icons/fi";
import type { Category } from "@repo/types";

interface DetailsCardProps {
  category: Category;
  subscriptionType: string;
  openSource: boolean;
  tags?: string[];
}

const DetailsCard = ({
  category,
  subscriptionType,
  openSource,
  tags,
}: DetailsCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative bg-black/60 backdrop-blur-xl border border-fuchsia-500/20 p-6 hover:border-fuchsia-400/50 transition-all duration-500"
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
      }}
    >
      <h3 className="text-xl font-orbitron font-bold mb-4 text-fuchsia-400 tracking-wide flex items-center gap-2">
        <FiZap className="text-fuchsia-400" />
        DETAILS
      </h3>
      <div className="space-y-4 font-space-mono text-sm">
        <div className="flex items-center justify-between border-b border-gray-800 pb-2">
          <span className="text-gray-500">Category</span>
          <span className="text-cyan-400">{category.categoryName}</span>
        </div>
        <div className="flex items-center justify-between border-b border-gray-800 pb-2">
          <span className="text-gray-500">Pricing</span>
          <span
            className={`capitalize ${subscriptionType === "free" ? "text-lime-400" : "text-fuchsia-400"}`}
          >
            {subscriptionType}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-gray-800 pb-2">
          <span className="text-gray-500">Open Source</span>
          <span className={openSource ? "text-lime-400" : "text-gray-600"}>
            {openSource ? "YES" : "NO"}
          </span>
        </div>
        {tags && tags.length > 0 && (
          <div className="pt-2">
            <span className="text-gray-500 text-xs mb-3 block tracking-widest">
              TAGS
            </span>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <motion.span
                  key={idx}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.3 + idx * 0.05 }}
                  className="px-3 py-1 bg-gray-900 border border-gray-800 text-gray-400 text-xs font-space-mono hover:border-cyan-400/50 hover:text-cyan-400 transition cursor-default"
                >
                  #{tag}
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DetailsCard;
