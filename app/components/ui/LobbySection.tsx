'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import GlassCard from './GlassCard';
import { NAV_ITEMS } from '../../lib/constants';

const LobbySceneCanvas = dynamic(() => import('../3d/LobbyScene'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#0d0a05]" />,
});

export default function LobbySection() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <section id="about" className="relative w-full min-h-screen overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <LobbySceneCanvas />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(8,8,8,0.7) 0%, rgba(8,8,8,0.2) 30%, rgba(8,8,8,0.2) 70%, rgba(8,8,8,0.9) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between py-24 px-8 md:px-16 lg:px-24">

        {/* Top label */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-8 h-[1px] bg-[rgba(212,146,42,0.5)]" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-[rgba(212,146,42,0.6)] uppercase">
            The Lobby Experience
          </span>
        </motion.div>

        {/* Center content */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">

          {/* Headline */}
          <div className="max-w-2xl">
            <div className="overflow-hidden mb-2">
              <motion.h2
                className="font-display text-[clamp(3rem,7vw,6rem)] font-light leading-[0.95] text-white"
                initial={{ y: '100%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                Enter the
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-[clamp(3rem,7vw,6rem)] font-light leading-[0.95] italic"
                style={{
                  background: 'linear-gradient(90deg, #d4922a, #f4db8e, #d4922a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  backgroundSize: '200% auto',
                  animation: 'shimmer 4s linear infinite',
                }}
                initial={{ y: '100%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                Grand Lobby.
              </motion.h2>
            </div>

            <motion.p
              className="font-body text-sm text-[rgba(255,255,255,0.45)] max-w-md leading-relaxed mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Marble floors that stretch to infinity. Chandeliers that cascade like frozen waterfalls. LUMINARY&apos;s lobby isn&apos;t a threshold — it&apos;s an arrival.
            </motion.p>
          </div>

          {/* Floating nav menu - holographic glass panel */}
          <motion.div
            className="glass-panel-gold p-6 min-w-[280px]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <p className="font-mono text-[9px] tracking-[0.4em] text-[rgba(212,146,42,0.5)] uppercase mb-5">
              Navigate
            </p>
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item, i) => (
                <button
                  key={item.href}
                  onClick={() => document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="magnetic-btn flex items-center justify-between py-3 px-2 border-b border-[rgba(255,255,255,0.04)] last:border-0 group transition-all duration-300"
                >
                  <span className={`font-body text-sm tracking-wide transition-colors duration-300 ${
                    hoveredItem === item.href ? 'text-[rgba(212,146,42,0.9)]' : 'text-[rgba(255,255,255,0.5)]'
                  }`}>
                    {item.label}
                  </span>
                  <span className={`font-mono text-[9px] tracking-widest transition-all duration-300 ${
                    hoveredItem === item.href ? 'text-[rgba(212,146,42,0.6)] translate-x-0' : 'text-[rgba(255,255,255,0.15)] -translate-x-2 opacity-0'
                  }`}>
                    →
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '2019', label: 'Est. Year' },
            { value: '48', label: 'Exclusive Units' },
            { value: '5★', label: 'Luxury Rated' },
            { value: '24/7', label: 'Concierge' },
          ].map((stat, i) => (
            <GlassCard key={stat.label} delay={i * 0.1} className="p-5">
              <p className="font-display text-3xl font-light text-white mb-1">{stat.value}</p>
              <p className="font-mono text-[9px] tracking-[0.25em] text-[rgba(212,146,42,0.6)] uppercase">{stat.label}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
