/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mission-control': {
          bg: '#0f172a', // slate-900
          dark: '#020617', // slate-950
        }
      }
    },
  },
  plugins: [],
}
