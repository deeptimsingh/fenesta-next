import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}",


    
  ],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 18s linear infinite",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        dark: "#0f172a",
      },
      // tailwind.config.ts
      fontFamily: {
        base: ["var(--font-helv)", "sans-serif"],
        accent: ["var(--font-corinthia)", "serif"],
        dark: "#e5e7eb",
      },
      screens: {        
        'range-125': { min: '1440px', max: '1659px' }, // mr only 1280–1440px
        'range-110': { min: '1600px', max: '1750px' }, // mr only 1600px-1750px
      },
      

    },
  },
};

export default config;
