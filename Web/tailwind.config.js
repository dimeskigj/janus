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
    },
  },
  plugins: [],
}