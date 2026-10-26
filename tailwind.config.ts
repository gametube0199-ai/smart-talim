import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#dfeeff',
          200: '#bfdfff',
          300: '#8cc4ff',
          400: '#4a9dff',
          500: '#1f7ae0',
          600: '#1661b5',
          700: '#124d92',
          800: '#153f75',
          900: '#173862',
        },
        slate: {
          950: '#09111d',
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(31, 122, 224, 0.12)',
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at center, rgba(148, 163, 184, 0.14) 0, rgba(148, 163, 184, 0.14) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

export default config;
