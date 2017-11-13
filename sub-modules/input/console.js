//     
/*global process */
import readline from "readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const get = () =>
  new Promise(resolve => {
    //rl.pause();
    //rl.question(">", answer => resolve(answer.slice(0, answer.length - 1)));
    rl.question(">", answer => resolve(answer));
  });
export default async (...inputs                 ) => {
  while (true) {
    for (const input of inputs) {
      await input(await get());
    }
  }
};

//# sourceMappingURL=console.js.map
