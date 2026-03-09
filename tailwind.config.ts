import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        puretea: {
          "dark": "#0F2E23",
          "cream": "#F5F3EC",
          "organic": "#3A6B5C",
          "sand": "#D8D3C5",
          "gold": "#B8A060",
        },
      },
      fontFamily: {
        canela: ["var(--font-canela)", "Georgia", "serif"],
        satoshi: ["var(--font-satoshi)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
