/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        home: "url('https://dsk4t6ov5vq8n.cloudfront.net/uploads/PBS-Articles/2022/The-Green-Planet/Episode-4-photos/Sized-photos/The_Green_Planet_04_010.jpg')",
        members: "",
        events: "",
        podcasts: "",
        about: "",
      },
      color: {
        skyblue: "#87CEEB",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
});
