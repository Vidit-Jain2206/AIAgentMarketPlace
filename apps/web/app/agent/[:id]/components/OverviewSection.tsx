"use client";
import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi";

interface OverviewSectionProps {
  overview: string;
}

const OverviewSection = ({ overview }: OverviewSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.1 }}
      className="relative bg-black/60 backdrop-blur-xl border border-cyan-500/20 p-8 group hover:border-cyan-400/50 transition-all duration-500"
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))",
      }}
    >
      {/* Corner Glow */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-400/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-cyan-400/10 border border-cyan-400/30">
          <HiSparkles className="text-2xl text-cyan-400" />
        </div>
        <h2 className="text-2xl font-orbitron font-bold tracking-wide text-cyan-400">
          OVERVIEW
        </h2>
      </div>
      <p className="text-gray-300 leading-relaxed text-lg font-rajdhani">
        {overview}
      </p>
    </motion.div>
  );
};

export default OverviewSection;

