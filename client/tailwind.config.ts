// tailwind.config.js
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#3B82F6", // Blue-500
          DEFAULT: "#2563EB", // Blue-600
          dark: "#1D4ED8", // Blue-700
        },
        secondary: {
          light: "#60A5FA", // Blue-400
          DEFAULT: "#3B82F6", // Blue-500
          dark: "#2563EB", // Blue-600
        },
        accent: {
          light: "#93C5FD", // Blue-300
          DEFAULT: "#60A5FA", // Blue-400
          dark: "#3B82F6", // Blue-500
        },
        neutral: {
          light: "#F3F4F6", // Gray-100
          DEFAULT: "#E5E7EB", // Gray-200
          dark: "#D1D5DB", // Gray-300
        },
        success: {
          light: "#34D399", // Emerald-400
          DEFAULT: "#10B981", // Emerald-500
          dark: "#059669", // Emerald-600
        },
        warning: {
          light: "#FCD34D", // Yellow-400
          DEFAULT: "#FBBF24", // Yellow-500
          dark: "#F59E0B", // Yellow-600
        },
      },
      borderRadius: {
        full: "9999px",
      },
      boxShadow: {
        custom: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
      backdropBlur: {
        lg: "20px",
      },
      keyframes: {
        // Flip and Bounce Animation
        flipBounce: {
          "0%": { transform: "rotateY(0deg)", opacity: "1" },
          "16.666%": { transform: "rotateY(180deg)", opacity: "1" }, // 1s flip
          "33.333%": { transform: "rotateY(360deg)", opacity: "1" }, // Completes flip
          "100%": { transform: "rotateY(360deg)", opacity: "1" }, // Pause
        },
      },
      animation: {
        "flip-animation": "flipBounce 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
