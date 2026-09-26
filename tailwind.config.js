/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
        script: ['"Alex Brush"', 'cursive'],
      },
      colors: {
        romantic: {
          bg: '#FAF7F5',
          cream: '#F6F1EC',
          paper: '#FFFDFB',
          blush: '#FDF0F3',
          'blush-soft': '#FAE3E8',
          'blush-card': 'rgba(255, 250, 251, 0.75)',
          petal: '#F4B8C5',
          rose: '#D97388',
          'rose-deep': '#B84E66',
          lavender: '#F4EDFA',
          gold: '#C9A364',
          'text-dark': '#3B2025',
          'text-muted': '#77585E',
          'text-soft': '#A4868C',
          border: 'rgba(235, 206, 213, 0.45)',
        }
      },
      boxShadow: {
        'soft-glow': '0 10px 40px -10px rgba(228, 138, 156, 0.25)',
        'rose-card': '0 18px 45px -15px rgba(184, 78, 102, 0.12), 0 0 1px 1px rgba(245, 207, 216, 0.35)',
        'rose-hover': '0 25px 60px -12px rgba(184, 78, 102, 0.22), 0 0 1px 1px rgba(245, 207, 216, 0.6)',
        'cinema': '0 30px 100px -20px rgba(0, 0, 0, 0.7), 0 0 60px rgba(217, 115, 136, 0.2)',
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'float-reverse': 'floatReverse 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-2deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.04)', opacity: '0.88' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
