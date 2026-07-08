import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#7B3FE4",
          green: "#A3FF12",
          dark: "#090B12",
          surface: "#111522",
          elevated: "#171B2A",
          text: "#F7F8FC",
          muted: "#A8B0C3"
        }
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"]
      },
      boxShadow: {
        soft: "0 24px 60px rgba(6, 8, 15, 0.35)",
        glow: "0 0 80px rgba(123, 63, 228, 0.16)"
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top, rgba(123, 63, 228, 0.24), transparent 32%), radial-gradient(circle at 20% 20%, rgba(163, 255, 18, 0.12), transparent 22%)"
      }
    }
  },
  plugins: []
};

export default config;
