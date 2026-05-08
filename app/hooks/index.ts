'use client';

import { useEffect, useRef, useState, useCallback, RefObject } from 'react';
import { lerp, clamp } from '../lib/utils';

// Mouse position hook with smooth lerp
export function useMousePosition(smoothing = 0.08) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const rawPos = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      rawPos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
      setPosition(rawPos.current);
    };

    const animate = () => {
      smoothPos.current = {
        x: lerp(smoothPos.current.x, rawPos.current.x, smoothing),
        y: lerp(smoothPos.current.y, rawPos.current.y, smoothing),
      };
      setSmoothPosition({ ...smoothPos.current });
      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, [smoothing]);

  return { position, smoothPosition, x: position.x, y: position.y };
}

// Scroll progress hook
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [section, setSection] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = clamp(scrollTop / (docHeight || 1), 0, 1);

      setVelocity(scrollTop - lastScroll.current);
      lastScroll.current = scrollTop;
      setProgress(currentProgress);

      const currentSection = Math.floor(currentProgress * 8);
      setSection(Math.min(currentSection, 7));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { progress, section, velocity };
}

// ---------------------------------------------------------------------------
// useInView — two calling styles:
//
//   Style A (hook owns the ref):
//     const { ref, inView } = useInView(0.2);
//     <div ref={ref}>…</div>
//
//   Style B (caller owns the ref):
//     const ref = useRef<HTMLDivElement>(null);
//     const inView = useInView(ref, 0.2);
//     <div ref={ref}>…</div>
// ---------------------------------------------------------------------------

function safeThreshold(value: unknown): number {
  const n = Number(value);
  if (typeof n === 'number' && isFinite(n)) return Math.min(Math.max(n, 0), 1);
  return 0.1;
}

// Style A — hook manages ref
export function useInView(threshold?: number, rootMargin?: string): { ref: RefObject<HTMLDivElement>; inView: boolean };

// Style B — caller passes ref
export function useInView(ref: RefObject<HTMLElement | HTMLDivElement | null>, threshold?: number, rootMargin?: string): boolean;

// Implementation
export function useInView(
  firstArg?: number | RefObject<HTMLElement | HTMLDivElement | null>,
  secondArg?: number | string,
  thirdArg?: string
): { ref: RefObject<HTMLDivElement>; inView: boolean } | boolean {
  const internalRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Determine calling style
  const isStyleB =
    firstArg !== null &&
    typeof firstArg === 'object' &&
    'current' in (firstArg as object);

  const externalRef = isStyleB
    ? (firstArg as RefObject<HTMLElement | HTMLDivElement | null>)
    : null;

  const threshold = isStyleB
    ? safeThreshold(secondArg)
    : safeThreshold(firstArg);

  const rootMargin = isStyleB
    ? (typeof thirdArg === 'string' ? thirdArg : '0px')
    : (typeof secondArg === 'string' ? secondArg : '0px');

  useEffect(() => {
    const target = externalRef ? externalRef.current : internalRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold, rootMargin }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [externalRef, threshold, rootMargin]);

  if (isStyleB) return inView;
  return { ref: internalRef as RefObject<HTMLDivElement>, inView };
}

// Lenis smooth scroll hook
export function useLenis() {
  const lenisRef = useRef<unknown>(null);

  useEffect(() => {
    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('lenis');
        const lenis = new Lenis({
          duration: 1.6,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
        });

        lenisRef.current = lenis;

        const raf = (time: number) => {
          (lenis as { raf: (time: number) => void }).raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      } catch (e) {
        // Lenis not available, skip smooth scroll
      }
    };

    initLenis();

    return () => {
      if (lenisRef.current) {
        (lenisRef.current as { destroy: () => void }).destroy();
      }
    };
  }, []);

  return lenisRef;
}

// Audio hook using Web Audio API
export function useAudio() {
  const [muted, setMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ambientRef = useRef<HTMLAudioElement | null>(null);

  const toggleMute = useCallback(() => {
    setMuted(prev => {
      const next = !prev;
      if (audioRef.current) audioRef.current.muted = next;
      if (ambientRef.current) ambientRef.current.muted = next;
      return next;
    });
  }, []);

  const playElevatorDing = useCallback(() => {
    if (typeof window === 'undefined' || muted) return;
    try {
      const ctx = new AudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.frequency.setValueAtTime(880, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.5);
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 1);
    } catch (e) {
      // Audio context not available
    }
  }, [muted]);

  return { muted, toggleMute, playElevatorDing, audioRef, ambientRef };
}

// Window size hook
export function useWindowSize() {
  const [size, setSize] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// Keyboard shortcut hook
export function useKeyboard(key: string, callback: () => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === key) callback();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, callback]);
}
