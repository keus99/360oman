/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          50:  '#f0faf8',
          100: '#ccede8',
          500: '#0D7A6E',
          600: '#0a6860',
          700: '#085550',
        },
        gold: {
          400: '#e8b84d',
          500: '#C9972B',
          600: '#a87820',
        },
        navy: '#1A1A2E',
        surface: '#F8F7F4',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
