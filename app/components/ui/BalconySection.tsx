'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const BalconySceneCanvas = dynamic(() => import('../3d/BalconyScene'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#050510]" />,
});

export default function BalconySection() {
  return (
    <section id="balcony" className="relative w-full h-screen overflow-hidden">
      {/* 3D canvas */}
      <div className="absolute inset-0 z-0">
        <BalconySceneCanvas />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(8,8,8,0.6) 0%, rgba(8,8,8,0.0) 40%, rgba(8,8,8,0.0) 60%, rgba(8,8,8,0.8) 100%)',
        }}
      />

      {/* Center cinematic tagline */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          className="text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Pre-text */}
          <motion.p
            className="font-mono text-[10px] tracking-[0.5em] text-[rgba(212,146,42,0.6)] uppercase mb-6"
            initial={{ opacity: 0, letterSpacing: '0.8em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.5em' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            The View From Above
          </motion.p>

          {/* Main cinematic quote */}
          <div className="overflow-hidden mb-2">
            <motion.h2
              className="font-display text-[clamp(2.5rem,7vw,7rem)] font-light leading-[0.9] text-white"
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              Not Just A Room.
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h2
              className="font-display text-[clamp(2.5rem,7vw,7rem)] font-light leading-[0.9] italic"
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
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            >
              A Living Experience.
            </motion.h2>
          </div>

          <motion.p
            className="font-body text-sm text-[rgba(255,255,255,0.4)] max-w-md mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Step onto your private balcony. Let the city breathe below you. This is what living means at LUMINARY.
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom data */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 z-10 flex justify-center gap-12 px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        {[
          { value: '360°', label: 'City View' },
          { value: '32F', label: 'Sky Level' },
          { value: '∞', label: 'Horizon' },
        ].map(stat => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-3xl font-light text-white">{stat.value}</p>
            <p className="font-mono text-[9px] tracking-[0.3em] text-[rgba(212,146,42,0.5)] uppercase">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
