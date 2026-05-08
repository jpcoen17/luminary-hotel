'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { RiArrowDownSLine } from 'react-icons/ri';

const HeroSceneCanvas = dynamic(() => import('../3d/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#080808] flex items-center justify-center">
      <div className="w-8 h-8 border border-[rgba(212,146,42,0.4)] rotate-45 animate-spin" />
    </div>
  ),
});

interface HeroSectionProps {
  mouseX: number;
  mouseY: number;
}

export default function HeroSection({ mouseX, mouseY }: HeroSectionProps) {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTextVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <HeroSceneCanvas mouseX={mouseX} mouseY={mouseY} />
      </div>

      {/* Rain overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(8,8,8,0) 0%, rgba(8,8,8,0.2) 80%, rgba(8,8,8,0.9) 100%)',
        }}
      />

      {/* Noise texture */}
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Hero content */}
      <div className="absolute inset-0 z-10 flex flex-col items-start justify-end pb-24 px-8 md:px-16 lg:px-24">

        {/* Location badge */}
        <motion.div
          className="flex items-center gap-2 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: textVisible ? 1 : 0, x: textVisible ? 0 : -20 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="w-4 h-[1px] bg-[rgba(212,146,42,0.6)]" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-[rgba(212,146,42,0.7)] uppercase">
            Jakarta Selatan · Floor 32
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-display font-light leading-[0.9] text-[clamp(4rem,10vw,9rem)] text-white"
            initial={{ y: '100%' }}
            animate={{ y: textVisible ? '0%' : '100%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            Where
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-display font-light leading-[0.9] text-[clamp(4rem,10vw,9rem)] italic"
            style={{
              background: 'linear-gradient(90deg, #d4922a 0%, #f4db8e 50%, #d4922a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '200% auto',
            }}
            initial={{ y: '100%' }}
            animate={{ y: textVisible ? '0%' : '100%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          >
            Luxury
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h1
            className="font-display font-light leading-[0.9] text-[clamp(4rem,10vw,9rem)] text-white"
            initial={{ y: '100%' }}
            animate={{ y: textVisible ? '0%' : '100%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          >
            Lives.
          </motion.h1>
        </div>

        {/* Description & CTA */}
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: textVisible ? 1 : 0, y: textVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <p className="font-body text-sm text-[rgba(255,255,255,0.5)] max-w-xs leading-relaxed">
            An ultra-premium residential experience. 32 floors above Jakarta — designed for those who demand extraordinary.
          </p>

          <div className="flex items-center gap-4">
            <button
              className="magnetic-btn px-8 py-3.5 font-body text-[12px] tracking-[0.2em] uppercase text-[#080808] font-medium transition-all duration-300 hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #d4922a, #f4db8e)' }}
              onClick={() => document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Rooms
            </button>

            <button
              className="magnetic-btn flex items-center gap-2 px-6 py-3.5 border border-[rgba(255,255,255,0.15)] font-body text-[12px] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.6)] hover:border-[rgba(212,146,42,0.4)] hover:text-[rgba(212,146,42,0.8)] transition-all duration-300"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book a Tour
            </button>
          </div>
        </motion.div>
      </div>

      {/* Right side info */}
      <motion.div
        className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 z-10 flex flex-col items-end gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: textVisible ? 1 : 0, x: textVisible ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        {[
          { label: 'Floors', value: '32' },
          { label: 'Suites', value: '48' },
          { label: 'Rating', value: '5★' },
        ].map(stat => (
          <div key={stat.label} className="text-right">
            <p className="font-display text-3xl font-light text-white">{stat.value}</p>
            <p className="font-mono text-[9px] tracking-[0.3em] text-[rgba(255,255,255,0.3)] uppercase">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: textVisible ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        <p className="font-mono text-[9px] tracking-[0.4em] text-[rgba(255,255,255,0.3)] uppercase">Scroll</p>
        <RiArrowDownSLine className="scroll-indicator text-[rgba(212,146,42,0.6)]" size={20} />
      </motion.div>

      {/* Cinematic letterbox bars */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#080808] to-transparent z-[5] pointer-events-none" />
    </section>
  );
}
