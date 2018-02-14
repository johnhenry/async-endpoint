import tape from "tape";
import { channel, identity } from "../mjs/";
const DELAY = 4;

//Handle Asynchronous Tests
let PASS = 0;
tape.onFinish(() => {
  process.exit(PASS);
});
tape.onFailure(() => {
  PASS = 1;
});

tape("test identity", async ({ isEqual, end }) => {
  const [request, respond] = channel();
  const inputs = [1, 2, 3];
  const expected = [1, 2, 3];
  const program = identity(undefined, request);
  setTimeout(async () => {
    //allow  to "connect"
    while (inputs.length) {
      await respond(inputs.shift());
    }
  }, DELAY);
  for await (const output of program) {
    isEqual(output, expected.shift());
    if (!expected.length) {
      break;
    }
  }
  end();
});
