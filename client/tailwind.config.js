module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        center: true,
      },
      keyframes: {
        float: {
            "0%, 100%": {
              transform: "translateY(-3px)"
            },
            "50%": {
              transform: "translateY(0px)"
            },
        }
      },
      animation: {
        float: "float 2.5s ease-in-out infinite"
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [],
}
