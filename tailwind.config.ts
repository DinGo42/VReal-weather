import { type Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */

export enum Colors {
  WHITE_1000 = "white-1000",
  WHITE_850 = "white-850",
  BLACK_1000 = "black-1000",
  BLACK_900 = "black-900",
  BLACK_800 = "black-800",
  BLACK_700 = "black-700",
  BLACK_600 = "black-600",
  BLUE_1000 = "blue-1000",
  ORANGE_1000 = "orange-1000",
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
    boxShadow: {
      main: "0px 3px 10px -5px rgb(0,0,0)",
    },
    colors: {
      [Colors.WHITE_1000]: "#ffffff",
      [Colors.WHITE_850]: "#fffaf1",
      [Colors.BLACK_1000]: "#000000",
      [Colors.BLACK_900]: "#8d8d8d",
      [Colors.BLACK_800]: "#c5c5c5",
      [Colors.BLACK_700]: "#f2f2f2",
      [Colors.BLACK_600]: "#f1f2ff",
      [Colors.BLUE_1000]: "#459de9",
      [Colors.ORANGE_1000]: "#FFA25B",
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
    keyframes: {
      hide: {
        from: { opacity: "1" },
        to: { opacity: "0" },
      },
      slideIn: {
        from: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
        to: { transform: "translateX(0)" },
      },
      swipeOut: {
        from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
        to: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
      },
    },
    animation: {
      hide: "hide 100ms ease-in",
      slideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      swipeOut: "swipeOut 100ms ease-out",
    },
  },
  plugins: [],
} satisfies Config;
