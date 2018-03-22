import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";
import pkg from "./package.json";

export default [
  // browser-friendly UMD build
  {
    input: "src/index.js",
    output: {
      file: pkg.browser,
      format: "umd",
      name: "leftExpandPatternParser"
    },
    plugins: [
      resolve(),
      babel({
        exclude: ["node_modules/**"]
      }),
      uglify({ mangle: { toplevel: true } })
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: "src/index.js",
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" }
    ],
    plugins: [
      resolve(),
      babel({
        exclude: ["node_modules/**"]
      }),
      uglify({ mangle: { toplevel: true } })
    ]
  }
];
