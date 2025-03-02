/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "degrade/principal":
          "radial-gradient(100% 177.86% at 0% 0%, #061F3B 0%, #201537 100%)",
        "grey-plasterboard": "url(/assets/grey-plasterboard-texture.png)",
      },
      height: {
        10: "2.5rem",
        30: "7.5rem",
        35: "10rem",
      },
      scale: {
        flip: "-1",
      },
      keyframes: {
        "expand-header-option": {
          "0%": { width: "0px" },
          "100%": { width: "80px" },
        },
        "text-mark": {
          "0%": { "max-width": "0px" },
          "100%": { "max-width": "320px" },
        },
        swing: {
          "20%": { transform: "rotate(15deg)" },
          "40%": { transform: "rotate(-10deg)" },
          "60%": { transform: "rotate(5deg)" },
          "80%": { transform: "rotate(-5deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {},
    },
    colors: {
      primary: "#F58538",
      background: "#161925",
      background2: "#1F2333",
      darkborder: "#414968",
    },
    fontSize: {
      dh1: [
        "2.74658203125rem",
        {
          fontWeight: "400",
          lineHeight: "3rem",
        },
      ],
      dh2: [
        "2.197265625rem",
        {
          fontWeight: "600",
          lineHeight: "2.5rem",
        },
      ],
      dh3: [
        "1.7578125rem",
        {
          fontWeight: "600",
          lineHeight: "2rem",
        },
      ],
      dh4: [
        "1.125rem",
        {
          fontWeight: "600",
          lineHeight: "1.5rem",
        },
      ],
      dp1: [
        "1.125rem",
        {
          fontWeight: "400",
          lineHeight: "1.5rem",
        },
      ],
      dp2: [
        {
          fontWeight: "400",
          lineHeight: "1.5rem",
        },
      ],
      mh1: [
        "2.13623046875rem",
        {
          fontWeight: "700",
          lineHeight: "2.5rem",
        },
      ],
      mh2: [
        "1.708984375rem",
        {
          fontWeight: "600",
          lineHeight: "2rem",
        },
      ],
      mh3: [
        "1.3671875rem",
        {
          fontWeight: "600",
          lineHeight: "1.5rem",
        },
      ],
      mh4: [
        "0.875rem",
        {
          fontWeight: "600",
          lineHeight: "1rem",
        },
      ],
      mp1: [
        "0.875rem",
        {
          fontWeight: "400",
          lineHeight: "1rem",
        },
      ],
      mp2: [
        {
          fontWeight: "400",
          lineHeight: "0.875rem",
        },
      ],
      icon: [
        "10rem",
        {
          fontWeight: "400",
        },
      ],
    },
    boxShadow: {
      blue: "-4px 4px 0px #038CFF",
      "dark-blue": "-4px 4px 0px #2D2286",
      "dark-blue-focused": "0px 0px 0px #2D2286",
      gray: "-4px 4px 0px #d1d1d1",
      "gray-focused": "0px 0px 0px #d1d1d1",
      standard: "5px 5px 10px rgba(0,0,0,0.5)",
    },
    fontFamily: {
      roboto: "var(--font-roboto)",
    },
    screens: {
      sm: { min: "350px", max: "767px" },
      // md: { min: "768px", max: "1365px" },
      lg: { min: "768px" },
    },
  },
  plugins: [],
};
