/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(rgb(92, 184, 92) 0%, rgb(68, 157, 68) 100%)",
      },
    },
  },
  plugins: [],
};
