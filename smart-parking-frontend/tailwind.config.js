/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0A0A0A', // Main background from reference
          card: '#141414', // Lighter container background
          border: '#222222', // Subtle borders
        },
        brand: {
          yellow: '#D4FF00', // The vibrant yellow from reference
          green: '#22C55E', // Keep available for specific semantic
          red: '#EF4444',
          accent: '#FFFFFF', // Used for active pills
          muted: '#8A8A8A', // Muted text
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
