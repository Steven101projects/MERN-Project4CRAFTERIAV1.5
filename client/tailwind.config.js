/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {      
      fontFamily: {
        rocatwo: ["'Roca Two'", "serif"],
        spartan: ["'League Spartan'", "sans-serif"],
      },
    },
  },
  plugins: [],
}
