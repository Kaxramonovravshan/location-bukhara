/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
      square: "square",
      roman: "upper-roman"
    },
    extend: {
      fontFamily: {
        sans: ["Manrope", "sans-serif"]
      },
      colors: {
        site: {
          DEFAULT: "#0B0D10",
          card: "#14171C",
          border: "#2A2E35"
        },
        content: {
          primary: "#FFFFFF",
          secondary: "#B9BDC7"
        },
        accent: {
          DEFAULT: "#C9A46A",
          hover: "#D8B57A"
        }
      },
      maxWidth: {
        container: "1400px"
      },
      borderRadius: {
        card: "12px"
      },
      transitionDuration: {
        DEFAULT: "300ms"
      },
      spacing: {
        section: "120px",
        card: "24px"
      }
    }
  },
  plugins: []
};
