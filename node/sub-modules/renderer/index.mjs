//     
/*eslint no-console: "off"*/
export default (
  target           = console.log,
  ...targets                 
) => (...programs                         ) => {
  //targets[0] = targets[0] || console.log;
  for (const program of programs) {
    (async () => {
      for await (const output of program) {
        await target(output);
        for (const target of targets) {
          await target(output);
        }
      }
    })();
  }
};

//# sourceMappingURL=index.js.map
