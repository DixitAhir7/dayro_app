module.exports = {
  theme: {
    extend: {
      keyframes: {
        flip: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(180deg)" },
        },
        flipBack: {
          "0%": { transform: "rotateY(180deg)" },
          "100%": { transform: "rotateY(0deg)" },
        },
      },
      animation: {
        flip: "flip 0.6s ease-in-out forwards",
        flipBack: "flipBack 0.6s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};