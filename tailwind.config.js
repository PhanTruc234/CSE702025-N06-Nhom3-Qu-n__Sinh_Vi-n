/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jaKaTa: ["Plus Jakarta Sans", "serif"],
      },
      colors: {
        primary: "#000",
        grayxx: "#EBEBE9",
      },
      maxWidth: {
        1480: "1480px",
      },
      keyframes: {
        zoomIn: {
          "0%": {
            transform: "scale(1.2)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        sideLeft: {
          "0%": {
            transform: "translateX(-150px)",
            opacity: "0",
          },
          "100%": {
            transform: "translate(0)",
            opacity: "1",
          },
        },
        sideLeftBox: {
          "0%": {
            transform: "translateX(-150px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        sideRightBox: {
          "0%": {
            transform: "translateX(150px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        sideBottomBox: {
          "0%": {
            transform: "translateY(150px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        zoomIn: "zoomIn 0.8s ease-out",
        sideLeft: "sideLeft 0.8s ease-out back",
        sideLeftBox: "sideLeftBox 1s ease-in-out",
        sideRightBox: "sideRightBox 1s ease-in-out",
        sideBottomBox: "sideBottomBox 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
