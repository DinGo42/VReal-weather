import { type Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */

export enum Colors {
  MAIN_BLACK = "main-black",
  MAIN_WHITE = "main-white",
  MAIN_GRAY = "main-gray",
  SECONDARY_GRAY = "secondary-gray",
  TERTIARY_GRAY = "tertiary-gray",
  MAIN_BLUE = "main-blue",
  SECONDARY_BLUE = "secondary-blue",
  MAIN_CREAMY = "main-creamy",
}

export enum FontSizes {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  H6_SEMI_BOLD = "h6-semi-bold",
  H7 = "h7",
  H7_SEMI_BOLD = "h7-semi-bold",
  H8 = "h8",
  H9 = "h9",
}

module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extends: {
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
    },
    colors: {
      [Colors.MAIN_WHITE]: "#ffffff",
      [Colors.MAIN_BLACK]: "#000000",
      [Colors.MAIN_GRAY]: "#8d8d8d",
      [Colors.SECONDARY_GRAY]: "#c5c5c5",
      [Colors.TERTIARY_GRAY]: "#f2f2f2",
      [Colors.MAIN_BLUE]: "#459de9",
      [Colors.SECONDARY_BLUE]: "#f1f2ff",
      [Colors.MAIN_CREAMY]: "#fffaf1",
    },
    fontSize: {
      [FontSizes.H1]: [
        "44px",
        {
          fontWeight: 400,
          lineHeight: "64px",
        },
      ],
      [FontSizes.H2]: [
        "22px",
        {
          fontWeight: 400,
          lineHeight: "32px",
        },
      ],
      [FontSizes.H3]: [
        "18px",
        {
          fontWeight: 300,
          lineHeight: "26px",
        },
      ],
      [FontSizes.H4]: [
        "16px",
        {
          fontWeight: 400,
          lineHeight: "23px",
        },
      ],
      [FontSizes.H5]: [
        "14px",
        {
          fontWeight: 400,
          lineHeight: "20px",
        },
      ],
      [FontSizes.H6]: [
        "13px",
        {
          fontWeight: 400,
          lineHeight: "19px",
        },
      ],
      [FontSizes.H6_SEMI_BOLD]: [
        "13px",
        {
          fontWeight: 600,
          lineHeight: "19px",
        },
      ],
      [FontSizes.H7_SEMI_BOLD]: [
        "12px",
        {
          fontWeight: 600,
          lineHeight: "18px",
        },
      ],
      [FontSizes.H7]: [
        "12px",
        {
          fontWeight: 400,
          lineHeight: "18px",
        },
      ],
      [FontSizes.H8]: [
        "8px",
        {
          fontWeight: 400,
          lineHeight: "12px",
        },
      ],
      [FontSizes.H9]: [
        "6px",
        {
          fontWeight: 400,
          lineHeight: "8px",
        },
      ],
    },
  },
  plugins: [],
} satisfies Config;
