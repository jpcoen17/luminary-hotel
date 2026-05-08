'use client';

import { motion } from 'framer-motion';
import { SECTION_NAMES } from '../../lib/constants';

interface SectionMinimapProps {
  currentSection: number;
  onNavigate: (section: number) => void;
}

export default function SectionMinimap({ currentSection, onNavigate }: SectionMinimapProps) {
  return (
    <motion.div
      className="section-minimap"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
    >
      {SECTION_NAMES.map((name, i) => (
        <div
          key={name}
          className="group flex items-center gap-3 cursor-pointer"
          onClick={() => onNavigate(i)}
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-mono text-[9px] tracking-widest text-[rgba(212,146,42,0.7)] uppercase whitespace-nowrap">
            {name}
          </span>
          <div
            className={`minimap-dot transition-all duration-300 ${currentSection === i ? 'active' : ''}`}
          />
        </div>
      ))}
    </motion.div>
  );
}
