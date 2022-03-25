module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        PlayfairD: ["Playfair_Display"],
      },
      spacing: {
        "-0.5": "-0.5rem",
        "-0.1": "-0.1rem",
        21.875: "21.875rem",
        73.125: "73.125rem",
        "35per": "35%",
        "20per": "20%",
      },
      flexGrow: {
        20: 20,
      },
      colors: {
        primary: "#F00F4F",
        secondary: "#980BC5",
        "secondary-opacity": "rgba(152, 11, 197, 0.3)",
        "form-rgba": "rgba(73, 0, 203, 0.56)",
        "modal-overlay": "rgba(32, 32, 32, 0.94)",
      },
    },
  },
  plugins: [],
};
