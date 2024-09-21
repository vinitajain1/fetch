/** @type {import('tailwindcss').Config} */
 
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 1s forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
      }
    },
      colors: {
        customPurple: '#792f6c',
        customBackground: '#FAF6F2',
        customBorder: '#dadce0',
      },
      boxShadow: {
        custom: '0 1px 3px 0 rgba(60, 64, 67, .3), 0 4px 8px 3px rgba(60, 64, 67, .15)',
      },
    },
  },
  plugins: [],
};