"use client";
import { motion } from "framer-motion";
import { FiTerminal, FiCopy } from "react-icons/fi";

interface GettingStartedSectionProps {
  installationCommands: string[];
}

const GettingStartedSection = ({
  installationCommands,
}: GettingStartedSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.15 }}
      className="relative bg-black/60 backdrop-blur-xl border border-lime-500/20 p-8 group hover:border-lime-400/50 transition-all duration-500"
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))",
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-lime-400/10 border border-lime-400/30">
          <FiTerminal className="text-2xl text-lime-400" />
        </div>
        <h2 className="text-2xl font-orbitron font-bold tracking-wide text-lime-400">
          GETTING STARTED
        </h2>
      </div>
      <div className="space-y-4">
        {installationCommands.map((cmd, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + idx * 0.1 }}
            className="bg-black border border-gray-800 p-4 font-space-mono text-sm group/cmd hover:border-lime-400/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-xs">Step {idx + 1}</span>
              <button
                onClick={() => navigator.clipboard.writeText(cmd)}
                className="text-gray-600 hover:text-lime-400 transition"
              >
                <FiCopy className="text-sm" />
              </button>
            </div>
            <code className="text-lime-400">$ {cmd}</code>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default GettingStartedSection;

