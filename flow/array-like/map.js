//@flow
export default (iterator: AsyncIterator<*>, mapper: Function) => {
  const newGenerator = async function*(): AsyncGenerator<any, void, any> {
    for await (const item of iterator) {
      yield await mapper(item);
    }
  };
  return newGenerator();
};
