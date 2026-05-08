'use client';

import { motion, type Variants } from 'framer-motion';
import { cn } from '../../lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  type?: 'words' | 'chars' | 'lines';
  once?: boolean;
}

export default function AnimatedText({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  type = 'words',
  once = true,
}: AnimatedTextProps) {
  const items = type === 'words'
    ? text.split(' ')
    : type === 'chars'
    ? text.split('')
    : [text];

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 40, rotateX: -20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className={cn('overflow-hidden', className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      style={{ perspective: 1000 }}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          variants={child}
          className="inline-block"
          style={{ marginRight: type === 'words' ? '0.3em' : undefined }}
        >
          {item}
          {type === 'chars' && item === ' ' ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.div>
  );
}
