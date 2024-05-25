/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      red:"#dc2626",
      white:"#ffffff",
      black:"#000000",
      blue:"#2563eb",
      "gray-dark":"#27272a",
      "gray-light":"#d1d5db",
      "blue-light":"#60a5fa"


    }
  },
  plugins: [],
}