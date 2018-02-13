//@flow
import createStack from "./create-stack.js";
import passThrough from "../renderer/index.js";
export default () => {
  const [iterator, push] = createStack();
  const render = passThrough(push);
  const listen = async (...programs: Array<any>) => {
    for (const program of programs) {
      render(program);
    }
  };
  return [iterator, listen];
};
