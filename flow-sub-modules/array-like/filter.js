//@flow
export default (iterator: AsyncIterator<*>, filterer: Function) => {
  const newGenerator = async function*(): AsyncGenerator<any, void, any> {
    for await (const item of iterator) {
      if (filterer(item)) {
        yield item;
      }
    }
  };
  return newGenerator();
};
