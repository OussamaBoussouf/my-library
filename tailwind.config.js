/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "roboto-bold": 'Roboto-bold, sans-serif', // Adds a new `font-display` class
        "roboto-light": 'Roboto-light, sans-serif',
        "poetsenOne": 'PoetsenOne, sans-serif'
      },
      gridTemplateColumns:{
        "fill": "repeat(auto-fill,minmax(240px, 1fr))"
      },
      backgroundColor:{
        "transparent-black": 'rgba(0, 0, 0, 0.5)'
      }
    },
  },
  plugins: [],
}

