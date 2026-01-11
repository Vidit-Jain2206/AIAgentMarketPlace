"use client";
import { motion } from "framer-motion";
import { FiMessageSquare, FiPlus, FiArrowRight } from "react-icons/fi";
import { BsRocket } from "react-icons/bs";

const CTASection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className="relative"
    >
      {/* Main CTA Card */}
      <div
        className="relative bg-black/60 backdrop-blur-xl border border-fuchsia-500/30 p-8 sm:p-12 overflow-hidden group"
        style={{
          clipPath:
            "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
        }}
      >
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-fuchsia-400" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-fuchsia-400" />

        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/5 via-transparent to-cyan-500/5" />

        {/* Floating Icon */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-8 right-8 hidden sm:block"
        >
          <BsRocket className="text-6xl text-fuchsia-400/20" />
        </motion.div>

        <div className="relative text-center max-w-2xl mx-auto">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.3, type: "spring" }}
            className="w-16 h-16 mx-auto mb-6 bg-fuchsia-400/10 border border-fuchsia-400/30 flex items-center justify-center"
          >
            <FiMessageSquare className="text-3xl text-fuchsia-400" />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="text-2xl sm:text-3xl font-orbitron font-bold text-white mb-4"
          >
            CAN&apos;T FIND WHAT YOU&apos;RE{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400">
              LOOKING FOR?
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-gray-400 font-rajdhani text-lg mb-8"
          >
            Help us grow our directory. Suggest a new AI agent or request a new
            category to be added.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-4 bg-transparent border-2 border-fuchsia-400 text-fuchsia-400 font-orbitron font-bold tracking-wider flex items-center justify-center gap-3 group overflow-hidden transition-all duration-300 hover:text-black"
            >
              {/* Fill Animation */}
              <span className="absolute inset-0 bg-fuchsia-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <FiPlus className="text-xl relative z-10" />
              <span className="relative z-10">SUGGEST AGENT</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-orbitron font-bold tracking-wider flex items-center justify-center gap-3 group overflow-hidden transition-all duration-300 hover:text-black"
            >
              {/* Fill Animation */}
              <span className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <FiArrowRight className="text-xl relative z-10" />
              <span className="relative z-10">REQUEST CATEGORY</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CTASection;

