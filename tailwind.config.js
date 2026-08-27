/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bt-pink-light': '#fff0f5',
        'bt-pink-main': '#ffc1e3',
        'bt-gold': '#d4af37',
        'bt-gold-light': '#f3e5ab',
        'bt-black': '#1a1a1a',
        'bt-text': '#4a4a4a',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Quicksand"', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      backgroundImage: {
        'shimmer': "linear-gradient(45deg, rgba(212, 175, 55, 0.1) 25%, transparent 25%, transparent 50%, rgba(212, 175, 55, 0.1) 50%, rgba(212, 175, 55, 0.1) 75%, transparent 75%, transparent)"
      }
    },
  },
  plugins: [],
};
