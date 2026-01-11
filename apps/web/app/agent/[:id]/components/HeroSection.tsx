"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Agent } from "@repo/types";
import { BsRobot } from "react-icons/bs";
import { RiFlashlightFill } from "react-icons/ri";
import {
  FiHeart,
  FiCopy,
  FiCheck,
  FiTag,
  FiDollarSign,
  FiCode,
  FiZap,
  FiExternalLink,
} from "react-icons/fi";

interface HeroSectionProps {
  agentDetails: Agent;
  liked: boolean;
  setLiked: (liked: boolean) => void;
  copied: boolean;
  handleCopyLink: () => void;
}

const HeroSection = ({
  agentDetails,
  liked,
  setLiked,
  copied,
  handleCopyLink,
}: HeroSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-space-mono"
      >
        <Link href="/" className="hover:text-cyan-400 transition">
          ~/home
        </Link>
        <span className="text-cyan-400">/</span>
        <span className="text-cyan-400">{agentDetails?.agentName}</span>
      </motion.div>

      {/* Main Header Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="relative bg-black/80 backdrop-blur-xl border border-cyan-500/30 p-4 sm:p-6 lg:p-8 overflow-hidden group"
        style={{
          clipPath:
            "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
        }}
      >
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-fuchsia-400" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-fuchsia-400" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-start">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.5,
              type: "spring",
              stiffness: 200,
            }}
            className="relative group/logo flex-shrink-0"
          >
            <div className="absolute inset-0 bg-cyan-400 rounded-lg blur-xl opacity-30 group-hover/logo:opacity-60 transition" />
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-black border-2 border-cyan-400 rounded-lg flex items-center justify-center shadow-[0_0_30px_rgba(0,255,255,0.3)] group-hover/logo:shadow-[0_0_50px_rgba(0,255,255,0.5)] transition-all">
              <BsRobot className="text-2xl sm:text-3xl lg:text-4xl text-cyan-400" />
            </div>
            {/* Animated Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 border border-dashed border-cyan-400/30 rounded-xl hidden sm:block"
            />
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0 w-full">
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="flex-1 min-w-0">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-3 mb-2"
                >
                  <RiFlashlightFill className="text-2xl text-lime-400 drop-shadow-[0_0_10px_rgba(132,204,22,0.7)]" />
                  <span className="text-xs text-lime-400 font-space-mono tracking-widest uppercase border border-lime-400/30 px-2 py-1">
                    AI Agent
                  </span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl sm:text-3xl lg:text-5xl font-orbitron font-black mb-2 sm:mb-3 tracking-tight text-white break-words"
                >
                  {agentDetails?.agentName}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-400 text-sm sm:text-base lg:text-lg font-rajdhani tracking-wide"
                >
                  {agentDetails?.tagline}
                </motion.p>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="flex gap-2 sm:gap-3 flex-shrink-0"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setLiked(!liked)}
                  className={`p-2 sm:p-3 border-2 transition-all duration-300 ${
                    liked
                      ? "bg-fuchsia-500/20 border-fuchsia-400 text-fuchsia-400 shadow-[0_0_20px_rgba(255,0,255,0.5)]"
                      : "bg-transparent border-gray-700 text-gray-500 hover:border-fuchsia-400 hover:text-fuchsia-400 hover:shadow-[0_0_20px_rgba(255,0,255,0.3)]"
                  }`}
                >
                  <FiHeart
                    className={`text-lg sm:text-xl ${liked ? "fill-current" : ""}`}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCopyLink}
                  className="p-2 sm:p-3 bg-transparent border-2 border-gray-700 text-gray-500 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all duration-300"
                >
                  {copied ? (
                    <FiCheck className="text-lg sm:text-xl text-lime-400" />
                  ) : (
                    <FiCopy className="text-lg sm:text-xl" />
                  )}
                </motion.button>
              </motion.div>
            </div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6"
            >
              <span className="px-2 sm:px-4 py-1 sm:py-2 bg-cyan-500/10 border border-cyan-400/50 text-cyan-400 text-xs sm:text-sm font-space-mono tracking-wider flex items-center gap-1 sm:gap-2 shadow-[0_0_15px_rgba(0,255,255,0.2)]">
                <FiTag className="text-sm sm:text-base" />
                {agentDetails?.category.categoryName}
              </span>
              <span
                className={`px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-space-mono tracking-wider flex items-center gap-1 sm:gap-2 ${
                  agentDetails?.subscriptionType === "free"
                    ? "bg-lime-500/10 border border-lime-400/50 text-lime-400 shadow-[0_0_15px_rgba(132,204,22,0.2)]"
                    : "bg-fuchsia-500/10 border border-fuchsia-400/50 text-fuchsia-400 shadow-[0_0_15px_rgba(255,0,255,0.2)]"
                }`}
              >
                <FiDollarSign className="text-sm sm:text-base" />
                {agentDetails?.subscriptionType?.toUpperCase()}
              </span>
              {agentDetails?.openSource && (
                <span className="px-2 sm:px-4 py-1 sm:py-2 bg-fuchsia-500/10 border border-fuchsia-400/50 text-fuchsia-400 text-xs sm:text-sm font-space-mono tracking-wider flex items-center gap-1 sm:gap-2 shadow-[0_0_15px_rgba(255,0,255,0.2)]">
                  <FiCode className="text-sm sm:text-base" />
                  <span className="hidden sm:inline">OPEN SOURCE</span>
                  <span className="sm:hidden">OSS</span>
                </span>
              )}
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 font-rajdhani"
            >
              {agentDetails?.shortDescription}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Link
                href={agentDetails?.agentLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full sm:w-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-orbitron font-bold text-sm sm:text-lg tracking-wider flex items-center justify-center gap-2 sm:gap-3 group overflow-hidden transition-all duration-300 hover:text-black"
                >
                  {/* Button Fill Animation */}
                  <span className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                  <FiZap className="text-xl relative z-10 group-hover:animate-pulse" />
                  <span className="relative z-10">VISIT WEBSITE</span>
                  <FiExternalLink className="text-xl relative z-10 group-hover:translate-x-1 transition" />

                  {/* Glow Effect */}
                  <span className="absolute inset-0 shadow-[0_0_30px_rgba(0,255,255,0.5)] opacity-0 group-hover:opacity-100 transition" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;

