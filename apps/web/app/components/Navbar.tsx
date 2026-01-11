"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiZap, FiGrid, FiHome } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "HOME", icon: <FiHome /> },
    { href: "/categories", label: "CATEGORIES", icon: <FiGrid /> },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-cyan-400/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="relative w-10 h-10 bg-black border border-cyan-400/50 flex items-center justify-center group-hover:border-cyan-400 transition-colors"
              style={{
                clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
              }}
            >
              <BsRobot className="text-xl text-cyan-400" />
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-cyan-400" />
            </motion.div>
            <div className="hidden sm:block">
              <span className="font-orbitron font-bold text-lg tracking-wider text-white group-hover:text-cyan-400 transition-colors">
                AI AGENTS
              </span>
              <span className="font-orbitron font-bold text-lg tracking-wider text-cyan-400">
                .LIST
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-5 py-2.5 font-orbitron text-sm font-bold tracking-wider flex items-center gap-2 transition-all group ${
                  isActive(link.href)
                    ? "text-black bg-cyan-400"
                    : "text-gray-400 hover:text-cyan-400"
                }`}
                style={
                  isActive(link.href)
                    ? {
                        clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                      }
                    : undefined
                }
              >
                <span className={isActive(link.href) ? "text-black" : "text-cyan-400"}>
                  {link.icon}
                </span>
                {link.label}
                {/* Hover underline */}
                {!isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
                )}
              </Link>
            ))}

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4"
            >
              <Link
                href="/categories"
                className="relative px-5 py-2.5 bg-transparent border border-fuchsia-400 text-fuchsia-400 font-orbitron text-sm font-bold tracking-wider flex items-center gap-2 hover:bg-fuchsia-400 hover:text-black transition-all"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                }}
              >
                <FiZap />
                EXPLORE
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-cyan-400 border border-cyan-400/30 hover:border-cyan-400 transition-colors"
          >
            {isMobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-cyan-400/20"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 font-orbitron text-sm font-bold tracking-wider transition-all ${
                      isActive(link.href)
                        ? "text-black bg-cyan-400"
                        : "text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10"
                    }`}
                    style={
                      isActive(link.href)
                        ? {
                            clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                          }
                        : undefined
                    }
                  >
                    <span className={isActive(link.href) ? "text-black" : "text-cyan-400"}>
                      {link.icon}
                    </span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="pt-2"
              >
                <Link
                  href="/categories"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-fuchsia-400 text-black font-orbitron text-sm font-bold tracking-wider"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                  }}
                >
                  <FiZap />
                  EXPLORE AGENTS
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
