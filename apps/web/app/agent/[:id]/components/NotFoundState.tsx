"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsRobot } from "react-icons/bs";

const NotFoundState = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative z-10"
      >
        <BsRobot className="text-6xl text-cyan-400 mx-auto mb-4 drop-shadow-[0_0_20px_rgba(0,255,255,0.7)]" />
        <h2 className="text-2xl text-white font-orbitron font-bold mb-2 tracking-wider">
          AGENT NOT FOUND
        </h2>
        <p className="text-gray-500 mb-6 font-rajdhani">
          The agent you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 font-orbitron font-medium transition hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]"
        >
          BACK TO HOME
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundState;

