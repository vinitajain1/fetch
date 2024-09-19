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
        customCardColor1:"#ffccb0",
        customCardColor2:"#ffdbe0",
        customCardColor3:"#e0c4c8",
        customCardColor4:"hsla(41, 100.00%, 76.34%, 1.00)",
        customCardColor5:"#ecc3ee",
        customCardColor6:"#ff8d7b",
        customCardColor7:"#fddbff",
        customCardColor8:"#ffccb0",
        customCardColor9:"#ffe8d0",
        customCardColor10:"rgb(236, 195, 238)"
      },
      boxShadow: {
        custom: '0 1px 3px 0 rgba(60, 64, 67, .3), 0 4px 8px 3px rgba(60, 64, 67, .15)',
      },
    },
  },
  plugins: [],
};