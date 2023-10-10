/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
const percentageWidth = require("tailwindcss-percentage-width");

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      color: {
        skyblue: "#87CEEB",
        shadowblue: "#274684",
        cornflower_blue: {
          50: "#f2f6fc",
          100: "#e1ebf8",
          200: "#cadbf3",
          300: "#a6c5ea",
          400: "#709fdc",
          500: "#5c88d5",
          600: "#486ec8",
          700: "#3e5cb7",
          800: "#384d95",
          900: "#314277",
          950: "#222a49",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin"), percentageWidth],
});
