//     
import channel from "../channel.mjs";
import createPassThrought from "./index.mjs";
import composeAsyncTransformer from "../compose-async-transformers.mjs";
export default (...programs                 ) => {
  const ps = [];
  for (const output of programs) {
    let program                         , init     , a          , b          ;
    if (typeof output === "function") {
      program = output;
      a = b = $ => $;
    } else {
      program = output[0];
      init = output[1];
      a = output[2];
      b = output[3];
    }
    const [request, respond] = channel();
    ps.push({
      init,
      program,
      request: composeAsyncTransformer(b, request),
      respond: composeAsyncTransformer(respond, a)
    });
  }
  return async (program                  ) => {
    const responds = ps.map(({ respond }) => respond);
    const passthrough = createPassThrought(...responds);
    passthrough(program);
    return ps.map(({ init, program, request }) => program(init, request));
  };
};

//# sourceMappingURL=tee.js.map
