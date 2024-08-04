// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'custom-blue': '#172242',
        'custom-lightblue': '#445A9A',
        'custom-bg': '#15171B',
        'custom-placeholder': '#AFB1B6',
        'custom-teal': '#41D0C8',

      },
      fontFamily: {
        'work-sans': ['"Work Sans"', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
