/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["index.html"],
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    extend: {
      colors: {
        primary: '#6366f1', // Indigo-500 as modern primary accent
        accent: '#10b981', // Emerald-500 as tech-accent
        secondary: '#64748b',
        dark: '#0f172a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      screens: {
        "2xl": "1320px",
      },
    },
  },
  plugins: [],
};
