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
        // Core palette: deep charcoal + acid lime + warm cream + electric violet
        ink: {
          DEFAULT: "#0D0D0D",
          soft: "#1A1A1A",
          muted: "#2C2C2C",
        },
        acid: {
          DEFAULT: "#C8F135",
          dim: "#A8D020",
          pale: "#E8FF7A",
        },
        cream: {
          DEFAULT: "#F5F0E8",
          warm: "#EDE5D8",
          pure: "#FAFAF7",
        },
        violet: {
          DEFAULT: "#7B2FBE",
          light: "#9B4FDE",
          pale: "#E8D5FF",
        },
        coral: {
          DEFAULT: "#FF6B6B",
          light: "#FF9B9B",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-clash)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-in": "slideIn 0.4s ease forwards",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideIn: {
          from: { transform: "translateX(-20px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
