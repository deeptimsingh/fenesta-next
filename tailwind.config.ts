import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
        'win-150': '1280px', // 1920 @ 150%
        'win-125': '1536px', // 1920 @ 125%
        'win-100': '1920px', // 1920 @ 100%
      },
      

    },
  },
};

export default config;
