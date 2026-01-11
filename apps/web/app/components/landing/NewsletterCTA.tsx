"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiSend, FiBell, FiCheck } from "react-icons/fi";
import { BsLightning } from "react-icons/bs";

const NewsletterCTA = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, you'd send this to your backend
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setIsSubscribed(false);
      }, 3000);
    }
  };

  return (
    <section className="relative py-24 px-4 sm:px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-lime-500/10" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-black/80 backdrop-blur-xl border border-gray-800 p-8 sm:p-12"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
          }}
        >
          {/* Corner Accents */}
          <div className="absolute top-0 right-0 w-5 h-5 bg-cyan-400" />
          <div className="absolute bottom-0 left-0 w-5 h-5 bg-fuchsia-400" />

          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-lime-500 rounded blur opacity-20" />

          <div className="relative text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 mb-6"
            >
              <FiBell className="text-cyan-400" />
              <span className="text-cyan-400 font-space-mono text-sm">
                STAY UPDATED
              </span>
            </motion.div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-white mb-4">
              GET NEW{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
                AI AGENTS
              </span>{" "}
              IN YOUR INBOX
            </h2>

            <p className="text-gray-400 font-rajdhani text-lg mb-8 max-w-xl mx-auto">
              Join 1,000+ developers and creators. Get weekly updates on new AI agents, tools, and productivity tips.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-black border border-gray-800 group-hover:border-cyan-400/50 px-5 py-4 text-white font-rajdhani placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubscribed}
                  className={`px-8 py-4 font-orbitron font-bold tracking-wider flex items-center justify-center gap-2 transition-all ${
                    isSubscribed
                      ? "bg-lime-400 text-black"
                      : "bg-cyan-400 text-black hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]"
                  }`}
                >
                  {isSubscribed ? (
                    <>
                      <FiCheck className="text-xl" />
                      SUBSCRIBED!
                    </>
                  ) : (
                    <>
                      <FiSend className="text-xl" />
                      SUBSCRIBE
                    </>
                  )}
                </motion.button>
              </div>
            </form>

            {/* Trust Badge */}
            <p className="text-gray-600 font-space-mono text-xs mt-6 flex items-center justify-center gap-2">
              <BsLightning className="text-lime-400" />
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterCTA;

