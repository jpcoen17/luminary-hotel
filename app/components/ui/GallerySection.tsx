'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../../hooks';

const GALLERY_ITEMS = [
  { id: 1, label: 'Sky Penthouse', sub: 'Floor 32 · City View', color: '#1a1208', accent: '#d4922a' },
  { id: 2, label: 'Infinity Pool', sub: 'Rooftop · 24h Access', color: '#080e1a', accent: '#4a90d9' },
  { id: 3, label: 'Grand Lobby', sub: 'Marble · Chandelier', color: '#120a0a', accent: '#c9a96e' },
  { id: 4, label: 'Executive Suite', sub: 'Floor 28 · Panoramic', color: '#0a0a12', accent: '#9b7fe8' },
  { id: 5, label: 'Gym & Wellness', sub: 'Premium Equipment', color: '#0a1208', accent: '#4db87a' },
  { id: 6, label: 'Balcony Terrace', sub: 'Private · City Night', color: '#0e0810', accent: '#e874c8' },
];

export default function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.1);
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative bg-[#080808] py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-gold-400 tracking-[0.35em] text-xs uppercase font-mono mb-4">Visual Journey</p>
          <div className="flex items-end justify-between">
            <h2 className="font-cormorant text-5xl md:text-7xl font-light text-white leading-none">
              The<br />
              <span className="italic text-gold-300">Gallery</span>
            </h2>
            <p className="text-white/30 text-sm max-w-xs text-right leading-relaxed hidden md:block">
              A curated selection of spaces, each designed to evoke emotion and inspire wonder.
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`relative group cursor-pointer overflow-hidden rounded-xl border border-white/5 ${i === 0 ? 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto md:h-[520px]' : 'aspect-[4/3]'}`}
              style={{ background: `linear-gradient(135deg, ${item.color} 0%, #080808 100%)` }}
              onMouseEnter={() => setActive(item.id)}
              onMouseLeave={() => setActive(null)}
            >
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0"
                style={{ background: `radial-gradient(circle at 30% 70%, ${item.accent}20 0%, transparent 60%)` }}
                animate={{ opacity: active === item.id ? 1 : 0.4 }}
                transition={{ duration: 0.4 }}
              />

              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `linear-gradient(${item.accent}40 1px, transparent 1px), linear-gradient(90deg, ${item.accent}40 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}
              />

              {/* Geometric shapes */}
              <motion.div
                className="absolute"
                style={{
                  width: i === 0 ? 200 : 120,
                  height: i === 0 ? 200 : 120,
                  border: `1px solid ${item.accent}30`,
                  borderRadius: '50%',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  scale: active === item.id ? [1, 1.3, 1] : 1,
                  opacity: active === item.id ? [0.3, 0.6, 0.3] : 0.2,
                }}
                transition={{ duration: 2, repeat: active === item.id ? Infinity : 0 }}
              />
              <motion.div
                className="absolute"
                style={{
                  width: i === 0 ? 120 : 70,
                  height: i === 0 ? 120 : 70,
                  border: `1px solid ${item.accent}50`,
                  borderRadius: '50%',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  scale: active === item.id ? [1, 1.4, 1] : 1,
                  opacity: active === item.id ? [0.5, 0.8, 0.5] : 0.3,
                }}
                transition={{ duration: 2, delay: 0.3, repeat: active === item.id ? Infinity : 0 }}
              />

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-6 h-6">
                <div className="absolute top-0 right-0 w-full h-px" style={{ background: item.accent, opacity: 0.6 }} />
                <div className="absolute top-0 right-0 w-px h-full" style={{ background: item.accent, opacity: 0.6 }} />
              </div>
              <div className="absolute bottom-4 left-4 w-6 h-6">
                <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: item.accent, opacity: 0.6 }} />
                <div className="absolute bottom-0 left-0 w-px h-full" style={{ background: item.accent, opacity: 0.6 }} />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <motion.div
                  animate={{ y: active === item.id ? 0 : 8, opacity: active === item.id ? 1 : 0.7 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-[10px] tracking-[0.25em] uppercase font-mono mb-1" style={{ color: item.accent }}>
                    {item.sub}
                  </p>
                  <p className="font-cormorant text-white text-xl md:text-2xl font-light">{item.label}</p>
                </motion.div>

                <motion.div
                  className="mt-3 flex items-center gap-2"
                  animate={{ opacity: active === item.id ? 1 : 0, x: active === item.id ? 0 : -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xs font-mono tracking-widest" style={{ color: item.accent }}>View Space</span>
                  <span style={{ color: item.accent }}>→</span>
                </motion.div>
              </div>

              {/* Hover border glow */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{ boxShadow: `inset 0 0 0 1px ${item.accent}` }}
                animate={{ opacity: active === item.id ? 0.4 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="text-white/30 hover:text-gold-400 text-xs tracking-[0.25em] uppercase font-mono transition-colors border-b border-white/10 hover:border-gold-400/50 pb-1">
            View Full Collection →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
