'use client';

import { motion } from 'framer-motion';

const LINKS = {
  Experience: ['Rooms & Suites', 'Facilities', 'Gallery', 'Virtual Tour'],
  Services: ['Concierge', 'Dining', 'Wellness', 'Events'],
  Company: ['About Luminary', 'Careers', 'Press', 'Sustainability'],
  Legal: ['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Accessibility'],
};

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gold-500/3 blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 rotate-45 border border-gold-400/60 flex items-center justify-center">
                  <div className="w-2 h-2 rotate-0 bg-gold-400/60" />
                </div>
                <span className="font-cormorant text-white text-xl tracking-wider">LUMINARY</span>
              </div>
              <p className="text-white/25 text-xs leading-relaxed font-mono">
                Where luxury meets<br />the extraordinary.
              </p>
            </div>
            <div className="flex gap-3">
              {['IG', 'TW', 'YT', 'LI'].map(s => (
                <button
                  key={s}
                  className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-white/30 text-[10px] font-mono hover:border-gold-400/40 hover:text-gold-400 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([cat, links]) => (
            <div key={cat}>
              <p className="text-gold-400/60 text-[10px] tracking-[0.25em] uppercase font-mono mb-5">{cat}</p>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/30 hover:text-white/70 text-xs font-mono transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 my-12" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/15 text-[10px] font-mono tracking-widest">
            © 2025 LUMINARY EXCLUSIVE RESIDENCE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6 text-white/15 text-[10px] font-mono">
            <span>JAKARTA, INDONESIA</span>
            <span>✦</span>
            <span>EST. 2025</span>
            <span>✦</span>
            <span>TOWER A — 32F</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
