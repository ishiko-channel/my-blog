import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",      // src/ を削除
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // src/ を削除
    "./app/**/*.{js,ts,jsx,tsx,mdx}",        // src/ を削除
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'), // これを追加！
  ],
};
export default config;