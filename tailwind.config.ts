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
        primary: "#3b82f6",
        secondary: "#eff6ff",
        accent: "#9ca3af",
        neutral: "#111827",
        info: "#a3bffa",
        success: "#6ee7b7",
        warning: "#fbbf24",
        error: "#ef4444",
        edit:"#f59e0b",
        delete:"#ef4444",
        textColor: "#374151",
      },
    },
  },
  plugins: [],
} satisfies Config;
