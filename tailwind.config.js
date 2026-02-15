/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: 'var(--text)',
        background: 'var(--background)',
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        collapse: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(0.2) rotate(360deg)' },
          '100%': { transform: 'scale(1) rotate(720deg)' },
        },
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        shake: 'shake 1s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        collapse: 'collapse 1.2s forwards',
        fade: 'fade 3s linear',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
}
