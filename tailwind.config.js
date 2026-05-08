/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        jakarta: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Courier New', 'monospace'],
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: {
          50:  '#fefdf5',
          100: '#fdf8e1',
          200: '#fbedb8',
          300: '#f4db8e',
          400: '#e8c56a',
          500: '#d4922a',
          600: '#b8741a',
          700: '#8f5412',
          800: '#6b3d0e',
          900: '#4a280a',
        },
        charcoal: {
          50:  '#f5f5f5',
          100: '#e0e0e0',
          200: '#c0c0c0',
          300: '#909090',
          400: '#606060',
          500: '#3a3a3a',
          600: '#2a2a2a',
          700: '#1e1e1e',
          800: '#141414',
          900: '#0a0a0a',
        },
        marble: {
          light: '#f5f0eb',
          DEFAULT: '#e8e0d5',
          dark: '#c5b9aa',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'fade-in': 'fadeIn 0.8s ease forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'elevator-open': 'elevatorOpen 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 146, 42, 0.1)' },
          '50%': { boxShadow: '0 0 60px rgba(212, 146, 42, 0.3)' },
        },
        elevatorOpen: {
          from: { transform: 'scaleX(1)' },
          to: { transform: 'scaleX(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
