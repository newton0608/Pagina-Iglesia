/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./Enlaces/**/*.html",
    "./scripts/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        church: {
          navy: "#020617",
          blue: "#082f49",
          gold: "#d6a63a",
          cream: "#faf7ef"
        }
      }
    }
  },
  plugins: []
};
