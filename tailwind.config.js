/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        catamaran: ["Catamaran", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },

      colors: {
        "000E14": "#000E14",
        "DARK-COLOR": "#00011A", // Dark Text
        "00141F": "#00141F",
        "001B29": "#001B29",
        "002233": "#002233",
        "012A41": "#012a41",
        "003047": "#003047",
        "003D5C": "#003D5C",
        "1E6B96": "#1e6b96",
        "LIGHT-COLOR": "#dedede", // Light Text
        "4FC863": "#4FC863",
        CFDB3D: "#CFDB3D",
        DB3B3B: "#DB3B3B",
        "WHITE-TRANS": "rgba(45,116,203,0.2)",
        "OUTLINE-GRAD": "gradient(to-r, #4FC863, #CFDB3D, #DB3B3B)",
      },
    },
  },
  plugins: [],
};
