'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import GlassCard from './GlassCard';
import { FACILITIES } from '../../lib/constants';

const FacilitySceneCanvas = dynamic(() => import('../3d/FacilityScene'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#080808]" />,
});

type FacilityKey = 'pool' | 'gym' | 'cowork';

const FACILITY_3D_MAP: Record<string, FacilityKey> = {
  'infinity-pool': 'pool',
  'gym': 'gym',
  'coworking': 'cowork',
};

export default function FacilitiesSection() {
  const [active, setActive] = useState('infinity-pool');

  const active3D = FACILITY_3D_MAP[active] || 'pool';

  return (
    <section id="facilities" className="relative w-full min-h-screen bg-[#080808]">

      {/* Header */}
      <div className="px-8 md:px-16 lg:px-24 pt-24 pb-12">
        <motion.div className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-8 h-[1px] bg-[rgba(212,146,42,0.5)]" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-[rgba(212,146,42,0.6)] uppercase">World-Class Amenities</span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h2
            className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light text-white"
            initial={{ y: '100%' }} whileInView={{ y: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Beyond the Room.
          </motion.h2>
        </div>
      </div>

      {/* 3D Preview */}
      <div className="px-8 md:px-16 lg:px-24 mb-8">
        <div className="relative rounded-2xl overflow-hidden" style={{ height: '50vh', minHeight: '300px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active3D}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FacilitySceneCanvas type={active3D} />
            </motion.div>
          </AnimatePresence>

          {/* Overlay label */}
          <div className="absolute bottom-6 left-6 z-10">
            <p className="font-display text-2xl font-light text-white">
              {FACILITIES.find(f => f.id === active)?.name}
            </p>
          </div>

          {/* Gradient */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(8,8,8,0.6) 100%)' }} />
        </div>
      </div>

      {/* Facility cards */}
      <div className="px-8 md:px-16 lg:px-24 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {FACILITIES.map((facility, i) => (
            <GlassCard
              key={facility.id}
              delay={i * 0.07}
              className={`p-5 cursor-pointer transition-all duration-400 ${
                active === facility.id
                  ? 'border-[rgba(212,146,42,0.5)] bg-[rgba(212,146,42,0.08)]'
                  : ''
              }`}
            >
              <div onClick={() => setActive(facility.id)}>
                <div className="text-3xl mb-3">{facility.icon}</div>
                <h4 className="font-display text-lg font-light text-white mb-2">{facility.name}</h4>
                <p className="font-body text-xs text-[rgba(255,255,255,0.4)] leading-relaxed mb-4">
                  {facility.description}
                </p>
                <div className="flex flex-col gap-1">
                  {facility.features.map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[rgba(212,146,42,0.5)]" />
                      <span className="font-mono text-[9px] text-[rgba(255,255,255,0.35)] tracking-wide">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
