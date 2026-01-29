module.exports = {
  content: [
    "./pages/**/*.{html,js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark": {
          100: "#202022",
          200: "#2d2e32",
          300: "#25262a",
          400: "#0c0c0c8c",
        },
        "green": {
          100: "#64f4ac",
          200: "#64f4acea",
          300: "rgb(100, 244, 172, .7)",
          400: "#05ff82",
          500: "#15eb80",
          600: "rgb(3, 252, 128, .4)",
        },
        "red": {
          100: "#rgb(255, 0, 0, .4)",
          200: "#ff0000",
        },
        "blue": {
          10: "#f7f8ff",
          50: "#edf0ff",
          100: "#3e64ff",
          200: "#4898f0",
          400: "#503cef",
          600: "#513cef",
          800: "#140e32"
        }

      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(0deg,rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 100%)',
      },

    },
  },
  plugins: [],
}
