//@flow
/*eslint no-console: "off"*/
export default (
  target: Function = console.log,
  ...targets: Array<Function>
) => (...programs: Array<AsyncIterator<*>>) => {
  //targets[0] = targets[0] || console.log;
  for (const program of programs) {
    (async () => {
      for await (const output of program) {
        for (const target of targets) {
          target(output);
        }
      }
    })();
  }
};
