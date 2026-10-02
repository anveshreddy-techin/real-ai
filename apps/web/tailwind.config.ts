import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        msde: {
          blue: "#0A2540",
          navy: "#1E3A8A",
          gold: "#D97706",
          orange: "#EA580C",
          surface: "#F8FAFC",
        },
        compliance: {
          compliant: "#16A34A",
          watch: "#EAB308",
          risk: "#F97316",
          critical: "#DC2626",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
