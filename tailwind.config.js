/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // enable class-based dark mode
  theme: {
    extend: {
      // Custom breakpoints
      screens: {
        'xxs': '320px', // extra extra small
        'xs': '390px',  // extra small
      },
      // Keyframes
      keyframes: {
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shake: {
          '10%, 90%': { transform: 'translateX(-1px)' },
          '20%, 80%': { transform: 'translateX(2px)' },
          '30%, 50%, 70%': { transform: 'translateX(-4px)' },
          '40%, 60%': { transform: 'translateX(4px)' },
        },
        collapse: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(0.2) rotate(360deg)' },
          '100%': { transform: 'scale(1) rotate(720deg)' },
        },
      },
      // Animation classes
      animation: {
        fade: 'fade 3s linear',
        shake: 'shake 1s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        collapse: 'collapse 1.2s forwards',
      },
      // Optional: custom colors for light/dark theme
      colors: {
        themeText: 'var(--text)',
        themeBg: 'var(--background)',
      },
    },
  },
  plugins: [],
};
