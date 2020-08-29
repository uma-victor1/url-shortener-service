module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        Cyan: "hsl(180, 66%, 49%)",
        DarkViolet: "hsl(257, 27%, 26%)",
        Red: "hsl(0, 87%, 67%)",
        Gray: "hsl(0, 0%, 75%)",
        Grayish: "hsl(225deg 33% 95%)",
        GrayishViolet: "hsl(257, 7%, 63%)",
        VeryDarkBlue: "hsl(255, 11%, 22%)",
        VeryDarkViolet: "hsl(260, 8%, 14%)",
      },
      spacing: {
        7: "2rem",
        72: "20rem",
        90: "90%",
        80: '80%',
        85: "85%",
        140: "140%",
      },
    },
    inset: {
      "50": "49%",
    },
  },
  variants: {
    outline: ["responsive", "focus"],
    zIndex: ["responsive"],
    backgroundColor: ["responsive", "hover", "focus", "active"],
    position: ["responsive"],
    margin: ["responsive", "hover", "focus"],
    inset: ["responsive", "hover", "focus"],
    fontSize: ["responsive", "hover", "focus"],
  },

  plugins: [],
};
