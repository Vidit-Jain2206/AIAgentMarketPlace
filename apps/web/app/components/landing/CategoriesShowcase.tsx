"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { Category } from "@repo/types";
import { FiArrowRight } from "react-icons/fi";
import {
  BsCode,
  BsPencil,
  BsGraphUp,
  BsPalette,
  BsSearch,
  BsEnvelope,
  BsRobot,
  BsPhone,
  BsGear,
} from "react-icons/bs";
import Link from "next/link";

interface CategoryWithCount extends Category {
  agentCount: number;
}

interface CategoriesShowcaseProps {
  categories: CategoryWithCount[];
}

const getCategoryIcon = (categoryKey: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    coding: <BsCode className="text-3xl" />,
    writing: <BsPencil className="text-3xl" />,
    marketing: <BsGraphUp className="text-3xl" />,
    design: <BsPalette className="text-3xl" />,
    seo: <BsSearch className="text-3xl" />,
    email: <BsEnvelope className="text-3xl" />,
    chatbot: <BsRobot className="text-3xl" />,
    social: <BsPhone className="text-3xl" />,
    automation: <BsGear className="text-3xl" />,
  };
  return iconMap[categoryKey.toLowerCase()] || <BsRobot className="text-3xl" />;
};

const getCategoryColor = (index: number) => {
  const colors = [
    { border: "border-cyan-500/30", text: "text-cyan-400", bg: "bg-cyan-400/10", hover: "hover:border-cyan-400" },
    { border: "border-fuchsia-500/30", text: "text-fuchsia-400", bg: "bg-fuchsia-400/10", hover: "hover:border-fuchsia-400" },
    { border: "border-lime-500/30", text: "text-lime-400", bg: "bg-lime-400/10", hover: "hover:border-lime-400" },
  ];
  return colors[index % colors.length];
};

const CategoriesShowcase = ({ categories }: CategoriesShowcaseProps) => {
  const router = useRouter();
  const topCategories = categories.slice(0, 6);

  return (
    <section className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-white tracking-wide mb-4">
            BROWSE BY{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
              CATEGORY
            </span>
          </h2>
          <p className="text-gray-400 font-rajdhani text-lg max-w-xl mx-auto">
            Find the perfect AI agent for your workflow. Organized by purpose for easy discovery.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {topCategories.map((category, index) => {
            const color = getCategoryColor(index);
            return (
              <motion.div
                key={category.categoryKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => router.push(`/categories/${category.categoryKey}`)}
                className={`relative bg-black/60 backdrop-blur-xl border ${color.border} ${color.hover} p-6 cursor-pointer group transition-all duration-500`}
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                }}
              >
                {/* Hover Glow */}
                <div className={`absolute inset-0 ${color.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative flex items-center gap-4">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${color.bg} border ${color.border} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <span className={color.text}>{getCategoryIcon(category.categoryKey)}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-orbitron font-bold text-white mb-1">
                      {category.categoryName.toUpperCase()}
                    </h3>
                    <p className="text-gray-500 font-space-mono text-sm">
                      {category.agentCount} {category.agentCount === 1 ? "agent" : "agents"}
                    </p>
                  </div>

                  {/* Arrow */}
                  <FiArrowRight className={`text-xl text-gray-700 group-hover:${color.text} group-hover:translate-x-2 transition`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 px-6 py-3 border border-cyan-400 text-cyan-400 font-orbitron font-bold hover:bg-cyan-400 hover:text-black transition-all group"
          >
            VIEW ALL CATEGORIES
            <FiArrowRight className="group-hover:translate-x-1 transition" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesShowcase;

