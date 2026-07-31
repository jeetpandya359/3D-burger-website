/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#050505',
        cardBg: '#111111',
        cardHover: '#1a1a1a',
        goldAccent: '#FFB100',
        goldGlow: 'rgba(255, 177, 0, 0.3)',
        lightText: '#FFFFFF',
        subText: '#B0B0B0',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at center, rgba(255, 177, 0, 0.15) 0%, transparent 70%)',
        'glass-card': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #FFD56B 0%, #FFB100 50%, #D48C00 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 30px rgba(255, 177, 0, 0.25)',
        'gold-lg': '0 10px 40px -10px rgba(255, 177, 0, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      }
    },
  },
  plugins: [],
}
