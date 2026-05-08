'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../../hooks';

export default function ElevatorTransition() {
  const { ref, inView } = useInView(0.5);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [floor, setFloor] = useState(1);
  const [direction, setDirection] = useState<'up' | null>(null);
  const [vibrating, setVibrating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (inView) {
      // Sequence: doors open → floor count → doors stay open
      setTimeout(() => {
        setDirection('up');
        setVibrating(true);
        intervalRef.current = setInterval(() => {
          setFloor(f => {
            if (f >= 32) {
              clearInterval(intervalRef.current!);
              setVibrating(false);
              setDoorsOpen(true);
              return 32;
            }
            return f + 1;
          });
        }, 60);
      }, 600);
    } else {
      clearInterval(intervalRef.current!);
      setDoorsOpen(false);
      setFloor(1);
      setDirection(null);
      setVibrating(false);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [inView]);

  return (
    <section
      ref={ref}
      id="elevator"
      className="relative w-full h-screen overflow-hidden bg-[#0a0a0a] flex items-center justify-center"
    >
      {/* Elevator shaft background */}
      <div className="absolute inset-0 flex flex-col"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(212,146,42,0.03) 40px, rgba(212,146,42,0.03) 41px)',
        }}
      />

      {/* Elevator cabin */}
      <motion.div
        className="relative z-10 w-full max-w-lg mx-auto"
        animate={vibrating ? { x: [0, -1, 1, -1, 1, 0] } : {}}
        transition={{ duration: 0.1, repeat: vibrating ? Infinity : 0 }}
      >
        {/* Elevator frame */}
        <div className="relative border-2 border-[rgba(212,146,42,0.3)] bg-[#0d0d0d] overflow-hidden"
          style={{ aspectRatio: '3/4', maxHeight: '70vh' }}>

          {/* Elevator interior */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-8">

            {/* Floor indicator display */}
            <div className="w-full glass-panel-gold py-4 px-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1">
                  {[2, 1, 0].map(row => (
                    <div key={row} className="flex gap-1">
                      {[0, 1, 2, 3].map(col => {
                        const num = row * 4 + col + 1;
                        return (
                          <div
                            key={num}
                            className="w-6 h-6 flex items-center justify-center rounded-full text-[9px] font-mono border transition-all duration-300"
                            style={{
                              borderColor: floor >= num ? 'rgba(212,146,42,0.8)' : 'rgba(255,255,255,0.1)',
                              background: floor >= num ? 'rgba(212,146,42,0.2)' : 'transparent',
                              color: floor >= num ? 'rgba(212,146,42,0.9)' : 'rgba(255,255,255,0.2)',
                            }}
                          >
                            {num}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <p className="font-display text-5xl font-light text-white">
                  {String(floor).padStart(2, '0')}
                </p>
                <p className="font-mono text-[9px] tracking-[0.3em] text-[rgba(212,146,42,0.6)] uppercase">Floor</p>
                {direction && (
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-[rgba(212,146,42,0.8)] mt-1"
                  >
                    ▲
                  </motion.div>
                )}
              </div>
            </div>

            {/* Interior wall texture */}
            <div className="w-full h-32 glass-panel flex items-center justify-center">
              <div className="text-center">
                <div className="font-display text-4xl font-light text-[rgba(255,255,255,0.1)] tracking-widest">
                  LUMINARY
                </div>
                <div className="font-mono text-[8px] tracking-[0.5em] text-[rgba(212,146,42,0.2)] uppercase mt-1">
                  Exclusive Living
                </div>
              </div>
            </div>

            {/* Status text */}
            <p className="font-mono text-[10px] tracking-[0.3em] text-[rgba(255,255,255,0.3)] uppercase">
              {floor < 32 ? 'Ascending to penthouse level...' : 'Arrival · The Suite Awaits'}
            </p>
          </div>

          {/* Elevator doors */}
          <AnimatePresence>
            {!doorsOpen && (
              <>
                <motion.div
                  className="elevator-door-left absolute top-0 left-0 w-1/2 h-full z-10"
                  style={{
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2520 50%, #1a1a1a 100%)',
                    borderRight: '1px solid rgba(212,146,42,0.2)',
                  }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Door detail lines */}
                  {[0.25, 0.5, 0.75].map(y => (
                    <div key={y} className="absolute left-4 right-4"
                      style={{
                        top: `${y * 100}%`,
                        height: '1px',
                        background: 'rgba(212,146,42,0.1)',
                      }}
                    />
                  ))}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1 h-12 rounded-full"
                    style={{ background: 'rgba(212,146,42,0.3)' }} />
                </motion.div>

                <motion.div
                  className="elevator-door-right absolute top-0 right-0 w-1/2 h-full z-10"
                  style={{
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2520 50%, #1a1a1a 100%)',
                    borderLeft: '1px solid rgba(212,146,42,0.2)',
                  }}
                  exit={{ x: '100%' }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  {[0.25, 0.5, 0.75].map(y => (
                    <div key={y} className="absolute left-4 right-4"
                      style={{
                        top: `${y * 100}%`,
                        height: '1px',
                        background: 'rgba(212,146,42,0.1)',
                      }}
                    />
                  ))}
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-1 h-12 rounded-full"
                    style={{ background: 'rgba(212,146,42,0.3)' }} />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Gold frame accent */}
        <div className="absolute -inset-[2px] border border-[rgba(212,146,42,0.15)] pointer-events-none" />
        <div className="absolute -inset-[6px] border border-[rgba(212,146,42,0.05)] pointer-events-none" />
      </motion.div>

      {/* Section label */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 left-8 md:left-16 flex flex-col gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-[rgba(212,146,42,0.4)]" />
        <div style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
          <span className="font-mono text-[9px] tracking-[0.4em] text-[rgba(255,255,255,0.2)] uppercase">
            The Ascent
          </span>
        </div>
      </motion.div>
    </section>
  );
}
