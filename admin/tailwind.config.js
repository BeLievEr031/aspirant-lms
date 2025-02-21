/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3F51B5", // Deep Indigo (Main Primary Color)
        secondary: "#4B9F8A", // Muted Teal (Accent/Secondary)
        background: "#B2EBF2", // Calm Cyan (Main Background)
        card: "#87CEEB", // Sky Blue (Card Background)
        "text-main": "#3F51B5", // Deep Indigo (Primary Text)
        "text-muted": "#4B9F8A", // Muted Teal (Secondary Text)
        button: "#3F51B5", // Deep Indigo (Primary Button)
        "button-hover": "#87CEEB", // Sky Blue (Hover Effect)
      },
      fontFamily: {
        "Playfair-regular": ["Playfair Display", "serif"]
      }
    },
  },
  plugins: [],
}