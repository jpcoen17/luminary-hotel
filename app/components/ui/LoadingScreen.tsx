'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete?: () => void;
}

const MESSAGES = [
  'Initializing environment...',
  'Calibrating lighting systems...',
  'Rendering luxury spaces...',
  'Polishing marble surfaces...',
  'Preparing your arrival...',
  'Welcome to LUMINARY.',
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading');

  useEffect(() => {
    // Simple timer: 3 seconds total, progress 0→100
    const DURATION = 3000;
    const INTERVAL = 50;
    const steps = DURATION / INTERVAL;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const p = Math.min(Math.round((step / steps) * 100), 100);
      setProgress(p);
      setMsgIndex(Math.min(Math.floor((p / 100) * MESSAGES.length), MESSAGES.length - 1));

      if (p >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setPhase('reveal');
          setTimeout(() => {
            setPhase('done');
            onComplete?.();
          }, 1500);
        }, 300);
      }
    }, INTERVAL);

    return () => clearInterval(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (phase === 'done') return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#080808] flex flex-col items-center justify-center"
      animate={{ opacity: phase === 'reveal' ? [1, 1, 0] : 1 }}
      transition={{ duration: 1.5, times: [0, 0.5, 1] }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(212,146,42,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,146,42,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {phase === 'loading' && (
        <div className="flex flex-col items-center gap-12">
          {/* Logo */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="w-16 h-16 border border-[rgba(212,146,42,0.4)] rotate-45 flex items-center justify-center">
                <div className="w-8 h-8 bg-[rgba(212,146,42,0.15)] border border-[rgba(212,146,42,0.6)]" />
              </div>
            </div>
            <div className="text-center mt-2">
              <p className="font-mono text-[10px] tracking-[0.4em] text-[rgba(212,146,42,0.6)] uppercase mb-2">
                Exclusive Living
              </p>
              <h1 className="font-cormorant text-4xl font-light tracking-[0.15em] text-[#f5f3ef]">
                LUMINARY
              </h1>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-72 flex flex-col gap-4 items-center">
            <div className="w-full h-[1px] bg-[rgba(255,255,255,0.08)] relative overflow-hidden">
              <div
                className="h-full transition-all duration-100"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #8c5225, #d4922a, #f4db8e)',
                }}
              />
            </div>
            <div className="flex justify-between w-full">
              <p className="font-mono text-[11px] text-[rgba(255,255,255,0.35)] tracking-widest">
                {MESSAGES[msgIndex]}
              </p>
              <p className="font-mono text-[11px] text-[rgba(212,146,42,0.8)] tracking-widest">
                {String(progress).padStart(3, '0')}%
              </p>
            </div>
          </div>

          <p className="font-mono text-[9px] tracking-[0.3em] text-[rgba(255,255,255,0.15)] uppercase">
            Immersive Experience Loading
          </p>
        </div>
      )}

      {phase === 'reveal' && (
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="font-cormorant text-6xl md:text-8xl font-light tracking-[0.1em]"
            style={{
              background: 'linear-gradient(135deg, #d4922a 0%, #f4db8e 50%, #d4922a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Welcome
          </h2>
          <p className="font-mono text-sm tracking-[0.3em] text-[rgba(255,255,255,0.4)] uppercase">
            Your experience begins
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}