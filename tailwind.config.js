/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Provided palette:
        // #fbf4f4 -> Off-White/Cream (text-primary)
        // #141414 -> Off-Black/Dark Grey (background-dark)
        // #ff6200 -> Vibrant Orange (primary-orange)
        // #e10c01 -> Bold Red (accent-red)

        'background-dark': '#141414',
        'text-primary': '#fbf4f4',
        'text-secondary': '#cccccc', // A slightly softer text color for less emphasis
        'primary-orange': '#ff6200',
        'accent-red': '#e10c01',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
      },
      keyframes: {
        pulse: {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '70%': { transform: 'scale(1.2)', opacity: '0' },
          '100%': { transform: 'scale(0.9)', opacity: '0' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
          '50%': { transform: 'none', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'), // Assuming this plugin is available for line-clamp utility
  ],
}
