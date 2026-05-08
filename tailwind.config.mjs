/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#050C18',
          secondary: '#0C1830',
          card: '#0F1E35',
          hover: '#132240',
        },
        brand: {
          blue: '#0099FF',
          'blue-light': '#33AAFF',
          'blue-dark': '#0077CC',
          teal: '#00C896',
          gold: '#FFB400',
          'gold-light': '#FFC933',
        },
        border: {
          DEFAULT: 'rgba(0, 153, 255, 0.15)',
          gold: 'rgba(255, 180, 0, 0.3)',
          subtle: 'rgba(255,255,255,0.06)',
        },
      },
      fontFamily: {
        display: ['Barlow Condensed', 'Impact', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(5,12,24,0.97) 0%, rgba(0,60,120,0.6) 60%, rgba(5,12,24,0.9) 100%)',
        'card-shine': 'linear-gradient(135deg, rgba(0,153,255,0.06) 0%, transparent 60%)',
        'gold-shine': 'linear-gradient(135deg, rgba(255,180,0,0.08) 0%, transparent 60%)',
        'section-gradient': 'linear-gradient(180deg, #050C18 0%, #0C1830 50%, #050C18 100%)',
      },
      animation: {
        'ticker': 'ticker 30s linear infinite',
        'fade-up': 'fadeUp 0.7s ease forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,153,255,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0,153,255,0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'card': '0 4px 30px rgba(0,0,0,0.5)',
        'card-hover': '0 8px 50px rgba(0,153,255,0.2)',
        'blue-glow': '0 0 30px rgba(0,153,255,0.4)',
        'gold-glow': '0 0 30px rgba(255,180,0,0.3)',
      },
    },
  },
  plugins: [],
};
