/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
     colors: {
        'primary-blue': '#0D6EFD',
        'primary-dark': '#0A58CA',
        'text-dark': '#212529',
        'text-light': '#6C757D',
        'border-color': '#DEE2E6',
        'bg-light': '#F8F9FA',
        'primary-yellow': '#FFC107', 
        'primary-yellow-dark': '#E0A800', 
      },
    },
  },
  plugins: [],
}