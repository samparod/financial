import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070b14",
        panel: "#0f1623",
        line: "#1e2a3d",
        gold: "#c8a24a",
        profit: "#3dcc8a",
        danger: "#e85d5d",
        warn: "#e8a317",
        mute: "#8b9bb4",
      },
      fontFamily: {
        sans: ["Cairo", "system-ui", "sans-serif"],
      },
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};

export default config;
