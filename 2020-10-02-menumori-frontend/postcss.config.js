require("dotenv").config();

module.exports = {
  plugins: ["tailwindcss", "postcss-preset-env"],
};

// const purgecss = [
//   "@fullhuman/postcss-purgecss",
//   {
//     content: ["./components/**/*.js", "./pages/**/*.js"],
//     defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
//   },
// ];
// module.exports = {
//   plugins: [
//     "postcss-import",
//     "tailwindcss",
//     "autoprefixer",
//     ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
//   ],
// };

// purgecss = {
//   content: ["./components/**/*.js", "./pages/**/*.js"],
//   defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
// };
// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     //autoprefixer: {},
//     ...(process.env.NODE_ENV === "production"
//       ? {
//           "@fullhuman/postcss-purgecss": purgecss,
//         }
//       : {}),
//     "postcss-preset-env": {},
//   },
// };
