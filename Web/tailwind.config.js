/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ddf4f2",
          100: "#aae3de",
          200: "#6ed2c9",
          300: "#00bfb2",
          400: "#00b0a1",
          500: "#00a18f",
          600: "#009381",
          700: "#008370",
          800: "#007361",
          900: "#005643"
        },
        secondary: {
          50: "#f4fcf5",
          100: "#eef6f0",
          200: "#e7eee8",
          300: "#d8dfd9",
          400: "#b5bcb6",
          500: "#969d97",
          600: "#6d746e",
          700: "#5a605b",
          800: "#3b413c",
          900: "#1b201c"
        },
      },
      boxShadow: {
        't-sm': '0 -1px 2px 0 rgba(0, 0, 0, 0.05)',
        't-md': '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        't-lg': '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        't-xl': '0 -20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        't-2xl': '0 -25px 50px -12px rgba(0, 0, 0, 0.25)',
        't-3xl': '0 -35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'pulse-fast': 'pulse 0.75s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    },
  },
  plugins: [],
}