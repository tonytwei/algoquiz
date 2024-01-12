import type { Config } from "tailwindcss";

const config: Config = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/types/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "text-a": "#cbd5e1",
        overlay: "#5f5f5f",
        "accent-lime": "#55d6be",
        "accent-dark-lime": "#40a190",
        "accent-yellow": "#f8ea5e",
        "accent-dark-yellow": "#d0b83b",
        "accent-red": "#d6555e",
        "accent-dark-red": "#a1404b",
      },
    },
  },
  plugins: [],
};
export default config;
