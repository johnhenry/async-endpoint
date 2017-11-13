//     
import createQueue from "./create-queue";
import passThrough from "../renderer";
export default () => {
  const [iterator               , push          ] = createQueue();
  const render = passThrough(push);
  const listen = async (...programs            ) => {
    for (const program of programs) {
      render(program);
    }
  };
  return [iterator, listen];
};

//# sourceMappingURL=create-program-queue.js.map
