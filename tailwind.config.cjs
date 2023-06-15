/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        '6/6': '100%',
      },
      colors: {
        "gray-20": "#F8F4EB",
        "gray-50": "#EFE6E6",
        "gray-100": "#DFCCCC",
        "gray-500": "#5E0000",
        "primary-20": "#fceef6",
        "primary-50": "#FFD8D6",
        "primary-100": "#FFC4C2",
        "primary-200": "#FFB0AD",
        "primary-300": "#FF9C99",
        "primary-400": "#FF8985",
        "primary-500": "#FF6B66",
        "primary-600": "#FF615C",
        "primary-700": "#FF4E47",
        "secondary-200": "#f6e7d8",
        "secondary-400": "#FFCD5B",
        "secondary-500": "#FFA6A3",
        "purple-500": "#8b1f95",
        "purple-400": "#AE26BA",
        "purple-300": "#C834D5",
        "purple-200": "#CD45D9",
        "purple-100": "#D156DC",
        "purple-50": "#DA78E3",
        "purple-30": "#dc85e3",
        "purple-20": "#ef91f7",
        "purple-15": "#f8b4ff",
        "purple-10": "#f4c5f9",
        "purple-05": "#edd3f0",
        "gray-purple-20": "#faeefb",
      },
      backgroundImage: (theme) => ({
        "gradient-yellowred":
          "linear-gradient(90deg, #FF616A 0%, #FFC837 100%)",
        "mobile-home": "url('./assets/HomePageGraphic.png')",
      }),
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      content: {
        tunutrividatext: "url('./assets/ntv/logo_3.png')",
        evolvetext: "url('./assets/EvolveText.png')",
        abstractwaves: "url('./assets/AbstractWaves.png')",
        sparkles: "url('./assets/Sparkles.png')",
        circles: "url('./assets/Circles.png')",
      },
      zIndex: {
        '999': 999,
      },
    },
    screens: {
      xxxs: "260px",
      xxs: "360px",
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: '1280px'
    },
  },
  plugins: [],
};
