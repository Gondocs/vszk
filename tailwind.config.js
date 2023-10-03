/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '2px 2px 15px 1px rgba(0, 0, 0, 0.1)'
      }
    },
  },
  plugins: [],
}