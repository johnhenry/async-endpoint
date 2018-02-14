//     
/*global process */
import readline from "readline";

readline.createInterface =
  readline.createInterface ||
  function() {
    console.warn("readline has no browser equivalent");
    return {
      question() {
        console.warn("readline has no browser equivalent");
      }
    };
  }; //Shim included in browser

const rl =
  readline.createInterface &&
  readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
const get = () =>
  new Promise(resolve => rl.question(">", answer => resolve(answer)));
export default async (...inputs                 ) => {
  while (true) {
    for (const input of inputs) {
      await input(await get());
    }
  }
};

//# sourceMappingURL=console.js.map
