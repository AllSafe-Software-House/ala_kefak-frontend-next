/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#49B42B",
        primaryhover: "#43A627",
        danger: "#BB142A",
        dangerhover: "#AA0218",
        darknav: "#292B26",
        darkbg: "#1E1F1D",
        darkinput: "#373934",
      },
    },
  },
  plugins: [],
};
