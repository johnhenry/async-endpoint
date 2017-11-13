//@flow
export default async (
  iterator: AsyncIterator<*>,
  accept: Function = () => true,
  skip: number = 0
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
