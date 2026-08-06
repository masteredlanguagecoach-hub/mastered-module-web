/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0F172A",
          primary: "#2563EB",
          accent: "#06B6D4",
          bg: "#F8FAFC",
          card: "#FFFFFF",
          success: "#10B981",
          warning: "#F59E0B",
          danger: "#EF4444",
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(15, 23, 42, 0.05)',
        'card-hover': '0 20px 30px -10px rgba(37, 99, 235, 0.15)',
      }
    },
  },
  plugins: [],
}
