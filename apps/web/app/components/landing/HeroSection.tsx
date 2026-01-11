"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiArrowRight, FiZap } from "react-icons/fi";
import { BsRobot, BsLightning, BsGrid } from "react-icons/bs";

interface HeroSectionProps {
  totalAgents: number;
  totalCategories: number;
}

const HeroSection = ({ totalAgents, totalCategories }: HeroSectionProps) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [displayText, setDisplayText] = useState("");
  const fullText = "Discover Your Next Productivity Stack";

  // Typing animation
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/agents?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6">
      {/* Floating Agent Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              y: [-20, 20, -20],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute"
            style={{
              top: `${15 + i * 12}%`,
              left: `${5 + i * 15}%`,
            }}
          >
            <div className="w-12 h-12 bg-black/50 border border-cyan-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <BsRobot className="text-cyan-400/50 text-xl" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 mb-8"
        >
          <BsLightning className="text-cyan-400" />
          <span className="text-cyan-400 font-space-mono text-sm tracking-wider">
            AI AGENTS DIRECTORY
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-orbitron font-black tracking-tight mb-6"
        >
          <span className="text-white">AI Agents Directory:</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-lime-400">
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-cyan-400"
            >
              |
            </motion.span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 text-lg sm:text-xl font-rajdhani max-w-2xl mx-auto mb-10"
        >
          Browse our AI agents list and build your digital workforce in minutes,
          not months. Find the perfect tools for coding, writing, marketing & more.
        </motion.p>

        {/* Search Bar */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onSubmit={handleSearch}
          className="max-w-2xl mx-auto mb-10"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-lime-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-500" />
            <div className="relative flex items-center bg-black border border-gray-800 group-hover:border-cyan-400/50 transition-colors">
              <FiSearch className="text-gray-500 text-xl ml-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI agents... (e.g., coding assistant, content writer)"
                className="flex-1 bg-transparent px-4 py-5 text-white font-rajdhani placeholder-gray-600 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-5 bg-cyan-400/10 text-cyan-400 font-orbitron font-bold text-sm hover:bg-cyan-400 hover:text-black transition-all flex items-center gap-2"
              >
                SEARCH
                <FiArrowRight />
              </button>
            </div>
          </div>
        </motion.form>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById("agents-section")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 bg-cyan-400 text-black font-orbitron font-bold tracking-wider flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all"
          >
            <FiZap className="text-xl" />
            EXPLORE AGENTS
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/categories")}
            className="px-8 py-4 bg-transparent border-2 border-fuchsia-400 text-fuchsia-400 font-orbitron font-bold tracking-wider flex items-center justify-center gap-3 hover:bg-fuchsia-400 hover:text-black transition-all"
          >
            <BsGrid className="text-xl" />
            BROWSE CATEGORIES
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-8 sm:gap-16"
        >
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-4xl font-orbitron font-bold text-cyan-400"
            >
              {totalAgents}+
            </motion.p>
            <p className="text-gray-500 font-space-mono text-sm mt-1">AI AGENTS</p>
          </div>
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-4xl font-orbitron font-bold text-fuchsia-400"
            >
              {totalCategories}
            </motion.p>
            <p className="text-gray-500 font-space-mono text-sm mt-1">CATEGORIES</p>
          </div>
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-4xl font-orbitron font-bold text-lime-400"
            >
              100%
            </motion.p>
            <p className="text-gray-500 font-space-mono text-sm mt-1">FREE TO BROWSE</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-cyan-400 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

