'use client';

import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  gold?: boolean;
  hover?: boolean;
  delay?: number;
  animate?: boolean;
}

export default function GlassCard({
  children,
  className,
  gold = false,
  hover = true,
  delay = 0,
  animate = true,
}: GlassCardProps) {
  const baseClass = gold ? 'glass-panel-gold' : 'glass-panel';

  const content = (
    <div
      className={cn(
        baseClass,
        hover && 'transition-all duration-500 hover:border-[rgba(212,146,42,0.25)] hover:bg-[rgba(255,255,255,0.06)]',
        className
      )}
    >
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      className={cn(
        baseClass,
        hover && 'transition-all duration-500 hover:border-[rgba(212,146,42,0.25)] hover:bg-[rgba(255,255,255,0.06)]',
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
