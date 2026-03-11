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
          bg: '#111827',
          dark: '#0A0F1C',
        },
        'brand-blue': '#3B82F6',
        'brand-purple': '#8B5CF6',
        'brand-cyan': '#06B6D4',
        'bg-primary': '#0A0F1C',
        'bg-secondary': '#111827',
        'bg-surface': '#1F2937',
      },
      fontFamily: {
        heading: ["'Montserrat'", 'sans-serif'],
        body: ["'Inter'", 'sans-serif'],
        code: ["'Fira Code'", 'monospace'],
      }
    },
  },
  plugins: [],
}
