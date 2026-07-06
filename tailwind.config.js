/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'pinoy-red': '#EF233C',
        'pinoy-blue': '#0038A8',
        'pinoy-yellow': '#FFD60A',
        'foodie-coral': '#FF6B6B',
        'foodie-orange': '#FF8C42',
        'foodie-gold': '#FFBE0B',
        'foodie-hot': '#FF4757',
      },
    },
  },
  plugins: [],
}
