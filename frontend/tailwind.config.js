/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#4F1990',
          dark: '#351163',
        },
        primary: '#121212',
        secondary: '#FAF9F6',
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'sans-serif'],
      },
      fontSize: {
        body: '14px',
        header: '16px',
        label: '12px',
      },
    },
  },
  plugins: [],
}
