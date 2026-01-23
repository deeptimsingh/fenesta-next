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
      },
      // tailwind.config.ts
      fontFamily: {
        base: ["var(--font-helv)", "sans-serif"],
        accent: ["var(--font-corinthia)", "serif"],
      },

    },
  },
};

export default config;
