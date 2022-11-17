module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    mode: "jit",
    darkMode: false, // or 'media' or 'class'
    theme: {
      fontFamily: {
        display: ["Open Sans", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'purple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
        'green': '#3fc441',
        'blue': '#004AFF',
        'black': '#08090d',
      },
      extend: {
        screens: {
          mf: "990px",
        },
        keyframes: {
          "slide-in": {
            "0%": {
              "-webkit-transform": "translateX(120%)",
              transform: "translateX(120%)",
            },
            "100%": {
              "-webkit-transform": "translateX(0%)",
              transform: "translateX(0%)",
            },
          },
        },
        animation: {
          "slide-in": "slide-in 0.5s ease-out",
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [require("@tailwindcss/forms")],
  };