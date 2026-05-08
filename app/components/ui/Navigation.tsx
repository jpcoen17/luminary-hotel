'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../../lib/constants';
import { RiVolumeUpLine, RiVolumeMuteLine, RiMenuLine, RiCloseLine } from 'react-icons/ri';

interface NavigationProps {
  muted: boolean;
  onToggleMute: () => void;
  scrollProgress: number;
}

export default function Navigation({ muted, onToggleMute, scrollProgress }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setScrolled(scrollProgress > 0.02);
  }, [scrollProgress]);

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      {/* Progress bar */}
      <div
        className="progress-bar"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Main nav */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? 'glass-panel px-6 py-3' : ''
          }`}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 border border-[rgba(212,146,42,0.6)] rotate-45 flex items-center justify-center flex-shrink-0">
              <div className="w-3 h-3 bg-[rgba(212,146,42,0.4)]" />
            </div>
            <div>
              <span className="font-display text-xl font-medium tracking-[0.15em] text-white">
                LUMINARY
              </span>
              <span className="block font-mono text-[8px] tracking-[0.3em] text-[rgba(212,146,42,0.7)] uppercase -mt-1">
                Exclusive Living
              </span>
            </div>
          </div>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.slice(0, -1).map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="magnetic-btn font-body text-[13px] tracking-[0.1em] text-[rgba(255,255,255,0.5)] hover:text-[rgba(212,146,42,0.9)] transition-colors duration-300 uppercase"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-4">
            {/* Mute button */}
            <button
              onClick={onToggleMute}
              className="magnetic-btn w-9 h-9 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[rgba(255,255,255,0.4)] hover:text-[rgba(212,146,42,0.8)] hover:border-[rgba(212,146,42,0.3)] transition-all duration-300"
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              {muted ? <RiVolumeMuteLine size={14} /> : <RiVolumeUpLine size={14} />}
            </button>

            {/* Book CTA */}
            <button
              onClick={() => scrollToSection('#booking')}
              className="magnetic-btn hidden md:flex items-center gap-2 px-5 py-2 border border-[rgba(212,146,42,0.5)] text-[rgba(212,146,42,0.9)] font-body text-[12px] tracking-[0.15em] uppercase hover:bg-[rgba(212,146,42,0.1)] transition-all duration-300"
            >
              Book Now
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden magnetic-btn w-9 h-9 flex items-center justify-center text-[rgba(255,255,255,0.6)]"
            >
              {menuOpen ? <RiCloseLine size={20} /> : <RiMenuLine size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[rgba(8,8,8,0.97)] backdrop-blur-xl flex flex-col items-center justify-center"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="font-display text-4xl font-light tracking-[0.05em] text-white hover:text-[rgba(212,146,42,0.9)] transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.2, duration: 0.5 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <motion.p
              className="absolute bottom-12 font-mono text-[10px] tracking-[0.3em] text-[rgba(255,255,255,0.2)] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Jakarta Selatan, Indonesia
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
