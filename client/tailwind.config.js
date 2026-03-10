/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* =============================
       * Custom color palette
       * - neon-blue:    primary accent (cyan-ish)
       * - neon-purple:  secondary accent
       * - neon-green:   success / highlight
       * - cyber-mint:   premium mint accent
       * - dark-bg/card: dark backgrounds for the dark theme
       * ============================= */
      colors: {
        'neon-blue': '#00f3ff',
        'neon-purple': '#bc13fe',
        'neon-green': '#0aff0a',
        'cyber-mint': '#00ff9d',
        'dark-bg': '#050505',
        'dark-card': '#0a0a0a',
        card: 'rgba(255, 255, 255, 0.05)',
      },

      /* Font families loaded from Google Fonts CDN */
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },

      /* =============================
       * Custom animations
       * - spin-slow:      very slow infinite rotation
       * - pulse-fast:     quicker pulse for glow effects
       * - float:          gentle floating up-and-down
       * - glow-pulse:     pulsing glow ring effect
       * - gradient-shift: shifting gradient background
       * - fade-in-up:     slide up + fade in on load
       * ============================= */
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      },

      /* Keyframes that power the custom animations above */
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
