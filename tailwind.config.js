/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        cell: "inset 0 2px 2px rgba(0, 0, 0, 0.1)",
      },
      backgroundImage: {
        success: "linear-gradient(rgb(92, 184, 92) 0, rgb(68, 157, 68) 100%)",
        warning: "linear-gradient(rgb(240, 173, 78) 0, rgb(236, 151, 31) 100%)",
        error: "linear-gradient(rgb(217, 83, 79) 0, rgb(201, 48, 44) 100%)",
        offline:
          "linear-gradient(rgb(128, 128, 128) 0, rgb(128, 128, 128) 100%)",
      },
    },
  },
  plugins: [],
};
