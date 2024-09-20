/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        hero: "#CFD28B",
        cardv: "linear-gradient(180deg, #E6DFA2 0%, #ABA45F 100%)",
        sec: "#F1EAE3",
        primary: "#7ed958",
        primarytext: "#fbf3f3",
        footer: "#519335",

        facebook: "#1877F2",
        bottonpri: "#98E379",
        hoverpri: "#4d9526de",
        "primary-dark": "#45a049",
      },
    },
  },
  plugins: [],
};
