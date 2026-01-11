"use client";
import { motion } from "framer-motion";

interface StatusCardProps {
  createdAt?: Date;
}

const StatusCard = ({ createdAt }: StatusCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4 }}
      className="bg-black border border-gray-800 p-4 font-space-mono text-xs"
    >
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-800">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-lime-500" />
        <span className="text-gray-600 ml-2">status.sh</span>
      </div>
      <div className="space-y-1 text-gray-500">
        <p>
          <span className="text-cyan-400">$</span> agent --status
        </p>
        <p className="text-lime-400">✓ Agent is active</p>
        <p>
          <span className="text-cyan-400">$</span> uptime
        </p>
        <p className="text-gray-400">
          Online since {new Date(createdAt || Date.now()).toLocaleDateString()}
        </p>
      </div>
    </motion.div>
  );
};

export default StatusCard;

