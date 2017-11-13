//     
export default async (
  iterator                  ,
  accept           = () => true,
  skip         = 0
) => {
  const result = [];
  for await (const output of iterator) {
    if (!skip) {
      if (!accept(output)) {
        return result;
      }
      result.push(output);
    } else {
      skip--;
    }
  }
};

//# sourceMappingURL=while.js.map

//# sourceMappingURL=while.js.map
