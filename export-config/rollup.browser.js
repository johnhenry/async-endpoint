import resolve from "rollup-plugin-node-resolve";
import builtins from "rollup-plugin-node-builtins";
import babel from "rollup-plugin-babel";
import regenerator from "rollup-plugin-regenerator";
// import prepack from "rollup-plugin-prepack";
import replace from "rollup-plugin-replace";

export default {
  input: "js/index.js",
  output: [
    {
      file: "browser.js",
      format: "iife",
      name: "window.AsyncEndpoint"
    }
  ],
  plugins: [
    // prepack(),
    replace({
      "process.stdin.on": "(()=>{})",
      "process.stdin.resume": "(()=>{})",
      "process.stdin": "{}",
      "process.stdout": "{}",
      'import readline from "readline"': 'import readline from "./readprompt"'
    }),
    builtins(),
    resolve(),
    babel({
      exclude: "node_modules/**",
      plugins: ["external-helpers"]
    }),
    regenerator(),
    replace({
      this: "window"
    })
  ]
};
