/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e1e9ff',
          200: '#c8d7ff',
          300: '#a3bcff',
          400: '#7594ff',
          500: '#4c65ff',
          600: '#3541ff',
          700: '#262aff',
          800: '#1e21d6',
          900: '#1d21ab',
          950: '#14146a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
