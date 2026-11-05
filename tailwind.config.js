/** @type {import('tailwindcss').Config} */
// Pet Rinse Repeat brand tokens — pulled from the logo (pink script, blue bubbles, watercolor splash)
// and Vern's Nov 2026 mockup (navy headlines with a pink accent line, pale-cyan sections, rounded cards).
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pink: { DEFAULT: "#E5308D", dark: "#BF1E72", soft: "#FCE4F0", tint: "#FFF1F7" },
        sky: { DEFAULT: "#2FB2E6", dark: "#1C86B5", soft: "#E3F5FC", tint: "#F3FAFE" },
        navy: { DEFAULT: "#1E2A47", deep: "#141D33" },
        sun: { DEFAULT: "#F7B733", soft: "#FFF1CF" },
        cloud: "#F8FBFD",
        blush: "#FFF4F9",
        ink: { DEFAULT: "#2B3448", soft: "#5B6578" },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "'Plus Jakarta Fallback'", "system-ui", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "'Plus Jakarta Fallback'", "system-ui", "sans-serif"],
      },
      maxWidth: { wrap: "1200px" },
      boxShadow: {
        card: "0 10px 30px rgba(30,42,71,.08)",
        lift: "0 18px 40px rgba(30,42,71,.14)",
      },
    },
  },
  plugins: [],
};
