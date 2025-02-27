import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "red": "#D90429",
        "lighterred": "#EF233C",
        "white": "#EDF2F4",
        "gray": "#8D99AE",
        "darkblue": "#2B2D42",
      },
      
      screens: {
        xs: '400px',
        '3xl': '1680px',
        '4xl': '2200px',
      },

      maxWidth: {
        '10xl': '1512px',
      },

      borderRadius: {
        '5xl': '40px',
      },
    },
  },
  plugins: [],
} satisfies Config;
