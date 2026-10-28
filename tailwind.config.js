/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/common/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          2: 'rgb(var(--accent-2) / <alpha-value>)',
          ink: 'rgb(var(--accent-ink) / <alpha-value>)',
          solid: 'rgb(var(--accent-solid) / <alpha-value>)',
        },
      },
      animation: {
        'hidden-fade': 'wiggle 400ms ease-in',
        shimmer: 'shimmer 1.6s ease-in-out infinite',
        progress: 'progress 1.4s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        progress: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(250%)' },
        },
      },
      boxShadow: {
        '3xl': '1px 2px 12px 1px rgba(0,0,0,0.69)',
      },
      screens: {
        watch: { min: '50px', max: '359px' },
        xs: { min: '360px', max: '639px' },
        'custom-xs': { max: '820px' },
        'custom-sm': { min: '821px' },
        '2xl': '1536px',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [],
}
