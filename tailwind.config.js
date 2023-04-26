/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: "'Anonymous Pro', monospace",
        secondary: "'Roboto', sans-serif",
      },
      colors: {
        primary: "#9DC1CF",
        secondary: "#FDF4AF",
        body: "#110f12",
      },
      keyframes: {
        "scale-up": {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "scale-up": "scale-up 0.3s eas-in",
      },
    },
  },
  plugins: [],
};
