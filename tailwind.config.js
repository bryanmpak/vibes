/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent_1: "var(--color-accent_1)",
        accent_2: "var(--color-accent_2)",
        bg_main: "var(--color-bg_main)",
        bg_secondary: "var(--color-bg_secondary)",
        bg_tertiary: "var(--color-bg_tertiary)",
        bg_accent: "var(--color-bg_accent)",
      },
    },
  },
  plugins: [],
}
