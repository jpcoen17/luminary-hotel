'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ROOM_STYLES, LIGHTING_MOODS, WEATHER_MODES } from '../../lib/constants';
import type { RoomStyle, LightingMood, TimeOfDay, WeatherMode } from '../../types';
import GlassCard from './GlassCard';

const RoomSceneCanvas = dynamic(() => import('../3d/RoomScene'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#0a0808]" />,
});

export default function ConfiguratorSection() {
  const [style, setStyle] = useState<RoomStyle>('luxury-modern');
  const [lighting, setLighting] = useState<LightingMood>('warm');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('night');
  const [curtainsOpen, setCurtainsOpen] = useState(true);
  const [lightsOn, setLightsOn] = useState(true);

  return (
    <section id="configure" className="relative w-full min-h-screen bg-[#080808]">
      <div className="px-8 md:px-16 lg:px-24 pt-24 pb-12">
        <motion.div className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-8 h-[1px] bg-[rgba(212,146,42,0.5)]" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-[rgba(212,146,42,0.6)] uppercase">Room Configurator</span>
        </motion.div>
        <div className="overflow-hidden">
          <motion.h2
            className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light text-white"
            initial={{ y: '100%' }} whileInView={{ y: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Make It Yours.
          </motion.h2>
        </div>
        <p className="font-body text-sm text-[rgba(255,255,255,0.4)] max-w-lg mt-4">
          Customize your room in real time. Choose your aesthetic, lighting mood, and atmosphere — before you even arrive.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 px-8 md:px-16 lg:px-24 pb-24">
        {/* 3D View */}
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden mb-8 lg:mb-0"
          style={{ height: '65vh', minHeight: '400px' }}>
          <RoomSceneCanvas
            style={style}
            lighting={lighting}
            timeOfDay={timeOfDay}
            curtainsOpen={curtainsOpen}
            lightsOn={lightsOn}
          />
          {/* Active style label */}
          <div className="absolute top-4 left-4 glass-panel px-3 py-2">
            <p className="font-mono text-[9px] tracking-[0.3em] text-[rgba(212,146,42,0.7)] uppercase">
              {ROOM_STYLES.find(s => s.id === style)?.label}
            </p>
          </div>
        </div>

        {/* Controls panel */}
        <div className="lg:pl-8 flex flex-col gap-4">

          {/* Interior Style */}
          <GlassCard className="p-5" animate={false}>
            <p className="font-mono text-[9px] tracking-[0.3em] text-[rgba(255,255,255,0.3)] uppercase mb-4">Interior Style</p>
            <div className="grid grid-cols-2 gap-2">
              {ROOM_STYLES.map(s => (
                <button
                  key={s.id}
                  onClick={() => setStyle(s.id as RoomStyle)}
                  className={`p-3 rounded-lg border text-left transition-all duration-300 ${
                    style === s.id
                      ? 'border-[rgba(212,146,42,0.5)] bg-[rgba(212,146,42,0.1)]'
                      : 'border-[rgba(255,255,255,0.06)] hover:border-[rgba(212,146,42,0.2)]'
                  }`}
                >
                  <p className={`font-body text-xs font-medium mb-0.5 ${
                    style === s.id ? 'text-[rgba(212,146,42,0.9)]' : 'text-white'
                  }`}>{s.label}</p>
                  <p className="font-mono text-[8px] text-[rgba(255,255,255,0.3)] tracking-wide">{s.description}</p>
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Lighting Mood */}
          <GlassCard className="p-5" animate={false}>
            <p className="font-mono text-[9px] tracking-[0.3em] text-[rgba(255,255,255,0.3)] uppercase mb-4">Lighting Mood</p>
            <div className="grid grid-cols-4 gap-2">
              {LIGHTING_MOODS.map(l => (
                <button
                  key={l.id}
                  onClick={() => setLighting(l.id as LightingMood)}
                  className={`py-3 rounded-lg border flex flex-col items-center gap-2 transition-all duration-300 ${
                    lighting === l.id
                      ? 'border-[rgba(212,146,42,0.5)] bg-[rgba(212,146,42,0.08)]'
                      : 'border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full" style={{ background: l.color }} />
                  <span className="font-mono text-[8px] text-[rgba(255,255,255,0.4)] tracking-wide">{l.label}</span>
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Time of Day */}
          <GlassCard className="p-5" animate={false}>
            <p className="font-mono text-[9px] tracking-[0.3em] text-[rgba(255,255,255,0.3)] uppercase mb-4">Time of Day</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'day' as TimeOfDay, label: 'Daylight', icon: '☀️' },
                { id: 'golden-hour' as TimeOfDay, label: 'Golden Hour', icon: '🌅' },
                { id: 'night' as TimeOfDay, label: 'Night', icon: '🌙' },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setTimeOfDay(t.id)}
                  className={`py-3 rounded-lg border flex flex-col items-center gap-2 transition-all duration-300 ${
                    timeOfDay === t.id
                      ? 'border-[rgba(212,146,42,0.5)] bg-[rgba(212,146,42,0.08)]'
                      : 'border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]'
                  }`}
                >
                  <span className="text-lg">{t.icon}</span>
                  <span className="font-mono text-[8px] text-[rgba(255,255,255,0.4)] tracking-wide text-center">{t.label}</span>
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Toggles */}
          <GlassCard className="p-5" animate={false}>
            <p className="font-mono text-[9px] tracking-[0.3em] text-[rgba(255,255,255,0.3)] uppercase mb-4">Room Controls</p>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Room Lights', state: lightsOn, toggle: () => setLightsOn(!lightsOn) },
                { label: 'Curtains Open', state: curtainsOpen, toggle: () => setCurtainsOpen(!curtainsOpen) },
              ].map(ctrl => (
                <div key={ctrl.label} className="flex items-center justify-between">
                  <span className="font-body text-xs text-[rgba(255,255,255,0.5)]">{ctrl.label}</span>
                  <button
                    onClick={ctrl.toggle}
                    className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
                      ctrl.state ? 'bg-[rgba(212,146,42,0.5)]' : 'bg-[rgba(255,255,255,0.1)]'
                    }`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${
                      ctrl.state ? 'left-5.5 translate-x-0.5' : 'left-0.5'
                    }`} style={{ left: ctrl.state ? '22px' : '2px' }} />
                  </button>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* CTA */}
          <button
            className="magnetic-btn w-full py-4 font-body text-[12px] tracking-[0.2em] uppercase text-[#080808] font-medium transition-all duration-300 hover:opacity-90 rounded-lg"
            style={{ background: 'linear-gradient(135deg, #d4922a, #f4db8e)' }}
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book This Configuration
          </button>
        </div>
      </div>
    </section>
  );
}
