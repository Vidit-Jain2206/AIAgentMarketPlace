"use client";
import { motion } from "framer-motion";

interface ContentItem {
  subHeading: string;
  subDescription: string[];
}

interface InfoSectionProps {
  title: string;
  content: ContentItem[];
  index: number;
}

const InfoSection = ({ title, content, index }: InfoSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2 + index * 0.1 }}
      className="relative bg-black/60 backdrop-blur-xl border border-fuchsia-500/20 p-8 group hover:border-fuchsia-400/50 transition-all duration-500"
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))",
      }}
    >
      <h2 className="text-2xl font-orbitron font-bold mb-6 flex items-center gap-3 tracking-wide">
        <span className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-fuchsia-400" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
          {title.toUpperCase()}
        </span>
      </h2>
      <div className="space-y-6">
        {content.map((contentItem, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 + index * 0.1 + idx * 0.05 }}
            className="pl-4 border-l-2 border-gray-800 hover:border-cyan-400 transition-colors duration-300 group/item"
          >
            <h3 className="text-lg font-semibold text-white mb-3 group-hover/item:text-cyan-400 transition font-rajdhani">
              {contentItem.subHeading}
            </h3>
            {contentItem.subDescription && contentItem.subDescription.length > 0 && (
              <ul className="space-y-2">
                {contentItem.subDescription.map((desc, descIdx) => (
                  <li
                    key={descIdx}
                    className="text-gray-400 flex items-start gap-3 group-hover/item:text-gray-300 transition font-rajdhani"
                  >
                    <span className="text-fuchsia-400 mt-1">▸</span>
                    <span className="flex-1">{desc}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default InfoSection;

