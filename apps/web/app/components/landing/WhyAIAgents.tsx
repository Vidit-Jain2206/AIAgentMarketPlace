"use client";
import { motion } from "framer-motion";
import { FiZap, FiClock, FiTarget, FiTrendingUp, FiShield, FiUsers } from "react-icons/fi";

const features = [
  {
    icon: <FiZap className="text-3xl" />,
    title: "10x Productivity",
    description: "Automate repetitive tasks and focus on what matters. AI agents handle the grunt work.",
    color: "cyan",
  },
  {
    icon: <FiClock className="text-3xl" />,
    title: "24/7 Availability",
    description: "Your AI workforce never sleeps. Get things done even while you rest.",
    color: "fuchsia",
  },
  {
    icon: <FiTarget className="text-3xl" />,
    title: "Precision Work",
    description: "Reduce human error with AI-powered accuracy in coding, writing, and analysis.",
    color: "lime",
  },
  {
    icon: <FiTrendingUp className="text-3xl" />,
    title: "Scale Instantly",
    description: "Go from 1 to 100 projects without hiring. AI agents scale with your needs.",
    color: "cyan",
  },
  {
    icon: <FiShield className="text-3xl" />,
    title: "Safe & Reliable",
    description: "We vet every agent for quality and security. Browse with confidence.",
    color: "fuchsia",
  },
  {
    icon: <FiUsers className="text-3xl" />,
    title: "Community Driven",
    description: "Discover agents recommended by developers, marketers, and creators like you.",
    color: "lime",
  },
];

const getColorClasses = (color: string) => {
  const colorMap: { [key: string]: { border: string; text: string; bg: string; glow: string } } = {
    cyan: {
      border: "border-cyan-500/30",
      text: "text-cyan-400",
      bg: "bg-cyan-400/10",
      glow: "group-hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]",
    },
    fuchsia: {
      border: "border-fuchsia-500/30",
      text: "text-fuchsia-400",
      bg: "bg-fuchsia-400/10",
      glow: "group-hover:shadow-[0_0_30px_rgba(217,70,239,0.3)]",
    },
    lime: {
      border: "border-lime-500/30",
      text: "text-lime-400",
      bg: "bg-lime-400/10",
      glow: "group-hover:shadow-[0_0_30px_rgba(163,230,53,0.3)]",
    },
  };
  return colorMap[color];
};

const WhyAIAgents = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-lime-400/10 border border-lime-400/30 text-lime-400 font-space-mono text-sm mb-6">
            WHY AI AGENTS?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron font-bold text-white tracking-wide mb-4">
            BUILD YOUR{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-lime-400">
              DIGITAL WORKFORCE
            </span>
          </h2>
          <p className="text-gray-400 font-rajdhani text-lg max-w-2xl mx-auto">
            The future of work is here. AI agents are transforming how students and professionals get things done.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color);
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-black/60 backdrop-blur-xl border ${colors.border} p-8 group hover:border-opacity-100 transition-all duration-500 ${colors.glow}`}
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                }}
              >
                {/* Corner Accent */}
                <div className={`absolute top-0 right-0 w-3 h-3 ${colors.bg}`} />

                {/* Icon */}
                <div className={`w-16 h-16 ${colors.bg} border ${colors.border} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <span className={colors.text}>{feature.icon}</span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-orbitron font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 font-rajdhani leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyAIAgents;

