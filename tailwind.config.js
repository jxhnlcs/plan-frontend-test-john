/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'white': '#ffffff',
      'black': '#000000',
      'blue_light': '#00AFEF',
      'blue_intermediate': '#1D5A82',
      'blue_dark': '#262642',
      'pink_light': '#EC268F',
      'red_light': '#E02023',
      'orange_light': '#f5821f',
      'orange_dark': '#db751b',
      'gray_light': '#f5f5f5',
      'gray_medium': '#6b6b6b',
      'gray_dark': '#333333',
    },
    fontSize: {
      xs: '0.8125rem',
      sm: '0.9375rem',
      df: '1rem',
      lg: '1.25rem',
      xl: '2rem',
      '2xl': '2.5rem',
    }
  },
  plugins: [],
}
