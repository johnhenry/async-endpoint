//     
import AsyncArray from "./async-array.mjs";
import map from "./array-like/map.mjs";
import passthrough from "./renderer/index.mjs";
import composeAsyncTransformer from "./compose-async-transformers.mjs";
export default (...programs            ) => (initialRequest          ) => {
  let [
    lastProgram                                ,
    lastInit     ,
    lastA          ,
    lastB          
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
    const channel = new AsyncArray();
    const respond = channel.push.bind(channel),
      requestNext = async () => (await channel.next()).value;
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

//# sourceMappingURL=compose-programs.js.map
