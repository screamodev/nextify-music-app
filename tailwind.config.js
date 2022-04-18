module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    maxWidth: {
      "50per": "50%",
    },
    extend: {
      fontFamily: {
        "playfair-display": ["Playfair Display", "Oswald", "Open Sans"],
      },
      spacing: {
        m10px: "-10px",
        21.875: "21.875rem",
        73.125: "73.125rem",
        "35per": "35%",
        "20per": "20%",
        "102per": "102%",
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
