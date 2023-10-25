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
      backgroundImage: {
        cool: 'url("https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg")',
      },
      colors: {
        sb_blue: "#000080",
        bg_orange: "#fd9e02",
        accent: "#fb8500",
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
      },
      display: ["group-hover"],
      flex: {
        150: "1 1 150px",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    percentageWidth,
    require("@tailwindcss/typography"),
  ],
});
