import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'figtree': ['var(--font-figtree)', 'sans-serif'],
        'inter': ['var(--font-inter)', 'sans-serif'],
        'poppins': ['var(--font-poppins)', 'sans-serif'],
        'roboto': ['var(--font-roboto)', 'sans-serif'],
        'open-sans': ['var(--font-open-sans)', 'sans-serif'],
        'sans': ['var(--font-figtree)', 'sans-serif'], // Set Figtree as default sans
      },
    },
  },
  plugins: [],
}

export default config
