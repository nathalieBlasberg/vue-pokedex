module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        black: "#3e3b3a",
        gold: "#d8c43d",
        grass: "#9bcc50",
        poison: "#b97fc9",
        fire: "#fd7d24",
        flying: {
          top: "#3dc7ef",
          bottom: "#bdb9b8",
        },
        water: {
          top: "#4592c4",
          bottom: "#4592c4",
        },
        "dark-gold": "#8d7a38",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
