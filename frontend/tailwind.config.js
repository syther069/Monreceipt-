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
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
        },
        primary: '#0D0D0D',
        secondary: '#F5F5F5',
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
