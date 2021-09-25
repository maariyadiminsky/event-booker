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
        float: "float 2.5s ease-in-out infinite",
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms"
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      textColor: ["responsive", "hover", "focus", "group-hover"],
    },
  },
  plugins: [],
}
