/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Candara"', '"Candara Condensed"', 'Calibri', 'Trebuchet MS', 'system-ui', 'sans-serif'],
        body:    ['"Candara"', '"Candara Condensed"', 'Calibri', 'Trebuchet MS', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      colors: {
        surface: {
          0: 'var(--surface-0)',
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
          4: 'var(--surface-4)',
        },
        accent: {
          green:  '#59CD90',
          purple: '#AA7DCE',
          blue:   '#3FA7D6',
          orange: '#F3752B',
          red:    '#f87171',
          yellow: '#fbbf24',
        },
        text: {
          primary:   'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted:     'var(--text-muted)',
        },
      },
      animation: {
        'fade-in':        'fadeIn 0.5s ease-out',
        'slide-up':       'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pulse-soft':     'pulseSoft 2s infinite',
        'glow':           'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn:       { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:      { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { '0%': { opacity: '0', transform: 'translateX(-12px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        pulseSoft:    { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.6' } },
        glow: {
          '0%':   { boxShadow: '0 0 5px rgba(89, 205, 144, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(89, 205, 144, 0.4)' },
        },
      },
    },
  },
  plugins: [],
};
