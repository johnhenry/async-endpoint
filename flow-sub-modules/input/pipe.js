//@flow
/*global process */
export default async (opts: any, ...inputs: Array<any>) => {
  // let options = {};
  // if (typeof opts === "object") {
  //     options = Object.assign(options, opts);
  // } else {
  //     inputs.unshift(opts);
  // }
  process.stdin.resume();
  //process.setEncoding("utf8");
  process.stdin.on("data", async answer => {
    for (const input of inputs) {
      await input(answer);
    }
  });
};
