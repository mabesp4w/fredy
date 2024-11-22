/** @format */

import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        "amsterdam-one": ["amsterdam-one", "sans-serif"],
        quicksand: ["quicksand", "sans-serif"],
      },
      container: {
        center: true,
      },
      backgroundImage: {
        "dapoer-alea": "url('/images/dapoer-alea.jpg')",
      },
    },
    container: {
      center: true,
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#8B5A2B",
          secondary: "#F5F5DC",
          accent: "#FF8C00",
          neutral: "#228B22",
          "base-100": "#ffffff",
        },
      },
    ],
  },
  plugins: [daisyui],
} satisfies Config;
