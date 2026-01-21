import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
      },
      colors: {
        'nes-primary': '#209cee',
        'nes-success': '#92cc41',
        'nes-warning': '#f7d51d',
        'nes-error': '#e76e55',
        'nes-dark': '#212529',
      },
    },
  },
  plugins: [],
};

export default config;
