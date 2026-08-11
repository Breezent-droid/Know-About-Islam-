tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        islamic: {
          primary: "#065f46", // Emerald 800
          secondary: "#047857", // Emerald 700
          accent: "#fbbf24", // Amber 400
          background: "#f0fdf4", // Emerald 50
          text: "#064e3b", // Emerald 900
        },
      },
    },
  },
  plugins: [],
}
