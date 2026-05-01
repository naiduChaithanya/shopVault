/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        vault: {
          50:  "#fdf8f0",
          100: "#f9edda",
          200: "#f2d9b0",
          300: "#e8be7a",
          400: "#dc9f42",
          500: "#c9841e",
          600: "#a86814",
          700: "#874f12",
          800: "#6e4016",
          900: "#5c3617",
          950: "#341c08",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-up": "slideUp 0.35s ease forwards",
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: "translateY(16px)" }, to: { opacity: 1, transform: "translateY(0)" } },
      },
    },
  },
  plugins: [],
};
