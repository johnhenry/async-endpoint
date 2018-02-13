//@flow
import channel from "./channel.js";
import map from "./array-like/map.js";
import passthrough from "./renderer/index.js";
import composeAsyncTransformer from "./compose-async-transformers.js";
export default (...programs: Array<any>) => (initialRequest: Function) => {
  let [
    lastProgram: AsyncGenerator<any, void, any>,
    lastInit: any,
    lastA: Function,
    lastB: Function
  ] = programs.pop();
  let request = initialRequest;
  for (const output of programs) {
    let program, init, a, b;
    if (typeof output === "function") {
      program = output;
      a = b = $ => $;
    } else {
      program = output[0];
      init = output[1];
      a = output[2];
      b = output[3];
    }
    const [requestNext, respond] = channel();
    passthrough(
      program(init, composeAsyncTransformer(a, request)),
      composeAsyncTransformer(respond, b)
    );
    request = requestNext;
  }
  //handle last
  return map(
    lastProgram(lastInit, composeAsyncTransformer(lastA, request)),
    lastB
  );
};
