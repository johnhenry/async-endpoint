//@flow
import createQueue from "./create-queue";
import passThrough from "../renderer";
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
