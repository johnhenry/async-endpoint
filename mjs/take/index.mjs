//     
export default async (
  iterator                  ,
  number        ,
  skip         = 0
) => {
  const result = [];
  for await (const output of iterator) {
    if (!skip) {
      if (result.length === number) {
        return result;
      }
      result.push(output);
    } else {
      skip--;
    }
  }
};

//# sourceMappingURL=index.js.map

//# sourceMappingURL=index.js.map
