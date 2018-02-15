import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

export default {
  input: "js/index.js",
  output: [
    {
      file: "common.js",
      format: "cjs"
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**", // only transpile our source code
      plugins: ["external-helpers"]
    })
  ]
};
