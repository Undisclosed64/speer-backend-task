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
        lightBlue1: "#B0C4DE",
        borderColor: "rgb(235, 235, 235)",
        brightWhite: "#ffffff",
        lightBlue: "#F8F8F8",
      },
    },
  },
  plugins: [],
};
