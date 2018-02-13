//@flow
import createQueue from "./create-queue.js";
import passThrough from "../renderer/index.js";
export default () => {
  const [iterator: AsyncIterator, push: Function] = createQueue();
  const render = passThrough(push);
  const listen = async (...programs: Array<any>) => {
    for (const program of programs) {
      render(program);
    }
  };
  return [iterator, listen];
};
