module.exports = {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "hsla(0, 0%, 100%, 0.1)",
        sidebar: "#171717",
        // neutral: {
        //     9:{00: "#171717",
        // },
      },
      gridTemplateColumns: {
        auto: "auto 1fr",
        "auto-2": "1fr auto",
        "auto-3": "auto auto",
        "auto-fill": "repeat(auto-fill, minmax(300px, 1fr))",
        "auto-fill-2": "repeat(auto-fill, minmax(200px, 1fr))",
        "auto-fit": "repeat(auto-fit, minmax(200px, 1fr))",
        "auto-fit-2": "repeat(auto-fit, minmax(400px, 1fr))",
      },
      gridTemplateRows: {
        "auto-2": "auto auto",
      },
      scale: {
        60: "0.6",
      },
    },
  },

  // add daisyUI plugin
  plugins: [require("daisyui")],

  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
};
