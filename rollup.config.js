import resolve from "rollup-plugin-node-resolve";
import builtins from "rollup-plugin-node-builtins";
import babel from "rollup-plugin-babel";

export default {
  input: "js/index.js",
  output: [
    {
      file: "common.js",
      format: "cjs"
    },
    {
      file: "browser.js",
      format: "iife",
      name: "AsyncEndpoint"
    }
  ],
  plugins: [
    builtins(),
    resolve(),
    babel({
      exclude: "node_modules/**", // only transpile our source code
      plugins: ["external-helpers"]
    })
  ]
};
