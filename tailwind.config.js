/** @type {import('tailwindcss').Config} */

//eslint-disable-next-line
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/web/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '90rem'
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
};
