'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import GlassCard from './GlassCard';
import { ROOMS, HOTSPOTS, formatPrice } from '../../lib/constants';
import type { LightingMood, TimeOfDay } from '../../types';
import { RiMoonLine, RiSunLine, RiSunFoggyLine, RiLightbulbLine, RiLightbulbFlashLine } from 'react-icons/ri';

const RoomSceneCanvas = dynamic(() => import('../3d/RoomScene'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#0a0808]" />,
});

const LIGHTING_OPTIONS: { id: LightingMood; label: string; color: string }[] = [
  { id: 'warm', label: 'Warm', color: '#d4922a' },
  { id: 'cool', label: 'Cool', color: '#6eb5ff' },
  { id: 'dramatic', label: 'Dramatic', color: '#ff3366' },
  { id: 'soft', label: 'Soft', color: '#f0ede8' },
];

export default function RoomSection() {
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[1]); // Luxury suite default
  const [lighting, setLighting] = useState<LightingMood>('warm');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('night');
  const [curtainsOpen, setCurtainsOpen] = useState(true);
  const [lightsOn, setLightsOn] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  return (
    <section id="rooms" className="relative w-full min-h-screen bg-[#080808]">

      {/* Section header */}
      <div className="px-8 md:px-16 lg:px-24 pt-24 pb-12">
        <motion.div className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-8 h-[1px] bg-[rgba(212,146,42,0.5)]" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-[rgba(212,146,42,0.6)] uppercase">Room Experience</span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h2
            className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light text-white"
            initial={{ y: '100%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Live Inside the Vision.
          </motion.h2>
        </div>
      </div>

      {/* Main room showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 px-8 md:px-16 lg:px-24">

        {/* 3D Room Canvas */}
        <div className="lg:col-span-2 relative" style={{ height: '60vh', minHeight: '400px' }}>
          <RoomSceneCanvas
            style={selectedRoom.style}
            lighting={lighting}
            timeOfDay={timeOfDay}
            curtainsOpen={curtainsOpen}
            lightsOn={lightsOn}
          />

          {/* Hotspot buttons */}
          <div className="absolute inset-0 pointer-events-none">
            {HOTSPOTS.map((hotspot, i) => (
              <motion.button
                key={hotspot.id}
                className="absolute pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  left: `${25 + i * 18}%`,
                  top: `${30 + (i % 2) * 30}%`,
                  background: 'rgba(212,146,42,0.2)',
                  border: '1px solid rgba(212,146,42,0.6)',
                  boxShadow: activeHotspot === hotspot.id ? '0 0 20px rgba(212,146,42,0.6)' : undefined,
                }}
                onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15 + 0.5 }}
              >
                <span className="hotspot-pulse text-[10px]">{hotspot.icon}</span>
              </motion.button>
            ))}
          </div>

          {/* Active hotspot popup */}
          <AnimatePresence>
            {activeHotspot && (
              <motion.div
                className="absolute bottom-6 left-6 glass-panel-gold p-4 max-w-xs pointer-events-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                {HOTSPOTS.filter(h => h.id === activeHotspot).map(h => (
                  <div key={h.id}>
                    <p className="font-body text-sm font-medium text-white mb-1">{h.title}</p>
                    <p className="font-body text-xs text-[rgba(255,255,255,0.5)] leading-relaxed">{h.description}</p>
                  </div>
                ))}
                <button
                  className="absolute top-2 right-3 text-[rgba(255,255,255,0.3)] hover:text-white text-xs"
                  onClick={() => setActiveHotspot(null)}
                >
                  ✕
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Room controls overlay */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {/* Lights toggle */}
            <button
              onClick={() => setLightsOn(!lightsOn)}
              className="magnetic-btn w-9 h-9 glass-panel flex items-center justify-center transition-colors duration-300 hover:border-[rgba(212,146,42,0.4)]"
              title="Toggle lights"
            >
              {lightsOn ? <RiLightbulbFlashLine size={14} color="#d4922a" /> : <RiLightbulbLine size={14} color="rgba(255,255,255,0.3)" />}
            </button>

            {/* Curtains toggle */}
            <button
              onClick={() => setCurtainsOpen(!curtainsOpen)}
              className="magnetic-btn w-9 h-9 glass-panel flex items-center justify-center transition-colors duration-300 hover:border-[rgba(212,146,42,0.4)]"
              title="Toggle curtains"
            >
              <span className="text-[10px]">{curtainsOpen ? '🪟' : '🏮'}</span>
            </button>

            {/* Time of day */}
            <button
              onClick={() => setTimeOfDay(t => t === 'night' ? 'day' : t === 'day' ? 'golden-hour' : 'night')}
              className="magnetic-btn w-9 h-9 glass-panel flex items-center justify-center transition-colors duration-300 hover:border-[rgba(212,146,42,0.4)]"
              title="Change time"
            >
              {timeOfDay === 'night' ? <RiMoonLine size={14} color="#4488ff" /> :
               timeOfDay === 'day' ? <RiSunLine size={14} color="#ffcc44" /> :
               <RiSunFoggyLine size={14} color="#ff8844" />}
            </button>
          </div>
        </div>

        {/* Right panel */}
        <div className="lg:pl-8 flex flex-col gap-6 py-6">
          {/* Selected room info */}
          <GlassCard className="p-6" gold>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-mono text-[9px] tracking-[0.3em] text-[rgba(212,146,42,0.6)] uppercase mb-1">
                  Floor {selectedRoom.floor}
                </p>
                <h3 className="font-display text-2xl font-light text-white">{selectedRoom.name}</h3>
              </div>
              <div className="text-right">
                <p className="font-display text-xl text-[rgba(212,146,42,0.9)]">{formatPrice(selectedRoom.price)}</p>
                <p className="font-mono text-[9px] tracking-widest text-[rgba(255,255,255,0.3)]">/ night</p>
              </div>
            </div>

            <p className="font-body text-xs text-[rgba(255,255,255,0.5)] leading-relaxed mb-4">
              {selectedRoom.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {selectedRoom.amenities.map(a => (
                <span key={a} className="font-mono text-[9px] px-2 py-1 border border-[rgba(212,146,42,0.2)] text-[rgba(212,146,42,0.7)] tracking-wide">
                  {a}
                </span>
              ))}
            </div>

            <p className="font-mono text-[9px] text-[rgba(255,255,255,0.3)]">
              {selectedRoom.size}m² · {selectedRoom.available ? '✓ Available' : '× Unavailable'}
            </p>
          </GlassCard>

          {/* Lighting mood selector */}
          <GlassCard className="p-4" animate={false}>
            <p className="font-mono text-[9px] tracking-[0.3em] text-[rgba(255,255,255,0.3)] uppercase mb-3">Lighting Mood</p>
            <div className="grid grid-cols-4 gap-2">
              {LIGHTING_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setLighting(opt.id)}
                  className={`py-2 flex flex-col items-center gap-1 rounded-lg border transition-all duration-300 ${
                    lighting === opt.id
                      ? 'border-[rgba(212,146,42,0.5)] bg-[rgba(212,146,42,0.1)]'
                      : 'border-[rgba(255,255,255,0.06)] hover:border-[rgba(212,146,42,0.2)]'
                  }`}
                >
                  <div className="w-3 h-3 rounded-full" style={{ background: opt.color }} />
                  <span className="font-mono text-[8px] text-[rgba(255,255,255,0.4)] tracking-wider">{opt.label}</span>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Room type selector */}
      <div className="px-8 md:px-16 lg:px-24 py-12">
        <p className="font-mono text-[9px] tracking-[0.4em] text-[rgba(255,255,255,0.25)] uppercase mb-6">Select Room Type</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROOMS.map((room, i) => (
            <GlassCard
              key={room.id}
              delay={i * 0.08}
              className={`p-5 cursor-pointer transition-all duration-400 ${
                selectedRoom.id === room.id
                  ? 'border-[rgba(212,146,42,0.4)] bg-[rgba(212,146,42,0.07)]'
                  : ''
              }`}
            >
              <div onClick={() => setSelectedRoom(room)}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-[rgba(212,146,42,0.6)] uppercase">
                    Floor {room.floor}
                  </span>
                  {!room.available && (
                    <span className="font-mono text-[8px] text-[rgba(255,100,100,0.6)] border border-[rgba(255,100,100,0.2)] px-1.5 py-0.5">
                      Booked
                    </span>
                  )}
                </div>
                <h4 className="font-display text-lg font-light text-white mb-2">{room.name}</h4>
                <p className="font-body text-xs text-[rgba(255,255,255,0.4)] leading-relaxed mb-3">
                  {room.description.split('.')[0]}.
                </p>
                <p className="font-display text-lg text-[rgba(212,146,42,0.8)]">
                  {formatPrice(room.price)}
                  <span className="font-mono text-[9px] text-[rgba(255,255,255,0.3)] ml-1">/night</span>
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
