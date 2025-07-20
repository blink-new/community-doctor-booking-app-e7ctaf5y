/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        accent: '#10B981',
        background: '#F8FAFC',
        'dark-mode': '#1E293B'
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'inter-medium': ['Inter-Medium', 'sans-serif']
      }
    },
  },
  plugins: [],
}