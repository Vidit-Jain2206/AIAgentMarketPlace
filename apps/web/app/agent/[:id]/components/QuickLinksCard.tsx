"use client";
import { motion } from "framer-motion";
import { BsLightning } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";

interface Link {
  url: string;
  title: string;
}

interface QuickLinksCardProps {
  links: Link[];
}

const QuickLinksCard = ({ links }: QuickLinksCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative bg-black/60 backdrop-blur-xl border border-lime-500/20 p-6 hover:border-lime-400/50 transition-all duration-500 group"
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
      }}
    >
      <h3 className="text-xl font-orbitron font-bold mb-4 flex items-center gap-2 text-lime-400 tracking-wide">
        <BsLightning className="text-lime-400" />
        QUICK LINKS
      </h3>
      <div className="space-y-3">
        {links.map((link, index) => (
          <motion.a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 + index * 0.1 }}
            whileHover={{ x: 4 }}
            className="flex items-center justify-between p-3 bg-lime-500/5 hover:bg-lime-500/15 border border-lime-500/20 hover:border-lime-400/50 transition-all duration-300 group/link"
          >
            <span className="text-gray-400 group-hover/link:text-lime-400 transition font-space-mono text-sm">
              {link.title}
            </span>
            <FiExternalLink className="text-gray-600 group-hover/link:text-lime-400 transition" />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickLinksCard;

