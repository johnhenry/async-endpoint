//@flow
/*global process */
import readline from "readline";
import readPrompt from "./readprompt";
let rl;
if (typeof process !== "undefined") {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
} else {
  rl = readPrompt.createInterface();
}
const get = () =>
  new Promise(resolve => rl.question(">", answer => resolve(answer)));
export default async (...inputs: Array<Function>) => {
  while (true) {
    for (const input of inputs) {
      await input(await get());
    }
  }
};
