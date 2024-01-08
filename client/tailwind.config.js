/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      colors: {
        brightblack: "#000000",
        lightblack: "#333333",
        lightorange: "#ffa67e",
        mainWhite: "#FFFFFFCC",
        lightGray: "#808080",
        borderColor: "rgb(235, 235, 235)",
        brightWhite: "#ffffff",
        blue: "#5044e4",
      },
    },
  },
  plugins: [],
};
