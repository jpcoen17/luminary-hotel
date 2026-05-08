'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../../hooks';
import { ROOMS } from '../../lib/constants';

const ROOM_OPTIONS = ['Luminary Suite', 'Executive Suite', 'Sky Penthouse', 'Garden Residence'];

export default function BookingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.2);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(ROOM_OPTIONS[0]);
  const [guests, setGuests] = useState(2);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBook = () => {
    if (!checkIn || !checkOut) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2200);
  };

  return (
    <section
      id="booking"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080808] py-32"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold-500/5 blur-[120px]" />
      </div>

      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-gold-400 tracking-[0.35em] text-xs uppercase font-mono mb-4">Reserve Your Stay</p>
          <h2 className="font-cormorant text-5xl md:text-7xl font-light text-white leading-none mb-6">
            Begin Your<br />
            <span className="italic text-gold-300">Experience</span>
          </h2>
          <p className="text-white/40 text-sm max-w-md mx-auto leading-relaxed">
            Every detail curated. Every moment considered. Your sanctuary awaits.
          </p>
        </motion.div>

        {/* Booking Panel */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Glass card */}
              <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl overflow-hidden">
                {/* Top gold line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />

                <div className="p-8 md:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Check In */}
                    <div className="space-y-2">
                      <label className="block text-white/40 text-[10px] tracking-[0.25em] uppercase font-mono">Check In</label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={e => setCheckIn(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-400/50 transition-colors"
                      />
                    </div>

                    {/* Check Out */}
                    <div className="space-y-2">
                      <label className="block text-white/40 text-[10px] tracking-[0.25em] uppercase font-mono">Check Out</label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={e => setCheckOut(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-400/50 transition-colors"
                      />
                    </div>

                    {/* Room Type */}
                    <div className="space-y-2">
                      <label className="block text-white/40 text-[10px] tracking-[0.25em] uppercase font-mono">Room Type</label>
                      <select
                        value={selectedRoom}
                        onChange={e => setSelectedRoom(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-400/50 transition-colors appearance-none"
                      >
                        {ROOM_OPTIONS.map(r => (
                          <option key={r} value={r} className="bg-[#1a1a1a]">{r}</option>
                        ))}
                      </select>
                    </div>

                    {/* Guests */}
                    <div className="space-y-2">
                      <label className="block text-white/40 text-[10px] tracking-[0.25em] uppercase font-mono">Guests</label>
                      <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                        <button
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          className="text-white/60 hover:text-gold-400 transition-colors text-lg leading-none"
                        >−</button>
                        <span className="flex-1 text-center text-white text-sm">{guests} Guest{guests > 1 ? 's' : ''}</span>
                        <button
                          onClick={() => setGuests(Math.min(6, guests + 1))}
                          className="text-white/60 hover:text-gold-400 transition-colors text-lg leading-none"
                        >+</button>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/5 mb-8" />

                  {/* Summary + CTA */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-1">
                      <p className="text-white/30 text-xs tracking-widest uppercase font-mono">Selected</p>
                      <p className="text-white font-cormorant text-2xl">{selectedRoom}</p>
                      {checkIn && checkOut && (
                        <p className="text-white/40 text-xs font-mono">
                          {checkIn} → {checkOut}
                        </p>
                      )}
                    </div>

                    <motion.button
                      onClick={handleBook}
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative group overflow-hidden px-12 py-4 rounded-full border border-gold-400/40 text-gold-300 text-sm tracking-[0.2em] uppercase font-mono transition-all hover:border-gold-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-gold-600/20 to-gold-400/20"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '0%' }}
                        transition={{ duration: 0.4 }}
                      />
                      <span className="relative z-10 flex items-center gap-3">
                        {loading ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-4 h-4 border border-gold-400/40 border-t-gold-400 rounded-full block"
                            />
                            Processing...
                          </>
                        ) : 'Reserve Now'}
                      </span>
                    </motion.button>
                  </div>
                </div>

                {/* Bottom gold line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
              </div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="flex items-center justify-center gap-8 mt-8 text-white/20 text-[10px] tracking-[0.2em] uppercase font-mono"
              >
                <span>✦ Instant Confirmation</span>
                <span>✦ Free Cancellation</span>
                <span>✦ Best Rate Guarantee</span>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center py-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 rounded-full border border-gold-400/40 flex items-center justify-center mx-auto mb-8"
              >
                <span className="text-gold-400 text-3xl">✦</span>
              </motion.div>
              <h3 className="font-cormorant text-4xl text-white mb-4">Reservation Confirmed</h3>
              <p className="text-white/40 text-sm max-w-sm mx-auto leading-relaxed">
                Welcome to Luminary. A confirmation has been sent. We look forward to your arrival.
              </p>
              <motion.button
                onClick={() => setSubmitted(false)}
                className="mt-8 text-gold-400/60 text-xs tracking-widest uppercase font-mono hover:text-gold-400 transition-colors"
              >
                Make Another Reservation →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
