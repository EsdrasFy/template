import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
    },
    colors: {
      grayOne: "#171a1b",
      grayTwo: "#1d2123",
      grayThree: "#5d5d5d",
      textColor: "#d9d9d9",
      pink: "#ed145b",
      white: "#fff",
      black: "#000",
      red: "#FF0000",
      green: "#00FF00",
    },
    fontFamily: {
      logo: ["var(--logo-font)"],
      in: ["var(--font-in)"],
    },
  },
  plugins: [],
};

export default config;
