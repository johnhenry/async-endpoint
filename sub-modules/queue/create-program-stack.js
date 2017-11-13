//     
import createStack from "./create-stack";
import passThrough from "../renderer";
export default () => {
  const [iterator, push] = createStack();
  const render = passThrough(push);
  const listen = async (...programs            ) => {
    for (const program of programs) {
      render(program);
    }
  };
  return [iterator, listen];
};

//# sourceMappingURL=create-program-stack.js.map
