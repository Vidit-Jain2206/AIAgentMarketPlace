"use client";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-orbitron font-black tracking-tight">
          <span className="text-white">EXPLORE </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-lime-400">
            CATEGORIES
          </span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-400 text-lg sm:text-xl font-rajdhani max-w-2xl mx-auto mb-8"
      >
        Discover AI agents organized by purpose. Find the perfect tool for your
        workflow.
      </motion.p>

      {/* Search Bar */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onSubmit={handleSearch}
        className="max-w-xl mx-auto"
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-lime-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-500" />
          <div className="relative flex items-center bg-black border border-gray-800 group-hover:border-cyan-400/50 transition-colors">
            <FiSearch className="text-gray-500 text-xl ml-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearch(e.target.value);
              }}
              placeholder="Search categories..."
              className="flex-1 bg-transparent px-4 py-4 text-white font-rajdhani placeholder-gray-600 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-4 bg-cyan-400/10 text-cyan-400 font-space-mono text-sm hover:bg-cyan-400 hover:text-black transition-all"
            >
              SEARCH
            </button>
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default HeroSection;
