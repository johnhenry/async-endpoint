import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import common from "rollup-plugin-commonjs";
export default {
  input: "js/index.js",
  output: [
    {
      file: "common.js",
      format: "cjs"
    }
  ],
  plugins: [
    babel({
      exclude: "node_modules/**", // only transpile our source code
      plugins: ["external-helpers"]
    }),
    replace({
      ENVIRONMENT: JSON.stringify("production")
    }),
    common(),
    resolve()
  ]
};
