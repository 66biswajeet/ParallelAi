/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          yellow: "#F5C542",
          accent: "#FFD54F",
          soft: "#FFF8E1",
        },
        dark: {
          text: "#1F2937",
        },
        muted: {
          gray: "#6B7280",
        },
        border: "#E5E7EB",
      },
      boxShadow: {
        premium: "0 8px 30px rgba(0, 0, 0, 0.04)",
        yellowGlow: "0 8px 30px rgba(245, 197, 66, 0.15)",
        insetYellow: "inset 0 2px 4px rgba(245, 197, 66, 0.1)",
      }
    },
  },
  plugins: [],
}
