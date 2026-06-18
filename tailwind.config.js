/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Outfit"', 'system-ui', 'sans-serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
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
        brand: {
          DEFAULT: 'var(--brand)',
          dim:    'var(--brand-dim)',
          bright: 'var(--brand-bright)',
        },
        accent: {
          green:  '#10B981',
          blue:   '#38BDF8',
          purple: '#A78BFA',
          orange: '#FB923C',
          red:    '#F87171',
          yellow: '#FBBF24',
        },
        text: {
          primary:   'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted:     'var(--text-muted)',
        },
      },
      animation: {
        'fade-in':  'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out both',
        'float':    'float 5s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:     { from: { opacity: '0' },                               to: { opacity: '1' } },
        slideUp:    { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        float:      { '0%,100%': { transform: 'translateY(0px)' },          '50%': { transform: 'translateY(-10px)' } },
        pulseSoft:  { '0%,100%': { opacity: '1' },                          '50%': { opacity: '0.5' } },
      },
    },
  },
  plugins: [],
};
