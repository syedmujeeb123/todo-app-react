/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary colors
        brightBlue: "hsl(220, 98%, 61%)",
        linear1: "hsl(192, 100%, 67%)",
        linear2: "hsl(280, 87%, 65%)",

        // Light Theme
        veryLightGray: "hsl(0, 0%, 98%)",
        veryLightGrayishBlue: "hsl(236, 33%, 92%)",
        lightGrayishBlue: "hsl(233, 11%, 84%)",
        darkGrayishBlue: "hsl(236, 9%, 61%)",
        veryDarkGrayishBlue: "hsl(235, 19%, 35%)",

        // Dark Theme
        veryDarkBlue: "hsl(235, 21%, 11%)",
        veryDarkDesaturatedBlue: "hsl(235, 24%, 19%)",
        lightGrayishBlueDark: "hsl(234, 39%, 85%)",
        lightGrayishBlueHover: "hsl(236, 33%, 92%)",
        darkGrayishBlueDark: "hsl(234, 11%, 52%)",
        veryDarkGrayishBlueDark: "hsl(233, 14%, 35%)",
        veryDarkGrayishBlueDarker: "hsl(237, 14%, 26%)",
      },
      fontFamily: {
        sans: ["Josefin Sans", "sans-serif"],
      },
      fontSize: {
        base: "18px",
      },
    },
  },
  plugins: [],
};
