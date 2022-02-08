module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
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
