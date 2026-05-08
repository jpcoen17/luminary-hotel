'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete = () => {} }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading');
  const [loadingText, setLoadingText] = useState('Initializing environment...');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const loadingMessages = [
    'Initializing environment...',
    'Calibrating lighting systems...',
    'Rendering luxury spaces...',
    'Polishing marble surfaces...',
    'Adjusting atmospheric fog...',
    'Preparing your arrival...',
    'Welcome to LUMINARY.',
  ];

  useEffect(() => {
    let currentProgress = 0;
    let messageIndex = 0;

    intervalRef.current = setInterval(() => {
      const increment = Math.random() * 12 + 3;
      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(Math.floor(currentProgress));

      const msgIndex = Math.floor((currentProgress / 100) * (loadingMessages.length - 1));
      if (msgIndex !== messageIndex) {
        messageIndex = msgIndex;
        setLoadingText(loadingMessages[Math.min(msgIndex, loadingMessages.length - 1)]);
      }

      if (currentProgress >= 100) {
        clearInterval(intervalRef.current!);
        setTimeout(() => {
          setPhase('reveal');
          setTimeout(() => {
            setPhase('done');
            setTimeout(onComplete, 600);
          }, 1800);
        }, 400);
      }
    }, 120);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#080808] flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(212,146,42,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,146,42,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(212,146,42,0.06) 0%, transparent 70%)',
            }}
          />

          <AnimatePresence mode="wait">
            {phase === 'loading' && (
              <motion.div
                key="loading"
                className="flex flex-col items-center gap-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                {/* Logo */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <div className="w-16 h-16 border border-[rgba(212,146,42,0.4)] rotate-45 flex items-center justify-center">
                      <div className="w-8 h-8 bg-[rgba(212,146,42,0.15)] border border-[rgba(212,146,42,0.6)]" />
                    </div>
                    <div className="absolute inset-0 border border-[rgba(212,146,42,0.15)] rotate-45 scale-150 animate-pulse" />
                  </div>

                  <div className="text-center mt-2">
                    <p className="font-mono text-[10px] tracking-[0.4em] text-[rgba(212,146,42,0.6)] uppercase mb-2">
                      Exclusive Living
                    </p>
                    <h1 className="font-display text-4xl font-light tracking-[0.15em] text-[#f5f3ef]">
                      LUMINARY
                    </h1>
                  </div>
                </div>

                {/* Progress */}
                <div className="w-72 flex flex-col gap-4 items-center">
                  {/* Bar */}
                  <div className="w-full h-[1px] bg-[rgba(255,255,255,0.08)] relative overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, #8c5225, #d4922a, #f4db8e)',
                      }}
                      transition={{ duration: 0.1 }}
                    />
                    <div
                      className="absolute top-0 h-full w-8 opacity-60"
                      style={{
                        left: `${progress - 4}%`,
                        background: 'linear-gradient(90deg, transparent, rgba(244,219,142,0.8), transparent)',
                      }}
                    />
                  </div>

                  {/* Numbers & text */}
                  <div className="flex justify-between w-full items-center">
                    <p className="font-mono text-[11px] text-[rgba(255,255,255,0.35)] tracking-widest">
                      {loadingText}
                    </p>
                    <p className="font-mono text-[11px] text-[rgba(212,146,42,0.8)] tracking-widest">
                      {String(progress).padStart(3, '0')}%
                    </p>
                  </div>
                </div>

                {/* Bottom label */}
                <p className="font-mono text-[9px] tracking-[0.3em] text-[rgba(255,255,255,0.15)] uppercase">
                  Immersive Experience Loading
                </p>
              </motion.div>
            )}

            {phase === 'reveal' && (
              <motion.div
                key="reveal"
                className="flex flex-col items-center gap-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.h2
                  className="font-display text-6xl md:text-8xl font-light tracking-[0.1em] text-center"
                  style={{
                    background: 'linear-gradient(135deg, #d4922a 0%, #f4db8e 50%, #d4922a 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Welcome
                </motion.h2>
                <motion.p
                  className="font-body text-sm tracking-[0.3em] text-[rgba(255,255,255,0.4)] uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  Your experience begins
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
