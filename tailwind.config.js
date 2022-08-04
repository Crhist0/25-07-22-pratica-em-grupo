/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      'tablet': '700px',
      'desktop': '1280px'
    },
    spacing: {
      '10':'4rem'
    }
  },
  plugins: [],
  important: true,
}
