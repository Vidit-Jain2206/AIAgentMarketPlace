"use client";
import { motion } from "framer-motion";

const LoadingState = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 relative z-10"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full shadow-[0_0_30px_rgba(0,255,255,0.5)]"
        />
        <p className="text-cyan-400 text-lg font-orbitron tracking-wider uppercase">
          Loading agent...
        </p>
      </motion.div>
    </div>
  );
};

export default LoadingState;

