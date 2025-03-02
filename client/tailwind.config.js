/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    theme: {
      extend: {
        colors: {
          primary: "#1a1a2e",
          secondary: "#16213e",
          accent: "#e94560",
          purple: {
            600: "#6d28d9",
            700: "#5b21b6",
          },
        },
      },
    },
  },
  plugins: [],
}