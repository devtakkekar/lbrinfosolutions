/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{html,ts,js}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B213F',
          50: '#F0F4FA',
          100: '#D9E2F0',
          200: '#A8BDD9',
          300: '#7798C2',
          400: '#4A7BAF',
          500: '#336699',
          600: '#1D4E96',
          700: '#123566',
          800: '#0B213F',
          900: '#071527',
        },
        blue: {
          primary: '#1A5FCC',
          accent: '#2A87FF',
          light: '#5CA5FF',
          muted: '#8FC2FF',
        },
        gray: {
          50: '#F7F9FC',
          100: '#EEF1F6',
          200: '#E2E6EE',
          300: '#CDD3DE',
          400: '#8A9BB5',
          500: '#6B7A94',
          600: '#4A5568',
          700: '#2D3748',
          800: '#1A2332',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h2': ['1.875rem', { lineHeight: '1.35', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h3': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
      maxWidth: {
        'container': '1280px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'sm': '3px',
        'DEFAULT': '4px',
        'md': '6px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(11, 33, 63, 0.06)',
        'card-hover': '0 4px 20px rgba(11, 33, 63, 0.08)',
        'nav': '0 1px 2px rgba(11, 33, 63, 0.05)',
        'dropdown': '0 8px 30px rgba(11, 33, 63, 0.12)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.3s ease-out forwards',
        "word-spin": "wordSpin 6s infinite",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        wordSpin: {
          '0%':   { transform: 'translateY(0%)' },
          '15%':  { transform: 'translateY(0%)' },
          '20%':  { transform: 'translateY(-20%)' },
          '35%':  { transform: 'translateY(-20%)' },
          '40%':  { transform: 'translateY(-40%)' },
          '55%':  { transform: 'translateY(-40%)' },
          '60%':  { transform: 'translateY(-60%)' },
          '75%':  { transform: 'translateY(-60%)' },
          '80%':  { transform: 'translateY(-80%)' },
          '95%':  { transform: 'translateY(-80%)' },
          '100%': { transform: 'translateY(-80%)' },
        },
      },
    },
  },
  plugins: [],
};
