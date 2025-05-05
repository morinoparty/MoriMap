import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // The output directory for your css system
  outdir: "styled-system",

  globalCss: {
    "*": {
      fontFamily:
        "'Satoshi-Variable', BlinkMacSystemFont, 'GenJyuuGothicLP', -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
      fontVariationSettings: "'wght' 750",
      lineHeight: "1.75",
    },
  },

  globalFontface: {
    "Satoshi-Variable": [
      {
        src: 'url("/assets/fonts/Satoshi-Variable.woff2") format("woff2"), url("/assets/fonts/Satoshi-Variable.woff") format("woff"), url("/assets/fonts/Satoshi-Variable..ttf") format("truetype")',
        fontWeight: "750",
        fontDisplay: "swap",
        fontStyle: "normal",
      },
      {
        src: 'url("/assets/fonts/Satoshi-Variable.woff2") format("woff2"), url("/assets/fonts/Satoshi-Variable.woff") format("woff"), url("/assets/fonts/Satoshi-Variable..ttf") format("truetype")',
        fontWeight: "900",
        fontDisplay: "swap",
        fontStyle: "normal",
      },
    ],
  },
});
