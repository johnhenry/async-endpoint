//@flow
import createAsyncPair from "../create-async-pair.js";
import createPassThrought from "./index.js";
import composeAsyncTransformer from "../compose-async-transformers.js";
export default (...programs: Array<Array<*>>) => {
  const ps = [];
  for (const output of programs) {
    let program: Array<AsyncIterator<*>>, init: any, a: Function, b: Function;
    if (typeof output === "function") {
      program = output;
      a = b = $ => $;
    } else {
      program = output[0];
      init = output[1];
      a = output[2];
      b = output[3];
    }
    const [request, respond] = createAsyncPair();
    ps.push({
      init,
      program,
      request: composeAsyncTransformer(b, request),
      respond: composeAsyncTransformer(respond, a)
    });
  }
  return async (program: AsyncIterator<*>) => {
    const responds = ps.map(({ respond }) => respond);
    const passthrough = createPassThrought(...responds);
    passthrough(program);
    return ps.map(({ init, program, request }) => program(init, request));
  };
};
