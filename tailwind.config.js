/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#315CBA", soft: "#DCE5F7" },
        ink: { DEFAULT: "#17191D", secondary: "#737780" },
        paper: { DEFAULT: "#FFFFFF", secondary: "#F5F6F8" },
        line: "#E5E7EB",
      },
      fontFamily: { sans: ["Inter", "Hind Siliguri", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
