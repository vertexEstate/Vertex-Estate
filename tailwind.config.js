
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* DiyWeb: pure black → zinc neutrals (legacy `navy`) */
        navy: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#000000',
        },
        /* DiyWeb: white / stone accents only — NO blue (legacy `gold`) */
        gold: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#eceae4',
          300: '#ddd8cd',
          400: '#a1a1aa',
          500: '#f2f2f2',
          600: '#d4d4d8',
          700: '#ada996',
          800: '#71717a',
          900: '#52525b',
        },
        cream: '#f8f8f6',
        stone: {
          DEFAULT: '#ada996',
          50: '#f0ece0',
          100: '#eceae4',
          200: '#ddd8cd',
          300: '#c8c4b4',
          400: '#ada996',
          500: '#a8a498',
          600: '#7a7870',
        },
        charcoal: '#18181b',
        /* Subtle trust green — use sparingly */
        accent: {
          green: '#22c55e',
          'green-soft': 'rgba(34, 197, 94, 0.12)',
          'green-border': 'rgba(34, 197, 94, 0.35)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 24px rgba(255, 255, 255, 0.06)',
        'gold-glow-lg': '0 0 48px rgba(255, 255, 255, 0.08)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        'luxury-card': '0 0 0 1px rgba(255, 255, 255, 0.06)',
        'luxury-card-hover': '0 0 0 1px rgba(255, 255, 255, 0.12)',
        'btn-primary': 'none',
        'btn-primary-hover': 'none',
        'btn-secondary': 'none',
        'btn-secondary-hover': 'none',
      },
      backdropBlur: { xs: '2px' },
      borderRadius: {
        luxury: '1rem',
        'luxury-lg': '1.25rem',
        'luxury-xl': '1.5rem',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 48s linear infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
        shimmer: 'shimmer 3.5s ease-in-out infinite',
        'ambient-breathe': 'ambientBreathe 14s ease-in-out infinite',
        'hero-burns': 'heroKenBurns 28s ease-in-out infinite alternate',
        'fade-up': 'fadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ambientBreathe: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.35' },
        },
        heroKenBurns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.04)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-120%) skewX(-12deg)', opacity: '0' },
          '100%': { transform: 'translateX(220%) skewX(-12deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
