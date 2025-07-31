// tailwind.config.js
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 4s linear infinite',
      },
      keyframes: {
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
