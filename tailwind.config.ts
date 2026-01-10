import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': 'rgb(var(--color-primary-50))',
          '100': 'rgb(var(--color-primary-100))',
          '200': 'rgb(var(--color-primary-200))',
          '300': 'rgb(var(--color-primary-300))',
          '400': 'rgb(var(--color-primary-400))',
          '500': 'rgb(var(--color-primary-500))',
          '600': 'rgb(var(--color-primary-600))',
          '700': 'rgb(var(--color-primary-700))',
          '800': 'rgb(var(--color-primary-800))',
          '900': 'rgb(var(--color-primary-900))',
        },
        bg: 'rgb(var(--color-bg))',
        'bg-alt': 'rgb(var(--color-bg-alt))',
        'bg-accent': 'rgb(var(--color-bg-accent))',
        card: 'rgb(var(--color-card))',
        'card-alt': 'rgb(var(--color-card-alt))',
        'color-text': 'rgb(var(--color-text))',
        'color-text-muted': 'rgb(var(--color-text-muted))',
        'color-border': 'rgb(var(--color-border))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 5s ease infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 15px 2px rgba(var(--color-glow), 0.3)' },
          '50%': { boxShadow: '0 0 25px 8px rgba(var(--color-glow), 0.5)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      spacing: {
        'dense-xs': 'calc(0.25rem * var(--density-scale, 1))',
        'dense-sm': 'calc(0.5rem * var(--density-scale, 1))',
        'dense-md': 'calc(1rem * var(--density-scale, 1))',
        'dense-lg': 'calc(1.5rem * var(--density-scale, 1))',
        'dense-xl': 'calc(2rem * var(--density-scale, 1))',
        'dense-2xl': 'calc(2.5rem * var(--density-scale, 1))',
        'dense-3xl': 'calc(3rem * var(--density-scale, 1))',
      },
      safelist: [
        'section-bg-accent',
        'bg-mesh-gradient',
        {
          pattern: /bg-(primary|bg|card)-(50|100|200|300|400|500|600|700|800|900|alt|accent)/,
        },
      ],
      plugins: [],
    },
  },
};

export default config;
