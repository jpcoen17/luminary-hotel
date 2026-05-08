'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiRobot2Line, RiCloseLine, RiSendPlane2Line } from 'react-icons/ri';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const PRESET_QUESTIONS = [
  'What are your room types?',
  'Tell me about amenities',
  'What\'s the check-in time?',
  'Do you have parking?',
];

const AUTO_RESPONSES: Record<string, string> = {
  default: 'Welcome to LUMINARY. I\'m your AI concierge. I can help you with room information, pricing, facilities, and booking. How may I assist you?',
  rooms: 'We offer four exclusive room categories: Studio Japandi (from IDR 2.8M), Urban Loft (from IDR 3.2M), The Luminary Suite (from IDR 5.5M), and our crown jewel — Apex Penthouse (from IDR 12M). Each is a curated experience, not merely a room.',
  amenities: 'LUMINARY features a rooftop infinity pool, performance gym, The Atelier co-working space, Noir Café & Lounge, and a rooftop garden with telescope observatory. All amenities are available 24/7 for residents.',
  checkin: 'Check-in begins at 14:00 and checkout is at 12:00. Early check-in and late checkout can be arranged subject to availability — please contact us 48 hours in advance.',
  parking: 'We offer complimentary underground parking for all residents. Valet service is available upon request.',
  pool: 'Our infinity pool on the 32nd floor is heated year-round, open from 06:00 to 23:00. Private cabana reservations are available.',
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('room') || lower.includes('suite') || lower.includes('type')) return AUTO_RESPONSES.rooms;
  if (lower.includes('ameniti') || lower.includes('facilit') || lower.includes('gym') || lower.includes('pool')) return AUTO_RESPONSES.amenities;
  if (lower.includes('check') || lower.includes('arrive') || lower.includes('time')) return AUTO_RESPONSES.checkin;
  if (lower.includes('park') || lower.includes('car') || lower.includes('valet')) return AUTO_RESPONSES.parking;
  if (lower.includes('pool') || lower.includes('swim')) return AUTO_RESPONSES.pool;
  return 'Thank you for your question. Our team would be delighted to provide you with personalized assistance. For bespoke requests, please call +62 21 5555 0100 or use our booking system to include special instructions.';
}

export default function AIConcierge() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'assistant', content: AUTO_RESPONSES.default },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));
    const response = getResponse(text);
    const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response };
    setMessages(prev => [...prev, assistantMsg]);
    setTyping(false);
  };

  return (
    <>
      {/* Trigger button */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #8c5225, #d4922a)',
          boxShadow: '0 0 30px rgba(212,146,42,0.4)',
        }}
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }}><RiCloseLine size={20} color="white" /></motion.div>
            : <motion.div key="robot" initial={{ rotate: 90 }} animate={{ rotate: 0 }}><RiRobot2Line size={20} color="white" /></motion.div>
          }
        </AnimatePresence>

        {/* Pulse ring */}
        {!open && (
          <div className="absolute inset-0 rounded-full border border-[rgba(212,146,42,0.4)] animate-ping" />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-28 right-8 z-50 w-[340px] max-h-[520px] flex flex-col glass-panel overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-[rgba(255,255,255,0.06)]">
              <div className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #8c5225, #d4922a)' }}>
                <RiRobot2Line size={16} color="white" />
              </div>
              <div>
                <p className="font-body text-sm font-medium text-white">LUMINARY Concierge</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <p className="font-mono text-[10px] text-[rgba(255,255,255,0.4)]">Available 24/7</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" style={{ maxHeight: '320px' }}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-lg font-body text-[12px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[rgba(212,146,42,0.2)] text-white border border-[rgba(212,146,42,0.3)]'
                        : 'bg-[rgba(255,255,255,0.04)] text-[rgba(255,255,255,0.8)] border border-[rgba(255,255,255,0.06)]'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] px-4 py-3 rounded-lg flex gap-1.5">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-[rgba(212,146,42,0.6)]"
                        style={{ animation: `bounce 1.2s ${i * 0.2}s ease-in-out infinite` }} />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Presets */}
            <div className="px-4 py-2 flex gap-2 flex-wrap border-t border-[rgba(255,255,255,0.04)]">
              {PRESET_QUESTIONS.map(q => (
                <button key={q} onClick={() => sendMessage(q)}
                  className="font-mono text-[9px] tracking-wide px-2 py-1 border border-[rgba(212,146,42,0.3)] text-[rgba(212,146,42,0.7)] rounded hover:bg-[rgba(212,146,42,0.1)] transition-colors">
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 pt-2 flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask anything..."
                className="flex-1 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 font-body text-[12px] text-white placeholder-[rgba(255,255,255,0.25)] outline-none focus:border-[rgba(212,146,42,0.4)] transition-colors"
              />
              <button
                onClick={() => sendMessage(input)}
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #8c5225, #d4922a)' }}
              >
                <RiSendPlane2Line size={14} color="white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
      `}</style>
    </>
  );
}
